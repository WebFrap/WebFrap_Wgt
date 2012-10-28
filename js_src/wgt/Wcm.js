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
 * Der WebFrap Class Mapper, 
 * ein relative einfaches System zum mappen von Logik über CSS Klassen auf DOM
 * Nodes.
 * 
 */
(function($R,$S,$D){
  
  "use strict";

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  var Wcm = function( ){


    /**
     * ref to prototype
     */
    this.fn = Wcm.prototype;

    /**
     * way to self
     */
    var self = this;

/*//////////////////////////////////////////////////////////////////////////////
// ajax request event pools
//////////////////////////////////////////////////////////////////////////////*/

    /**
     * Eventliste für Funktionen vor dem Ajax Request
     */
    this.beforeAjaxRequest = [];
  
    /**
     * Eventliste für Funktionen nach dem Ajax Request
     */
    this.afterAjaxRequest  = [];
  
    /**
     * Eventliste für einmalige Funktionen nach dem Ajax Request
     */
    this.poolOtPostAray    = [];
  
    /**
     * Eventliste für das erste erstellen einer Seite
     */
    this.initRequest       = [];
    
    /**
     * pool with acttions
     */
    this.actionPool       = {};

/*//////////////////////////////////////////////////////////////////////////////
// the methods for the ajax interface events
//////////////////////////////////////////////////////////////////////////////*/

   /**
    * @param callBack
    */
   this.addBeforeAjaxRequest = function( callBack ) {
     this.beforeAjaxRequest.push(callBack);
   };//end this.addBeforeAjaxRequest

   /**
    * @param callBack
    */
   this.addAfterAjaxRequest = function( callBack ){
     this.afterAjaxRequest.push(callBack);
   };//end this.addAfterAjaxRequest

   /**
    * @param callBack
    */
   this.oneTimePostAjax = function( callBack ){
     this.poolOtPostAray.push(callBack);
   };//end this.oneTimePostAjax


   /**
    * @param key
    * @param callBack
    */
   this.addAction = function( key, callBack ){
     this.actionPool[key] = callBack;
   };//end this.oneTimePostAjax

   /**
    *
    */
   this.eventBeforeAjaxRequest = function( ){

      $D.showProgressBar();

      for( var func in this.beforeAjaxRequest ){

        var callback = this.beforeAjaxRequest[func];
        try {
          callback();
        }
        catch( e ) {
          $D.errorWindow( e.name, e.message );
        }
      }

    };//end this.eventBeforeAjaxRequest

   /**
    *
    */
    this.eventAfterAjaxRequest = function( ) {

      var callback  = null;
      var length    = this.afterAjaxRequest.length;

      for (var index = 0; index < length; ++index){

        callback = this.afterAjaxRequest[index];
        try{

          callback();
        }
        catch( e ) {
           //alert(e.message);
           $D.errorWindow( e.name, e.message );
           //this.desktop.errorWindow( exception.name, exception.message );
        }
      }


      // disable Links and use ajax instead (and remove class)
      var allActions = $S(".wcm");
      allActions.each(function(){
        var node      = $S(this);
        var classParts   = node.classes();

        var tmpLenght   = classParts.length;

        for (var index = 0; index < tmpLenght; ++index){

          var callback = classParts[index];

          if( 'wcm_' == callback.substring(0,4) ) {

            var call = $R.actionPool[callback.substring(4,callback.length)];

            if( typeof call !== 'undefined'){
              call(node);
            }

          }
        }

      });
      allActions.removeClass("wcm");

      length = this.poolOtPostAray.length;
      for (var iter = 0; iter < length; ++iter) {

        callback = this.poolOtPostAray[iter];
        try {
         
          callback();
        } 
        catch( e ) {
         
          //alert(e.message);
          $D.errorWindow( e.name, e.message );
          //this.desktop.errorWindow( exception.name, exception.message );
        }
      }

      this.poolOtPostAray = [];

      $D.hideProgressBar();

    };//end this.eventAfterAjaxRequest 

    /**
     *
     */
    this.eventInitRequest = function( ) {

      for (var index = 0; index < this.initRequest.length; ++index) {

        var callback = this.initRequest[index];
        try {
          
          callback();
        } 
        catch( e ) {
          
          //alert(e.message);
          $D.errorWindow( e.name, e.message );
          //this.desktop.errorWindow( exception.name, exception.message );
        }
      }

    };//end this.eventInitRequest

  };//end function WgtRequest

  // Expose Request to the global object
  $R.wcm = new Wcm();

})
(
  $R, // das request object
  $S, // jquery object
  $D  // desktop manager
);

