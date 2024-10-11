$(document).ready(function() {
  $('.blog_faq .content .block h3').click(function() {
    // Remove 'active' class from all other elements
    $('.blog_faq .content .block').not($(this).parent()).removeClass('active');

    // Toggle 'active' class on the clicked element
    $(this).parent().toggleClass('active');
  });
});