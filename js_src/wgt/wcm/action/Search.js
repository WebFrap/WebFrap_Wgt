/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_search', function( jNode ){
  

  jNode.removeClass('wcm_req_search');
  
  var nForm = jNode.parentX('form');
  
  if( !nForm ){
    // ist als datavalue an eine form gebunden
    var formId = jNode.getActionClass('asgd',true,'-');
    
    if(!formId){
      // ist als parameter an eine form gebunden
      formId = jNode.getActionClass('fparam',true,'-');
    }
      
    if( !formId ){
      console.log("found no form for the given search element");
      return;
    }
    nForm = $S('form#'+formId);
    
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
  
  var evAction = function(e) {
    nForm.data('start','0');
    nForm.data('begin',null);
    $R.form( nForm );
    e.preventDefault();
    return false;
  };
  
  // custom event to trigger a search event
  if( jNode.is('input[type=checkbox],input[type=hidden]') ){
    
    jNode.bind( 'change', evAction );
    
  }
  else{
    
    // on change & on return
    jNode.bind( 'change', evAction ).keydown(function(e) {
      
      var fTrigger = false;
      if(e.keyCode === $S.ui.keyCode.RETURN ) {

        nForm.data('start','0');
        nForm.data('begin',null);
        $R.form( nForm );
        e.preventDefault();
        return false;
      }

    }).keyup(function(e) {
        
        if( e.keyCode === $S.ui.keyCode.ESCAPE ){
          jNode.val('');
          nForm.data('start','0');
          nForm.data('begin',null);
          $R.form( nForm );
          e.preventDefault();
          return false;
        }
  
    });
  }

});