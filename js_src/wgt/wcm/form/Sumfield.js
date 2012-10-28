/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch
 */
$R.addAction('form_sumfield', function(jNode){

  jNode.removeClass('wcm_form_sumfield');

  var fields = jNode.attr('wgt_fields');
  
  if( !fields || '' == fields.trim() ){
    jNode.val('0 (missing source fields)');
    return;
  }
  
  // sumfields sind per definition readonly
  jNode.attr( 'readonly', 'readonly' );

  var stack = fields.split(',');
  
  console.log( 'sum up fields #'+stack.join(', #') );
  
  jNode.val( $S( '#'+stack.join(', #') ).calcSum() );
  
  $S(stack).each( function( pos, fieldId ){
    console.log( 'handle sum source '+fieldId );
    $S('#'+fieldId).change( function(){
      console.log( 'calc sum' );
      jNode.val( $S( '#'+stack.join(', #') ).calcSum() );
    });
  });
  

});
