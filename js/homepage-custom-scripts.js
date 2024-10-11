document.addEventListener("DOMContentLoaded", function() {

  // Back to Top
  var offset = 700;
  var duration = 500;
  // Hide initial
  $('.backtotop').hide();
  $(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      $('.backtotop').fadeIn(duration);
      $('.mobile.page-header .page-header--burger-menu').fadeIn(duration);
    } else {
      $('.backtotop').fadeOut(duration);
      $('.mobile.page-header .page-header--burger-menu').fadeOut(duration);
    }
  });

  $('.backtotop').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

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

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $(".navigation-primary li.has-submenu").click(function () {
      // If the clicked element has the active class, remove the active class from EVERY .nav-link>.state element
      if ($(this).hasClass("focus")) {
        $(".navigation-primary li.has-submenu").removeClass("focus");
      }
      // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
      else {
        $(".navigation-primary li.has-submenu").removeClass("focus");
        $(this).addClass("focus");
      }
    });
  }

  // Menu navigation mobile toggle 
  $('.page-header--burger-menu').click(function(){
    $('body').toggleClass('menu-open');
    $('.navigation-primary li.has-submenu').removeClass('focus');
    $('.page-header--nav-wrap').toggleClass('menu-open');
  });

  $('.department_group .filter ul li p').click(function() {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var val = $(this).parent().attr('data-label');
    $('.department_group .block').each(function() {
      var value = $(this).attr('data-label');
      if(val == value) {
        $(this).addClass('active');
      }
      else {
        $(this).removeClass('active');
      }
    });
  });

  $('.mega_trigger').parent().parent().addClass('mega_menu');
  if($(".chat_award_nav_dropdown-rbr").length != 0){
    setTimeout(function() {
      $('.chat_award_nav_dropdown').each(function( index ) {
        $(`.navigation-primary .submenu.level-1 > li:nth-child(${$(this).attr("data-index")})`).addClass('mega_menu');
        $(`.navigation-primary .submenu.level-1 > li:nth-child(${$(this).attr("data-index")})`).append($(this));
      });
    }, 1000);     
  }

  $(window).scroll(function() {
    if($(window).scrollTop() > 300) {
      $('#main-page-header').addClass('scrolling');
    }
    else {
      $('#main-page-header').removeClass('scrolling');
    }
  });

  $('.chat_award_nav').click(function(e) {
    if($(window).width() > 767) {
      e.preventDefault();
    }
  });
});