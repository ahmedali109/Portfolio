import { initWelcomeAnimation } from "./welcomeMessage.js";
import { initRouter } from "./router.js";

export function App() {
  const { canvas } = initWelcomeAnimation(() => {
    canvas.remove();
    initRouter();
  });
  return canvas;
}
