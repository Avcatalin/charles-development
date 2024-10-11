document.addEventListener("DOMContentLoaded", function() {

  // Swiper Slider Mobile
  var swiper = new Swiper(".key-feature-slider", {
    slidesPerView: 1.1,
    spaceBetween: 15
  });

  // Active class toggle
  const items = document.querySelectorAll('.carousel-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      // Remove the 'active' class from all items
      items.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      // Add the 'active' class to the clicked item
      item.classList.add('active');
    });
  });

  // Get all items from section one
  const section1Items = document.querySelectorAll('.carousel-item');
  // Get all items from section two
  const section2Items = document.querySelectorAll('.feature-content-item');
  // Get all items from section three
  const section3Items = document.querySelectorAll('.top-section-image img');

  // Add click event listeners to section one items
  section1Items.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Remove the 'active' class from all section two items
      section2Items.forEach((item) => {
        item.classList.remove('active');
      });
      section3Items.forEach((item) => {
        item.classList.remove('active');
      });

      // Add the 'active' class to the corresponding section two item
      section2Items[index].classList.add('active');
      section3Items[index].classList.add('active');
    });
  });
});