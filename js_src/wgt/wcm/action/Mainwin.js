/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_mainwin', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_mainwin path: ' +jNode.getNodePath('/')  );

  jNode.click(function(){
    
    $R.get(this.href+"&request=mainwindow");
    return false;
  });
  jNode.removeClass("wcm_req_mainwin");

});