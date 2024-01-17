"use strict";

let title = prompt("Как называется ваш проект?"),
  screens = prompt(
    'Какие типы экранов нужно разработать?\nпример: "Простые, Сложные, Интерактивные"'
  ),
  screenPrice = +prompt("Сколько будет стоить данная работа?"),
  adaptive = confirm("Нужен ли адаптив на сайте?"),
  service1 = prompt("Какой дополнительный тип услуги нужен?"),
  servicePrice1 = +prompt("Сколько это будет стоить?"),
  service2 = prompt("Какой дополнительный тип услуги нужен?"),
  servicePrice2 = +prompt("Сколько это будет стоить?"),
  rollback = 79;
let fullPrice, servicePercentPrice;

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что то пошло не так";
  }
};

//сумму всех дополнительных услуг
const allServicePrices = function getAllServicePrices() {
  return servicePrice1 + servicePrice2;
};

//сумму стоимости верстки и стоимости дополнительных услуг
function getFullPrice() {
  return screenPrice + allServicePrices();
}

//Форматирование title
function getTitle() {
  return (
    title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase()
  );
}

//итоговую стоимость за вычетом процента отката
function getServicePercentPrices() {
  return Math.ceil(fullPrice - (fullPrice * rollback) / 100);
}

fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeof(getTitle(title));
showTypeof(getFullPrice());
showTypeof(adaptive);

console.log(screens.toLowerCase().split());

console.log(getRollbackMessage(fullPrice));

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");
console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
console.log("Итоговая стоимость: " + servicePercentPrice);
