/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Uniqueness check
 * 
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_unique', function( jNode ){

  jNode.removeClass("wcm_valid_unique");
  
  // nur auf textarea und inputs verwenden
  // bei selectboxen wäre das vermutlich bescheiden
  if( jNode.is('input') || jNode.is('textarea') ){

    if( false == $R.get(jNode.attr('wgt_cksrv')).data ){
      jNode.addClass( 'state-warn' );
      jNode.attr('title',"Value allready exists");
    }
    else{
      jNode.addClass( 'state-ok' );
    }
    
    jNode.bind( 'change.valid_unqiue', function(){
      if( '' == ''+jNode.val() ){
        jNode.removeClass( 'state-ok' );
        jNode.addClass( 'state-warn' );
        jNode.attr('title',"Value allready exists");
      }
      else{
        jNode.removeClass( 'state-warn' );
        jNode.addClass( 'state-ok' );
        jNode.attr('title',"Insert value");
      }
        
    });
  
  }
  

});