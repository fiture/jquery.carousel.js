;(function ($) {
  var defaults = {
    visibleItemCount: 2
  };

  function Carousel($el, options) {
    this.$el = $el;
    this.$prevBtn = $el.find('.prev');
    this.$nextBtn = $el.find('.next');
    this.$inner = $el.find('.carousel-inner')
    this.items = this.$inner.children();
    this.currentPage = 1;
    this.opts = options;

    return this.init();
  }

  Carousel.prototype.init = function() {
    var itemSize = $(this.items[0]).outerWidth(true);
    var margin = itemSize - $(this.items[0]).width();
    var fullSize = itemSize * this.items.length;
    this.visibleSize = itemSize * this.opts.visibleItemCount;
    this.pages = Math.ceil(this.items.length / this.opts.visibleItemCount);

    this.$el.width(this.visibleSize - margin);
    this.$inner.width(fullSize);

    this.setEvents();
    console.log('Total Page: ', this.pages, 'Margin: ', margin);
  };

  Carousel.prototype.setEvents = function() {
    var me = this;
    this.$nextBtn.click(function (e) {
      me.move('next');
    });
    this.$prevBtn.click(function (e) {
      me.move();
    });
  }

  Carousel.prototype.move = function(next) {
    var cssObject = {};

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
    this.$inner.animate(cssObject, {});
  }

  $.fn.carousel = function(options){
    var opts = $.extend({}, defaults, options);
    this.each(function(){ new Carousel($(this), opts); });

    return this;
  };
})(jQuery)


$('.carousel').carousel();