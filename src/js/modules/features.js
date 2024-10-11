import { addEventListener } from 'dom-helpers'

export default function() {
  const $scrollToFeatures = document.querySelectorAll('.c-features .c-features--scroll-hint ')
  const $featuresAchor = document.querySelector('.c-features .features-achor ')
  if ($featuresAchor) {
    Array.prototype.forEach.call($scrollToFeatures, $scrollDown => {
      addEventListener($scrollDown, 'click', e => {
        e.preventDefault()

        $featuresAchor.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  }
  
  // let $featureIcons = document.querySelectorAll('.c-features .c-features--feature--icon ')

  /* console.log('icons', $featureIcons)

  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    let observer = new IntersectionObserver(entries => {
      console.log('abserver called', entries)
    });

    $featureIcons.forEach($icon => observer.observe($icon))
  } */
}