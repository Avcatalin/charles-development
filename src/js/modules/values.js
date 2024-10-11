import Rellax from 'rellax'

export default function() {
  const $instances = document.querySelectorAll('.c-value-section')

  if ($instances) {
    Array.prototype.forEach.call($instances, $instance => {
      const $values = $instance.querySelectorAll('.c-value-section--value')

      Array.prototype.forEach.call($values, $value => {
        new Rellax($value, {
          breakpoints: [576, 768, 900]
          // center: true
        })
      })
    })
  }
}