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
 *   code lang: english
 *   naming style: camel case
 * 
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_button', function( jNode ){

  jNode.removeClass("wcm_ui_button");
  jNode.addClass('wgt-button');
  
  
  // wenn ein wgt_send attribute vorhanden ist
  // versucht der button automatisch das formular dessen id im wgt_send=""
  // vorhanden ist zu submitten
  var sendAction = jNode.attr('wgt_send');
  if( sendAction ){
    jNode.click(function(){
      $R.form(sendAction);
      return false;
    });
  }
  
  //jNode.button();
  //jNode.addClass('ui-state-default ui-corner-all');

});