import {querySelectorAll, addEventListener, toggleClass, hasClass, removeClass} from 'dom-helpers'
export default function() {
  // Global variables
  const parentMenuItems = querySelectorAll(document, '.navigation-primary li.has-submenu')

  // Adds focus event listener on parent menu items so keyboard users can tab through menu (only mobile)
  Array.prototype.forEach.call(parentMenuItems, $el => {
    addEventListener($el, 'click', e => {
      if (hasClass(document.body, 'menu-open')) {
        e.stopPropagation()
        document.querySelectorAll('.menu-item.has-submenu.focus').forEach($item => {
          removeClass($item, 'focus')
        })
        toggleClass($el, 'focus')
      }
    })
  })
}
