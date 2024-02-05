"use strict";
const title = document.getElementsByTagName("h1")[0];
const btnPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector("div.rollback input[type=range]");
const inputRangeValue = document.querySelector("div.rollback .range-value");

const btnStart = document.getElementsByClassName("handler_btn")[0];
const btnReset = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

const allInputText = document.getElementsByClassName("all-inputs");
const allSelect = document.getElementsByTagName("select");

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  count: {},
  countScreens: 0,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  isError: false,
  init: function () {
    this.addTitle();
    this.addEnable();

    inputRange.addEventListener("input", this.addInputRange.bind(this));

    btnStart.addEventListener("click", this.start.bind(this));
    btnReset.addEventListener("click", this.reset.bind(this));

    btnPlus.addEventListener("click", this.addScreenBlock, true);
  },
  addTitle: () => (document.title = title.textContent),
  start: function () {
    if (this.addScreens()) {
      this.addServices();
      this.addPrices();
      // this.getServicePercentPrice();
      this.showResult();
      this.addDisabled();
      btnStart.style.display = "none";
      btnReset.style.display = "initial";
    }
  },
  reset: function () {
    this.addEnable();

    total.value = total.defaultValue;
    totalCount.value = totalCount.defaultValue;
    totalCountOther.value = totalCountOther.defaultValue;
    totalFullCount.value = totalFullCount.defaultValue;
    totalCountRollback.value = totalCountRollback.defaultValue;

    this.title = "";
    this.screens = [];
    this.screenPrice = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.count = {};
    this.countScreens = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;

    //screens type default dropdown
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      let select = screen.querySelector("select");
      select.selectedIndex = "0";
    });

    //removing additional screens type
    for (var i = 1; i < screens.length; i++) {
      screens[i].remove();
    }

    //services default prices
    let serviceDefaultPrice = document.querySelectorAll(
      ".main-controls__input"
    );
    serviceDefaultPrice.forEach((screen) => {
      let input = screen.querySelector("input");
      input.value = input.defaultValue;
    });

    //services checkbox uncheck
    let serviceUncheck = document.querySelectorAll(".custom-checkbox");
    serviceUncheck.forEach((box) => (box.checked = false));

    //input default value
    inputRangeValue.textContent = inputRange.defaultValue + "%";
    inputRange.value = "0";
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.countScreens;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  isString: function (x) {
    let validation = /^^(?!\s)(?!\d)[, а-яА-ЯёЁa-zA-Z\d]+$/;
    return validation.test(x);
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      if (select.selectedIndex === 0) {
        alert("Выберите хотя бы один тип экрана ");
        this.isError = true;
      } else if (input.value === "") {
        alert("Укажите количество экранов");
        this.isError = true;
      } else {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
        });

        this.count[selectName] = +input.value;
      }
    });

    return !this.isError;
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    let cloneScreen = screens[0].cloneNode(true);
    let cloneScreenLocation = document.querySelector(".element");
    cloneScreenLocation.appendChild(cloneScreen);
    //screens[screens.length - 1].after(cloneScreenLocation);
    btnPlus.parentNode.appendChild(btnPlus);
  },
  addInputRange: function () {
    inputRangeValue.textContent = inputRange.value + "%";
    this.rollback = inputRange.value;
  },
  //сумма всех дополнительных услуг
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    for (let key in this.count) {
      this.countScreens += this.count[key];
    }
    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
  addEnable: function () {
    [].forEach.call(allInputText, (e) => {
      e.removeAttribute("disabled");
    });
    [].forEach.call(allSelect, (e) => {
      e.removeAttribute("disabled");
    });

    btnStart.style.display = "initial";
    btnReset.style.display = "none";
  },
  addDisabled: function () {
    [].forEach.call(allInputText, (e) => {
      e.disabled = true;
    });
    [].forEach.call(allSelect, (e) => {
      e.disabled = true;
    });

    screens.disabled = true;
    btnStart.style.display = "none";
    btnReset.style.display = "initial";
  },
  //итоговая стоимость за вычетом процента отката
  getServicePercentPrice: function () {
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
};

appData.init();
