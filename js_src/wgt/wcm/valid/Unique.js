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

    jNode.bind( 'change.valid_unqiue', function(){
      
      if ('' == ''+jNode.val()) {
        
        jNode.removeClass('not-unique');
        jNode.addClass('state-ok');
        jNode.attr('title',"Insert value");
        
        if(jNode.next().is('i.icon-ban-circle')){
          jNode.next().is('i.icon-ban-circle').remove();
        }
        
      } else {
        
        if (1 == $R.get(jNode.attr('wgt_cksrv')+'&val='+jNode.val()).data) {
          
          jNode.addClass( 'not-unique' );
          jNode.removeClass( 'state-ok' );
          jNode.attr('title',"Value allready exists");
          jNode.after('<i class="icon-ban-circle" ></i>');
        
        } else {
          
          jNode.addClass( 'state-ok' );
          jNode.removeClass('not-unique');
          jNode.attr('title',"Insert value");
          
          if(jNode.next().is('i.icon-ban-circle')){
            jNode.next().remove();
          }
          
        }
      }
        
    });
  
  }
  

});