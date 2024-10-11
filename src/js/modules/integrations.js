import Glide from '@glidejs/glide'

class Integrations {
  constructor($el) {
    this.$el = $el
    if (this.$el) {
      this.init()
    }
  }

  init() {
    this.$sliderWrap = this.$el.querySelector('.c-integrations--wrap')
    if (this.$sliderWrap) {

      const sliderOptions = {
        type: 'carousel',
        center: true,
        startAt: 1,
        perView: 5,
        autoplay: 2500,
        animationDuration: 800,
        hoverpause: true,
        breakpoints: {
          1024: {
            startAt: 1,
            perView: 4,
            focusAt: 'center'
          },
          900: {
            startAt: 1,
            perView: 4,
            focusAt: 'center'
          },
          610: {
            perView: 2,
            focusAt: 'center'
          }
        }
      }

      this.slider = new Glide(this.$el, sliderOptions).mount()

      /* this.slider = tns({
        container: this.$sliderWrap,
        items: 2,
        slideBy: 1,
        autoplay: false,
        controls: false,
        speed: 500,
        mouseDrag: true,
        preventActionWhenRunning: true,
        autoplayTimeout: 2000,
        navPosition: 'bottom',
        autoplayButton: false,
        autoplayResetOnVisibility: true,
        autoplayHoverPause: true,
        center: true,
        responsive: {
          768: {
            items: 2,
            autoplay: true,
          },
          1024: {
            items: 4
          }
        }
      }) */
    }
  }
}

export default function() {
  const $instances = document.querySelectorAll('.c-integrations-section')
  Array.prototype.forEach.call($instances, $instance => new Integrations($instance))
}