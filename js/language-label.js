$(document).ready(function() {
  // Change language dropdown label based on URL
  $('a[data-language="en-gb"]').text('English');
  $('a[data-language="de-de"]').text('Deutsch');
  $('a[data-language="it-it"]').text('Italiano');

  // Change language label based on URL
  if ($('html').attr('lang') == 'en-gb'){
    $('.header__language-switcher--label-current').text('English');
  }
  if (($('html').attr('lang') == 'de-de')){
    $('.header__language-switcher--label-current').text('Deutsch');
  }
  if (($('html').attr('lang') == 'it-it')){
    $('.header__language-switcher--label-current').text('Italiano');
  }
});