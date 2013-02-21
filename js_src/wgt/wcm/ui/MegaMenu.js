/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_mega_menu', function( jNode ){
  
  var settings = {};
  var renderTime = $DBG.start();


  settings = jNode.next().is('var.wgt-settings') ? $WGT.robustParseJSON(jNode.next().text()) : { rowItems: '3',
        speed: 'fast',
        event: 'hover'
      };


  jNode.wgtMegaMenu(settings).removeClass("wcm_ui_mega_menu");
  
  console.log('mega reder duration ' + $DBG.duration( renderTime ) );

});