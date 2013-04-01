/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_multiselect', function( jNode ){

  jNode.removeClass("wcm_ui_multiselect");
  
  var jNode = $S('#'+jNode.attr('id')),
    settings = {};
  
  var cfgData = $S('var#'+jNode.attr('id')+'-cfg-mslct');
  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};

  jNode.multiselect(settings);
  
});