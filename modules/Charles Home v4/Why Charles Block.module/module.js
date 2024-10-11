// Slick Slider
$(document).ready(function() {
  $('.partners-logos').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 4,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 480,
        speed: 5000,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});

// Swiper and Podcast JS
document.addEventListener("DOMContentLoaded", function() {
  // Podcast Play
  const audio = document.getElementById('audio');
  const playPauseButton = document.getElementById('play-pause');
  const seekBar = document.getElementById('progress');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');

  playPauseButton.addEventListener('click', togglePlay);
  audio.addEventListener('timeupdate', updateSeekBar);

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      playPauseButton.innerHTML = '<img src="https://www.hello-charles.com/hubfs/Imported%20images/pause-button.svg">';
    } else {
      audio.pause();
      playPauseButton.innerHTML = '<img src="https://www.hello-charles.com/hubfs/Imported%20images/button-podcast.svg">';
    }
  }

  function updateSeekBar() {
    const currentTimeValue = formatTime(audio.currentTime);
    const durationValue = formatTime(audio.duration);

    currentTime.textContent = currentTimeValue;
    duration.textContent = durationValue;

    let percentage = (audio.currentTime / audio.duration) * 100;
    progress.value = percentage;

    // Update the CSS variable
    progress.style.setProperty('--val', percentage);
  }


  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${(secs < 10 ? '0' : '')}${secs}`;
  }

  progress.addEventListener('input', function () {
    const newTime = (seekBar.value * audio.duration) / 100;
    audio.currentTime = newTime;
  });
});