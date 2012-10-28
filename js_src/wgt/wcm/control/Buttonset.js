/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_buttonset', function( jNode ){

  jNode.removeClass("wcm_control_buttonset");
  
  var settings = {};
  
  try{
    settings = jNode.next().is('var.c-buttonset')
    ? $WGT.robustParseJSON(jNode.next().text())
    : {};
  }
  catch(err){
    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.buttonset( settings );

});