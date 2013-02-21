/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_info', function( jNode ){

  /*
  jNode.tooltip({
    extraClass: "pretty", 
    top: -15,
    opacity: 0.5
  }).removeClass("wcm_ui_info");
  */
  
  var infoPos = jNode.attr('wgt_tt_align');
  
  if( !infoPos )
    infoPos = 'e';
  
  jNode.wgtTip({
    gravity: infoPos,
    delayIn: 700, 
    delayOut: 200
  }).removeClass( "wcm_ui_tip-left" );

});