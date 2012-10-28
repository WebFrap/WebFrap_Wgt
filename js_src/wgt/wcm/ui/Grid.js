/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_grid', function( jNode ){


  jNode.removeClass("wcm_ui_grid");
  
  
  jNode.find('tbody>tr')
    .mouseover( function(){
      
     $S(this).addClass('wgt-hover'); 
    })
    .mouseout(function(){
      
      $S(this).removeClass('wgt-hover'); 
    })
    .click(function(){
      
      $S(this).toggleClass( 'wgt-selected' );
    });
  
  jNode.appear(function(){
    
    var tObj = $S('#'+jNode.attr('id'));
    
    var settings = {};
    
    try{
      
      var cfgData = $S('var#'+jNode.attr('id')+'-cfg-grid');
      settings = cfgData.is('var')
        ? $WGT.robustParseJSON(cfgData.text())
        : {};
    }
    catch(err){
      
      $D.errorWindow( 'UI Error', err.description );
    }

    tObj.grid(settings);
  });
  
});