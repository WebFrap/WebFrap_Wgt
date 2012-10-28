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

;(function(window,undefined){

  "use strict";
  
  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   * @extends js_wgt/jquery.js
   * @extends js_wgt/wgt.js
   */
  function WgtUi( ){

    /**
     * 
     */
    this.fn = WgtUi.prototype;

    /**
     * pool for actions that has to be done on window ready
     */
    this.handlerPool = [];

    /**
     * request the actual running version
     */
    this.addHandler = function( type,key, handler ){
      this.handlerPool.push( [type,key,handler] );
    };
    
    
    /**
     * aktivieren und deaktivieren der lightbox
     * @param boolean activate
     */
    this.resetForm = function( formId ){
      
      // reset also assigned elements
      $S('.asgd-'+formId+',.fparam-'+formId).not('input[type="checkbox"],input[type="radio"]').val('');
      $R.cleanFormParams( formId );
      
      $S('form#'+formId).each(function(){
        this.reset();
      });
      
    };

    
  }//end class WgtUi

  // Expose Wgt to the global object
  window.$UI = new WgtUi;

})(window);