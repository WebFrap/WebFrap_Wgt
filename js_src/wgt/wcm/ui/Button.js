/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_button', function( jNode ){

  jNode.removeClass("wcm_ui_button");
  jNode.addClass('wgt-button');
  
  
  // wenn ein wgt_send attribute vorhanden ist
  // versucht der button automatisch das formular dessen id im wgt_send=""
  // vorhanden ist zu submitten
  var sendAction = jNode.attr('wgt_send');
  if( sendAction ){
    jNode.click(function(){
      $R.form(sendAction);
      return false;
    });
  }
  
  //jNode.button();
  //jNode.addClass('ui-state-default ui-corner-all');

});