$(document).ready(function() {

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

  $('.mega_trigger').parent().parent().addClass('mega_menu');
  if($(".chat_award_nav_dropdown-rbr").length != 0){
    setTimeout(function() {
      $('.chat_award_nav_dropdown').each(function( index ) {
        $(`.navigation-primary .submenu.level-1 > li:nth-child(${$(this).attr("data-index")})`).addClass('mega_menu');
        $(`.navigation-primary .submenu.level-1 > li:nth-child(${$(this).attr("data-index")})`).append($(this));
      });
    }, 1000);     
  }

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

  // Slick Carousel 
  $('.about_hero_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    dots: false,
    infinite: true,
    draggable: false,
    focusOnSelect: false,
    pauseOnFocus: false,
    accessibility: false,
  });

  var getProductHeight = $(".product.active").height();

  $(".products").css({
    height: getProductHeight
  });

  function calcProductHeight() {
    getProductHeight = $(".product.active").height();

    $(".products").css({
      height: getProductHeight
    });
  }

  function animateContentColor() {
    var getProductColor = $(".product.active").attr("product-color");

    $("body").css({
      background: getProductColor
    });

    $(".title").css({
      color: getProductColor
    });

    $(".btn").css({
      color: getProductColor
    });
  }

  var productItem = $(".product"),
      productCurrentItem = productItem.filter(".active");

  $("#next").on("click", function (e) {
    e.preventDefault();

    var nextItem = productCurrentItem.next();

    productCurrentItem.removeClass("active");

    if (nextItem.length) {
      productCurrentItem = nextItem.addClass("active");
    } else {
      productCurrentItem = productItem.first().addClass("active");
    }

    calcProductHeight();
    animateContentColor();
  });

  $("#prev").on("click", function (e) {
    e.preventDefault();

    var prevItem = productCurrentItem.prev();

    productCurrentItem.removeClass("active");

    if (prevItem.length) {
      productCurrentItem = prevItem.addClass("active");
    } else {
      productCurrentItem = productItem.last().addClass("active");
    }

    calcProductHeight();
    animateContentColor();
  });

  // Ripple
  $("[ripple]").on("click", function (e) {
    var rippleDiv = $('<div class="ripple" />'),
        rippleSize = 60,
        rippleOffset = $(this).offset(),
        rippleY = e.pageY - rippleOffset.top,
        rippleX = e.pageX - rippleOffset.left,
        ripple = $(".ripple");

    rippleDiv
      .css({
      top: rippleY - rippleSize / 2,
      left: rippleX - rippleSize / 2,
      background: $(this).attr("ripple-color")
    })
      .appendTo($(this));

    window.setTimeout(function () {
      rippleDiv.remove();
    }, 1900);
  });

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

});

var viewed1 = false;
var viewed2 = false;
var viewed3 = false;
var viewed4 = false;
var viewed5 = false;
var viewed6 = false;

$(function() { 
  if($(window).width() > 990) {
    if($('body').has('.scrollify').length > 0) {
      setTimeout(function() {
        $.scrollify({
          section : ".scrollify",
          interstitialSection: ".about_department_block",
        });
      }, 5000);
    }
  }
});

if($('body').has('.big_number').length > 0) {
  $(window).scroll(testScroll);
}
var viewed = false;

function isScrolledIntoView($elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function testScroll() {
  if (isScrolledIntoView($(".big_number")) && !viewed) {
    viewed = true;
    $('.big_number h2 span').each(function () {
      var flag = 0;
      if(Math.floor($(this).html()) == Math.ceil($(this).html())) {
        flag = 1;
      }
      $(this).prop('Counter',0).animate({
        Counter: $(this).text()
      }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          if(flag == 1) {
            $(this).text(Math.ceil(this.Counter));
          }
          else {
            $(this).text(this.Counter.toFixed(1));
          }
        }
      });
    });
  }
}

if($('body').has('.number_block').length > 0) {
  $(window).scroll(testScroll1);
}

// Select the Cookiebot script tag by its ID
var cookiebotScript = document.getElementById('Cookiebot');

// Add the async attribute
if (cookiebotScript) {
  cookiebotScript.async = true;
}
