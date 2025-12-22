export function wrapper() {
  return `
    <div class="wrapper-enter portfolio-grid">
        <div class="grid-item expierence-section" data-show="expierence">expierence</div>
        <div class="grid-item projects-section" data-show="projects">Projects</div>
        <div class="grid-item skills-section" data-show="skills">Skills</div>
        <div class="grid-item contact-section" data-show="contact">Contact</div>
        <div class="grid-item profile-section" data-show="profile">
          <img src="../assets/images/profile.jpeg" alt="Profile" />
        </div>
        <div class="grid-item blog-section" data-show="blog">Blog</div>
        <div class="grid-item testimonials-section" data-show="testimonials">Testimonials</div>
    </div>
    `;
}
