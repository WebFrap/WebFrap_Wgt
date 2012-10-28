/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_button', function( jNode ){

  jNode.removeClass("wcm_control_button");
  
  var settings = {};
  
  try{
    settings = jNode.next().is('var.c-button')
    ? $WGT.robustParseJSON(jNode.next().text())
    : {};
  }
  catch( err ){
    $D.errorWindow( 'Failed to read button settings '+jNode.getNodePath('/') , err.description );
  }

  jNode.button( settings );

});