//--------------------------------------------------------------
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let currentSlide = 0;
let autoPlay = true;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 4000;

// SVG for play and pause
const playSVG = `<svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19" fill="#222"/></svg>`;
const pauseSVG = `<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" fill="#222"/><rect x="14" y="5" width="4" height="14" fill="#222"/></svg>`;

// Show slide by index
function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  slidesWrapper.style.transform = `translateX(-${index * 100}vw)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.querySelector('.dot-icon').innerHTML = '';
  });
  if (autoPlay) {
    dots[index].querySelector('.dot-icon').innerHTML = pauseSVG;
  } else {
    dots[index].querySelector('.dot-icon').innerHTML = playSVG;
  }
  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Dots click
dots.forEach((dot, i) => {
  dot.addEventListener('click', (e) => {
    // If the click is on the play/pause icon, do nothing here
    if (e.target.closest('.dot-icon')) return;
    showSlide(i);
    pauseAutoPlay();
    // playAutoPlay();
  });
});

// Arrows
leftArrow.addEventListener('click', () => {
  prevSlide();
  // pauseAutoPlay();
});
rightArrow.addEventListener('click', () => {
  nextSlide();
  // pauseAutoPlay(); 
});

// Auto play
function playAutoPlay(startFrom = currentSlide) {
  autoPlay = true;
  showSlide(startFrom);
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, AUTO_PLAY_DELAY);
}
function pauseAutoPlay() {
  autoPlay = false;
  clearInterval(autoPlayInterval);
  showSlide(currentSlide); // update icon
}

// Start autoplay on load
showSlide(0);
playAutoPlay();
// Play/pause icon click
document.querySelector('.slider-dots').addEventListener('click', function(e) {
  if (e.target.closest('.dot-icon')) {
    if (autoPlay) {
      pauseAutoPlay();
    } else {
      playAutoPlay(currentSlide);
    }
    e.stopPropagation();
    e.preventDefault();
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    pauseAutoPlay();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    pauseAutoPlay();
  }
});
 
// --------------------------------------------------------------------------
 
 // 🎯 Convocation Date and Time (Karachi)
  const eventDate = new Date("December 3, 2025 09:00:00 GMT+0500").getTime();

  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

    // When countdown ends
    if (distance < 0) {
      clearInterval(countdown);
      document.querySelector(".countdown").innerHTML = "<h3>🎉 The Convocation Has Begun!</h3>";
    }
  }, 1000);