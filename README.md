"# Home-work-22" 

Вывести список персонажей в виде таблицы.



API: https://61c9d37520ac1c0017ed8eac.mockapi.io/heroes



Таблица состоит из 4-х колонок:

Name Surname
Comics (DC, Marvel, Comix Zone)
Favourite (чекбокс)
Actions (одна кнопка Delete)


Над таблицей форма добавления с тремя полями:

Name Surname (input)
Comics (DC, Marvel, Comix Zone) (select) – данные запрашиваем методом GET с сущности universes (https://61c9d37520ac1c0017ed8eac.mockapi.io/universes)
Favourite (true, false) (checkbox).


Действия:

При сабмите формы происходит добавление персонажа в базу (POST) и вывод в html строки с информацией о герое в таблицу. Если в базе уже существует герой с таким же свойством name, то объект не добавляется в базу (можно просто в консоль вывести инфу, что юзер с таким именем уже есть в базе).
При изменении состояния checkbox в колонке Favourite происходит изменение данных по этому персонажу в базе (PUT).
При нажатии на кнопку Delete в строке персонажа происходит удаление с базы соответствующего героя (DELETE) и удаление соответствующей tr с таблицы.


Пример объекта сущности heroes:

{
  "name": "Iron Man",
  "comics": "Marvel",
  "favourite": true,
  "id": "1"
 }


Пример объекта сущности universes:

{
  "id": "1",
  "name": "Marvel"
 }
