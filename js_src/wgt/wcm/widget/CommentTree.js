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
$R.addAction( 'widget_comment_tree', function( jNode ){
  
  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm widget_comment_tree path: ' +jNode.getNodePath('/')  );
  
  var settings = {},
    cfgData;
  
  // laden der wysiwyg konfiguration
  try{
    
    cfgData = jNode.find( 'var#'+jNode.attr('id')+'-cfg-comment_tree' );
    settings = cfgData.is( 'var' )
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.commentTree( settings );
  jNode.removeClass( 'wcm_widget_comment_tree' );

});

/**
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 */
$R.addAction( 'widget_comment_entry', function( jNode ){

  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm widget_comment_tree path: ' +jNode.getNodePath('/')  );

  var container = jNode.parentX('.wgt-content_box');

  container.commentTree( 'addEntryEvents', jNode );
  jNode.removeClass( 'wcm_widget_comment_entry' );

});