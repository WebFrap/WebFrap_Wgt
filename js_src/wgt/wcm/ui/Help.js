/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_help', function( jNode ){


  jNode.removeClass("wcm_ui_help");
  
  var tmpC = jNode.getActionClass( 'dkey',false );

  if(!tmpC)
    return;

  jNode.click(function(){
    $D.help(tmpC);
  });

});