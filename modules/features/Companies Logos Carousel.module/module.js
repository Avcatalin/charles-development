jQuery(document).ready(function(){
  // Clients Carousel
  jQuery('.companies-logos-carousel.ltr').slick({
    autoplay: true,
    autoPlaySpeed: 0,
    speed: 30000,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: -1,
    variableWidth: true
  });

  // Clients Carousel
  jQuery('.companies-logos-carousel.rtl').slick({
    autoplay: true,
    autoPlaySpeed: 0,
    speed: 30000,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  });

});