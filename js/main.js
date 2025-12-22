import { App } from "./app.js";
import { initCustomCursor } from "./cursor.js";
import { initAnimations } from "./animations.js";
import { initSnowEffect } from "./snow.js";

const root = document.getElementById("root");
root.appendChild(App());

initCustomCursor();
initAnimations();

setTimeout(() => {
  initSnowEffect();
}, 100);

window.addEventListener("blur" , () => {
   document.title = "Come back :)";
});

window.addEventListener("focus" , () => {
   document.title = "Ahmed Ali - Portfolio";
});