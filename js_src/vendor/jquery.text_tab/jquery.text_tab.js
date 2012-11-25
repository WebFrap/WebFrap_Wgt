/*
 * Based on
 * http://stackoverflow.com/questions/4379535/tab-within-a-text-area-without-changing-focus-jquery
 */

(function($) {
  
  function pasteIntoInput(el, text) {
    el.focus();
    if (typeof el.selectionStart == "number") {
      var val = el.value;
      var selStart = el.selectionStart;
      el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
      el.selectionEnd = el.selectionStart = selStart + text.length;
    } else if (typeof document.selection != "undefined") {
      var textRange = document.selection.createRange();
      textRange.text = text;
      textRange.collapse(false);
      textRange.select();
    }
  }

  function tabText(el) {
    $(el).keydown(function(e) {
      if (e.which == 9) {
        pasteIntoInput(this, "\t");
        return false;
      }
    });

    // For Opera, which only allows suppression of keypress events, not keydown
    $(el).keypress(function(e) {
      if (e.which == 9) {
        return false;
      }
    });
  }

  $.fn.tabText = function() {
    if (this.jquery) {
      this.each(function() {
        if (this.nodeType == 1) {
          var nodeName = this.nodeName.toLowerCase();
          if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
            tabText(this);
          }
        }
      })
    }
    return this;
  }
})(jQuery);
