import { wrapper } from "./wrapper.js";
import { AboutPage } from "./pages/about.js";
import { ProjectsPage } from "./pages/projects.js";
import { SkillsPage } from "./pages/skills.js";
import { ContactPage } from "./pages/contact.js";
import { ExperiencePage } from "./pages/experience.js";
import { BlogPage } from "./pages/blog.js";
import { TestimonialsPage } from "./pages/testimonials.js";

const routes = {
  "": wrapper,
  home: wrapper,
  about: AboutPage,
  projects: ProjectsPage,
  skills: SkillsPage,
  contact: ContactPage,
  experience: ExperiencePage,
  blog: BlogPage,
  testimonials: TestimonialsPage,
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
        const gridItems = document.querySelectorAll(".grid > div");
        const paths = [
          "about",
          "projects",
          "skills",
          "contact",
          "experience",
          "blog",
          "testimonials",
        ];
        gridItems.forEach((item, index) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateTo(paths[index]);
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