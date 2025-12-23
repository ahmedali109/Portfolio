import { wrapper } from "./wrapper.js";
import { ProfilePage } from "./pages/profile.js";
import { ProjectsPage } from "./pages/projects.js";
import { ContactPage } from "./pages/contact.js";
import { BlogPage } from "./pages/blog.js";

const routes = {
  "": wrapper,
  home: wrapper,
  projects: ProjectsPage,
  contact: ContactPage,
  profile: ProfilePage,
  blog: BlogPage,
};

export function navigateTo(path) {
  window.location.hash = path;
}

export function renderRoute() {
  const hash = window.location.hash.slice(1) || "";
  const route = routes[hash] || routes[""];
  const root = document.getElementById("root");

  if (!root) {
    console.error("Root element not found!");
    return;
  }

  root.innerHTML = "";

  if (typeof route === "function") {
    const component = route();

    if (typeof component === "string") {
      root.innerHTML = component;
      if (hash === "" || hash === "home") {
        const gridItems = document.querySelectorAll(".grid-item[data-show]");
        gridItems.forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const page = item.getAttribute("data-show");
            if (page) {
              navigateTo(page);
            }
          });
        });
      }
    } else {
      root.appendChild(component);
    }
  }
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
