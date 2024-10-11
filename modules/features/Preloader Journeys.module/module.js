$('.slider-wrapper').slick({
  vertical: true,
  verticalSwiping: true,
  centerMode: true,
  centerPadding: '0',
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 500,
  cssEase: 'linear'
});

// Check if preloader is active and add body class
let getPreloader = document.querySelector('.main-preloader-section');

if (getPreloader.classList.contains('loaded')) {
  document.body.classList.add('preloader-active');
  document.querySelector('#hidden-checkbox').checked = false;
}

// Check if checkbox is clicked
$('.switch').on('click', function(){
  $('.main-preloader-section').delay(450).fadeOut(600);
  $('body').delay(1000).removeClass('preloader-active');
});