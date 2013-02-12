/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_selectable', function( jNode ){

  jNode.removeClass("wcm_ui_selectable");

  jNode.click( function(){

    var theClass = jNode.prop('class');
    var cKey = $WGT.getClassByPrefix( theClass, 'node-', false );

    if (cKey) {
      
      jNode.parent().find('.'+cKey).toggleClass( 'wgt-selected' );
      
    } else {
      
      jNode.toggleClass('wgt-selected');
    }

  });
  

});

