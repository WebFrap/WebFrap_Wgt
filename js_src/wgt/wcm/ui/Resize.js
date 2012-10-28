/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Class Mapper for Resizing Objects
 * 
 * @example
 * <code>
 * <div class="wcm wcm_ui_resizeable" >
 *   Meine Größe kann man sowohl in der Höhe als auch in der Breite ändern.
 * </div>
 * <div class="wcm wcm_ui_resizeable-x" >
 *   Meine Größe kann man sowohl in der Breite ändern.
 * </div>
 * <div class="wcm wcm_ui_resizeable-y" >
 *   Meine Größe kann man sowohl in der Höhe ändern.
 * </div>
 * </code>
 */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_resize', function( jNode ){
  jNode.resizable();
  jNode.removeClass('wcm_ui_resize');
});

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @todo constraint hack einbauen
 */
$R.addAction( 'ui_resize-x', function( jNode ){
  jNode.resizable();
  jNode.removeClass('wcm_ui_resize-x');
});

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @todo constraint hack einbauen
 */
$R.addAction( 'ui_resize-y', function( jNode ){
  jNode.resizable();
  jNode.removeClass('wcm_ui_resize-y');
});