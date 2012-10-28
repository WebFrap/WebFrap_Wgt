/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_focus', function( jNode ){

  jNode.removeClass( "wcm_ui_focus" );
  jNode.focus();

});