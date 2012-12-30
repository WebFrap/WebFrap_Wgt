/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_dropmenu', function( jNode ){

  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm control_dropmenu path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_control_dropmenu");

  var settings = {},
    cfgData = jNode.next();
  
  if( !cfgData.is('var') )
    cfgData = $S('var#'+jNode.attr('id')+'-cfg-dropmenu');
  
  if( cfgData.is('var') ){
    console.log( "qdqwdqw "+settings.align+' '+cfgData.text() );
    settings = $WGT.robustParseJSON(cfgData.text());
    //cfgData.remove();
  }
  else{
    settings = {};
  }

  
  jNode.dropdown( settings );

});