// will only be run on the home page
import { addEventListener, removeClass } from 'dom-helpers'

export default function() {
  // handle menu links (catch anchors)
  // catch links and handle anchors
  const $menuLinks = document.querySelectorAll('.navigation-primary .menu-link')
  Array.prototype.forEach.call($menuLinks, $menuItem => {
    addEventListener($menuItem, 'click', e => {
      const url = $menuItem.href
      if (url && url.length && url.indexOf("#") != -1) {
        const hash = url.substring(url.indexOf("#") + 1);

        if (hash && hash.length) {
          // exculde jobs (hotfix) TODO find better solution nto handle arcjor links that are not for the landingpage
          if (hash === 'jobs') {
            return
          } 
          e.stopPropagation()
          e.preventDefault()

          // close menu
          const $mainNav = document.querySelector('.page-header--nav-wrap')
          if ($mainNav) {
            removeClass($mainNav, 'menu-open')
            removeClass(document.body, 'menu-open')
          }

          // scroll into view
          const $target = document.getElementById(hash)
          if ($target) {
            $target.scrollIntoView({
              behavior: 'smooth'
            })
          }
        }
      }
    })
  })
}
