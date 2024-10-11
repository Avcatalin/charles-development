$(document).ready(function() {
  $('.about_faq .content .block h3').click(function() {
    // Remove 'active' class from all other elements
    $('.about_faq .content .block').not($(this).parent()).removeClass('active');
    // Toggle 'active' class on the clicked element
    $(this).parent().toggleClass('active');
  });
});