"use strict";
const getTitle = document.getElementsByTagName("h1")[0];
console.log(getTitle);

const btnReset = document.getElementsByClassName("handler_btn")[0];
console.log(btnReset);

const btnRestart = document.getElementsByClassName("handler_btn")[1];
console.log(btnRestart);

const btnPlus = document.querySelector(".screen-btn");
console.log(btnPlus);

const percent = document.querySelectorAll(".other-items.percent");
console.log(percent);
const number = document.querySelectorAll(".other-items.number");
console.log(number);

const inputRange = document.querySelector("div.rollback input[type=range]");
console.log(inputRange);

const span = document.querySelector("div.rollback .range-value");
console.log(span);

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
console.log(total);
console.log(totalCount);
console.log(totalCountOther);
console.log(totalFullCount);
console.log(totalCountRollback);

let screenClass = document.querySelectorAll(".screen");
console.log(screenClass);

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollback: 79,

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "калькулятор верстки"
      );
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let servicePrices = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isString(name));

      do {
        servicePrices = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(servicePrices));

      appData.services[name] = +servicePrices;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isString: function (x) {
    let validation = /^^(?!\s)(?!\d)[, а-яА-ЯёЁa-zA-Z\d]+$/;
    return validation.test(x);
  },
  //сумму всех дополнительных услуг
  getAllServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  //сумма всех дополнительных услуг
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  //сумму стоимости верстки и стоимости дополнительных услуг
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  //Форматирование title
  getTitle: function () {
    appData.title =
      appData.title.trim().charAt(0).toUpperCase() +
      appData.title.trim().slice(1).toLowerCase();
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
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.start();
