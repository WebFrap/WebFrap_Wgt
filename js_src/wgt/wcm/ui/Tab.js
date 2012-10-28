/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tab', function( jNode ){

  if( $C.DEBUG.WCM.UI )
    console.log( 'wcm ui_tab path: ' +jNode.getNodePath('/')  );
  
  jNode.appear(function(){

    var settings = {};

    try{

      var cfgData = $S('var#'+jNode.attr('id')+'-cfg-tab');
      settings = cfgData.is('var')
        ? $WGT.robustParseJSON(cfgData.text())
        : {};
    }
    catch(err){

      $D.errorWindow( 'UI Error', err.description );
    }

    jNode.addClass('wgt_tab_container').addClass('wgt_initialized');
    $UI.tab.init( jNode.prop('id'), settings );
  });
  
  jNode.removeClass('wcm_ui_tab');

});


$R.addAction( 'ui_tab_head', function( jNode ){

  if( $C.DEBUG.WCM.UI )
    console.log( 'wcm ui_tab_head path: ' +jNode.getNodePath('/')  );
  
  jNode.appear(function(){

    var settings = {};

    try{

      var cfgData = $S('var#'+jNode.attr('id')+'-cfg-tab');
      settings = cfgData.is('var')
        ? $WGT.robustParseJSON(cfgData.text())
        : {};
    }
    catch(err){

      $D.errorWindow( 'UI Error', err.description );
    }

    jNode.tabHead( settings );
    
  });
  
  jNode.removeClass('wcm_ui_tab_head');

});