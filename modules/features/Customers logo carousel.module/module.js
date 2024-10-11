// Slick Slider
$(document).ready(function() {
  $('.partners-carousel').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 4,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 480,
        speed: 5000,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});