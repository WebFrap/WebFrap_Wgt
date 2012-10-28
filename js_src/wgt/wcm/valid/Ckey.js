/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'valid_ckey', function( jNode ){

  jNode.removeClass("wcm_valid_ckey");
  
  // alles ersetzen was kein buchstabe, zahl oder -_ ist
  jNode.bind( 'change.valid_ckey', function(){
    jNode.val( jNode.val().replace(/[^a-zA-Z0-9_\-]/gi,'') );
  });

});

