/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_page', function( jNode ){
  
  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_page path: ' +jNode.getNodePath('/')  );
  
  try{
    
    var classNames = jNode.prop("class").split(" ");
    var formId = null;
  
    for(var i in classNames){
      
      if(classNames[i].toString().indexOf("wgt-form") != -1){
        
        formId = classNames[i];
        break; // break after the first match
      }
    }
  
    // if the link has parent td, it should be clickable
    var td = jNode.parent().parent()[0];
     if( window.$B.nodeType(td,'td')) 
        var link=td;
     else
        var link=jNode.get();
  
    if( formId == null ||  $S('#'+formId).length == 0 ){
  
      $S(link).click(function(){
        $R.get(jNode.prop('href')+'&request=ajax');
        return false;
      });
    }
    else {
  
      var tmp = jNode.prop('href').split('=');
      //fix for ie
      tmp[0] = tmp[0].substring((tmp[0].length-1), tmp[0].length);
  
      if( 'b' == tmp[0] ){
        
        $S(link).click(function(){
          
          if ($S('form#'+formId).data('changed')){
           
            $S('form#'+formId).data('change_handler')( function (){ 
              
              $S('form#'+formId).data('start','0');
              $S('form#'+formId).data('begin',tmp[1]);
              //$S('form#'+formId).data('next',0);
              $R.form( formId ); 
              return false;
              
            }); 
              
             
          }
          else{
           
            $S('form#'+formId).data('start','0');
            $S('form#'+formId).data('begin',tmp[1]);
            //$S('form#'+formId).data('next',0);
            $R.form( formId ); 
          
          }
          return false;
        });
      }
      else{
  
        if('p' == tmp[0]){
  
          $S(link).click(function(){
            
            if ($S('form#'+formId).data('changed')){
              
              $S('form#'+formId).data('change_handler')( function (){
                $S('form#'+formId).data('start',tmp[1]);
                //$S('form#'+formId).data('next',0);
                $R.form( formId );
                return false;
               
              });                        
            }
            else{
              
             $S('form#'+formId).data('start',tmp[1]);
             //$S('form#'+formId).data('next',0);
             $R.form( formId );
            }
            return false;
          });
        }
        else{
  
          $S(link).click(function(){
            
            if( $S('form#'+formId).data('changed') ){
              
              $S('form#'+formId).data('change_handler')( function (){
                $S('form#'+formId).data('next',tmp[1]);
                $S('form#'+formId).data('start','0');
                $R.form( formId );
                return false;
              }); 
            }
            else{
              
              $S('form#'+formId).data('next',tmp[1]);
              $S('form#'+formId).data('start','0');
              $R.form( formId );
            }
            return false;
          });
        }
      }
    }

  }
  catch( err ){
    
    $D.errorWindow(err.description);
    return false;
  }
  
  jNode.removeClass( 'wcm_req_page' );

});