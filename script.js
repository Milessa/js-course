"use strict";

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
