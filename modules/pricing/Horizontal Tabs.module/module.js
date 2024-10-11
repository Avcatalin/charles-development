$(document).ready(function() {    
  $('#tabs li a:not(:first)').addClass('inactive');
  $('.tab-content').hide();
  $('.tab-content:first').show();

  $('#tabs li a').click(function(){
    var t = $(this).attr('id');
    if($(this).hasClass('inactive')){ //this is the start of our condition 
      $('#tabs li a').addClass('inactive');           
      $(this).removeClass('inactive');

      $('.tab-content').hide();
      $('#'+ t + 'C').fadeIn('slow');
    }
  });

  const checkOptionSecond = document.getElementById('check2');
  const checkOptionThird = document.getElementById('check3');
  
  // Checked second option
  $(checkOptionSecond).click(function(){
    $(checkOptionSecond).toggleClass('checked-mark');

    // Hide/Show Prices
    if(checkOptionSecond.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').addClass('active');
      $('.price-value .campaigns').removeClass('active');
    } else if(checkOptionThird.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else if(checkOptionThird.classList.contains('checked-mark') && checkOptionSecond.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else if(checkOptionThird.classList.contains('checked-mark') && !checkOptionSecond.classList.contains('checked-mark')) { 
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else if(!checkOptionThird.classList.contains('checked-mark') && checkOptionSecond.classList.contains('checked-mark')) { 
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').addClass('active');
      $('.price-value .campaigns').removeClass('active');
    } else {
      $('.price-value .standard').addClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').removeClass('active');
    }
  });
  
  // Checked third option
  $(checkOptionThird).click(function(){
    $(checkOptionThird).toggleClass('checked-mark');

    // Hide/Show Prices
    if(checkOptionThird.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else if(checkOptionSecond.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').addClass('active');
      $('.price-value .campaigns').removeClass('active');
    } else if(checkOptionSecond.classList.contains('checked-mark') && checkOptionThird.classList.contains('checked-mark')) {
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else if(checkOptionSecond.classList.contains('checked-mark') && !checkOptionThird.classList.contains('checked-mark')) { 
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').addClass('active');
      $('.price-value .campaigns').removeClass('active');
    } else if(!checkOptionSecond.classList.contains('checked-mark') && checkOptionThird.classList.contains('checked-mark')) { 
      $('.price-value .standard').removeClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').addClass('active');
    } else {
      $('.price-value .standard').addClass('active');    
      $('.price-value .sell-products').removeClass('active');
      $('.price-value .campaigns').removeClass('active');
    }
  });  
});