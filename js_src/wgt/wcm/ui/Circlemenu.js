/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Milos Kosanovic
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_circlemenu', function( jNode ){
  jNode.addClass('circlemenu');
  jNode.bindCircleMenu(cacheData = true);
  jNode.removeClass('wcm_ui_circlemenu');
});
