/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_link_info', function( jNode ){

  jNode.tooltip({
    track: true,
    delay: 0
  }).removeClass("wcm_ui_link_info");

});