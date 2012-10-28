/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_vert_mega_menu', function( jNode ){
  
  var settings = {};
  
  try{
    settings = jNode.next().is('var.wgt-settings')
    ? $WGT.robustParseJSON(jNode.next().text())
    : { rowItems: '3',
        speed: 'fast',
        effect: 'show',
        direction: 'right'
      };
  }
  catch(err){
    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.vertMegaMenu(settings).removeClass("wcm_ui_vert_mega_menu");

});