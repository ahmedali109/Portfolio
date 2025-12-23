import { getPath, fetchJSON } from "../config.js";

export function BlogPage() {
  const container = document.createElement("div");
  container.className = "page-container";
  container.innerHTML = `
    <div class="blog-container">
      <button class="back-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; cursor: pointer; font-weight: 500; transition: all 0.3s ease; margin-bottom: 2rem;">
        ← Back to Home
      </button>
      
      <div class="blog-header" data-animate>
        <h1 class="blog-title">Blog & Articles</h1>
        <p class="blog-subtitle">Insights on building projects, web development techniques, and lessons learned along the way.</p>
      </div>

      <div class="blog-filters" data-animate>
        <button class="filter-btn active" data-filter="all">All Posts</button>
        <button class="filter-btn" data-filter="Web Development">Web Development</button>
        <button class="filter-btn" data-filter="JavaScript">JavaScript</button>
        <button class="filter-btn" data-filter="CSS">CSS</button>
        <button class="filter-btn" data-filter="featured">Featured</button>
      </div>

      <div class="blog-grid" id="blogGrid" data-animate>
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.6);">
          Loading posts...
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

  // Load blog posts
  setTimeout(() => {
    fetchJSON(getPath("data/blog.json"))
      .then((data) => {
        renderPosts(data.posts, container);
        setupFilters(data.posts, container);
      })
      .catch((error) => {
        console.error("Error loading blog posts:", error);
        const grid = container.querySelector("#blogGrid");
        if (grid) {
          grid.innerHTML = `
            <div class="blog-empty" style="grid-column: 1/-1;">
              <h3>Unable to load posts</h3>
              <p>Error: ${error.message}</p>
            </div>
          `;
        }
      });
  }, 100);

  return container;
}

function renderPosts(posts, container, filter = "all") {
  const grid = container.querySelector("#blogGrid");

  // Filter posts
  let filteredPosts = posts;
  if (filter === "featured") {
    filteredPosts = posts.filter((p) => p.featured);
  } else if (filter !== "all") {
    filteredPosts = posts.filter((p) => p.category === filter);
  }

  if (filteredPosts.length === 0) {
    grid.innerHTML = `
      <div class="blog-empty">
        <h3>No posts found</h3>
        <p>Try selecting a different filter.</p>
      </div>
    `;
    return;
  }

  const html = filteredPosts
    .map(
      (post) => `
    <article class="blog-card ${post.featured ? "featured" : ""}">
      <div class="blog-image-wrapper">
        <img src="${post.image}" loading="lazy" alt="${
        post.title
      }" class="blog-image" onerror="this.src='https://via.placeholder.com/800x400?text=${encodeURIComponent(
        post.title
      )}'">
        ${post.featured ? '<div class="featured-badge">★ Featured</div>' : ""}
      </div>
      
      <div class="blog-content">
        <div class="blog-meta">
          <span class="blog-category">${post.category}</span>
          <span class="blog-date">${formatDate(post.date)}</span>
        </div>
        
        <h2 class="blog-post-title">${post.title}</h2>
        <p class="blog-excerpt">${post.excerpt}</p>
        
        <div class="blog-footer">
          <div class="blog-tags">
            ${post.tags
              .slice(0, 3)
              .map((tag) => `<span class="blog-tag">${tag}</span>`)
              .join("")}
          </div>
          <div class="blog-read-info">
            <span class="read-time">${post.readTime}</span>
          </div>
        </div>
        
        <button class="read-more-btn" data-post-id="${post.id}">
          Read Full Article
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  `
    )
    .join("");

  grid.innerHTML = html;

  // Add click handlers for read more buttons
  const readMoreBtns = grid.querySelectorAll(".read-more-btn");
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const postId = parseInt(btn.dataset.postId);
      const post = posts.find((p) => p.id === postId);
      if (post) {
        showPostModal(post);
      }
    });
  });
}

function setupFilters(posts, container) {
  const filterBtns = container.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter and render
      const filter = btn.dataset.filter;
      renderPosts(posts, container, filter);
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function showPostModal(post) {
  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "blog-modal";
  modal.innerHTML = `
    <div class="blog-modal-overlay"></div>
    <div class="blog-modal-content">
      <button class="blog-modal-close" aria-label="Close">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="blog-modal-header">
        <img src="${post.image}" loading="lazy" alt="${
    post.title
  }" class="blog-modal-image">
        <div class="blog-modal-meta">
          <span class="blog-category">${post.category}</span>
          <h1 class="blog-modal-title">${post.title}</h1>
          <div class="blog-modal-info">
            <span class="blog-author">By ${post.author}</span>
            <span class="blog-date">${formatDate(post.date)}</span>
            <span class="read-time">${post.readTime}</span>
          </div>
        </div>
      </div>
      
      <div class="blog-modal-body">
        ${post.content
          .split("\n\n")
          .map((para) => `<p>${para}</p>`)
          .join("")}
      </div>
      
      <div class="blog-modal-tags">
        ${post.tags
          .map((tag) => `<span class="blog-tag">${tag}</span>`)
          .join("")}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Trigger animation
  setTimeout(() => modal.classList.add("active"), 10);

  // Close handlers
  const closeBtn = modal.querySelector(".blog-modal-close");
  const overlay = modal.querySelector(".blog-modal-overlay");

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
