const swiperSlider = new Swiper('.swiper-slider', {
  slidesPerView: 1,
  spaceBetween: 180,
  centeredSlides: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1280: {
      slidesPerView: 1,
      spaceBetween: 180,
      centeredSlides: true,
    },
    320: {
      slidesPerView: 1.1,
      spaceBetween: 32,
      centeredSlides: false,
    },
  },
});
