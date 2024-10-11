document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-quotes', {
    // ... other parameters
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false, // Disable loop to prevent duplicating single slide

    // Define navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      init: function () {
        if (this.slides.length <= 1) {
          this.navigation.nextEl?.classList.add('swiper-button-disabled');
          this.navigation.prevEl?.classList.add('swiper-button-disabled');
        }
      },
      update: function () {
        if (this.slides.length <= 1) {
          this.navigation.nextEl?.classList.add('swiper-button-disabled');
          this.navigation.prevEl?.classList.add('swiper-button-disabled');
        } else {
          this.navigation.nextEl?.classList.remove('swiper-button-disabled');
          this.navigation.prevEl?.classList.remove('swiper-button-disabled');
        }
      }
    }
  });
});

