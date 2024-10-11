var $cAppointmentButtons = document.querySelectorAll('.c-appointment-button')
for (var i = 0; i < $cAppointmentButtons.length; i++) {
  var $button = $cAppointmentButtons[i]
  $button.addEventListener('click', function(e) {
    e.preventDefault()
    if (ga) {
      ga('send', 'event', 'c-lead', 'appointment-button');
    }
  })
}
