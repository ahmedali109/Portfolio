import { getPath, fetchJSON } from "../config.js";

export function CertificatesPage() {
  const container = document.createElement("div");
  container.className = "page-container";
  container.innerHTML = `
    <div class="certificates-container">
      <button class="back-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; cursor: pointer; font-weight: 500; transition: all 0.3s ease; margin-bottom: 2rem;">
        ← Back to Home
      </button>
      
      <div class="certificates-header" data-animate>
        <h1 class="certificates-title">Certificates & Achievements</h1>
        <p class="certificates-subtitle">Professional certifications and courses that shaped my development journey.</p>
      </div>

      <div class="certificates-filters" data-animate>
        <button class="filter-btn active" data-filter="all">All Certificates</button>
        <button class="filter-btn" data-filter="featured">Featured</button>
      </div>

      <div class="certificates-grid" id="certificatesGrid" data-animate>
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.6);">
          Loading certificates...
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

  // Load certificates
  setTimeout(() => {
    fetchJSON(getPath("data/certificates.json"))
      .then((data) => {
        renderCertificates(data.certificates, container);
        setupFilters(data.certificates, container);
      })
      .catch((error) => {
        console.error("Error loading certificates:", error);
        const grid = container.querySelector("#certificatesGrid");
        if (grid) {
          grid.innerHTML = `
            <div class="certificates-empty" style="grid-column: 1/-1;">
              <h3>Unable to load certificates</h3>
              <p>Error: ${error.message}</p>
            </div>
          `;
        }
      });
  }, 100);

  return container;
}

function renderCertificates(certificates, container, filter = "all") {
  const grid = container.querySelector("#certificatesGrid");

  // Filter certificates
  let filteredCertificates = certificates;
  if (filter === "featured") {
    filteredCertificates = certificates.filter((c) => c.featured);
  }

  if (filteredCertificates.length === 0) {
    grid.innerHTML = `
      <div class="certificates-empty">
        <h3>No certificates found</h3>
        <p>Try selecting a different filter.</p>
      </div>
    `;
    return;
  }

  const html = filteredCertificates
    .map(
      (cert) => `
    <div class="certificate-card ${cert.featured ? "featured" : ""}">
      <div class="certificate-image-wrapper">
        <img src="${cert.image}" loading="lazy" alt="${
        cert.title
      }" class="certificate-image" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(
        cert.issuer
      )}'">
        ${cert.featured ? '<div class="featured-star">★</div>' : ""}
      </div>
      
      <div class="certificate-content">
        <div class="certificate-header">
          <h3 class="certificate-title">${cert.title}</h3>
          <div class="certificate-issuer">${cert.issuer}</div>
        </div>
        
        <p class="certificate-description">${cert.description}</p>
        
        <div class="certificate-footer">  
          <div class="certificate-skills">
            ${cert.skills
              .slice(0, 3)
              .map((skill) => `<span class="skill-badge">${skill}</span>`)
              .join("")}
            ${
              cert.skills.length > 3
                ? `<span class="skill-badge more">+${
                    cert.skills.length - 3
                  }</span>`
                : ""
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

function setupFilters(certificates, container) {
  const filterBtns = container.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      renderCertificates(certificates, container, filter);
    });
  });
}