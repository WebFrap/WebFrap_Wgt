/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'layout_sync_height', function( jNode ){

  var dNode = jNode.get(0);

  if( $WGT.nodeType(dNode,'a') ) {
    /*    
    $S('<span class="wgt-cursor-pointer" onclick="$R.get(\''+jNode.prop('href')+'\');" >'+jNode.html()+'</span>').insertAfter( jNode );
    jNode.hide();
    */
    
    jNode.click( function() {
      $R.get(this.href+"&request=ajax");
      return false;
    });
   
   
  }
  else if( $WGT.nodeType(dNode,'form') ) {

    var inputField = jNode.find("input[type='submit']");

    //if submitField is there then continue
    if (typeof inputField == "object") {
      $S(inputField).click(function(){

        $R.form( jNode.prop('id') );
        return false;
      });   
    }
  }

  // remove the class
  jNode.removeClass('wcm_req_ajax');

});