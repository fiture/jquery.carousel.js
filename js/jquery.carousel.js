;(function ($) {
  var defaults = {
    visibleItemCount: 3,
    duration: 600,
    autoStart: false,
    intervaltime: 5000
  };

  function Carousel($el, options) {
    this.$el = $el;
    this.$prevBtn = $el.find('.prev');
    this.$nextBtn = $el.find('.next');
    this.$inner = $el.find('.carousel-inner')
    this.items = this.$inner.children();
    this.currentPage = 1;
    this.isPause = false;
    this.opts = options;

    return this.init();
  }

  Carousel.prototype.init = function() {
    var itemSize = $(this.items[0]).outerWidth(true);
    var margin = itemSize - $(this.items[0]).outerWidth();
    var fullSize = itemSize * this.items.length;
    this.visibleSize = itemSize * this.opts.visibleItemCount;
    this.pages = Math.ceil(this.items.length / this.opts.visibleItemCount);

    this.$el.width(this.visibleSize - margin);
    this.$inner.width(fullSize);

    this.setEvents();

    if (this.opts.autoStart && this.opts.intervaltime) {
      this.setTimer();
    };
    //console.log('Total Page: ', this.pages, 'Margin: ', margin);
  };


  Carousel.prototype.setTimer = function() {
    if (this.isPause) { return; };
    var me = this;
    this.timer = setTimeout(function(){
      me.move('next');
    }, this.opts.intervaltime);
  }

  Carousel.prototype.setEvents = function() {
    var me = this;

    if (this.$nextBtn.length && this.$prevBtn.length) {
      this.$nextBtn.click(function (e) {
        me.move('next');
      });
      this.$prevBtn.click(function (e) {
        me.move();
      });
    }

    if (this.opts.autoStart && this.opts.intervaltime) {
      this.$el.hover(function(){
        me.stop();
      }, function(){
        me.start();
      }); 
    };
  }

  Carousel.prototype.stop = function() {
    //console.log('Now stop');
    this.isPause = true;
    clearTimeout(this.timer);
  }

  Carousel.prototype.start = function() {
    //console.log('Now start');
    this.isPause = false;
    this.setTimer(); 
  }

  Carousel.prototype.move = function(next) {
    var cssObject = {};
    var me = this;

    if ( next && this.currentPage < this.pages) {
      cssObject['marginLeft'] = -this.currentPage * this.visibleSize
      this.currentPage++
    } else if ( !next && this.currentPage > 1) {
      cssObject['marginLeft'] = -( this.currentPage -2) * this.visibleSize
      this.currentPage--
    } else {
      this.currentPage = next ? 1 : this.pages;
      cssObject['marginLeft'] = next ? 0 : -(this.pages -1) * this.visibleSize;
    };
    this.$inner.animate(cssObject, {
      duration: this.opts.duration || 0,
      complete: function() {
        if (me.opts.autoStart && me.opts.intervaltime) {
          if ( me.timer ) { clearTimeout(me.timer) }
          me.setTimer();
        };
      }
    });
  }

  $.fn.carousel = function(options){
    var opts = $.extend({}, defaults, options);
    this.each(function(){ new Carousel($(this), opts); });

    return this;
  };
})(jQuery)
