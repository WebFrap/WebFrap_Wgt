/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_toggle_controls', function( jNode ){

  jNode.removeClass("wcm_ui_toggle_controls");
  
  jNode.bind( 'mouseenter.ui_toggle_controls', function(){
    jNode.find('.controls').show();
  }).bind( 'mouseleave.ui_toggle_controls', function(){
    jNode.find('.controls').hide();
  });

});