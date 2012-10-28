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

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  function WgtStorage( ){
    
    /**
     * reference to prototype
     */
    this.fn = WgtStorage.prototype;

    /**
     * 
     */
    this.con = null;
    
    this.get = function( query )
    {
      return null;
    };
    
    this.set = function( query )
    {
      return null;
    };

    this.select = function( query )
    {
      return null;
    };
    
    this.update = function( query )
    {
      return null;
    };
    
    this.insert = function( query )
    {
      return null;
    };

    
    this.remove = function( query )
    {
      return null;
    };
    
  }//end class WgtStorage

  // Expose Wgt to the global object
  window.$DB = new WgtStorage;

})(window);