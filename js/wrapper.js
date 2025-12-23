import { getPath, fetchJSON } from "./config.js";

// CV Modal functionality
function initCVModal() {
  const cvSection = document.querySelector(".cv-section");
  if (!cvSection) return;

  cvSection.addEventListener("click", () => {
    showCVModal();
  });
}

function showCVModal() {
  // Create modal
  const modal = document.createElement("div");
  modal.className = "cv-modal";
  modal.innerHTML = `
    <div class="cv-modal-overlay"></div>
    <div class="cv-modal-content">
      <button class="cv-modal-close" aria-label="Close">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="cv-modal-header">
        <h2>My Resume</h2>
        <a href="https://docs.google.com/document/d/YOUR_CV_ID/export?format=pdf" download class="cv-download-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download PDF
        </a>
      </div>
      
      <div class="cv-iframe-wrapper">
        <iframe 
          src="https://docs.google.com/document/d/1YR_hbLqQ4hRwRAE4Dun3wWlJ6g5C03CqWUXlAIQRGis/preview" 
          frameborder="0"
          class="cv-iframe"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Trigger animation
  setTimeout(() => modal.classList.add("active"), 10);

  // Close handlers
  const closeBtn = modal.querySelector(".cv-modal-close");
  const overlay = modal.querySelector(".cv-modal-overlay");

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);
}

export function wrapper() {
  // Fetch skills data and render grid
  fetchJSON(getPath("data/profile.json"))
    .then((data) => {
      const skillsSection = document.querySelector(".skills-section");
      if (skillsSection && data.skills && data.skills.technical) {
        const skillsGrid = document.createElement("div");
        skillsGrid.className = "skills-grid";

        data.skills.technical.forEach((skill) => {
          const skillItem = document.createElement("div");
          skillItem.className = "skill-item";

          // Create icon element
          const icon = document.createElement("div");
          icon.className = "skill-icon";
          icon.textContent = skill.charAt(0).toUpperCase(); // First letter as icon

          // Create text element
          const text = document.createElement("div");
          text.className = "skill-text";
          text.textContent = skill;

          skillItem.appendChild(icon);
          skillItem.appendChild(text);
          skillsGrid.appendChild(skillItem);
        });

        skillsSection.innerHTML = "";
        skillsSection.appendChild(skillsGrid);
      }

      // Initialize CV modal after DOM is ready
      setTimeout(() => initCVModal(), 100);
    })
    .catch((error) => console.error("Error loading skills:", error));

  return `
    <div class="wrapper-enter portfolio-grid">
        <div class="grid-item profile-section" data-show="profile">
          <img src="${getPath(
            "assets/images/profile.webp"
          )}" loading="lazy" alt="Profile" />
          <div class="section-label">
            <span class="label-text">About Me</span>
            <span class="click-hint">Click to view →</span>
          </div>
        </div>
        <div class="grid-item projects-section" data-show="projects">
          <img src="${getPath(
            "assets/images/projects.png"
          )}" loading="lazy" alt="projects" />
          <div class="section-label">
            <span class="label-text">Projects</span>
            <span class="click-hint">Click to explore →</span>
          </div>
        </div>
        <div class="grid-item expierence-section">
          <div class="experience-content">
            <h1 class="experience-number">1</h1>
            <p class="experience-text">Years</p>
            <p class="experience-text">Experience</p>
          </div>
        </div>
        <div class="grid-item contact-section" data-show="contact">
          <img src="${getPath(
            "assets/images/contact.png"
          )}" loading="lazy" alt="contactus" />
          <div class="section-label">
            <span class="label-text">Contact</span>
            <span class="click-hint">Click to connect →</span>
          </div>
        </div>
        <div class="grid-item skills-section">
          <div class="section-overlay-label">
            <span class="label-text">Technical Skills</span>
          </div>
        </div>
        <div class="grid-item blog-section" data-show="blog">
          <div class="blog-content">
          </div>
          <div class="section-label">
            <span class="label-text">Blog</span>
            <span class="click-hint">Click to read →</span>
          </div>
        </div>
        <div class="grid-item certificates-section" data-show="certificates">
          <div class="certificates-icon-wrapper">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div class="section-label">
            <span class="label-text">Certificates</span>
            <span class="click-hint">Click to view →</span>
          </div>
        </div>

        <div class="grid-item cv-section">
          <div class="cv-icon-wrapper">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="section-label">
            <span class="label-text">View CV</span>
            <span class="click-hint">Click to open →</span>
          </div>
        </div>
    </div>
    `;
}
