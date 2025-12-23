import { getPath, fetchJSON } from "../config.js";

export function ProjectsPage() {
  const container = document.createElement("div");
  container.className = "page-container";
  container.innerHTML = `
    <div class="projects-container">
      <button class="back-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; cursor: pointer; font-weight: 500; transition: all 0.3s ease; margin-bottom: 2rem;">
        ← Back to Home
      </button>
      
      <div class="projects-header" data-animate>
        <h1 class="projects-title">My Projects</h1>
        <p class="projects-subtitle">Explore my portfolio of work, crafted with attention to detail and modern technologies.</p>
      </div>

      <div class="projects-filters" data-animate>
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="Full Stack">Full Stack</button>
        <button class="filter-btn" data-filter="Frontend">Frontend</button>
        <button class="filter-btn" data-filter="featured">Featured</button>
      </div>

      <div class="projects-grid" id="projectsGrid" data-animate>
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.6);">
          Loading projects...
        </div>
      </div>
    </div>
  `;

  // Back button functionality
  const backBtn = container.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    window.location.hash = "home";
  });

  backBtn.addEventListener("mouseenter", () => {
    backBtn.style.background = "rgba(255, 255, 255, 0.15)";
    backBtn.style.transform = "translateX(-3px)";
  });

  backBtn.addEventListener("mouseleave", () => {
    backBtn.style.background = "rgba(255, 255, 255, 0.1)";
    backBtn.style.transform = "translateX(0)";
  });

  // Load projects data - moved to after container is added to DOM
  setTimeout(() => {
    fetchJSON(getPath("data/projects.json"))
      .then((data) => {
        renderProjects(data.projects, container);
        setupFilters(data.projects, container);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        const grid = container.querySelector("#projectsGrid");
        if (grid) {
          grid.innerHTML = `
            <div class="projects-empty" style="grid-column: 1/-1;">
              <h3>Unable to load projects</h3>
              <p>Error: ${error.message}</p>
            </div>
          `;
        }
      });
  }, 100);

  return container;
}

function renderProjects(projects, container, filter = "all") {
  const grid = container.querySelector("#projectsGrid");

  // Filter projects
  let filteredProjects = projects;
  if (filter === "featured") {
    filteredProjects = projects.filter((p) => p.featured);
  } else if (filter !== "all") {
    filteredProjects = projects.filter((p) => p.category === filter);
  }

  if (filteredProjects.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <h3>No projects found</h3>
        <p>Try selecting a different filter.</p>
      </div>
    `;
    return;
  }

  const html = filteredProjects
    .map(
      (project) => `
    <div class="projects-card ${project.featured ? "featured" : ""}">
      <div class="project-image-wrapper">
        <img src="${project.image}" loading="lazy" alt="${
        project.title
      }" class="project-image" onerror="this.src='https://via.placeholder.com/800x600?text=${encodeURIComponent(
        project.title
      )}'">
      </div>
      
      <div class="project-content">
        <div>
          <span class="project-category">${project.category}</span>
          <h2 class="project-title">${project.title}</h2>
          <p class="project-description">${project.description}</p>
        </div>
        
        <div class="project-bottom">
          <div class="project-technologies">
            ${project.technologies
              .slice(0, 4)
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
            ${
              project.technologies.length > 4
                ? `<span class="tech-tag">+${
                    project.technologies.length - 4
                  }</span>`
                : ""
            }
          </div>
          
          <div class="project-links">
            <a href="${
              project.github
            }" class="project-link github" target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            ${
              project.live
                ? `
              <a href="${project.live}" class="project-link live" target="_blank" rel="noopener noreferrer" title="View Live Demo">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Live
              </a>
            `
                : `
              <span class="project-link" style="opacity: 0.4; cursor: not-allowed;" title="Coming Soon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
            `
            }
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  grid.innerHTML = html;
}

function setupFilters(projects, container) {
  const filterBtns = container.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter and render
      const filter = btn.dataset.filter;
      renderProjects(projects, container, filter);
    });
  });
}
