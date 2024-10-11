document.addEventListener("DOMContentLoaded", function() { 
  // Target Elements
  let subBase = document.getElementById("curr-sub-base");
  let emailBase = document.getElementById("email-sub-base");
  let webVisitor = document.getElementById("website-visitors");
  let calcSubsResult = document.getElementById('calc-subscribers-results');
  let calcAmountResult = document.getElementById('calc-amount-results');

  // Initial value


  // Call function on input
  subBase.addEventListener('input', calculate);
  emailBase.addEventListener('input', calculate);
  webVisitor.addEventListener('input', calculate);

  // Function to handle events
  function calculate() {
    // Get values from input fields
    let value1 = parseFloat(subBase.value.replace(/,/g, '')) || 0;
    let value2 = parseFloat(emailBase.value.replace(/,/g, '')) || 0;
    let value3 = parseFloat(webVisitor.value.replace(/,/g, '')) || 0;

    let expectedWaSubs = Number(value1 + ((value2 * 0.03) * 2) + ((value3 * 0.01) * 12));
    //   let expectedWaSubs = Number(value1 + (value2 * 0.03) + (value3 * 0.01));
    let parsedIntFirst = parseInt(expectedWaSubs, 10);
    let finalExpectedSubs = parsedIntFirst.toLocaleString("en-US");
    calcSubsResult.textContent = finalExpectedSubs;

    let expectedNewRevenue = (expectedWaSubs * 2) * 17;
    //   let expectedNewRevenue = expectedWaSubs * 9;
    let pasedIntSecond = parseInt(expectedNewRevenue, 10);
    let finalExpectedRevenue = pasedIntSecond.toLocaleString("en-US");
    calcAmountResult.textContent = "€" + finalExpectedRevenue;
  }
});