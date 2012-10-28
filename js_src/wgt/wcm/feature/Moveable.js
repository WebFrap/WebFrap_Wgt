/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'feature_moveable', function( jNode ){
 
    var varData = $S('var#'+jNode.prop('id')+"-moveable");

    var props = varData.is('var') 
      ? $WGT.robustParseJSON( varData.text() )
      : {};

    
    // switch workarea
    jNode.draggable();

    jNode.removeClass('wcm_feature_moveable');
    

});