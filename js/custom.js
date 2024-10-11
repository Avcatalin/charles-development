$(document).ready(function() {
  $('.about_faq .content .block h3').click(function() {
    $(this).parent().toggleClass('active');
  });
  
  $('a[data-language="en-gb"]').text('English');
  $('a[data-language="de-de"]').text('German');
  
  if ($('html').attr('lang') == 'en-gb'){
     $('.header__language-switcher--label-current').text('English');
  }
  if (($('html').attr('lang') == 'de-de')){
     $('.header__language-switcher--label-current').text('German');
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

  $(window).scroll(function() {
    if($(window).scrollTop() > 300) {
      $('#main-page-header').addClass('scrolling');
    }
    else {
      $('#main-page-header').removeClass('scrolling');
    }

  });

  $('.body-container-wrapper').click(function() {
    //     $('.chat_award_nav_dropdown').css('display', 'none');
  });
  $('.chat_award_nav').click(function(e) {
    if($(window).width() > 767) {
      e.preventDefault();
      //       $('.chat_award_nav_dropdown').toggle();
    }
  });



  $('.mega_trigger').parent().parent().addClass('mega_menu');
  setTimeout(function() {
    $('.mega_menu').append($('.chat_award_nav_dropdown'));
  }, 1000);
});



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

  $('.about_hero_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    dots: false,
    draggable: false,
    focusOnSelect: false,
    pauseOnFocus: false,
    accessibility: false,
  });
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

var viewed1 = false;
var viewed2 = false;
var viewed3 = false;
var viewed4 = false;
var viewed5 = false;
var viewed6 = false;



function testScroll1() {

  if (isScrolledIntoView($('#repeat1')) && !viewed1) {
    viewed1 = true;
    $('#repeat1 .number_block .item p span').each(function () {
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

  if (isScrolledIntoView($('#repeat2')) && !viewed2) {
    viewed2 = true;
    $('#repeat2 .number_block .item p span').each(function () {
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

  if (isScrolledIntoView($('#repeat3')) && !viewed3) {
    viewed3 = true;
    $('#repeat3 .number_block .item p span').each(function () {
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

  if (isScrolledIntoView($('#repeat4')) && !viewed4) {
    viewed4 = true;
    $('#repeat4 .number_block .item p span').each(function () {
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

  if (isScrolledIntoView($('#repeat5')) && !viewed5) {
    viewed5 = true;
    $('#repeat5 .number_block .item p span').each(function () {
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

  if (isScrolledIntoView($('#repeat6')) && !viewed6) {
    viewed6 = true;
    $('#repeat6 .number_block .item p span').each(function () {
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