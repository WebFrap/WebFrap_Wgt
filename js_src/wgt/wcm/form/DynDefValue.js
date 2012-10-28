/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @todo doku, was genau sollte das denn machen?
 */
$R.addAction( 'form_dyn_def_value', function( jNode ){

  jNode.removeClass("wcm_form_dyn_def_value");

  if( '' == ''+jNode.val() ){

    var idDefSource = jNode.attr('wgt_def_src');
    var defSrcObj = $S( '#'+idDefSource );

    if( '' != ''+defSrcObj.val() ){
      jNode.val( defSrcObj.val().replace(/[^a-z0-9_]/gi,'').toLowerCase() );
    }

    defSrcObj.bind( 'change.dyn_def_value', function(){
      jNode.val( defSrcObj.val().replace(/[^a-z0-9_]/gi,'').toLowerCase() );
    });

    jNode.bind( 'change.dyn_def_value', function(){
      defSrcObj.unbind( 'change.dyn_def_value' );
      jNode.unbind( 'change.dyn_def_value' );
    });


  }


});