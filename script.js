"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  service1: "",
  service2: "",
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollback: 79,

  start: function () {
    appData.asking();
    //переопредиление значение переменных
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    //Вывод в консоль
    appData.logger();
  },

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  //сумму всех дополнительных услуг
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      let servicePrices;
      do {
        servicePrices = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(servicePrices));
      sum += +servicePrices;
    }
    return sum;
  },
  //сумму стоимости верстки и стоимости дополнительных услуг
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  //итоговую стоимость за вычетом процента отката
  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100
    );
  },
  //Форматирование title
  getTitle: function () {
    return (
      appData.title.trim().charAt(0).toUpperCase() +
      appData.title.trim().slice(1).toLowerCase()
    );
  },
  //конструкции условия
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else if (price < 0) {
      return "Что то пошло не так";
    }
  },

  logger: function () {
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
  },
};

appData.start();
