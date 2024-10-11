<script>
  document.addEventListener('DOMContentLoaded', function() {
  // Generate a random number
  var randomNum = Math.floor(Math.random() * 1000000);

  // Get the paragraph and style elements
  var heading = document.getElementById('unique-heading');
  var styleElement = document.getElementById('dynamic-style');

  // Create a unique class name
  var uniqueClass = 'custom-heading-' + randomNum;

  // Add the unique class to the paragraph
  heading.classList.add(uniqueClass);

  // Update the style element for mobile font size
  var newStyle = '@media screen and (max-width: 600px) {' +
      '.' + uniqueClass + ' {' +
      'font-size: {{ module.mobile_font_size_option }};' +
  '}' +
    '}';
  styleElement.textContent = newStyle;
});
</script>
