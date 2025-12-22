export function ProfilePage() {
  const container = document.createElement("div");
  container.className = "page-container";

  // Load profile data
  fetch("../data/profile.json")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = `
        <div class="profile-page-wrapper">
          <div class="profile-page">
            <button class="back-btn" style="margin-bottom: 2rem; padding: 0.75rem 1.5rem; background: rgba(255, 255, 255, 0.1); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: background 0.3s ease;">← Back</button>
          
          <div class="profile-header" data-scroll>
            <div class="profile-image-container">
              <img src="${data.image}" alt="${
        data.name
      }" class="profile-image" />
            </div>
            <div class="profile-info">
              <h1 class="profile-name">${data.name}</h1>
              <p class="profile-role">${data.role}</p>
              <div class="profile-meta">
                <span class="profile-meta-item">📧 ${data.email}</span>
                <span class="profile-meta-item">📍 ${data.location}</span>
                <span class="profile-meta-item">📅 ${
                  new Date().getFullYear()
                }</span>
              </div>
              <div class="profile-social">
                <a href="${
                  data.linkedinUrl
                }" class="social-link" target="_blank">LinkedIn</a>
                <a href="${
                  data.githubUrl
                }" class="social-link" target="_blank">GitHub</a>
              </div>
            </div>
          </div>

          <div class="profile-bio" data-scroll>
            <p>${data.bio}</p>
          </div>

          <div class="profile-section" data-scroll>
            <h2 class="section-title">Expertise</h2>
            <div class="expertise-grid">
              ${data.expertise
                .map(
                  (item, index) =>
                    `<div class="expertise-item" data-scroll style="transition-delay: ${
                      index * 0.1
                    }s">${item}</div>`
                )
                .join("")}
            </div>
          </div>

          <div class="profile-section" data-scroll>
            <h2 class="section-title">Work Experience</h2>
            <div class="experience-timeline">
              ${data.experience
                .map(
                  (exp, index) => `
                <div class="experience-item" data-scroll style="transition-delay: ${
                  index * 0.15
                }s">
                  <h3 class="experience-title">${exp.title}</h3>
                  <p class="experience-company">${exp.company}</p>
                  <p class="experience-period">${exp.period}</p>
                  <p class="experience-description">${exp.description}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="profile-section" data-scroll>
            <h2 class="section-title">Key Achievements</h2>
            <ul class="achievements-list">
              ${data.achievements
                .map(
                  (achievement, index) => `
                <li class="achievement-item" data-scroll style="transition-delay: ${
                  index * 0.1
                }s">${achievement}</li>
              `
                )
                .join("")}
            </ul>
          </div>

          <div class="profile-section" data-scroll>
            <h2 class="section-title">Current Projects</h2>
            <div class="projects-grid">
              ${data.currentProjects
                .map(
                  (project, index) => `
                <div class="project-card" data-scroll style="transition-delay: ${
                  index * 0.15
                }s">
                  <h3 class="project-name">${project.name}</h3>
                  <span class="project-status">${project.status}</span>
                  <p class="project-description">${project.description}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="profile-section" data-scroll>
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">
              <div class="skills-category" data-scroll>
                <h3 class="skills-category-title">Technical Skills</h3>
                <div class="skills-list">
                  ${data.skills.technical
                    .map(
                      (skill, index) =>
                        `<span class="skill-tag" data-scroll style="transition-delay: ${
                          index * 0.05
                        }s">${skill}</span>`
                    )
                    .join("")}
                </div>
              </div>
              <div class="skills-category" data-scroll>
                <h3 class="skills-category-title">Soft Skills</h3>
                <div class="skills-list">
                  ${data.skills.soft
                    .map(
                      (skill, index) =>
                        `<span class="skill-tag" data-scroll style="transition-delay: ${
                          index * 0.05
                        }s">${skill}</span>`
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      `;

      const backBtn = container.querySelector(".back-btn");
      backBtn.addEventListener("click", () => {
        window.location.hash = "home";
      });

      // Intersection Observer for scroll animations
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      }, observerOptions);

      // Observe all elements with data-scroll attribute
      const scrollElements = container.querySelectorAll("[data-scroll]");
      scrollElements.forEach((el) => observer.observe(el));
    })
    .catch((error) => {
      console.error("Error loading profile data:", error);
      container.innerHTML = `
        <div class="profile-page-wrapper">
          <div class="profile-page">
            <button class="back-btn" style="margin-bottom: 2rem; padding: 0.75rem 1.5rem; background: rgba(255, 255, 255, 0.1); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">← Back</button>
            <p style="color: white;">Error loading profile data. Please try again.</p>
          </div>
        </div>
      `;

      const backBtn = container.querySelector(".back-btn");
      backBtn.addEventListener("click", () => {
        window.location.hash = "home";
      });
    });

  return container;
}
