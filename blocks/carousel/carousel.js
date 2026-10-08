export default function decorate(block) {
  // Carousel block decoration logic
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  // Get all items in the block
  const items = block.querySelectorAll(':scope > div');
  
  items.forEach((item, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    carouselItem.appendChild(item.firstElementChild || item);
    carouselContainer.appendChild(carouselItem);
  });

  // Create carousel controls
  const controls = document.createElement('div');
  controls.classList.add('carousel-controls');
  
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-btn', 'prev');
  prevBtn.textContent = '❮';
  
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-btn', 'next');
  nextBtn.textContent = '❯';
  
  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);

  block.innerHTML = '';
  block.appendChild(carouselContainer);
  block.appendChild(controls);

  // Carousel logic
  let currentSlide = 0;

  function showSlide(n) {
    const slides = carouselContainer.querySelectorAll('.carousel-item');
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
  });
}
