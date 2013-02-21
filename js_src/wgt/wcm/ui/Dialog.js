/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_dialog', function( jNode ){

  jNode.removeClass("wcm_ui_dialog");
  jNode.dialog();

});