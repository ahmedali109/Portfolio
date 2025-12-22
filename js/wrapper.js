export function wrapper() {
  return `
    <div class="wrapper-enter grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9 grid-rows-auto md:grid-rows-8 gap-6 h-full">
        <div class="col-span-1 md:col-span-3 md:row-span-6 bg-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[200px] md:min-h-0">About</div>
        <div class="col-span-1 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-7 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[150px] md:min-h-0">Projects</div>
        <div class="col-span-1 md:col-span-4 lg:col-span-5 md:row-span-2 md:col-start-3 md:row-start-7 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[150px] md:min-h-0">Skills</div>
        <div class="col-span-1 md:col-span-2 md:row-span-2 lg:col-start-8 md:row-start-7 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[150px] md:min-h-0">Contact</div>
        <div class="col-span-1 md:col-span-2 md:row-span-3 lg:col-start-8 md:row-start-4 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[200px] md:min-h-0 overflow-hidden">
          <img src="../assets/images/profile.jpeg" alt="Profile" class="rounded-xl w-full h-full object-cover" />
        </div>
        <div class="col-span-1 md:col-span-4 md:row-span-3 md:col-start-4 lg:col-start-4 md:row-start-4 bg-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[200px] md:min-h-0">Blog</div>
        <div class="col-span-1 md:col-span-6 md:row-span-3 md:col-start-4 lg:col-start-4 md:row-start-1 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold hover:scale-105 transition-transform min-h-[200px] md:min-h-0">Testimonials</div>
    </div>
    `;
}
