tinymce.init({
  selector: "#message",
  plugins: "emoticons autoresize",
  toolbar: "emoticons",
  toolbar_location: "top",
  menubar: false,
  statusbar: false
});

tinymce.triggerSave();
function htmlEncode(value) {
  return $('<div/>').text(value)
    .html();
}

$(document).ready(function() {
  $('#generate-url').click(function() {

    // Set initial QR code source
    let initialText = "chart image | charles"; // Replace with your initial text
    let initialQRCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(initialText)}&size=160x160`;
    $('.qr-code').attr('src', initialQRCodeURL);

    $('.generated_content').css('display', 'block');
    $('.before_content').css('display', 'none');
    $('#qr-code').css('display', 'block');
    $('.placeholder_img').css('display', 'none');

    var whatsappurl = '';
    tinymce.triggerSave();
    var message = $('#message').val();
    var phonenumber = $('.iti__selected-dial-code').text() + $('#phone').val();
    phonenumber = phonenumber.replace('+', '');
    if($(message).text() != "") {
      whatsappurl = "https://api.whatsapp.com/send/?phone="+encodeURIComponent(phonenumber)+"&text="+encodeURIComponent($(message).text()).replace(/!/g,"%21");
    } else{
      whatsappurl = "https://api.whatsapp.com/send/?phone="+encodeURIComponent(phonenumber);
    }

    $('#generated-url').val(whatsappurl);

    let qrCodeSize = '360x360';
    let finalURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}&data=${encodeURIComponent(whatsappurl)}`;

    $('.qr-code').attr('src', finalURL);
    $('.download').attr('href', finalURL);

    let svgFinalURL = 
        "https://api.qrserver.com/v1/create-qr-code/?data="+encodeURIComponent(whatsappurl)+"&ecc=L&size=1000x1000&format=svg";

    $('.download-svg').attr('href', svgFinalURL);
  });

  $('.go_back').click(function() {
    $('.generated_content').css('display', 'none');
    $('.before_content').css('display', 'block');
    $('#qr-code').css('display', 'none');
    $('.placeholder_img').css('display', 'block');
  });

  $('.generated_content .link_box span').click(function() {
    var copyText = document.getElementById("generated-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  });

  $('#phone').change(function() {
    if($(this).val() != "") {
      $('#generate-url').prop("disabled", false);
    }
  });

  $(window).click(function() {
    tinymce.triggerSave();
    var message = $('#message').val();
    $('.message').html(message);
  });

  setInterval(function() {
    tinymce.triggerSave();
    var message = $('#message').val();
    $('.message').html(message);
  }, 1000);
});
