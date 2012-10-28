/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Implementierung eines Split Buttons
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_split_button', function( jNode ){


  // parse the config
  var userSettings = {triggerEvent: 'click',align:'right'};
  var nodeId       = jNode.prop('id');
  jNode.addClass('wgt-split-button');

  if( jNode.parent().is('td') ){
    jNode.parent().css('text-align','left');
  }

  try{
    
    console.log( 'found confs '+ jNode.find( 'var#'+nodeId+'-cfg-split' ).length );

    var cfgNode = $S( 'var#'+nodeId+'-cfg-split' );
	  
    var tmp = null;
    
    if( cfgNode.length ){
      tmp = $WGT.robustParseJSON( cfgNode.text() );
      userSettings = tmp;
      cfgNode.remove();
    }

  }
  catch( err ){

    console.error( 'Parse cfg control.split.button: '+ err );
  }
	
  jNode.find('button.append').dropdown( userSettings );
  
  jNode.removeClass('wcm_control_split_button');
  
});