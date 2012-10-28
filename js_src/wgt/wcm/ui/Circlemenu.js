/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Milos Kosanovic 
 */
$R.addAction( 'ui_circlemenu', function( jNode ){
  jNode.addClass('circlemenu');
  jNode.bindCircleMenu(cacheData = true);
  jNode.removeClass('wcm_ui_circlemenu');
});
