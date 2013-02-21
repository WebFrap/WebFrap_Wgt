/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_money', function( jNode ){

  jNode.removeClass('wcm_ui_money');
  
  if( 0 > parseInt(jNode.val()) ){
    jNode.addClass( 'wgt-negativ' );
  }
  
  jNode.change(function(){
    if( 0 > parseInt( jNode.val()) ){
      jNode.addClass( 'wgt-negativ' );
    }
    else{
      jNode.removeClass( 'wgt-negativ' );
    }
  });

});