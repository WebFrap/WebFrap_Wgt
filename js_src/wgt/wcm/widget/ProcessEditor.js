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
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 */
$R.addAction( 'widget_process_editor', function( jNode ){

  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm widget_process_editor path: ' +jNode.getNodePath('/')  );
  
  $WGT.loadModule('editor',function(){
	  //jsPlumb.setRenderMode(jsPlumb.SVG);
	  jsPlumb.Defaults.Connector = [ "Bezier", { curviness:40 } ];
	  jsPlumb.Defaults.DragOptions = { cursor: "pointer", zIndex:2000 };
	  jsPlumb.Defaults.PaintStyle = { strokeStyle:"gray", lineWidth:1 };
	  jsPlumb.Defaults.Endpoint = [ "Blank", { fillStyle:"gray" } ];
	  jsPlumb.Defaults.EndpointStyle = { fillStyle:"gray" };
	  jsPlumb.Defaults.HoverPaintStyle = {strokeStyle:"#ec9f2e" };
	  jsPlumb.Defaults.EndpointHoverStyle = {fillStyle:"#ec9f2e" };              
	  jsPlumb.Defaults.Anchors =  [ "BottomCenter", "TopCenter" ];
	  jsPlumb.Defaults.RenderMode = jsPlumb.SVG;
	  jsPlumb.Defaults.ConnectionsDetachable = true;
  });
  
  jNode.removeClass("wcm_widget_process_editor");

  var settings = {};

  try{

    var cfgData = $S('var#'+jNode.attr('id')+'-cfg-process_editor');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){

    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.process_editor(settings);
  
});
