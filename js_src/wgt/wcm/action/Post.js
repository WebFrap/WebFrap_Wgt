/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_post', function( jNode ){

  if( $C.DEBUG.WCM.ACTION )
    console.log( 'wcm req_post path: ' +jNode.getNodePath('/')  );

  if(!(jNode.is('a')||jNode.is('button')))
    return;

  if( jNode.is('a') ){

    jNode.click( function(){

      $R.post(this.href+"&request=ajax");
      return false;
    });

  }
  else{

    jNode.click(function(){
      $R.post( jNode.attr("value")+"&request=ajax" );
      return false;
    });
  }

  jNode.removeClass("wcm_req_post");

});

$R.addAction( 'req_post_selection', function( jNode ){

  jNode.click(function(){

    var postHref = this.href;


    $S( jNode.attr( 'wgt_elem' ) ).find( 'tr.wgt-selected' ).each(function(){
      postHref += '&slct[]='+$S(this).attr('wgt_eid');
    });

    $R.post(postHref+"&request=ajax",{});

    return false;

  });
  jNode.removeClass("wcm_req_post_selection");

});