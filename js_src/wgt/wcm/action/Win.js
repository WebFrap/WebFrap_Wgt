/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_win', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_win path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_req_win");
  
  if(!(jNode.is('a')||jNode.is('button')))
    return;
  
  
  if( jNode.is('a') ){

    jNode.click( function(){
      
      $R.get(this.href+"&request=window");
      return false;
    });
    
  }
  else{
    
    jNode.click(function(){
      $R.get(this.href+"&request=window");
      return false;
    });
  }  

});