/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_selection', function( jNode ){

  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm control_selection path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_control_selection");

  var settings = {};

  try{

    var cfgData = $S( 'var#'+jNode.attr('id')+'-cfg-selection' );
    
    if( cfgData.is('var') ){
      settings = $WGT.robustParseJSON( cfgData.text() );
      cfgData.remove();
    }
    else{
      settings = {};
    }

  }
  catch(err){
    
    if( undefined !== $D )
      $D.errorWindow( 'UI Error', err.description );
  }

  jNode.windowSelection( settings );

});