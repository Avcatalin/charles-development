import { addEventListener, removeClass, addClass } from 'dom-helpers'


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

    // setup slider 
    this.currentSlide = 0
    this.videoEndedTimeout = null

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
    /*const $thumbnailContainer = document.createElement('div')
    $thumbnailContainer.className = 'c-testimonials--thumbnail-wrap'
    $actionContainer.append($thumbnailContainer)
    this.$thumbnails = document.createElement('div')
    this.$thumbnails.className = 'c-testimonials--thumbnails'
    $thumbnailContainer.append(this.$thumbnails) */

    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.goToSlideIndex = this.goToSlideIndex.bind(this)

    this.goToSlideIndex(0)

    // handle video ended within slides
    bus.subscribe('video-ended', () => {
      this.videoEndedTimeout = setTimeout(() => {
        this.nextSlide()
        this.videoEndedTimeout = null
      }, 40)
      
    })
  }

  prevSlide () {
    this.goToSlideIndex(this.currentSlide - 1)
  }

  nextSlide() {
    this.goToSlideIndex(this.currentSlide + 1)
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
  }
}


export default function () {
  const $testimonialSections = document.querySelectorAll('.c-testimonials-v1')

  Array.prototype.forEach.call($testimonialSections, $testimonials => {
    new Testimonials($testimonials)
  })
}