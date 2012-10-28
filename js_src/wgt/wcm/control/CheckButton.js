/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_check_button', function( jNode ){

  jNode.removeClass( "wcm_control_check_button" );
  
  var inpNode = jNode.find( 'input' );
  
  if( inpNode.is( ':checked' ) ){
    jNode.addClass( 'active' );
  }

  // togle check onclick
  jNode.click( function( event ){
	  
    console.log( 'click '+inpNode.attr('name') );
	  
    if( inpNode.is( ':checked') ){
      
      inpNode.attr( 'checked', false );
      jNode.removeClass( 'active' );
      inpNode.change();
      
    }
    else{
      
      inpNode.attr( 'checked', 'checked' );
      inpNode.val(1);
      jNode.addClass( 'active' );
      inpNode.change();
      
    }
    
    event.stopPropagation();
      
  });

});