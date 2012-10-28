/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */

(function($S,$R){

  var actions ={
     'append':function(selector,text){
       
       if($S(selector).length>0){
         $S(selector).append( text );
       }
     }, 
     'prepend':function(selector,text){

       if($S(selector).length>0){
         $S(selector).prepend( text );
       }
       
     }, 
     'replace':function(selector,text){
       
       if($S(selector).length>0){
         $S(selector).replaceWith( text );
       }
     }, 
     'value':function(selector,text){
       
       if($S(selector).length>0){
         $S(selector).val( text );
       }
     },
     'html':function(selector,text){

       if($S(selector).length>0){
         $S(selector).html( text );
       }
     }, 
     'addClass':function(selector,text){$S(selector).addClass( text );},  
     'before':function(selector,text){$S(selector).before( text );}, 
     'after':function(selector,text){$S(selector).after( text );},
     'eval':function(selector,text){eval( text );},
     'function':function(selector,text){(new Function("self",text))( $S(selector) );},
     'alert':function(selector,text){alert( text );},
     'remove':function(selector){$S(selector).remove();}
  };

  $R.getHandler().addElementHandler( 'htmlArea', function( htmlAreas ){

    if( htmlAreas.get().length > 0 ) {

      htmlAreas.each(function() {
 
        var htmlArea     = $S(this);
        var action       = htmlArea.attr('action');
        var areaId       = htmlArea.attr('selector');
         
        if( $C.DEBUG.REQUEST )
          console.log( "Handle request, got area: "+areaId+' action: '+action );

        var checkSelector = $S.trim( htmlArea.attr('check') );
        if( '' == checkSelector )
          checkSelector = false;
        
        var actionElse = $S.trim( htmlArea.attr('else') );
        if( ''==actionElse )
          actionElse = false;
        
        var checkNot  = $S.trim( htmlArea.attr('not') );
        checkNot = ('true'==checkNot)?true:false
        
        if( !action || typeof action != 'string' || actions[action] === undefined ){
          
          $D.errorWindow('Sorry an Error Occured','Requested nonexisting Action: '+action);
        }
        else{
          
          if( checkSelector ){
            
            if( checkNot ){
              
              console.log("check not "+checkSelector);
              if( $S(checkSelector).length==0 ){
                
                actions[action](areaId, htmlArea.text());
              }
              ///TODO need some warning here?
              else if( actionElse && actions[actionElse] !== undefined ){
                
                actions[actionElse](checkSelector, htmlArea.text());
              }
            }
            else{
              
              if($S(checkSelector).length>0){
                
                actions[action](areaId, htmlArea.text());
              }
              ///TODO need some warning here?
              else if( actionElse && actions[actionElse] !== undefined ){
                
                actions[actionElse](checkSelector, htmlArea.text());
              }
            }
          }
          else{
            
            actions[action](areaId, htmlArea.text());
          }
        }

      });
    }
    
    if( $C.DEBUG.REQUEST )
      console.log( "Handled all areas" );
  
  });

})($S,$R);