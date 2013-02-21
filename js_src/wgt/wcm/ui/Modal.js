/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Marko Andrijasevic
 * @param jNode the jQuery Object of the target node
 */
$R.addAction('ui_modal', function(jNode) {

  var user = {};
  var settings = {
    modal : true,
    draggable : false,
    resizable : false
  };

  try {
    user = jNode.next().is('var.c-modal') ? $WGT.robustParseJSON(jNode.next().text()) : {};
  } catch (err) {
    $D.errorWindow('UI Error', err.description);
  }

  // $S.extend( true, settings, user );

  jNode.dialog(settings);
  jNode.removeClass('ui_modal');

});
