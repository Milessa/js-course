"use strict";

const title = prompt("Как называется ваш проект?"),
  screens = prompt(
    'Какие типы экранов нужно разработать?\nпример: "Простые, Сложные, Интерактивные"'
  );

let screenPrice = +prompt("Сколько будет стоить данная работа?"),
  rollback = 79,
  adaptive = confirm("Нужен ли адаптив на сайте?"),
  service1 = prompt("Какой дополнительный тип услуги нужен?"),
  servicePrice1 = +prompt("Сколько это будет стоить?"),
  service2 = prompt("Какой дополнительный тип услуги нужен?"),
  servicePrice2 = +prompt("Сколько это будет стоить?"),
  fullPrice = screenPrice + servicePrice1 + servicePrice2;

//Тип данных
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

//Длина строки
console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");

console.log(screens.toLowerCase().split());

console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);

//итоговая стоимость за вычетом процента отката
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback) / 100);
console.log("Итоговая стоимость: " + servicePercentPrice);

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что то пошло не так");
}
