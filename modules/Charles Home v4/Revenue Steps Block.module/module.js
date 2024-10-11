document.addEventListener("DOMContentLoaded", function() {
  // Swiper Slider
  var swiper = new Swiper(".revenue-slider", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // Declaring variables
  const points = document.querySelectorAll('.steps-list li');
  const afterWidth = document.querySelector('.steps-list');
  const mainImages = document.querySelectorAll('.inner-step-image img');
  const quotes = document.querySelectorAll('.quote-block .inner-quote');
  const demoButton = document.querySelector('.steps-list li.get-started-cta a');
  const demoButtonLi = document.querySelector('.steps-list li.get-started-cta');
  const fillLine = document.querySelector('.fill-line');

  // Maping classes
  const classNamesMap = {
    attract: { width: 'w15', selector: 'li.attract.active .qr-code-block' },
    segment: { width: 'w30', selector: 'li.segment.active .qr-code-block' },
    engage: { width: 'w50', selector: 'li.engage.active .qr-code-block' },
    automate: { width: 'w70', selector: 'li.automate.active .qr-code-block' },
    trackearn: { width: 'w100', selector: 'li.trackearn.active .qr-code-block' },
  };

  // Manual control for points
  function toggleActiveClass(elements, className, add = true) {
    elements.forEach((element) => {
      if (element.classList.contains(className)) {
        element.classList.toggle('active', add);
      }
    });
  }

  // Handle Click
  function handlePointClick(item) {
    isAutoAnimating = false;

    const className = item.classList[0];
    if (item.classList.contains('active')) return;

    points.forEach((li) => {
      const liClassName = li.classList[0];
      const isActive = li.classList.contains('active');
      li.classList.toggle('active', li === item);
      toggleActiveClass(mainImages, liClassName, li === item);
      toggleActiveClass(quotes, liClassName, li === item);
    });

    if (classNamesMap[className]) {
      afterWidth.className = 'steps-list'; 
      afterWidth.classList.add(classNamesMap[className].width);
    }
  }

  points.forEach((item) => {
    item.addEventListener('click', () => {
      handlePointClick(item);

      const className = item.classList[0];

      // Check for the 'track-earn' class and toggle the 'scaled' class on the demoButton
      if (className === 'trackearn') {
        demoButton.classList.toggle('scaled', item.classList.contains('active'));
      } else {
        demoButton.classList.remove('scaled');
      }
    });
  });

  // Event listener for the demo button
  demoButton.addEventListener('click', (event) => {
    // Prevent the default link behavior
    event.preventDefault();

    // Stop the event from bubbling up to the parent elements
    event.stopPropagation();

    // Redirect to the demo page directly
    window.location.href = demoButton.getAttribute('href');
  });


  // Animation Fill Line
  function animateFillLine() {
    // Define animation parameters
    const targetWidth = fillLine.parentElement.offsetWidth; // Adjust this to match your animation's final width
    const duration = 25000; // Total animation duration in milliseconds
    const frameRate = 60; // Number of animation frames per second
    const increment = (targetWidth / (duration / 1000)) / frameRate;

    let currentWidth = 0;

    function updateFillLine() {
      currentWidth += increment;
      fillLine.style.width = currentWidth + "px";

      // Check if the animation is complete
      if (currentWidth >= targetWidth) {
        clearInterval(animationInterval);
        startReverseAnimation();
      }
    }

    // Start the animation
    animationInterval = setInterval(updateFillLine, 1000 / frameRate);

    // Function to reverse the animation
    function startReverseAnimation() {
      setTimeout(function() {
        const reverseIncrement = currentWidth / (duration / 7000) / frameRate;

        function reverseFillLine() {
          currentWidth -= reverseIncrement;
          fillLine.style.width = currentWidth + "px";

          if (currentWidth <= 75) {
            clearInterval(animationInterval);
            // Add active class after animation
            points[0].classList.add('active');
          }
        }

        animationInterval = setInterval(reverseFillLine, 1000 / frameRate);
      }, 100); // Delay before starting the reverse animation (in milliseconds)
    }
  }

  // Function to add and remove the "active" class based on the width
  let isAutoAnimating = true;

  function updateActiveClass() {
    if (!isAutoAnimating) return;

    let activePoint = null;    
    const progress = Math.round((fillLine.offsetWidth / fillLine.parentElement.offsetWidth) * 100);    

    // Loop through the points and determine the active one
    const activationPercentages = [8, 23, 40, 58, 75, 90];

    points.forEach(function(point, index) {
      if (progress >= activationPercentages[index]) {
        activePoint = point;
        point.classList.add('active');
      } else {
        point.classList.remove('active');
      }
    });

    // Remove the "active" class from all points
    points.forEach(function(point) {
      point.classList.remove('active');
    });

    // Add the "active" class to the determined active point
    if (activePoint) {
      activePoint.classList.add('active');

      // Additionally, activate the corresponding mainImage and quote
      mainImages.forEach((img, idx) => {
        img.classList.toggle('active', activePoint.classList.contains(points[idx].classList[0]));
      });

      quotes.forEach((quote, idx) => {
        quote.classList.toggle('active', activePoint.classList.contains(points[idx].classList[0]));
      });
    }

    // Add the "scaled" class to the demo button when it's active
    if (progress >= 90) {
      demoButton.classList.add('scaled');
      // Add active class to first mainImage and quote
      mainImages[0].classList.add('active');
      quotes[0].classList.add('active');
    } else {
      demoButton.classList.remove('scaled');
    }

    if (progress < 100) {
      requestAnimationFrame(updateActiveClass);
    } else {
      // When the animation is done, remove the "scaled" class from the demoButton
      demoButton.classList.remove('scaled');
    }
  }

  // Start tracking and adding/removing the "active" class
  requestAnimationFrame(updateActiveClass);
  // End of automated animation on page load

  points.forEach(function(point, index) {    
    point.addEventListener('click', function() {
      if (animationInterval) {
        clearInterval(animationInterval);
      }

      // Calculate the new progress based on the clicked point's className
      const className = point.classList[0];
      const newProgress = classNamesMap[className].width;

      point.classList.add('active');
      afterWidth.classList.add(newProgress);

      let currentProgress = 0;      

      if (afterWidth.classList.contains('w15')) {
        currentProgress = 10;
      } else if (afterWidth.classList.contains('w30')) {
        currentProgress = 25;
      } else if (afterWidth.classList.contains('w50')) {
        currentProgress = 45;
      } else if (afterWidth.classList.contains('w70')) {
        currentProgress = 60;
      } else if (afterWidth.classList.contains('w100')) {
        currentProgress = 85;   
      }

      // Add transition to fillLine
      fillLine.style.transition = "width 0.4s ease-in-out";
      // Update the width of the fill-line to match the new progress
      fillLine.style.width = currentProgress + "%";

      // Toggle main images active class      
      mainImages.forEach((image) => {
        image.classList.remove('active');
        if (image.classList.contains(className)) {
          image.classList.add('active');
        }
      });

      // Toggle Quote active class
      quotes.forEach((quote) => {
        quote.classList.remove('active');
        if (quote.classList.contains(className)) {
          quote.classList.add('active');
        }
      });
    });
  });

  // This function will run when the target is reached.
  function onTargetReached() {
    animateFillLine(); // Call your animation function

    // Unregister the event listener so it doesn't run again.
    window.removeEventListener('scroll', onScrollCheck);
  }

  // This function checks if the target has been reached on scroll.
  function onScrollCheck() {
    const target = document.querySelector('.fill-line'); // Replace with your actual element's ID
    const position = target.getBoundingClientRect();

    // Check if the target is in view
    if (position.top < window.innerHeight && position.bottom >= 0) {
      onTargetReached();
    }
  }

  // Register the scroll event listener
  window.addEventListener('scroll', onScrollCheck);


  // Parallax Effect
  const parallaxCoinImage = document.querySelector('.top-right-image');
  const parallaxBallImage = document.querySelector('.bottom-left-image');
  const delayScrollPoint = 350;

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    parallaxCoinImage.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
    const parallaxAmount = (scrollPosition >= delayScrollPoint) ? (scrollPosition - delayScrollPoint) * 0.5 : 0;
    parallaxBallImage.style.transform = `translateY(-${parallaxAmount}px)`;
  });  
});
