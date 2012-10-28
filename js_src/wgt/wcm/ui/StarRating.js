/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_star_rating', function( jNode ){

  var activ = jNode.find('.wgt_rating_text').text();
  
  var settings = {};
  var defSettings = {
    half:true,
    focus: function(value, link){
      jNode.find('.wgt_rating_text').html( link.title );
    },
    focusout: function(){
      jNode.find('.wgt_rating_text').html( activ  || '&nbsp;' );
    },
    blur: function(value, link){
      jNode.find('.wgt_rating_text').html( activ  || '&nbsp;' );
    },
    callback: function(value, link){
      activ = link.title;
      jNode.find('.wgt_rating_text').html( link.title );
      jNode.find('.wgt_value').val( value ).change();
    }
  };
  
  try{
    
    var cfgData = jNode.find('var#'+jNode.attr('id')+'-cfg-rating');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }
  
  settings = $S.extend({}, defSettings, settings);
  
  if( 'false' == settings.half )
    settings.half = false;
  
  jNode.find('input.wgt_start_rating').rating(settings); 
  
  jNode.removeClass('wcm_ui_star_rating');

});