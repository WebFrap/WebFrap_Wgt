/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Check ob das Inputelement leer ist.
 * Funktionier aktuell nur für input elemente
 * 
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_required', function( jNode ){

  jNode.removeClass("wcm_valid_required");
  
  // nur auf textarea und inputs verwenden
  if( jNode.is('input') || jNode.is('textarea') ){

    if ( '' == ''+jNode.val().trim() ){
      jNode.addClass( 'state-warn' );
    } else{
      jNode.addClass( 'state-ok' );
    }
    
    jNode.bind( 'change.valid_required', function(){
      if( '' == ''+jNode.val() ){
        jNode.removeClass( 'state-ok' );
        jNode.addClass( 'state-warn' );
      } else{
        jNode.removeClass( 'state-warn' );
        jNode.addClass( 'state-ok' );
      }
        
    });
  
  } else if(jNode.is('select')) {

    var slctVal = ''+jNode.find(':selected').attr('value');
    if( '' == slctVal.trim() ){
      $S('#display-'+jNode.attr('id')).addClass( 'state-warn' );
    }
    else{
      $S('#display-'+jNode.attr('id')).addClass( 'state-ok' );
    }
    
    jNode.bind( 'change.valid_required', function(){
      
      slctVal = ''+jNode.find(':selected').attr('value');
      if( '' == slctVal.trim() ){
        $S('#display-'+jNode.attr('id')).removeClass( 'state-ok' );
        $S('#display-'+jNode.attr('id')).addClass( 'state-warn' );
      }
      else{
        $S('#display-'+jNode.attr('id')).removeClass( 'state-warn' );
        $S('#display-'+jNode.attr('id')).addClass( 'state-ok' );
      }
        
    });
    
  }
    


});