import { addEventListener, removeClass, addClass, toggleClass } from 'dom-helpers'

const getPosition = ($element) => {
  var clientRect = $element.getBoundingClientRect();
  return {
    left: clientRect.left + Math.max(document.scrollingElement.scrollLeft, document.documentElement.scrollLeft),
    top: clientRect.top + Math.max(document.scrollingElement.scrollTop, document.documentElement.scrollTop),
    width: clientRect.width,
    height: clientRect.height,
  };
}


export class TestimonialBus {
  constructor () {
    this.subscriptions = {}
  }

  subscribe (eventType, callback) {
    const id = Symbol('id')
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {}
    this.subscriptions[eventType][id] = callback
    return {
      unsubscribe: () => {
        delete this.subscriptions[eventType][id];
        if (Object.getOwnPropertySymbols(this.subscriptions[eventType]).length === 0) {
          delete this.subscriptions[eventType]
        }
      }
    }
  }

  publish (eventType, arg) {
    if (!this.subscriptions[eventType]) return

    Object.getOwnPropertySymbols(this.subscriptions[eventType])
      .forEach(key => this.subscriptions[eventType][key](arg))
  }
}

const bus = new TestimonialBus()

export class TestimonialSlide {
  constructor($el) {
    this.$el = $el

    this.mute = true
    this.playing = false

    // find video element
    this.$video = this.$el.querySelector('.c-testimonials--video video')
    if (this.$video) {
      // we take over controling the video
      //this.$video.setAttribute('muted', true)
      this.$video.muted = true
      //this.$video.setAttribute('autoplay', false)
      this.$video.autoplay = false
      // this.$video.loop = true
      this.$video.preload = 'none'
      //this.$video.setAttribute('controls', false)
      this.$video.controls = false
      this.$video.volume = 1
      this.$video.pause()

      /* setup custom controls */
      // play control
      this.$playButton = document.createElement('div')
      this.$playButton.className = 'c-testimonials--video--control c-testimonials--video--play paused'
      addEventListener(this.$playButton, 'click', () => this.setPlaying(!this.playing))
      this.$video.parentNode.append(this.$playButton)

      // mute control
      this.$muteButton = document.createElement('div')
      this.$muteButton.className = 'c-testimonials--video--control c-testimonials--video--mute muted'
      addEventListener(this.$muteButton, 'click', () => this.setMuteted(!this.mute))
      this.$video.parentNode.append(this.$muteButton)

      // set up mobile meta control
      const $metaToggle = this.$el.querySelector('.c-testimonials--meta-avatar')
      if ($metaToggle) {
        addEventListener($metaToggle, 'click', e => {
          e.preventDefault()
          toggleClass(this.$el, 'meta--open')
        })
      }
      

      // setup custom tracks
      if (this.$video.textTracks && this.$video.textTracks.length) {
        const tracks = this.$video.textTracks[0]
        tracks.mode = 'hidden' // must occur before cues is retrieved
        this.cues = tracks.cues

        // track container
        const $videoContainer = this.$el.querySelector('.c-testimonials--video-container')
        this.$trackContainer = document.createElement('div')
        this.$trackContainer.className = 'c-testimonials--track-container'
        $videoContainer.append(this.$trackContainer)

        // video events
        addEventListener(this.$video, 'volumechange', () => {
          if (this.$video.volume === 0 || this.$video.muted) {
            this.mute = true
          } else {
            this.mute = false
          }
          this.syncMutedClasses()
        })

        addEventListener(this.$video, 'play', () => {
          this.playing = true
          this.syncPlayClasses()
        })
        addEventListener(this.$video, 'pause', () => {
          this.playing = false
          this.syncPlayClasses()
        })

        addEventListener(this.$video, 'ended', () => {
          this.pauseVideo()
          // goto next slide
          bus.publish('video-ended', this)
          setTimeout(() => {
            this.resetVideo()
          }, 1000)
        })

        // load video and handle tracks
        this.videoLoaded()
        addEventListener(this.$video, 'loadedmetadata', () => this.videoLoaded())
        this.$video.load()
      }
    }
  }

  hide () {
    removeClass(this.$el, 'active-slide')
    if (this.$video) {
      this.$video.pause()
    }
  }

  show () {
    addClass(this.$el, 'active-slide')
    if (this.$video) {
      setTimeout(() => {
        this.$video.play()
      }, 800)
    }
  }

