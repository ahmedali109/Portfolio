import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.37.0/+esm";

export const initWelcomeAnimation = (onComplete) => {
  const canvas = document.createElement("canvas");
  canvas.id = "dotlottie-canvas";
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.margin = "0 auto";
  canvas.style.display = "block";

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
      canvas.remove();
      onComplete();
    }
  });

  return { canvas, dotLottie };
};
