export function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");

  const cursorFollower = document.createElement("div");
  cursorFollower.classList.add("custom-cursor-follower");

  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";

    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  const interactiveElements =
    "a, button, input[type='submit'], input[type='button'], [role='button'], canvas";

  document.addEventListener("mouseover", (e) => {
    if (e.target.matches(interactiveElements)) {
      cursor.classList.add("hover");
      cursorFollower.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.matches(interactiveElements)) {
      cursor.classList.remove("hover");
      cursorFollower.classList.remove("hover");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorFollower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorFollower.style.opacity = "1";
  });
}
