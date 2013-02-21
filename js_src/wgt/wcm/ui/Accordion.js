/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_accordion', function( jNode ){
  
    var settings = {};
    
    try{
      
      var cfgData = jNode.next();
      settings = cfgData.is('var')
        ? $WGT.robustParseJSON(cfgData.text())
        : {autoHeight: true,fillSpace: true,animated: false};
    }
    catch(err){
      
      $D.errorWindow( 'UI Error', err.description );
    }
  
    jNode.accordion(settings);
    jNode.removeClass('wcm_ui_accordion');

});