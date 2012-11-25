/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_info', function( jNode ){

  /*
  jNode.tooltip({
    extraClass: "pretty", 
    top: -15,
    opacity: 0.5
  }).removeClass("wcm_ui_info");
  */
  
  jNode.wgtTip({
    gravity: 'e',
    delayIn: 700, 
    delayOut: 200
  }).removeClass("wcm_ui_tip-left");

});