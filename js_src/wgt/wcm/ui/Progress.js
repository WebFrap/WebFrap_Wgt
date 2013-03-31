/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_progress', function( jNode ){

  
  if( jNode.is(':input') ){
    jNode.progressbar({
      value: $S(this).val()
    });
  
  } else {
    
    var size = parseInt(jNode.text());
    jNode.text('');
    jNode.height( '16' );
  
    jNode.progressbar({
      value: size
    });
  
    jNode.attr('title','Progress: '+size+' %');
    
    jNode.wgtTip({
      gravity: 's'
    });
  }
  
  jNode.removeClass('wcm_ui_progress');

});