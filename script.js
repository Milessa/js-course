"use strict";

let title,
  screens,
  screenPrice,
  adaptive,
  service1,
  service2,
  allServicePrices,
  fullPrice,
  servicePercentPrice,
  rollback = 79;

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
};

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

//сумму всех дополнительных услуг
const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    let servicePrices;
    do {
      servicePrices = prompt("Сколько это будет стоить?");
    } while (!isNumber(servicePrices));
    sum += servicePrices;
  }
  return sum;
};

//сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

//итоговую стоимость за вычетом процента отката
const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - (fullPrice * rollback) / 100);
};

//Форматирование title
const getTitle = function () {
  return (
    title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase()
  );
};

//конструкции условия
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

asking();

//переопредиление значение переменных
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeof(title);
showTypeof(fullPrice);
showTypeof(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(screens.toLowerCase().split());

console.log(getRollbackMessage(fullPrice));

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");
console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
console.log("Итоговая стоимость: " + servicePercentPrice);
