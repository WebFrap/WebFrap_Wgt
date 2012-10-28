/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_page_size', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_page_size path: ' +jNode.getNodePath('/')  );
  
  try{
    
    var classNames  = jNode.prop("class").split(" ");
    var formId      = null;
  
    for(var i in classNames){
  
      if(classNames[i].toString().indexOf("wgt-form") != -1){
  
        formId = classNames[i];
        break; // break after the first match
      }
    }
    jNode.change(function(){
      
      if ($S('form#'+formId).data('changed')){
        
        $S('form#'+formId).data('change_handler')( function (){ 
          $S('form#'+formId).data('qsize',jNode.val());
          $S('form#'+formId).data('start','0');
          $R.form(formId);
          return false;
           
        });
      }
      else{
        
        $S('form#'+formId).data('qsize',jNode.val());
        $S('form#'+formId).data('start','0');
        $R.form(formId);        
      }
      return false;
    });
  }
  catch( err ){
    
    $D.errorWindow(err.description);
    return false;
  }

  jNode.removeClass( 'wcm_req_page_size' );

});