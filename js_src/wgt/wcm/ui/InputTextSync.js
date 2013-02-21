/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 * @todo doku, was genau sollte das denn machen?
 */
$R.addAction( 'input_text_sync', function( jNode ){

  jNode.removeClass("wcm_input_text_sync");

  jNode.bind( 'change.input_text_sync', function(){

    var trgtId = jNode.attr('wgt_target'),
      prepend = jNode.attr('wgt_prepend')||'',
      append = jNode.attr('wgt_append')||'';
    
    $S( '#'+trgtId ).text( prepend+jNode.val()+append );
    
  });

});