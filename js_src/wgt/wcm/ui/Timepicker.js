/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_timepicker', function( jNode ){
  
  jNode.removeClass('wcm_ui_timepicker');
  
  var node;
  
  jNode.addClass('valid_time');
  
  if( jNode.is("input") ){
    
    node = jNode.next();
  }
  else{

    node = jNode.find('var.opt_options');
  }
  
  // if you want to use wgt default settings and not system settings
  if( jNode.hasClass('wgt_default') ){

    jNode.timepicker();
  }
  else{

    jNode.timepicker({
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
      jNode.timepicker('show');
    });
  }
  else if( jNode.is('div') ){
    jNode.click( function(){
      jNode.timepicker('show');
    });
  }
  
  if( node ){
    
    var options = node.attr( 'options' );
    options = $WGT.robustParseJSON( options );
  }
  
  if( Boolean(options) )
    jNode.timepicker( "option", options );

});


$R.addAction( 'list_timepicker', function( jNode ){
  
  jNode.removeClass('wcm_list_timepicker');
  
  var settings = {
      onSelect:function( dateValue  ){
        $S('#'+jNode.parentX('div').attr('wgt_list')).grid(
          'writeCell', 
          jNode.parentX('div').attr('wgt_target'), 
          dateValue,
          dateValue
        );
      }
    };
  
  jNode.addClass('valid_time');
  jNode.timepicker(settings);
  
  jNode.click( function(){
    jNode.timepicker('show');
  });

});