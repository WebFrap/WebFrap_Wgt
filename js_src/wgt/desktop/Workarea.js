/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/* 
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

/**
 * 
 */
;(function($D,$S,undefined){
  
  "use strict";
  
  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  $D.fn.workarea = {
      
    show: function( areaId ){
      $S('#wgt_workarea').find('.wgt_workarea').hide();
      $S('#wgt_workarea_'+areaId).fadeIn('fast',function(){});
    },
    
    init: function(){
      $S('.wgt_workarea:first').fadeIn('fast',function(){});
    }
      
  };
    
  // add init event
  window.$B.addInitCall(function(){
    $D.workarea.init();
  });

})( 
  window.$D,
  window.$S
);