import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.37.0/+esm";

export const initWelcomeAnimation = (onComplete) => {
  const container = document.createElement("div");
  container.id = "welcome-container";
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    background: var(--bg-color);
    background-image: var(--bg-pattern);
    background-size: var(--bg-size);
  `;

  const canvas = document.createElement("canvas");
  canvas.id = "dotlottie-canvas";

  // Responsive sizing
  const isMobile = window.innerWidth <= 768;
  canvas.width = isMobile ? 250 : 300;
  canvas.height = isMobile ? 250 : 300;

  canvas.style.cssText = `
    display: block;
    max-width: 90vw;
    max-height: 90vh;
  `;

  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const dotLottie = new DotLottie({
    autoplay: true,
    loop: false,
    canvas: canvas,
    src: "./assets/Welcome.json",
  });

  dotLottie.addEventListener("complete", () => {
    if (onComplete) {
      container.remove();
      onComplete();
    }
  });

  container.appendChild(canvas);
  return { canvas: container, dotLottie };
};
