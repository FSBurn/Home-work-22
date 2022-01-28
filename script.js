const   heroes = "https://61e839dfe32cd90017acc13b.mockapi.io/heroes",
        universes = "https://61e839dfe32cd90017acc13b.mockapi.io/universes",
        addTr = document.querySelector(`table tbody`),
        inputHeroName = document.querySelector(`form input`),
        formSelect = document.querySelector(`form select`),
        checkBoxForm = document.querySelector(`form .heroFavoriteInput input[data-name="heroFavorite"]`),
        addHeroButton = document.querySelector(`.heroes__form button`)

const controller = async (file, method="GET", obj) => {

    let options = {
        method: method,
        headers: {
            "Content-type": "application/json"
        }
    }

    if(obj)
        options.body = JSON.stringify(obj);
    let request = await fetch(file, options);

    if(request.ok){
        return request.json();
    } else{
        throw new Error(request.statusText);
    }
}

(async() =>{
    try{
// -------------------------------//    render comics    //--------------------------------------//
        let universesOptions = await controller(`${universes}`);

        universesOptions.forEach(el => {
            let option = document.createElement(`option`);
            option.setAttribute(`value`, el.name);
            option.innerText = `${el.name}`
            formSelect.append(option)
        })
// -------------------------//   render table   //----------------------------//
        let render = await controller(`${heroes}`);
        render.forEach(el =>{
            let check = el.favorite ? `checked` : ``;
            addTr.appendChild(document.createElement(`tr`))
                .innerHTML = `
                <td>${el.name}</td>
                <td>${el.comics}</td>
                <td>
                <label class="heroFavoriteInput">Favorite: <input type="checkbox" data-name="${el.id}" ${check}></label></td>
                <td><button data-name="${el.id}">Delete</button></td>`
        })
// ----------------------------------------  Annihilation !!! -----------------------------------------//
        const deleteButton = document.querySelectorAll(`tbody button`)
        deleteButton.forEach(el =>{
            el.addEventListener(`click`, (e) => {
               render.forEach(async (elem) =>{
                    let eId = elem.id
                    let delTR = e.target.closest(`tr`)
                    let delId = e.target.getAttribute("data-name")
                    if (delId === eId){
                       controller(`${heroes}/${delId}`,`DELETE`)
                        console.log(`Этот ${elem.name} мне никогда не нравился!`  )
                        render = await controller(`${heroes}`);
                        delTR.parentElement.removeChild(delTR);
                    }
                })

            })

        })
// -----------------------------        //Create and add new hero //     --------------------------------------------//
         addHeroButton.onclick = async function (e){
            e.preventDefault()
            formSelect.addEventListener(`change`, (e)=> e.target.value)
            inputHeroName.addEventListener(`change`, (e) => e.target.value)
            checkBoxForm.addEventListener(`change`, () =>{checkBoxForm.checked})
            
            let newHero = {
                comics: formSelect.value,
                name: inputHeroName.value,
                favorite: checkBoxForm.checked
            }

            let  matches = render.find(el => el.name === newHero.name)

            if(!matches){
               let addNewHero = await controller(`${heroes}`,`POST`, newHero);
                 render.push(addNewHero)
                    let check = addNewHero.favorite ? `checked` : ``;
                    addTr.appendChild(document.createElement(`tr`))
                        .innerHTML = `
                <td>${addNewHero.name}</td>
                <td>${addNewHero.comics}</td>
                <td>
                <label class="heroFavoriteInput">Favorite: <input type="checkbox"  data-name="${addNewHero.id}" ${check}></label></td>
                <td data-name="${addNewHero.id}"><button data-name="${newHero.name}">Delete</button></td>`
//-----------------------------  del new heroes ---------------------------------------
                 let newDel = document.querySelector(`button[data-name="${newHero.name}"]`)
                    newDel.addEventListener(`click`,async (e) => {
                            let delTR = e.target.closest(`tr`)
                            let delId = addNewHero.id
                             await controller(`${heroes}/${delId}`,`DELETE`)
                                console.log(`Этот ${addNewHero.name} мне никогда не нравился!`  )
                                delTR.parentElement.removeChild(delTR);
                                 render = await controller(`${heroes}`);
                        })
// -------------------------------------  checkbox for new heroes  ----------------------------------------//
                const checkBoxTbody = document.querySelectorAll(`tbody .heroFavoriteInput input`)
                checkBoxTbody.forEach((el) =>{
                    el.addEventListener(`click`,async (e) => {
                        let inputID = e.target.getAttribute("data-name")
                        // console.log(e.target.checked)
                        // console.log(e.target.classList.contains('checkbox'))
                        await  controller(`${heroes}/${inputID}`,"PUT",{favorite: e.target.checked})
                        render = await controller(`${heroes}`);
                    })
                })
                } else console.log(`Воу воу, полегче! ${newHero.name} уже есть. `)
        }
// -------------------------------------  checkbox   ----------------------------------------//
       const checkBoxTbody = document.querySelectorAll(`tbody .heroFavoriteInput input`)
        checkBoxTbody.forEach((el) =>{
            el.addEventListener(`click`,async (e) => {
              let inputID = e.target.getAttribute("data-name")
                    await  controller(`${heroes}/${inputID}`,"PUT",{favorite: e.target.checked})
                })
            })
    }
    catch (err) {
        console.log(err)
    }
})()

// Если вы дошли до конца и у вас не кровоточат глаза
// https://www.youtube.com/watch?v=dnogaM9ZQOY
// привет от (судя п овсему) моих родственников