// Departments filter
$(document).ready(function() {
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
});
