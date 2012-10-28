/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_modal', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_modal path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_req_modal");
  
  if(!(jNode.is('a')||jNode.is('button')))
    return;
  
  if( jNode.is('a') ){

    
    jNode.click( function(){
      
      $R.get(this.href+"&request=modal");
      return false;
    });
    
  }
  else{
    
    jNode.click(function(){
      
      $R.get( jNode.attr("value")+"&request=modal" );
      return false;
    });
  }  


});