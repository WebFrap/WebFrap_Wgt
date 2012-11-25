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
  
  var funcCheckB = function( event ){
         
    console.log( 'click '+inpNode.attr('name') );
    var fCounter = null;
         
    if( inpNode.is( ':checked') ){
      
      fCounter = $S('#'+jNode.attr('wgt_counter'));  
      fCounter.text(  parseInt(fCounter.text()) - 1 );
      
      inpNode.attr( 'checked', false );
      jNode.removeClass( 'active' );
      inpNode.change();
      
    }
    else{
      
      fCounter = $S('#'+jNode.attr('wgt_counter'));  
      fCounter.text(  parseInt(fCounter.text()) + 1 );
      
      inpNode.attr( 'checked', 'checked' );
      inpNode.val(1);
      jNode.addClass( 'active' );
      inpNode.change();
      
    }
    
    event.stopPropagation();
      
  };
  
  // togle check onclick
  jNode.bind( 'mouseup',  funcCheckB );
  inpNode.bind( 'mouseup',  funcCheckB );

});