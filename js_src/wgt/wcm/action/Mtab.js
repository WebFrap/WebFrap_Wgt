/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_mtab', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_mtab path: ' +jNode.getNodePath('/')  );

  jNode.removeClass("wcm_req_mtab");
  
  if(!(jNode.is('a')||jNode.is('button')))
    return;
  
  if( jNode.is('a') ){
    /*
    $S('<span class="wgt-cursor-pointer" onclick="$R.get(\''+jNode.prop('href')+'&request=maintab\');" >'+jNode.html()+'</span>').insertAfter( jNode );
    jNode.hide();
    */
    
    jNode.click( function(){
      
      $R.get(this.href+"&request=maintab");
      return false;
    });
    
  }
  else{
    
    jNode.click(function(){
      $R.get( jNode.attr("value")+"&request=maintab" );
      return false;
    });
  }  


});