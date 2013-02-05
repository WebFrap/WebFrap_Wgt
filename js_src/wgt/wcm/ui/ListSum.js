/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch
 */
$R.addAction('list_sum', function(jNode){

  jNode.removeClass('wcm_list_sum');

  var fields = jNode.attr('wgt_fields');
  
  if( !fields || '' == fields.trim() ){
    jNode.val('0');
    return;
  }
  

  jNode.text( fields ).calcSum() );
  

});
