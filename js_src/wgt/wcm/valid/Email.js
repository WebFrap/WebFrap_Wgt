/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_email', function( jNode ){

  jNode.removeClass("wcm_valid_email");

  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  jNode.bind( 'change.valid_email', function(){
    if( !filter.test(jNode.val().value) ){
      jNode.addClass('state-invalid');
    }
    else{
      jNode.removeClass('state-invalid');
    }
  });


});