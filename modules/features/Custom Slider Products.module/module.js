jQuery(document).ready(function(){

  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    effect: 'fade',
  });

  var swiper2 = new Swiper(".mySwiper2",{
    speed: 800,
    effect: "coverflow",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.25,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: swiper,
    },
  });

});