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
