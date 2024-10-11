$(document).ready(function(){
  $('.pricing-table-compare').on('click', function(){
    $(this).hide();
    $('.pricing-table-content').slideDown(800);
  });

  $('.close-table-toggle').on('click', function() {
    $('.pricing-table-content').slideUp(800);
    $('.pricing-table-compare').show();
  });

  // Toggle Tooltips
  $('#chat-ins').on('click', function(e){
    $('.chat-ins').toggle();
    $('.commerce').hide();
    $('.journeys').hide();
    $('.conversations').hide();
    $('.campaigns').hide();
    $('.integrations').hide();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#campaigns').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').hide();
    $('.journeys').hide();
    $('.conversations').hide();
    $('.campaigns').toggle();
    $('.integrations').hide();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#conversations').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').hide();
    $('.journeys').hide();
    $('.conversations').toggle();
    $('.campaigns').hide();
    $('.integrations').hide();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#journeys').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').hide();
    $('.journeys').toggle();
    $('.conversations').hide();
    $('.campaigns').hide();
    $('.integrations').hide();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#commerce').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').toggle();
    $('.journeys').hide();
    $('.conversations').hide();
    $('.campaigns').hide();
    $('.integrations').hide();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#integrations').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').hide();
    $('.journeys').hide();
    $('.conversations').hide();
    $('.campaigns').hide();
    $('.integrations').toggle();
    $('.advanced').hide();
    e.stopPropagation();
  });

  $('#advanced').on('click', function(e){
    $('.chat-ins').hide();
    $('.commerce').hide();
    $('.journeys').hide();
    $('.conversations').hide();
    $('.campaigns').hide();
    $('.advanced').toggle();
    $('.integrations').hide();
    e.stopPropagation();
  });

  $(".close-table-toggle").click(function() {
    $('html, body').animate({
      scrollTop: $("#main-listing-packages").offset().top - 300
    }, 'slow');
  });

  $(".table-toggle").click(function() {
    $('html, body').animate({
      scrollTop: $("#table-benefits-list").offset().top + 1200
    }, 'slow');
  });

  $(document).click(function(e) {
    if (!$(e.target).is('.tooltip-box, .tooltip-box *')) {
      $(".tooltip-box").hide();
    }
  });
});

// Hide second price
$('.price-value').hide();
$('.payment-period').hide();

// Toggle Price Box
const alertStatus = (e) => {
  if ($(".switch input").is(":not(:checked)")) {
    console.log('checked');
    $('.price-value').show();
    $('.second-price').hide();
    $('.payment-period').show();
    $('.second-payment-period').hide();
  } else {
    console.log('unchecked');
    $('.price-value').hide();
    $('.second-price').show();
    $('.payment-period').hide();
    $('.second-payment-period').show();
  }
};

// Attaching the click event on the button
$(document).on("click", ".switch", alertStatus);

if (window.matchMedia("(max-width: 768px)").matches) {
  // Slider Packages
  $('.row-pricing').slick({
    infinite: false,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: '30px',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 1.2
        }
      }      
    ]
  });
}