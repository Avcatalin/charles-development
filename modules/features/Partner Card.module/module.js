// Slick Slider
$(document).ready(function() {
  $('.partners-logos-card.four-slides').slick({
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 0,     // Set autoplay speed to 0 for continuous effect
    speed: 5000,          // Duration of the transition (5 seconds)
    arrows: false,        // Hide arrows
    swipe: false,         // Disable swipe
    slidesToShow: 4,      // Number of slides to show
    cssEase: 'linear',    // Linear animation for continuous effect
    infinite: true,       // Enable infinite looping
    pauseOnFocus: false,  // Do not pause when slider is focused
    pauseOnHover: false,  // Do not pause when hovered over
    responsive: [         // Responsive settings
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,  // Show fewer slides on smaller screens
          speed: 5000       // Keep the same speed for transition
        }
      }
    ]
  });

  $('.partners-logos-card.five-slides').slick({
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 0,     // Set autoplay speed to 0 for continuous effect
    speed: 5000,          // Duration of the transition (5 seconds)
    arrows: false,        // Hide arrows
    swipe: false,         // Disable swipe
    slidesToShow: 5,      // Number of slides to show
    cssEase: 'linear',    // Linear animation for continuous effect
    infinite: true,       // Enable infinite looping
    pauseOnFocus: false,  // Do not pause when slider is focused
    pauseOnHover: false,  // Do not pause when hovered over
    responsive: [         // Responsive settings
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,  // Show fewer slides on smaller screens
          speed: 5000       // Keep the same speed for transition
        }
      }
    ]
  });
});