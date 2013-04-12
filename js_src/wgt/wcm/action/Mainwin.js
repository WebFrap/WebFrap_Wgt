/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_mainwin', function( jNode ){

  jNode.click(function(){
    
    $D.openBrowserWindow({
      'src':this.href,
      'width':1000,
      'height':600,
      'title':this.title
    });
    return false;
  });
  
  
  jNode.removeClass("wcm_req_mainwin");

});