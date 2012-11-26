/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_selection', function( jNode ){

  jNode.removeClass("wcm_control_selection");

  var settings = {},
    cfgData = $S( 'var#'+jNode.attr('id')+'-cfg-selection' );
  
  if( cfgData.is('var') ){
    settings = $WGT.robustParseJSON( cfgData.text() );
    cfgData.remove();
  }
  else{
    settings = {};
  }

  jNode.windowSelection( settings );

});