  get thumbnail() {
    if (this.$video && this.$video.poster && this.$video.poster.length) {
      return this.$video.poster
    }
    return null
  }

  setCurrentText(text) {
    if (this.$trackContainer) {
      this.$trackContainer.innerText = text
    }
  }

  showText () {
    if (this.$trackContainer) {
      this.$trackContainer.style.opacity = '1'
    }
  }

  hideText () {
    if (this.$trackContainer) {
      this.$trackContainer.style.opacity = '0'
    }
  }

  muteVideo () {
    this.setMuteted(true)
  }

  unmuteVideo() {
    this.setMuteted(false)
  }

  setMuteted(muted) {
    this.mute = muted
    this.$video.muted = muted

    this.syncMutedClasses()
  }

  syncMutedClasses() {
    if (this.mute) {
      addClass(this.$muteButton, 'muted')
      removeClass(this.$muteButton, 'not-muted')
    } else {
      removeClass(this.$muteButton, 'muted')
      addClass(this.$muteButton, 'not-muted')
    }
  }

  playVideo () {
    this.setPlaying(true)
  }

  pauseVideo() {
    this.setPlaying(false)
  }

  resetVideo() {
    this.$video.currentTime = 0;
    // this.$video.load();
  }

  setPlaying (playing) {
    if (playing) {
      this.$video.play()
    } else {
      this.$video.pause()
    }
  }

  syncPlayClasses () {
    if (this.playing) {
      addClass(this.$playButton, 'playing')
      removeClass(this.$playButton, 'paused')
    } else {
      removeClass(this.$playButton, 'playing')
      addClass(this.$playButton, 'paused')
    }
  }

  // events
  cueEnter (text) {
    this.setCurrentText(text)
    this.showText()
  }

  cueExit () {
    this.hideText()
  }

  videoLoaded () {
    const tracks = this.$video.textTracks[0]
    this.cues = tracks.cues

    for (let i = 0; i < this.cues.length; i++) {
      const cue = this.cues[i]
      cue.onenter = (e) => this.cueEnter(e.srcElement.text)
      cue.onexit = () => this.cueExit()
    }
  }
}

export class Testimonials {

  constructor($el) {
    this.$el = $el
    this.animationRunning = false

    // setup slider 
    this.currentSlide = 0
    this.videoEndedTimeout = null

    this.$thumbnails = []

    /* create slider buttons */
    const $actionWrap = document.createElement('div')
    $actionWrap.className = 'c-testimonials--action-wrap'
    const $actionContainer = document.createElement('div')
    $actionContainer.className = 'c-testimonials--action-container'
    $actionWrap.append($actionContainer)
    this.$el.append($actionWrap)

    //prev button
    this.$prev = document.createElement('div')
    this.$prev.className = 'c-testimonials--arrow c-prev'
    addEventListener(this.$prev, 'click', () => this.prevSlide()) 
    $actionContainer.append(this.$prev)

    //next button
    this.$next = document.createElement('div')
    this.$next.className = 'c-testimonials--arrow c-next'
    addEventListener(this.$next, 'click', () => this.nextSlide()) 
    $actionContainer.append(this.$next)

    // setup slides
    this.slides = []

    const $slides = this.$el.querySelectorAll('.c-testimonials--entry')
    Array.prototype.forEach.call($slides, $slide => {
      this.slides.push(new TestimonialSlide($slide))
    })

    // setup slide thumbnails
    const $thumbnailsContainer = document.createElement('div')
    $thumbnailsContainer.className = 'c-testimonials--thumbnail-wrap'
    $actionContainer.append($thumbnailsContainer)
    this.$thumbnailsHolder = document.createElement('div')
    this.$thumbnailsHolder.className = 'c-testimonials--thumbnails'
    $thumbnailsContainer.append(this.$thumbnailsHolder)
    //actual thumbnails

    let index = 0
    Array.prototype.forEach.call(this.slides, slide => {
      const thumbnail = slide.thumbnail
      const $thumbnail = document.createElement('div')
      $thumbnail.className = 'c-testimonials--thumbnail'
      $thumbnail.style.backgroundImage = `url(${thumbnail})`
      $thumbnail.dataset.index = `${index}`

      this.$thumbnails.push($thumbnail)
      this.$thumbnailsHolder.append($thumbnail)
      index++;
    })


    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.goToSlideIndex = this.goToSlideIndex.bind(this)

    this.goToSlideIndex(0)
    // sync thubnails for the first time
    this.syncThumbnails()
    
    // handle video ended within slides
    bus.subscribe('video-ended', () => {
      this.videoEndedTimeout = setTimeout(() => {
        this.nextSlide()
        this.videoEndedTimeout = null
      }, 40)
      
    })
  }

