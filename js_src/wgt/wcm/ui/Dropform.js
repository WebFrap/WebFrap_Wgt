/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_dropform', function( jNode ){

  var source = jNode.find( 'var' );

  var props  = source.is( 'var' )? $WGT.robustParseJSON( source.text() ) : {};


  var menuWidth = 750,
    menuItems = [],
    overlayData,
    nextNode,
    nodeId,
    sizes = {
      'small':250,
      'medium':500,
      'big':750,
      'huge':950
    };

  // menu sizes
  if( undefined !== props.size && undefined !== sizes[props.size] ){
    menuWidth = sizes[props.size];
  }

  if( source.length > 0 ){

    jNode.click( function( event ){

      nextNode = jNode.next();
      nodeId   = jNode.attr('id');

      overlayData = jNode.data( 'mini-menu-overlay' );

      if( !overlayData && nextNode.is( '.'+nodeId ) ){
        overlayData = nextNode.html();
        jNode.data( 'mini-menu-overlay', overlayData );
      }

      // wenn nicht vorhanden vom server laden
      if( !overlayData && props.url  ){  //!nextNode.is( '.'+nodeId ) ){

        var theTemplate = $R.get( props.url+'&input='+nodeId ).data;
        props.url = null; // sicher stellen, dass wir in keiner endlosschleife landen
        jNode.data( 'mini-menu-overlay', theTemplate );

        //var theContentNode = $S( '.'+nodeId );
        var theContent = $S( '<div>'+theTemplate+'</div>' );

        theContent.find( ':input' ).removeClass( 'flag-template' );

        ///TODO add i from search form to make order persistent
        menuItems.push({
          type    : 'html',
          content : theContent.html()
        });

        jNode.miniMenu({
          button      : 'Close',
          plain       : false,
          globalClose : false,
          closeScroll : props.closeScroll,
          align : 'middle',
          overlayStyle: {width:menuWidth+'px'},
          menuItems   : menuItems
        });

        jNode.click();
      }

    });

  }
  else{

    nextNode = jNode.next();
    nodeId   = jNode.attr('id');

    overlayData = jNode.data( 'mini-menu-overlay' );

    if( !overlayData && nextNode.is( '.'+nodeId ) ){
      overlayData = nextNode.html();
      jNode.data( 'mini-menu-overlay', overlayData );
      nextNode.remove();
    }

    //var theContentNode = $S( '.'+jNode.attr('id') );
    var theContent = $S('<div>'+overlayData+'</div>');

    theContent.find(':input').removeClass('flag-template');

    ///TODO add i from search form to make order persistent
    menuItems.push({
      type    : 'html',
      content : theContent.html()
    });

    jNode.miniMenu({
      button      : 'Close',
      plain 	    : false,
      globalClose : false,
      closeScroll : props.closeScroll,
      overlayStyle:{width:menuWidth+'px'},
      menuItems   : menuItems
    });

  }

  jNode.removeClass('wcm_ui_dropform');

});