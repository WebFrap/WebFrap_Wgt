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
 *   codelang: english
 *   identStyle: camel case
 * 
 */



/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'widget_contextmenu', function( jNode ){

  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm widget_contextmenu path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_widget_contextmenu");

  var settings = {},
      $doc     = $S(document);

  try{

    var cfgData = $S('var#'+jNode.attr('id')+'-cfg-contextmenu');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){
    
    if( undefined !== $D )
      $D.errorWindow( 'UI Error', err.description );
  }
  
  jNode.dropdown( settings );

  // Rechtsklick simulieren
  jNode.bind( 'mousedown.context',  function(e) {
    
    var evt = e;
    evt.stopPropagation();
    
    jNode.bind( 'mouseup.context',  function(e) {
      e.stopPropagation();

      jNode.unbind('mouseup.context');
      if( evt.button == 2 ) {
          
        console.log("rechtsklick");
        
        $doc.unbind('click');
        
        // Hide bindings
        setTimeout( function() { // Delay for Mozilla
          $doc.click( function() {
            $doc.unbind('click');
            return false;
          });
        }, 0);
        
        jNode.dropdown( 'open', {triggerEvent:null} );
        
      }
      
      return false;
    });

  });
  
  // Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
  jNode.bind('contextmenu', function() { return false; });

});