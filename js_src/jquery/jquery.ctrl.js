
/*!
 * JSizes - JQuery plugin v0.32
 *
 * Licensed under the revised BSD License.
 * Copyright 2008, Bram Stein
 * All rights reserved.
 */
/*global jQuery*/
(function ($) {

  $.fn.ctrl = function(key, callback, args) {
    var isCtrl = false;
    $(document).keydown(function(e) {
        if(!args) 
          args=[]; // IE barks when args is null
  
        if(e.ctrlKey) 
          isCtrl = true;
        
        if(e.keyCode == key.charCodeAt(0) && isCtrl) {
          callback.apply(this, args);
          e.preventDefault();
          return false;
        }
        
    }).keyup(function(e) {
        if(e.ctrlKey) isCtrl = false;
    });
  };
  
})(jQuery);
