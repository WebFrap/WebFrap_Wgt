/* Licence see: /LICENCES/wgt/licence.txt */

console.log("WWWWWWWW");

/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_search_builder', function( jNode ){
  
  jNode.removeClass("wcm_ui_search_builder");
  
  console.log('dafuq');
  
  var settings = {};
  
  var cfgData = $S('var#'+jNode.attr('id')+'-cfg-sb');
  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};
  
  jNode.searchBuilder(settings);
  
});