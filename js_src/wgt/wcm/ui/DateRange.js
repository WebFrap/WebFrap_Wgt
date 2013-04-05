/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_date_range', function( jNode ){
  
  jNode.removeClass('wcm_ui_date_range');

  jNode.addClass('valid_date');

  var endNode = $S('#'+jNode.attr('wgt_end_node'));

    
    jNode.datepicker({
      dateFormat: $C.formatDate,
      showWeek: true,
      constrainInput: true,
      buttonImageOnly: true,
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        endNode.datepicker( "option", "minDate", selectedDate );
      }
    });
    
    endNode.datepicker({
      dateFormat: $C.formatDate,
      showWeek: true,
      constrainInput: true,
      buttonImageOnly: true,
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        jNode.datepicker( "option", "maxDate", selectedDate );
      }
    });


  if( $S( '#'+jNode.attr('id')+'-ap-button' ).is('button') ){
    
    $S( '#'+jNode.attr('id')+'-ap-button' ).click( function(){
      jNode.datepicker('show');
    });
  }
  
  if( $S( '#'+endNode.attr('id')+'-ap-button' ).is('button') ){
    
    $S( '#'+endNode.attr('id')+'-ap-button' ).click( function(){
      endNode.datepicker('show');
    });
  }


});
