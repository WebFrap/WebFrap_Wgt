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
 */
$R.addAction( 'ui_accordion_tab', function( jNode ){
  
    var settings = {};
    
    try{
      
      var cfgData = jNode.next();
      settings = cfgData.is('var')
        ? $WGT.robustParseJSON(cfgData.text())
        : {autoHeight: true,fillSpace: true,animated: false};
    }
    catch(err){
      
      $D.errorWindow( 'UI Error', err.description );
    }
    
    var accObj = $S( '#'+jNode.prop('id')+'-head' );
    var contObj = $S( '#'+jNode.prop('id')+'-content' ).contentContainer();

    accObj.accordion(settings);
    
    // switch workarea
    accObj.bind( 'accordionchangestart', function( event, ui ){
      
      var headEntry = ui.newHeader.find('a');

      if( headEntry.hasClass('disabled') ){
        return false;
      }
      
      // potentiell offenen menü schliesen
      $D.requestCloseMenu();
      // schliesen des Menüs nach dem Request
      $D.requestCloseMenu = function(){};
      
      $S('.'+jNode.attr('id')).hide();
      
      var tmpRef = headEntry.attr('tab');
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
      

      
      contObj.contentContainer( 'setActive' ,tmpRef );
      $S('.'+jNode.attr('id')+'.box-'+tmpRef).show();
    
      
    });
    
   
    jNode.removeClass('wcm_ui_accordion_tab');

});