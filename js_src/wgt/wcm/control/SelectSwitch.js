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
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * 
 * Selectbox Tabhead Implementierung.
 * Eine Selectbox wird als Trigger für einen Tabcontainer verwendet
 * 
 * @since 0.9.2
 * 
 */
$R.addAction( 'control_select_switch', function( jNode ){
  

  var settings = {},
    cfgData = $S('var#'+jNode.attr('id')+'-cfg-slctswt');
  
  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};
  
  var contObj = $S( '#'+jNode.prop('id')+'-content' ).contentContainer();

  // switch workarea
  jNode.bind( 'change', function( event, ui ){
    
    var headEntry = jNode.find(':selected');

    if( headEntry.hasClass('disabled') ){
      return false;
    }
    
    // potentiell offenen menü schliesen
    //$D.requestCloseMenu();
    // schliesen des Menüs nach dem Request
    //$D.requestCloseMenu = function(){};
    
    $S('.'+jNode.attr('id')).hide();
    
    var tmpRef = headEntry.attr('tab');
    /*
    var tmpSrc = headEntry.attr('wgt_src');
    
    
    if( tmpSrc &&  !headEntry.is('.loaded') ){
      headEntry.dblclick(function(){
        $R.get( tmpSrc, {async:true} );
      });
    }
    
    if( tmpSrc && ( headEntry.is('.reload_able') || !headEntry.is('.loaded') )  ){
      headEntry.addClass('loaded');
      $R.get( tmpSrc, {async:true} );
    }
    */
    
    contObj.contentContainer( 'setActive' ,tmpRef );
    $S('.'+jNode.attr('id')+'.box-'+tmpRef).show();
  
    
  });
  
 
  jNode.removeClass('control_select_switch');

});