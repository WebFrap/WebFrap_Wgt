/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
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