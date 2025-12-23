// Subtle winter snow effect (December - February)
// Minimal, calm, never distracting

class SnowEffect {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.snowflakes = [];
    this.animationId = null;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.maxSnowflakes = 45; // Optimized for performance
    this.wind = 0;
    this.windTarget = 0;
  }

  shouldShowSnow() {
    // Only show in winter months (December, January, February)
    const month = new Date().getMonth();
    const isWinter = month === 11 || month === 0 || month === 1;

    // Disable on mobile or low-performance devices
    const isMobile = window.innerWidth < 768;
    const isLowPerf =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    console.log("Snow check:", {
      month,
      isWinter,
      isMobile,
      isLowPerf,
      result: isWinter && !isMobile && !isLowPerf,
    });

    return isWinter && !isMobile && !isLowPerf;
  }

  init() {
    if (!this.shouldShowSnow()) {
      console.log("Snow effect disabled");
      return;
    }

    console.log("Initializing snow effect...");

    this.canvas = document.createElement("canvas");
    this.canvas.id = "snow-canvas";
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
      opacity: 0.6;
    `;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    console.log("Canvas created and appended:", this.canvas);
    console.log("Canvas dimensions:", this.canvas.width, this.canvas.height);

    this.resize();
    this.createSnowflakes();
    console.log("Created snowflakes:", this.snowflakes.length);
    this.animate();

    window.addEventListener("resize", () => this.resize());
    this.setupScrollListener();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(
      "Canvas resized to:",
      this.canvas.width,
      "x",
      this.canvas.height
    );
  }

  createSnowflakes() {
    for (let i = 0; i < this.maxSnowflakes; i++) {
      this.snowflakes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 3 + 1, // 1-4px
        speed: Math.random() * 0.8 + 0.3, // 0.3-1.1
        drift: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7
        depth: Math.random(), // For depth effect
        wobble: Math.random() * Math.PI * 2, // For wobble effect
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }
    console.log("Created snowflakes:", this.snowflakes.length);
  }

  setupScrollListener() {
    window.addEventListener("scroll", () => {
      this.isScrolling = true;
      clearTimeout(this.scrollTimeout);

      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 150);
    });
  }

  animate() {
    if (this.isScrolling) {
      // Pause during scroll for performance
      this.scheduleNextFrame();
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update wind gradually
    this.windTarget = Math.sin(Date.now() / 10000) * 0.5;
    this.wind += (this.windTarget - this.wind) * 0.01;

    this.snowflakes.forEach((flake) => {
      // Update wobble
      flake.wobble += flake.wobbleSpeed;

      // Update position with wind and wobble
      flake.y += flake.speed * (0.5 + flake.depth * 0.5);
      flake.x +=
        (flake.drift + this.wind + Math.sin(flake.wobble) * 0.3) *
        (0.5 + flake.depth * 0.5);

      // Reset if out of bounds
      if (flake.y > this.canvas.height + 10) {
        flake.y = -10;
        flake.x = Math.random() * this.canvas.width;
      }

      if (flake.x > this.canvas.width + 10) {
        flake.x = -10;
      } else if (flake.x < -10) {
        flake.x = this.canvas.width + 10;
      }

      // Draw snowflake with depth effect
      const size = flake.radius * (0.5 + flake.depth * 0.5);
      const alpha = flake.opacity * (0.3 + flake.depth * 0.7);

      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.shadowBlur = 2;
      this.ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    this.scheduleNextFrame();
  }

  scheduleNextFrame() {
    // Use requestIdleCallback when available for better performance
    if (window.requestIdleCallback) {
      this.animationId = requestIdleCallback(
        () => {
          requestAnimationFrame(() => this.animate());
        },
        { timeout: 50 }
      );
    } else {
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  destroy() {
    if (this.animationId) {
      if (window.cancelIdleCallback) {
        cancelIdleCallback(this.animationId);
      }
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export function initSnowEffect() {
  const snow = new SnowEffect();
  snow.init();
  return snow;
}
