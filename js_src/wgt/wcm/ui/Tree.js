/* Licence see: /LICENCES/wgt/licence.txt */



/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tree', function( jNode ){

  var settings = {};
  try{
    
    var cfgData = jNode.find('var#'+jNode.attr('id')+'-cfg-tree');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
    
    settings.imagePath = $C.imagePath+'wgt/';
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.dynatree( settings ).removeClass('wcm_ui_tree');


});

