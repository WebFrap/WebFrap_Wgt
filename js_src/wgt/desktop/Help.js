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
    $D.fn.help = function( key ){
      $S('#'+key).dialog({ 
        modal: true,
        resizable: false,
        close: function(event, ui) {  
          $S(this).dialog("destroy");
        }
      });
    };

})(
    window.$D,
    window.$S
);