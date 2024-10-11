  // $(document).ready(function(){  
  //   $(window).scroll(function(){
  //     if($(window).scrollTop()>450)$('.fixed-events-block').addClass('hide-events');
  //     if($(window).scrollTop()<451)$('.fixed-events-block').removeClass('hide-events');
  //   });
  // });

  document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var fixedEventsBlock = document.querySelectorAll('.fixed-events-block');

      fixedEventsBlock.forEach(function(block) {
        if(scrollTop > 450) {
          block.classList.add('hide-events');
        }
        if(scrollTop < 451) {
          block.classList.remove('hide-events');
        }
      });
    });
  });