/**
 * Wgt Tip, basierend auf dem jquery WgtTip Plugin Version version 1.0.0a
 * 
 * Die Klassen und Funktionsnamen wurden entsprechend der WGT Namenskonvention
 * angepasst um eine bessere Semantic und eine bessere Benutzbarkeit 
 * der Bibliothek zu erreichen.
 * 
 * Siehe doc/motivation_anpassungen.html
 */
// wgtTip, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// releated under the MIT license
(function($) {
    
    function fixTitle($ele) {
        if ($ele.attr('title') || typeof($ele.attr('original-title')) !== 'string') {
            $ele.attr('original-title', $ele.attr('title') || '').removeAttr('title');
        }
        if ($ele.attr('tooltip') || typeof($ele.attr('original-title')) !== 'string') {
          $ele.attr('original-title', $ele.attr('tooltip') || '').removeAttr('tooltip');
        }
    }
    
    function WgtTip(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        fixTitle(this.$element);
    }
    
    WgtTip.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.wgt-tip-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'wgt-tip'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
                var gravity = (typeof this.options.gravity == 'function') ? this.options.gravity.call(this.$element[0])  : this.options.gravity;
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length === 2) {
                    if (gravity.charAt(1) === 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('wgt-tip-' + gravity);
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            fixTitle($e);
            var title, o = this.options;
            if (typeof o.title === 'string') {
                title = $e.attr(o.title === 'title' ? 'original-title' : o.title);
            } else if (typeof o.title === 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="wgt-tip"></div>').html('<div class="wgt-tip-arrow"></div><div class="wgt-tip-inner"/></div>');
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.wgtTip = function(options) {
        
        if (options === true) {
            return this.data('wgtTip');
        } else if (typeof options === 'string') {
            return this.data('wgtTip')[options]();
        }
        
        options = $.extend({}, $.fn.wgtTip.defaults, options);
        
        function get(ele) {
            var wgtTip = $.data(ele, 'wgtTip');
            if (!wgtTip) {
                wgtTip = new WgtTip(ele, $.fn.wgtTip.elementOptions(ele, options));
                $.data(ele, 'wgtTip', wgtTip);
            }
            return wgtTip;
        }
        
        function enter() {
            var wgtTip = get(this);
            wgtTip.hoverState = 'in';
            if (options.delayIn === 0) {
                wgtTip.show();
            } else {
                setTimeout(function() { if (wgtTip.hoverState === 'in') wgtTip.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var wgtTip = get(this);
            wgtTip.hoverState = 'out';
            if (options.delayOut === 0) {
                wgtTip.hide();
            } else {
                setTimeout(function() { if (wgtTip.hoverState === 'out') wgtTip.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger === 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger === 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.wgtTip.defaults = {
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover'
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'wgt-tip-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('wgt-tip-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.wgtTip.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.wgtTip.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.wgtTip.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
})(jQuery);

