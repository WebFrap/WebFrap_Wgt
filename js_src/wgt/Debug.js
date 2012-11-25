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

(function( window, $S, undefined ){
  
  "use strict";

  /**
   * 
   */
  function WgtDebug( ){	
    
    /**
     * @param
     * @param
     */
    this.appendLogDump = function( message , toDump ){
      ///TODO Handel message
      $S('#wgtDumpConsole').append('pre').html(toDump);
    };//end this.appendLogDump 
  
    /**
     * @param
     * @param
     */
    this.setLogDump = function( message , toDump ){
      ///TODO Handel message
      var container = $S('pre').html(toDump);
      $S('#wgtDumpConsole').html(container);
    };//end this.setLogDump
  
    /**
     * @param
     * @param
     */
    this.console = function( message  ){
      ///@todo add a better solution for that
      // qd solution
      alert(message);
    };//end this.setLogDump
    
    this.start = function(){
      return new Date().getTime();
    };
    
    this.duration = function( start ){
      return (new Date().getTime())-start;
    };
    
  }//end function WgtDebug 


  // set the debug object
  window.$DBG = new WgtDebug();


})( window, $S );
