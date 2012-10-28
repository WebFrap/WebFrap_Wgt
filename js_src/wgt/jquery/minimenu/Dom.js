/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch
 * @quality good
 */
(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['dom'] = function( element, menuBody, targetElement ){
    
	var id = element.content.attr('id');

	var dNode = element.content.get( 0 );
	var menuDom = menuBody.get( 0 );
	
	menuDom.appendChild( dNode );
	  
    $S( '#'+id ).wrap( '<div class="miniMenuMenuButton" />' );
    
  };


})($S);
