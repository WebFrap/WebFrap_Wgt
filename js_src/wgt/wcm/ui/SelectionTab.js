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

/* Example code
 
<select>

</select>
 
*/

/**
 * Tab Head implementieren für Selectboxen oder Radio Elemente
 * On Change auf dem Element wird zwischen Benamten Boxen in einem Content Container
 * geswitcht
 * 
 * @todo
 * Es ist zu klären wie hier mit multi Selection umgegangen werden muss
 * Theoretisch könnten ja mehrere Werte gleichzeitig gesetzt werden
 * 
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_selection_tab', function( jNode ){
  
    var settings = {},
      cfgData = jNode.next(),
      contObjId = jNode.attr('wgt_body'),
      contObj = null,
      triggerAct = null;
    
    if( contObjId ){
      
      console.log( 'search '+'#'+contObjId );
      
      contObj = $S('#'+contObjId);
    }
    else{
      
      contObj = $S('#'+jNode.attr('id')+'-content');
    }
      
    
    if( contObj.length ){
      contObj.contentContainer();
    }
    
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};

    
    triggerAct = function(){

      var headEntry = jNode.find(':checked');
      
      if( headEntry.hasClass('disabled') ){
        return false;
      }
      
      // potentiell offenen menü schliesen
      $D.requestCloseMenu();
      // schliesen des Menüs nach dem Request
      $D.requestCloseMenu = function(){};
      
      var tmpRef = headEntry.attr('wgt_tab'),
        tmpSrc = headEntry.attr('wgt_src');
      
      if( tmpSrc && !headEntry.hasClass('wgt-loaded') ){
        
        headEntry.addClass('wgt-loaded');
        $R.get( tmpSrc, {async:true} );
        
      }
      
      console.log( 'setActive '+tmpRef );
      contObj.contentContainer( 'setActive' ,tmpRef );
    };
    
    // switch workarea
    jNode.find(':input').bind( 'change.tab', triggerAct );
    jNode.removeClass( 'wcm_ui_selection_tab' );

});