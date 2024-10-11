// Swiper Slider
var blogArticles = new Swiper(".articles-carousel", {
  slidesPerView: 1.25,
  spaceBetween: 15,
  loop: false,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
      loop: false,
      centeredSlides: false,
    },
  },
});

// Homepage 2023 Swiper Adjustments
function adjustSwiperAlignment() {
  // Get the heading element by its class
  var heading = document.querySelector('.heading-text');
  
  // Get the offsetWidth of the heading
  var headingWidth = heading.offsetWidth;

  // Get the width of the viewport
  var viewportWidth = window.innerWidth;

  // Calculate the difference which will be used as side padding for the swiper container
  var sidePadding = (viewportWidth - headingWidth) / 2;
  var newSidePadding = sidePadding - 86;
  newSidePadding = Math.max(newSidePadding, 0);

  // Set the padding on the swiper container to match the heading's width
  var swiperContainer = document.querySelector('.articles-carousel .swiper-wrapper');
  swiperContainer.style.paddingLeft = `${newSidePadding}px`;

  // Reinitialize the Swiper here if needed or update its size
  if (blogArticles) {
    blogArticles.update();
  }
}

// Call this function to adjust the slider on load
adjustSwiperAlignment();

// Add event listener to call this function on resize
window.addEventListener('resize', adjustSwiperAlignment);