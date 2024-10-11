            var charlestopfunction = (function(){
  return {
    container: ".charlestop-sticky-notice",
    dismiss: ".dismiss",
    sessionKey: "PONBF34DJD-KLCIPEW",
    init: function(){
      if(this.get()){
        window.$(this.container).show();
      }
      this.timeline = new TimelineMax({paused: true});
      this.initAnimation();
      this.createListeners();
    },
    createListeners: function(){
      window.$(this.container).on('mouseleave', function(){
        this.play();
      }.bind(this));
      window.$(this.container).find(this.dismiss).on('click', function(){
        this.set("closed");
        window.$(this.container).hide();
      }.bind(this));
    },
    play: function(){
      this.timeline.restart();
    },
    set: function(val){
      sessionStorage.setItem(this.sessionKey, val);
    },
    get: function(){
      if(sessionStorage.getItem(this.sessionKey) === null || sessionStorage.getItem(this.sessionKey) == "open") {
        return true;
      }
      return false;
    }
  }
})();
$(function(){
  charlestopfunction.init();
});