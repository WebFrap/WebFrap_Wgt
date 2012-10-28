/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_search', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_search path: ' +jNode.getNodePath('/')  );

  jNode.removeClass('wcm_req_search');
  
  var nForm = jNode.parentX('form');
  
  if( !nForm ){
    // ist als datavalue an eine form gebunden
    var formId = jNode.getActionClass('asgd',true,'-');
    
    if(!formId){
      // ist als parameter an eine form gebunden
      formId = jNode.getActionClass('fparam',true,'-');
    }
      
    if(!formId){
      console.log("found no form for the given search element");
      return;
    }
    nForm = $S('#'+formId);
    
    //console.log("found form "+formId);
  }
  
  /*
  jNode.change(function(){
    nForm.data('start','0');
    nForm.data('begin',null);
    
    $R.form( nForm );
    return false;
  });
  */
  
  // custom event to trigger a search event
  if( jNode.is('input[type=checkbox],input[type=hidden]') ){
    
    jNode.bind( 'change', function(e) {
      nForm.data('start','0');
      nForm.data('begin',null);
      $R.form( nForm );
      return false;
    });
    
  }
  else{
    
    // on return
    jNode.keyup(function(e) {
      
      if(e.keyCode == 13) {
        nForm.data('start','0');
        nForm.data('begin',null);
        
        $R.form( nForm );
        return false;
      }
    });
  }

});