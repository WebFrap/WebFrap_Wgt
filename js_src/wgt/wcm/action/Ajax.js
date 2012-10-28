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
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'req_ajax', function( jNode ){
  
  "use strict";

  var dNode = jNode.get(0);
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm req_ajax path: ' +jNode.getNodePath('/')  );
  }
  

  if( window.$B.nodeType(dNode,'a') ){
    
    jNode.click( function(){
      $R.get(this.href+"&request=ajax");
      return false;
    });
   
  }
  else if( window.$B.nodeType(dNode,'form') ){

    var inputField = jNode.find("input[type='submit']");

    //if submitField is there then continue
    if (typeof inputField == "object"){
      $S(inputField).click(function(){

        $R.form( jNode.prop('id') );
        return false;
      });   
    }
  }

  // remove the class
  jNode.removeClass('wcm_req_ajax');

});

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * 
 * @wgt_param wgt_form Id des Formulars welches abgeschickt werden soll
 */
$R.addAction( 'req_form', function( jNode ){
    
  "use strict";
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm req_form path: ' +jNode.getNodePath('/')  );
  }
  
  jNode.bind( 'click.req_form', function(){
    $R.form( jNode.attr('wgt_form') );
  });
  

  // remove the class
  jNode.removeClass( 'wcm_req_form' );

});