document.addEventListener("DOMContentLoaded", function() {
  var init = false;
  var $slider = $('.repeater-features');

  function slickCard() {
    if (window.innerWidth <= 768) {
      if (!init) {
        init = true;
        $slider.slick({
          // Add your Slick slider settings here
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false
        });
      }
    } else {
      if (init) {
        $slider.slick('unslick'); // This is how you destroy a Slick slider
        init = false;
      }
    }
  }
  
  slickCard(); // Initialize on load
  window.addEventListener("resize", slickCard); // Re-evaluate on resize
});
