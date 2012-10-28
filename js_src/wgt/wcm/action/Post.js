/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_post', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_post path: ' +jNode.getNodePath('/')  );
  
  if(!(jNode.is('a')||jNode.is('button')))
    return;
  
  if( jNode.is('a') ){

    jNode.click( function(){
      
      $R.post(this.href+"&request=ajax");
      return false;
    });
    
  }
  else{
    
    jNode.click(function(){
      $R.post( jNode.attr("value")+"&request=ajax" );
      return false;
    });
  }  

  jNode.removeClass("wcm_req_post");

});