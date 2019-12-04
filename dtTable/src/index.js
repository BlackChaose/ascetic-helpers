import { runApp } from './dtTable';
/* eslint-disable */
let obj = document.getElementById('app');
let testData = [
  {"orderCount" : 1, "FIO" : "Ivan Ivanych Petrov1", "IdExpert": "1000", "email": 'ii1@gmail.com', 'phone': '+1 234 567 88 11'},
  {"orderCount" : 2, "FIO" : "Ivan Ivanych Petrov2", "IdExpert": "1100", "email": 'ii2@gmail.com', 'phone': '+1 234 567 88 22'},
  {"orderCount" : 3, "FIO" : "Ivan Ivanych Petrov3", "IdExpert": "1200", "email": 'ii3@gmail.com', 'phone': '+1 234 567 88 33'},
  {"orderCount" : 4, "FIO" : "Ivan Ivanych Petrov4", "IdExpert": "1300", "email": 'ii4@gmail.com', 'phone': '+1 234 567 88 44'},
  {"orderCount" : 5, "FIO" : "Ivan Ivanych Petrov5", "IdExpert": "1400", "email": 'ii5@gmail.com', 'phone': '+1 234 567 88 55'},
  {"orderCount" : 6, "FIO" : "Ivan Ivanych Petrov6", "IdExpert": "1500", "email": 'ii6@gmail.com', 'phone': '+1 234 567 88 66'},
  {"orderCount" : 7, "FIO" : "Ivan Ivanych Petrov7", "IdExpert": "1600", "email": 'ii7@gmail.com', 'phone': '+1 234 567 88 77'},
  {"orderCount" : 8, "FIO" : "Ivan Ivanych Petrov8", "IdExpert": "1700", "email": 'ii8@gmail.com', 'phone': '+1 234 567 88 88'},
  {"orderCount" : 9, "FIO" : "Ivan Ivanych Petrov9", "IdExpert": "1800", "email": 'ii9@gmail.com', 'phone': '+1 234 567 88 99'},
  {"orderCount" : 10, "FIO" : "Ivan Ivanych Petro10v", "IdExpert": "1900", "email": 'ii10@gmail.com', 'phone': '+1 234 567 88 10'},
  {"orderCount" : 11, "FIO" : "Ivan Ivanych Petro11", "IdExpert": "2000", "email": 'ii11@gmail.com', 'phone': '+1 234 567 88 11'},
  {"orderCount" : 12, "FIO" : "Ivan Ivanych Petrov12", "IdExpert": "2100", "email": 'ii12@gmail.com', 'phone': '+1 234 567 88 12'},
  {"orderCount" : 13, "FIO" : "Ivan Ivanych Petrov13", "IdExpert": "2200", "email": 'ii13@gmail.com', 'phone': '+1 234 567 88 13'},
  {"orderCount" : 14, "FIO" : "Ivan Ivanych Petrov14", "IdExpert": "2300", "email": 'ii14@gmail.com', 'phone': '+1 234 567 88 14'},
  {"orderCount" : 15, "FIO" : "Ivan Ivanych Petrov15", "IdExpert": "2400", "email": 'ii15@gmail.com', 'phone': '+1 234 567 88 15'},
  {"orderCount" : 16, "FIO" : "Ivan Ivanych Petrov16", "IdExpert": "2500", "email": 'ii16@gmail.com', 'phone': '+1 234 567 88 16'},
  {"orderCount" : 17, "FIO" : "Ivan Ivanych Petrov17", "IdExpert": "2600", "email": 'ii17@gmail.com', 'phone': '+1 234 567 88 17'},
  {"orderCount" : 18, "FIO" : "Ivan Ivanych Petrov18", "IdExpert": "2700", "email": 'ii18@gmail.com', 'phone': '+1 234 567 88 18'},
  {"orderCount" : 19, "FIO" : "Ivan Ivanych Petrov19", "IdExpert": "2800", "email": 'ii19@gmail.com', 'phone': '+1 234 567 88 19'},
  {"orderCount" : 20, "FIO" : "Ivan Ivanych Petrov20", "IdExpert": "2900", "email": 'ii20@gmail.com', 'phone': '+1 234 567 88 20'},
];
let configTable = {
  "orderTypeDefault": "ASC",
  "orders": [{'orderCount': "ASC"}, {'FIO': "ASC"}, {'IdExpert':"ASC"}, {'email': "ASC"}, {'phone':"ASC"}],
  "rowLimit": 5,
  "headers": [{"orderCount": "Номер по порядку", "FIO": "Ф.И.О.", "IdExpert": "ИД эксперта", "email": "эл. почта", "phone": "телефон"}],
  "columnDeleteRow": true,
};

runApp(obj, configTable, testData);
/* eslint-enable */
