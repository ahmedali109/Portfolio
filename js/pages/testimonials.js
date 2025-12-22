export function TestimonialsPage() {
  const container = document.createElement("div");
  container.className = "page-container";
  container.innerHTML = `
    <div class="p-8 max-w-4xl mx-auto">
      <button class="back-btn mb-8 px-4 py-2 bg-gray-800 text-white rounded-lg" data-animate>← Back</button>
      <h1 class="text-5xl font-bold mb-6 text-gray-900" data-animate>Testimonials</h1>
      <div class="space-y-4" data-animate>
        <p class="text-xl text-gray-600 leading-relaxed">What people say about working with me.</p>
        <p class="text-lg text-gray-500 leading-relaxed">Building lasting professional relationships.</p>
      </div>
    </div>
  `;

  const backBtn = container.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    window.location.hash = "home";
  });

  return container;
}
