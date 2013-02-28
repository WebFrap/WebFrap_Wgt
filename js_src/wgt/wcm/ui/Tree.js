/* Licence see: /LICENCES/wgt/licence.txt */



/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tree', function( jNode ){

  var settings = {},
    cfgData = jNode.find('var#'+jNode.attr('id')+'-cfg-tree');

  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};

  settings.imagePath = $C.imagePath+'wgt/';

  console.log('tree '+jNode.attr('id'));
  console.log('minExpandLevel '+settings.minExpandLevel);

  settings.onActivate = function(node) {
    // Use <a> href and target attributes to load the content:
    if( node.data.href ){

      if( !$S(node).is('.extern') ){

        $R.get(node.data.href);

      } else {

        window.open(node.data.href, node.data.target);
      }

    }
  };

  jNode.dynatree( settings ).removeClass('wcm_ui_tree');

});

$R.addAction( 'ui_json_tree', function( jNode ){

  var settings = {},
    cfgData = jNode.find('var.tree-cfg'),
    treeData = jNode.find('var.data');

  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};

  settings.children = $WGT.robustParseJSON( treeData.text() );

  settings.imagePath = $C.imagePath+'wgt/';

  jNode.dynatree( settings ).removeClass('wcm_ui_json_tree');


});