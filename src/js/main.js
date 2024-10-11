import smoothscroll from 'smoothscroll-polyfill';
import { addEventListener } from 'dom-helpers'

import header from './partials/header'
import chatWidget from './chat-widget'
import demoBubble from './demo-bubble'

import menuSection from './modules/menu-section'
import featuresModule from './modules/features'
import homeMenu from './modules/home-menu'
import hero from './modules/hero'
import values from './modules/values'
import integrations from './modules/integrations'
import testimonials from './modules/testimonials'
import testimonialsv1 from './modules/testimonials-v1'

// kick off the polyfill!
smoothscroll.polyfill()

// expose home menu to window so it cam be used in the tempalte
window._chls = {
  homeMenu
}

const documentReady = () => {
  // Handler when the DOM is fully loaded
  header()

  chatWidget()
  demoBubble()

  // init modules
  menuSection()
  featuresModule()
  hero()
  values()
  integrations()
  testimonials()
  testimonialsv1()

  // catch chat bubble open anchors
  const $bubbleTrigger = document.querySelectorAll('a[href^=\'#hs-chat-open\']')
  Array.prototype.forEach.call($bubbleTrigger, $trigger => {
    addEventListener($trigger, 'click', e => {
      e.preventDefault()
      window.HubSpotConversations.widget.open();
    })
  })
}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  documentReady();
} else {
  document.addEventListener("DOMContentLoaded", documentReady);
}