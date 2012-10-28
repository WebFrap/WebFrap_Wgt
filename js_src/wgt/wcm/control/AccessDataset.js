/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_access_dataset', function( jNode ){

  jNode.removeClass( "wcm_control_access_dataset" );
  jNode.addClass( 'wgt-clickable' );

  jNode.dblclick( function(){
    $R.get( jNode.attr( 'wgt_url' ) );
  });

});