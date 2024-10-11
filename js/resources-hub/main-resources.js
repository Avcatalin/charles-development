document.addEventListener("DOMContentLoaded", function() {
  
  let colors = ['b-black', 'b-purple', 'b-yellow', 'b-green']; // Define your classes for different colors
  let tags = document.querySelectorAll('.dynamic-color'); // Select all tags
  let lastUsedIndex = -1; // Track the last used index

  tags.forEach(function(tag) {
    let randomIndex;

    // Keep generating a random index until it's different from the last used one
    do {
      randomIndex = Math.floor(Math.random() * colors.length);
    } while (randomIndex === lastUsedIndex);

    let randomClass = colors[randomIndex]; // Pick a random class
    tag.classList.add(randomClass); // Add the random class to the tag
    lastUsedIndex = randomIndex; // Update the last used index
  });

  if (navigator.platform.indexOf('Mac') !== -1) {
    document.body.classList.add('macos');
  }

  const titleContainer = document.querySelector('.title-container');
  const dynamicTitle = titleContainer.querySelector('.dynamic-title'); // Directly select the dynamic-title span within the title-container
  const triggerButtons = document.querySelectorAll('.nav-link-wrapper');

  triggerButtons.forEach(triggerButton => {
    triggerButton.addEventListener('click', function() {
      if (this.classList.contains('home-trigger')) {
        this.classList.remove('active');
        window.location.reload();
        return;
      }

      triggerButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Clear the existing contents of the dynamic-title span
      dynamicTitle.innerHTML = '';

      // Append the title text to the dynamic-title span
      const buttonLabel = this.querySelector('span').textContent || this.querySelector('span').innerText; // Adjust based on where the text is
      const textNode = document.createTextNode(buttonLabel);
      dynamicTitle.appendChild(textNode);

      // Append icons if they exist
      const icons = this.querySelectorAll('img'); // Assuming icons are <img> tags
      icons.forEach(icon => {
        const clonedIcon = icon.cloneNode(true);
        dynamicTitle.appendChild(clonedIcon); // Append cloned icons directly into the dynamic-title span
      });

      // Optionally add 'active' class to titleContainer for styling, if needed
      titleContainer.classList.add('active');
    });
  });

  // Function to toggle the class on scroll
  function toggleClassOnScroll() {
    // Get divs by their specific classes
    var div1 = document.querySelector('.title-container');
    var div2 = document.querySelector('.search-filter-container');
    var div3 = document.querySelector('.mobile-top-navigation');
    
    // Check the current scroll position
    if (window.scrollY > 1) {
      // If scrolled down 1px or more, add the class
      div1.classList.add('scrolling');
      div2.classList.add('scrolling');
      div3.classList.add('scrolling');
    } else {
      // If scrolled back to the top, remove the class
      div1.classList.remove('scrolling');
      div2.classList.remove('scrolling');
      div3.classList.remove('scrolling');
    }
  }

  // Add the scroll event listener to the window
  window.addEventListener('scroll', toggleClassOnScroll);

});

$(document).ready(function() {
  $('.mobile-top-navigation .menu-trigger').click(function() {
    $('.resources-sidebar').toggleClass('in-view');
    $('.main-body-resource-hub').toggleClass('hide-view');
  });
  
  if (window.matchMedia("(max-width: 768px)").matches) {
    $('.navigation-item').click(function() {
      $('.resources-sidebar').toggleClass('in-view');
      $('.main-body-resource-hub').toggleClass('hide-view');
    });
  }
  
  // Change language dropdown label based on URL
  $('a[data-language="en-gb"]').text('English');
  $('a[data-language="de-de"]').text('Deutsch');
  $('a[data-language="it-it"]').text('Italiano');

  // Change language label based on URL
  if ($('html').attr('lang') == 'en-gb'){
    $('.header__language-switcher--label-current').text('English');
  }
  if (($('html').attr('lang') == 'de-de')){
    $('.header__language-switcher--label-current').text('Deutsch');
  }
  if (($('html').attr('lang') == 'it-it')){
    $('.header__language-switcher--label-current').text('Italiano');
  }
});


