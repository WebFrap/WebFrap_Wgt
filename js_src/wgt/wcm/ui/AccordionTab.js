/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_accordion_tab', function( jNode ){
  
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
    
    var accObj = $S( '#'+jNode.prop('id')+'-head' );
    var contObj = $S( '#'+jNode.prop('id')+'-content' ).contentContainer();

    accObj.accordion(settings);
    
    // switch workarea
    accObj.bind('accordionchangestart',function(event,ui){
      
      var headEntry = ui.newHeader.find('a');
      
      if( headEntry.hasClass('disabled') )
        return false;
      
      // potentiell offenen menü schliesen
      $D.requestCloseMenu();
      // schliesen des Menüs nach dem Request
      $D.requestCloseMenu = function(){};
      
      var tmpRef = headEntry.attr('tab');
      var tmpSrc = headEntry.attr('wgt_src');
      
      if( tmpSrc && !headEntry.is('.loaded') ){
        headEntry.addClass('loaded');
        $R.get( tmpSrc, {async:true} );
      }
      
      contObj.contentContainer( 'setActive' ,tmpRef );
    });
    
    jNode.removeClass('wcm_ui_accordion_tab');

});