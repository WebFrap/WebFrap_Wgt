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
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_date', function( jNode ){
  
  jNode.removeClass('wcm_ui_date');
  
  var node;
  
  jNode.addClass('valid_date');
  
  if( jNode.is("input") ){
    
    node = jNode.next();
  }
  else{

    node = jNode.find('var.opt_options');
  }
  
  // if you want to use wgt default settings and not system settings
  if( jNode.hasClass('wgt_default') ){

    jNode.datepicker();
  }
  else{

    jNode.datepicker({
      dateFormat: $C.formatDate,
      changeMonth: true,
      changeYear: true,
      showWeek: true,
      constrainInput: true,
      buttonImageOnly: true
    });
  }

  if( $S( '#'+jNode.attr('id')+'-ap-button' ).is('button') ){
    $S( '#'+jNode.attr('id')+'-ap-button' ).click( function(){
      jNode.datepicker('show');
    });
  }
  else if( jNode.is('div') ){
    jNode.click( function(){
      jNode.datepicker('show');
    });
  }
  
  if( node ){
    
    var options = node.attr( 'options' );
    options = $WGT.robustParseJSON( options );
  }
  
  if( Boolean(options) )
    jNode.datepicker( "option", options );

});


// settings.hasclasss();
//console.log("src", $C.iconCallendar);
//jNode.prepend("<img src='" + $C.iconCallendar + "' />");
//var tmp = jNode.datepicker('option', 'showWeek');
//jQuery.extend(tmp, options); 
/*
dateFormat: 'yy-mm-dd',
showOn: "both",
altField: _endDate
buttonImage: $C.iconCallendar,
buttonImageOnly: true,

*/