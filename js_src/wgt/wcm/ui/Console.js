/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_console', function( jNode ){

  jNode.removeClass("wcm_ui_console");

  jNode.draggable();
  jNode.resizable({
    helper: "ui-resizable-helper",
    ghost: true
  });

  
  //jNode.button();
  //jNode.addClass('ui-state-default ui-corner-all');

});