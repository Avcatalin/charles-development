document.addEventListener("DOMContentLoaded", function() { 
  // Add 'mouseleave' event listeners to mega menus
  const mainHeader = document.querySelector('.header-inner-wrapper');

  document.querySelectorAll('.mega-menu').forEach(menu => {
    menu.addEventListener('mouseleave', function() {
      this.classList.remove('active');
      mainHeader.classList.remove('mega-open');
    });
    mainHeader.addEventListener('mouseleave', function() {
      menu.classList.remove('active');
      mainHeader.classList.remove('mega-open');
    });
  });

  // Add 'mouseenter' event listeners to menu items
  document.querySelectorAll('.mega-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Hide any currently displayed mega menus
      hideAllMegaMenus();

      // Show the related mega menu
      const megaMenuId = this.getAttribute('data-target');
      const megaMenu = document.getElementById(megaMenuId);
      megaMenu.classList.add('active');
      mainHeader.classList.add('mega-open');
    });
  });

  function hideAllMegaMenus() {
    document.querySelectorAll('.mega-menu').forEach(menu => {
      menu.classList.remove('active');
      mainHeader.classList.remove('mega-open');
    });
  }
});

// SwiperJs
var swiper = new Swiper(".mobile-nav", {
  spaceBetween: 0,
  hashNavigation: {
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});