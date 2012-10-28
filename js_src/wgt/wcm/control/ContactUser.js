/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Action zum öffnen eines Message Windows zum Konktaktieren des Users
 * 
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_contact_user', function( jNode ){

  jNode.removeClass("wcm_control_contact_user");

  jNode.bind( 'click.contact_user', function(){
    var aNode = $S(this);
    
    $R.get( $C.urls.contact_user+aNode.attr('wgt_eid') );
  });

});