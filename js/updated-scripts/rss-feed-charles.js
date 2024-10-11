// Use the .on method to bind an event to the parent element
$(document).on('DOMNodeInserted', function(e) {
  var $element = $(e.target);
  if ($element.hasClass('hs-rss-item')) {
    $element.addClass('swiper-slide article-block');
  }
});

// Append Swiper navigation
$(document).ready(function(){
  // Select the group to append to
  const rssParent = $('.rss-feed-charles');
  // Create a new HTML element
  const navElement = $('<div class="swiper-nav-arrows"><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div>');
  // Append the new element to the group
  rssParent.append(navElement);
});

document.addEventListener('DOMContentLoaded', function() {

  // RSS Custom Javascript
  const rssFeed = document.querySelector('#hs_cos_wrapper_widget_1699955106595 .hs-rss-module');
  const rssWrapper = document.createElement('div');
  const swiperWrapper = document.createElement('div');

  // Add extra classes
  if (rssFeed) {
    rssFeed.classList.add('swiper-wrapper');

    rssWrapper.className = 'blog-posts-block';
    swiperWrapper.className = 'rss-feed-charles';

    rssFeed.parentNode.insertBefore(rssWrapper, rssFeed);
    swiperWrapper.appendChild(rssFeed);

    rssWrapper.appendChild(swiperWrapper);
  }  

  // Custom RSS Swiper Slider
  var blogArticles = new Swiper(".rss-feed-charles", {
    slidesPerView: 1.25,
    spaceBetween: 15,
    loop: false,
    centeredSlides: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
        loop: false,
        centeredSlides: false,
      },
    },
  });

  // Homepage 2023 Swiper Adjustments
  function adjustSwiperAlignment() {
    // Get the heading element by its class
    var heading = document.querySelector('.heading-text');

    // Get the offsetWidth of the heading
    var headingWidth = heading.offsetWidth;

    // Get the width of the viewport
    var viewportWidth = window.innerWidth;

    // Calculate the difference which will be used as side padding for the swiper container
    var sidePadding = (viewportWidth - headingWidth) / 2;
    var newSidePadding = sidePadding;
    newSidePadding = Math.max(newSidePadding, 0);

    // Set the padding on the swiper container to match the heading's width
    var swiperContainer = document.querySelector('.rss-feed-charles .swiper-wrapper');

    if (swiperContainer) {
      swiperContainer.style.paddingLeft = `${newSidePadding}px`;
    }

    // Reinitialize the Swiper here if needed or update its size
    if (typeof blogArticles !== 'undefined' && blogArticles.update) {
      blogArticles.update();
    }
  }

  // Call this function to adjust the slider on load
  adjustSwiperAlignment();

  // Add event listener to call this function on resize
  window.addEventListener('resize', adjustSwiperAlignment);
});