/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_date_timepicker', function( jNode ){
  
  jNode.removeClass('wcm_ui_date_timepicker');
  
  var node;
  
  jNode.addClass('valid_date_time');
  
  if( jNode.is("input") ){
    
    node = jNode.next();
  }
  else{

    node = jNode.find('var.opt_options');
  }
  
  // if you want to use wgt default settings and not system settings
  if( jNode.hasClass('wgt_default') ){

    jNode.datetimepicker();
  }
  else{

    jNode.datetimepicker({
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
      jNode.datetimepicker('show');
    });
  }
  else if( jNode.is('div') ){
    jNode.click( function(){
      jNode.datetimepicker('show');
    });
  }
  
  if( node ){
    
    var options = node.attr( 'options' );
    options = $WGT.robustParseJSON( options );
  }
  
  if( Boolean(options) )
    jNode.datetimepicker( "option", options );

});

$R.addAction( 'list_date_timepicker', function( jNode ){
  
  jNode.removeClass('wcm_list_date_timepicker');
  
  var settings = {
      dateFormat: $C.formatDate,
      changeMonth: true,
      changeYear: true,
      showWeek: true,
      constrainInput: true,
      buttonImageOnly: true,
      onSelect:function( dateValue  ){
        $S('#'+jNode.parentX('div').attr('wgt_list')).grid(
          'writeCell', 
          jNode.parentX('div').attr('wgt_target'), 
          dateValue,
          dateValue
        );
      }
    };
  
  jNode.addClass('valid_date');
  jNode.datetimepicker(settings);

});
