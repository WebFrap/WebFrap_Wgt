/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_date_range', function( jNode ){
  
  jNode.removeClass('wcm_ui_date_range');
  
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

  
  if( node ){
    
    var options = node.attr( 'options' );
    options = $WGT.robustParseJSON( options );
  }
  
  if( Boolean(options) )
    jNode.datepicker( "option", options );

});
