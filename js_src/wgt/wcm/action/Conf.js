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
 * @author dominik bonsch <db@webfrap.net>
 * 
 * @todo i18n
 */
$R.addAction( 'req_conf', function( jNode ){
  
  "use strict";
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm req_conf path: ' +jNode.getNodePath('/')  );
  }

  jNode.click(function(){
    
    if( this.title == undefined ){
      this.title = 'Please confirm this action.';
    }

    $D.confirmWindow(
      this.title ,
      this.title ,
      'confirm',
      function (){$R.post(this.href+"&request=ajax");}
    );
    return false;
    
  });
  
  jNode.removeClass("wcm_req_conf");

});