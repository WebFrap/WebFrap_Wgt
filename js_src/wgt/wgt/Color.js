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
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param window the window object
 * @param $WGT wgt object
 * @param $S jquery object
 * @param undefined clean undefined
 */
;(function(window,$WGT,$S,undefined){
/*//////////////////////////////////////////////////////////////////////////////
// First extend UI
//////////////////////////////////////////////////////////////////////////////*/
  
  /**
   * color classes
   */
  window.colorClasses = {};
  
  /**
   * 
   * @returns string
   */
  function createColorClass( hexCode ){
    
    var sClass = '<style type="text/css" >';
    sClass += '.color_'+hexCode+'{';
    sClass += 'color:#'+hexCode+';';
    sClass += '}';
    sClass += '.bg_color_'+hexCode+'{';
    sClass += 'backgound-color:#'+hexCode+';';
    sClass += '}';
    sClass += '</style>';
    
  }//end function createColorClass */
  
/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
  $WGT.fn.colorClass = function( hexVal ){
    
    // prevent broken code
    if(undefined==hexVal)
      return;
    
    // wenn raute vorhanden, kann der wert theoretisch maximal 7 zeichen haben
    // wenn wir mal von dem alphawert absehen, den wir so oder so nicht behandeln
    if( '#' == hexVal.substring(0,1) )
      hexVal = hexVal.substring(1,7);
    
    if( undefined != colorClasses[hexVal] )
      return hexVal;
    else
      return createColorClass( hexVal );
    
  }//end $WGT.fn.colorClass

})(window,$WGT,$S);