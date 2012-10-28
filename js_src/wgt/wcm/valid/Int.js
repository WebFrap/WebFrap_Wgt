/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_int', function( jNode ){

  jNode.removeClass("wcm_valid_int");

  jNode.bind( 'change.valid_int', function(){
    jNode.val( jNode.val().replace(/[^0-9]/gi,'') );
  });


});