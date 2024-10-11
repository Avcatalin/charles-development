$(document).ready(function() {
  $('body').addClass('remove-top-bottom');
});

// Target Elements
let subBase = document.getElementById("curr-sub-base");
let emailBase = document.getElementById("email-sub-base");
let webVisitor = document.getElementById("website-visitors");
let dateRange = document.getElementById("date-range");
let calcSubsResult = document.getElementById('calc-subscribers-results');
let calcAmountResult = document.getElementById('calc-amount-results');

// Call function on input
subBase.addEventListener('input', calculate);
emailBase.addEventListener('input', calculate);
webVisitor.addEventListener('input', calculate);
dateRange.addEventListener('input', calculate);

// Function to handle events
function calculate() {
  // Get values from input fields
  let value1 = parseFloat(subBase.value.replace(/,/g, '')) || 0;
  let value2 = parseFloat(emailBase.value.replace(/,/g, '')) || 0;
  let value3 = parseFloat(webVisitor.value.replace(/,/g, '')) || 0;
  let value4 = parseFloat(dateRange.value.replace(/,/g, '')) || 0;

  let convertedValue;

  if (value4 == 0) {
    convertedValue = 3;
  } else if (value4 == 20) {
    convertedValue = 2.5;
  } else if (value4 == 40) {
    convertedValue = 2;
  } else if (value4 == 60) {
    convertedValue = 1.5;
  } else if (value4 == 80) {
    convertedValue = 1;
  } else if (value4 == 100) {
    convertedValue = 0.5;
  }

  let expectedWaSubs = Number(value1 + (value2 * 0.045) + (value3 * 0.01 * convertedValue));
  let parsedIntFirst = parseInt(expectedWaSubs, 10);
  let finalExpectedSubs = parsedIntFirst.toLocaleString("en-US");
  calcSubsResult.textContent = finalExpectedSubs;

  let expectedNewRevenue = expectedWaSubs * 9;
  let pasedIntSecond = parseInt(expectedNewRevenue, 10);
  let finalExpectedRevenue = pasedIntSecond.toLocaleString("en-US");
  calcAmountResult.textContent = "€" + finalExpectedRevenue;
}