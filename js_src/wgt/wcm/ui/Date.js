/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
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