import { initWelcomeAnimation } from "./welcomeMessage.js";
import { initRouter } from "./router.js";

export function App() {
  const container = document.createElement("div");
  const currentHash = window.location.hash.slice(1);
  const shouldShowWelcome = !currentHash || currentHash === "home";
  if (shouldShowWelcome) {
    const { canvas } = initWelcomeAnimation(() => {
      canvas.remove();
      initRouter();
    });
    return canvas;
  } else {
    initRouter();
    return container;
  }
}
