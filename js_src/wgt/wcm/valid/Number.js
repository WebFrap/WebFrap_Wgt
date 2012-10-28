/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_number', function( jNode ){

  jNode.removeClass("wcm_valid_number");

  jNode.bind( 'change.valid_number', function(){
    jNode.val( jNode.val().replace(/[^0-9,.-]/gi,'') );
  });

});

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_numeric', function( jNode ){

  jNode.removeClass("wcm_valid_numeric");

  jNode.bind( 'change.valid_numeric', function(){
    jNode.val( jNode.val().replace(/[^0-9,.-]/gi,'') );
  });

});