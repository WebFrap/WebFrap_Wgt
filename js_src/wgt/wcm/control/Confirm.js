/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'controll_confirm', function( jNode ){

  jNode.removeClass( "wcm_ui_dialog" );
  jNode.dialog();

});