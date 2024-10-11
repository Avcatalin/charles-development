// Swiper Slider Eight Module
const swiperModal = new Swiper(".swiper-modal", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Open Modals
$(document).ready(function() {
  // Body Class
  $('.modal-trigger:not(".scroll-section")').click(function() {
    $('body').addClass('hidden-height');
  });
  $('.modal .close').click(function() {
    $('body').removeClass('hidden-height');
  });
  // Open Modal One
  $('.modal-trigger.one').click(function() {
    $('.modal-one').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });
  // Open Modal Two
  $('.modal-trigger.two').click(function() {
    $('.modal-two').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });
  // Open Modal Three
  $('.modal-trigger.three').click(function() {
    $('.modal-three').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });
  // Open Modal Six
  $('.modal-trigger.six').click(function() {
    $('.modal-six').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });
  // Open Modal Seven
  $('.modal-trigger.seven').click(function() {
    $('.modal-seven').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });
  // Open Modal Eight
  $('.modal-trigger.eight').click(function() {
    $('.modal-eight').removeClass('hidden');
    $('.overlay').removeClass('hidden');
  });

  // Close modals
  $('.close').click(function() {
    $('.modal').addClass('hidden');
    $('.overlay').addClass('hidden');
  });
});

// Add specific form class
document.querySelector('.widget-type-form').classList.add('form-bf-23');
