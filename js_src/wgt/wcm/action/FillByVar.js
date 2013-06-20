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
 *   - http://code.google.com/p/jquery-appear/
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
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'action_fill_by_var', function( jNode ){
  
  "use strict";
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm action_fill_by_var path: ' +jNode.getNodePath('/')  );
  }

  jNode.appear( function(){
    
    var contentNode = $S( '#'+jNode.attr('wgt_content_id') );
    if( contentNode.length ){
      jNode.html( contentNode.html() );
      $S( '#'+jNode.attr('wgt_content_id') ).remove();
    }
    
  });

  jNode.removeClass('wcm_action_fill_by_var');

});