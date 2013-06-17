/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
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
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   codelang: english
 *   identStyle: camel case
 * 
 */

/**
 * @author Dominik Alexander Bonsch <db@webfrap.net>
 * @param $WGT wgt object
 * @param $S jquery object
 * @param undefined clean undefined
 */
(function($WGT, $S,undefined){
  
  "use strict";
  
/*//////////////////////////////////////////////////////////////////////////////
// First extend UI
//////////////////////////////////////////////////////////////////////////////*/
  
  /**
   * color classes
   */
  $WGT.fn.checkBrowserCompatibility = function(){

    var br = $S.browser;
    var errorMsg = function( message ){
      
      if( $S.cookie('untested_browser') === 'itsok' ){
        return;
      }
      
      $D.confirmWindow( 
        'Browser Warning', 
        message, 
        'I have been warned',
        function(){ $S.cookie('untested_browser','itsok'); }
      );
    };
    
    if( br.mozilla ){
      //$WGT.loadStyle( 'ff' );
      return;
    }
    else if( br.msie ){
      
      var ieV = parseInt(br.version.slice(0,1));
      if( ieV <= 7 ){
        errorMsg( 
          "<strong>Sorry, but you can't ride a dead horse.<strong>"
          + " The minimum Version for IE is 8.0, there will be <strong>no Support</strong> for IE 7.0 or lower."
          + " Please update your IE Version or better switch to a modern Browser like Firefox or Chrom(e/ium)"
          + " We highly recomend to use <strong>Firefox or Chrome</strong>."
          + " Be aware that using IE will severely slow down the response time on your machine."
        );
      }
      else if( ieV == 8 ){
        //$WGT.loadStyle( 'ie_8' );
        errorMsg(
            + "We highly recomend to use <strong>Firefox or Chrom(e/ium) Browser</strong>."
            + "With IE you will experience <strong>severe! performance issues.</strong>"
            + "Be aware that using IE will severely slow down the response time on your machine."
          );
      }
      else{
        //$WGT.loadStyle( 'ie_edge' );
      }
      
    }
    else if( br.opera ){
      //$WGT.loadStyle( 'opera' );
      errorMsg( 
          "You are using Opera.<br />We have not yet tested the system with Opera."
          +" We do not supply any <strong> official support for Opera</strong> users yet. "
          +" Most of the functionality will work, but sometimes the layout will be displayed incorrectly."
          +" If you experience problems please use <strong>Firefox or Chrom(e/ium) Browser</strong> to work in this system."
      );
    }
    else if( br.webkit ){
      
      var userAgent = navigator.userAgent.toLowerCase();
      // give a warning when it is not chrome
      if ( userAgent.indexOf("chrome") === -1 ){
        
        //$WGT.loadStyle( 'safari' );
        errorMsg( 
            "You are using Safari.<br />We have not yet tested the system with Safari."
            +" We do not supply any <strong> official support for Safari</strong> users yet. "
            +" Most of the functionality will work, but sometimes the layout will be displayed incorrectly."
            +" If you experience problems please use <strong>Firefox or Chrom(e/ium) Browser</strong> to work in this system."
        );
      }
      else{
        
        //$WGT.loadStyle( 'chrome' );
      }
      

    }
    else{
      errorMsg( 
          "The System was not able to identify the browser you are using."
          +" Maybe you have modified the browser ident, or you are using an uncommon browser."
          +" There is <strong>no official support</strong> for the browser / browser configuration you are using. "
          +" If you experience problems please use <strong>Firefox or Chrom(e/ium) Browser</strong> to working in this system."
      );
    }
    
  };


})($WGT,$S);