  prevSlide () {
    if (this.animationRunning) {
      return
    }
    addClass(this.$thumbnailsHolder, 'animation-running-backwards')
    setTimeout(() => {
      this.goToSlideIndex(this.currentSlide - 1)
      this.syncThumbnails()

      setTimeout(() => {
        removeClass(this.$thumbnailsHolder, 'animation-running-backwards')
      }, 50)
    }, 0)
    
  }

  nextSlide() {
    if (this.animationRunning) {
      return
    }
    this.animationRunning = true
    // animate slide thubnails forward
    const $nextThumbnail = this.$thumbnails[0]
    const $currentVideo = this.slides[this.currentSlide] && this.slides[this.currentSlide].$video ? this.slides[this.currentSlide].$video : null
    
    if ($nextThumbnail && $currentVideo) {
      const thumbnailPosition = getPosition($nextThumbnail)
      const videoPosition = getPosition($currentVideo)

      const tanslateX = videoPosition.left - thumbnailPosition.left
      const tanslateY = videoPosition.top - thumbnailPosition.top
      const scaleX = videoPosition.width / thumbnailPosition.width
      const scaleY = videoPosition.height / thumbnailPosition.height

      $nextThumbnail.style.transition = 'transform 500ms ease, opacity 500ms ease'
     
      // apply transformation
      // matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY()
      $nextThumbnail.style.transform = `matrix( ${scaleX}, 0, 0, ${scaleY}, ${tanslateX}, ${tanslateY}`
      addClass($nextThumbnail, 'opacity-1')

      this.goToSlideIndex(this.currentSlide + 1)
      addClass(this.$thumbnailsHolder, 'animation-running')

      // time with slide transition
      setTimeout(() => {
        removeClass(this.$thumbnailsHolder, 'animation-running')
        this.syncThumbnails()

        setTimeout(() => {
          $nextThumbnail.style.transition = 'opacity 400ms ease'
          removeClass($nextThumbnail, 'opacity-1')

          // opacity is done
          setTimeout(() => {
            $nextThumbnail.style.transform = 'none'
          }, 400)
        }, 50) // dom is ready
      }, 800)
      
    } else {
      this.goToSlideIndex(this.currentSlide + 1)
      this.syncThumbnails()
    }
  }

  goToSlideIndex(index) {
    if (this.videoEndedTimeout) {
      clearTimeout(this.videoEndedTimeout)
      this.videoEndedTimeout = null
    }
    if (index >= this.slides.length) {
      index = 0
    }
    if (index < 0) {
      index = this.slides.length - 1
    }

    this.currentSlide = index

    for (let i = 0; i < this.slides.length; i++) {
      if (i !== index) {
        this.slides[i].hide()
      } else {
        this.slides[i].show()
      }
    }

    setTimeout(() => {
      this.animationRunning = false
    }, 800)
    // this.syncThumbnails()
  }


  syncThumbnails() {
    this.$thumbnails.sort(($aThumbnail, $bThumbnail) => {
      return parseInt($aThumbnail.dataset.index) - parseInt($bThumbnail.dataset.index)
    })
    const shift = (this.$thumbnails.length - 1) - this.currentSlide
    
    // this.$thumbnails = [...this.$thumbnails.slice(shift), ...this.$thumbnails.slice(0, shift)]
    this.$thumbnails = rotateArrayToRight(this.$thumbnails, shift)

    // apply order to DOM
    Array.prototype.forEach.call(this.$thumbnails, $aThumbnail => {
      this.$thumbnailsHolder.appendChild($aThumbnail)
    })
  }
}

/**
 * 
 * @param {Object[]} array 
 * @param {*} shift 
 */
export function rotateArrayToRight (array, shift) {
  if (array.length > shift) {
    array.unshift(...array.splice(-shift))
  } else {
    let i = 0
    while (i < shift) {
      array.unshift(array.splice(-1))
    }
  }
  return array
}


export default function () {
  const $testimonialSections = document.querySelectorAll('.c-testimonials')

  Array.prototype.forEach.call($testimonialSections, $testimonials => {
    new Testimonials($testimonials)
  })
}