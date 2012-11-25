/* Licence see: /LICENCES/wgt/licence.txt */


/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_context_menu', function( jNode ){

  jNode.removeClass("wcm_control_context_menu");

  var varData 	 = jNode.next();
  var useActions = jNode.attr('wgt_actions');


  var settings = varData.is('var') 
  ? $WGT.robustParseJSON( varData.text() )
  : {menu:jNode.attr('wgt_context_menu')};
  
  // Add contextMenu class
  var contextNode = $S( '#'+settings.menu );
  
  if( !contextNode.length ){
    console.log( 'Got no Contextmenu for #'+settings.menu );
    return false;
  }
 
  if( !contextNode.parent().is('#wgt-context-container') )
    $S('#wgt-context-container').append( contextNode );

  var actions = jNode.find('var.actions');
  
  if( actions )
    settings.actions = actions.text();

  jNode.contextMenu(
    settings,
    function( action, el, pos) {
      
      var actions = $S('#'+settings.menu).data('wgt-context-action');
      
      if( undefined === actions ){
        console.log( 'Missing Context Menu Actions for '+prop.attr('id')+' #'+settings.menu );
        return false;
      }

      if( undefined !== actions[action] ){
        var eid = jNode.attr('wgt_eid');
        actions[action]( el, pos, eid );
      }
      else{
        console.log( 'Missing Context Menu Action '+action );
      }
      
      return false;

    },
    useActions
  );

});