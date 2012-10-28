/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_buttonset', function( jNode ){

  jNode.removeClass("wcm_ui_buttonset");
  
  jNode.find('button').addClass('wgt-button');
  
  //jNode.buttonset();

});