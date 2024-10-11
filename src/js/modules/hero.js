import { addEventListener } from 'dom-helpers'
import { throttle } from 'throttle-debounce';

let $heroAnimations 
const resize = () => {
  Array.prototype.forEach.call($heroAnimations, $animation => {
    $animation.resize()
  })
}

export default function() {
  $heroAnimations = document.querySelectorAll('.c-hero-section--animation .c-animation--player')
  addEventListener(window, 'resize', throttle(150, resize))
}