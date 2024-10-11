window.onload = function() {
  var init = false;
  var $slider = $('.repeater-features');

  function slickCard() {
    // Check the window width to decide whether to initialize or destroy the slider
    if (window.innerWidth <= 768) {
      // Initialize the slider if it hasn't been initialized yet
      if (!init) {
        init = true;
        $slider.slick({
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          edgeFriction: 0.35
          // Add any additional Slick slider settings here
        });
      }
    } else {
      // Destroy the slider if it has been initialized
      if (init) {
        $slider.slick('unslick');
        init = false;
      }
    }
  }
  
  // Initial check to setup slider based on current viewport size
  slickCard();
  
  // Setup event listener to re-check and re-initialize slider on window resize
  window.addEventListener("resize", slickCard);
};
