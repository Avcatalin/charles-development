$(document).ready(function(){
  $('.clients-promo-carousel').slick({
    centerMode: true,
    slidesToShow: 6,
    centerPadding: '30px',
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 2500,
    dots: false,
    arrows: false,
    draggable: true,
    // Responsive breakpoints if needed
    responsive: [
      {
        breakpoint: 991, // Adjust this value based on your needs
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true, // Optional
        }
      },
      {
        breakpoint: 600, // Adjust this value based on your needs
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Optional
        }
      },
      {
        breakpoint: 480, // Adjust this value based on your needs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Optional
        }
      },
      // You can add more breakpoints here
    ]
  });
});
