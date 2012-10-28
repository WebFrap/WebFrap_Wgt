/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_docu_tip', function( jNode ){


  var docSrc = jNode.attr( 'wgt_doc_src' );
  var docCnt = jNode.attr( 'wgt_doc_cnt' );

  jNode.mouseenter( function(){
    $S( '#'+docCnt ).html( $S( '#'+docSrc ).html() );
  });

  jNode.removeClass("wcm_ui_docu_tip");

});