/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_color_code', function( jNode ){
  
  jNode.removeClass('wcm_ui_color_code');
  
  var code = jNode.getActionClass('prop_key');
  
  jNode.parent().css('background-color',$C.colorCodes[code][jNode.val()]);
  
  jNode.change(function(){
    jNode.parent().css('background-color',$C.colorCodes[code][jNode.val()]);
  });

});
