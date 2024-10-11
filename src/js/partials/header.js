import ScrollEvents from 'scroll-events'
import { addClass, removeClass, addEventListener, hasClass } from 'dom-helpers'

export default function () {
  let $headerWrap = document.getElementById('main-head-wrap')
  let $topBar = document.querySelector('.c-topbar')
  const $header = document.getElementById('main-page-header')

  // handleTopBar()
  // window.addEventListener('resize', handleTopBar);
  // document.addEventListener("DOMContentLoaded", handleTopBar);

  /** Topbar **/
  let lastHeight = null
  let topBarWasVisible = true
  const handleTopBar = () => {
    if (!$headerWrap) {
      $headerWrap = document.getElementById('main-header-wrap')
      if (!$headerWrap) {
        return window.requestAnimationFrame(handleTopBar)
      }
    }

    if (!$topBar) {
      $topBar = document.querySelector('.c-topbar')
      if (!$topBar) {
        removeClass(document.body, 'top-bar-visible')
        return window.requestAnimationFrame(handleTopBar)
      }
    }

    // handle size
    const currentHeight = $topBar.offsetHeight
    if (currentHeight !== lastHeight) {
      // height changes, re calc
      lastHeight = currentHeight
      const $bodyWrapper = document.body.querySelector('main.body-container-wrapper')
      if ($bodyWrapper) {
        $bodyWrapper.style.marginTop = `${(currentHeight * -1)}px`
        document.body.style.marginTop = ''
      } else {
        document.body.style.marginTop = `${(currentHeight * -1)}px`
      }
    }

    // handle scroll pos
    const scrollPos = window.pageYOffset
    const topBarisVisible = scrollPos <= currentHeight
    if (topBarisVisible !== topBarWasVisible) {
      if (topBarisVisible) {
        addClass(document.body, 'top-bar-visible')
      } else {
        removeClass(document.body, 'top-bar-visible')
      }
      topBarWasVisible = topBarisVisible
    }
    window.requestAnimationFrame(handleTopBar)
  }
  window.requestAnimationFrame(handleTopBar)

  /** Header **/
  if (!$header) {
    // header not found
    return
  }

  // hook into scrolling
  const scrollEvents = new ScrollEvents();

  scrollEvents.on('scroll:down', () => {
    //console.log("scroll")
    if (window.scrollY > 0) {
      addClass($header, 'hide-header')
    }
  })

  scrollEvents.on('scroll:up', () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const scrollPos = window.pageYOffset + document.documentElement.clientHeight
    if (scrollPos < scrollHeight) {
      removeClass($header, 'hide-header')
    }
  })

  // mobile menu
  const $mainNav = $header.querySelector('.page-header--nav-wrap')
  if ($mainNav) {
    // bind menu burger
    const $menuToggle = $header.querySelector('.page-header--burger-menu')
    if ($menuToggle) {
      addEventListener($menuToggle, 'click', e => {
        e.preventDefault()
        e.stopPropagation()

        if (hasClass($mainNav, 'menu-open')) {
          removeClass($mainNav, 'menu-open')
          removeClass(document.body, 'menu-open')
        } else {
          addClass($mainNav, 'menu-open')
          addClass(document.body, 'menu-open')
        }
      })
    }

    // bind "outside" click on mobile to close menu when not hitting a menu content element
    addEventListener($mainNav, 'click', e => {
      if (hasClass($mainNav, 'menu-open')) {
        const $target = e.target

        // look for sub menu, dont close menu if it's a lvl 2 outside click
        const $submenu = $mainNav.querySelector('.focus')
        if ($submenu) {
          // close submenu
          removeClass($submenu, 'focus')
          return
        }

        if (!hasClass($target, 'has-submenu')) {
          removeClass($mainNav, 'menu-open')
          removeClass(document.body, 'menu-open')
        }
        /* if (hasClass($target, 'page-header--nav-wrap') || hasClass($target, 'navigation-primary')) {
          removeClass($mainNav, 'menu-open')
          removeClass(document.body, 'menu-open')
        } */
      }
    })
  }
}