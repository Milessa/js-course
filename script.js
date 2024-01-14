"use strict";

let title = "Project",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 250,
  rollback = 79,
  fullPrice = 9000,
  adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");

console.log(screens.toLowerCase().split());

console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
