export function wrapper() {
  // Fetch skills data and render grid
  fetch("../data/profile.json")
    .then((response) => response.json())
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
    })
    .catch((error) => console.error("Error loading skills:", error));

  return `
    <div class="wrapper-enter portfolio-grid">
        <div class="grid-item expierence-section">
          <div class="experience-content">
            <h1 class="experience-number">1</h1>
            <p class="experience-text">Years</p>
            <p class="experience-text">Experience</p>
          </div>
        </div>
        <div class="grid-item projects-section" data-show="projects">
          <img src="../assets/images/projects.png" alt="projects" />
        </div>
        <div class="grid-item skills-section"></div>
        <div class="grid-item contact-section" data-show="contact">
          <img src="../assets/images/contact.png" alt="contactus" />
        </div>
        <div class="grid-item profile-section" data-show="profile">
          <img src="../assets/images/profile.jpeg" alt="Profile" />
        </div>
        <div class="grid-item blog-section" data-show="blog">Blog</div>
    </div>
    `;
}
