/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_dropform', function( jNode ){

  var source = jNode.find( 'var:first' ),
    props = {};
  
  // entfernen der klasse
  jNode.removeClass('wcm_ui_dropform');

  //console.log( 'before var' );
  if (  source.is( 'var' ) ){
    props =  $WGT.robustParseJSON( source.text() );
    source.remove();
  }

  if( undefined === props.button ){
    props.button = 'Close';
  }else if( '' === props.button ){
    props.plain = true;
  }

  if( undefined === props.noBorder ){
    props.noBorder = false;
  }

  var menuWidth = 750,
    menuItems = [],
    overlayData,
    nextNode,
    nodeId,
    sizes = {
      'xsmall':250,
      'small':350,
      'medium':500,
      'big':750,
      'huge':950
    };

  //console.log( 'before in size' );

  // menu sizes
  if( undefined !== props.size && undefined !== sizes[props.size] ){
    //console.log( 'log in size '+props.size );
    menuWidth = sizes[props.size];
    console.log( jNode.attr('id')+' menu size now '+menuWidth);
  }

  props.menuWidth = menuWidth;

  if( props.url ){

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
          button      : props.button,
          plain       : props.plain,
          globalClose : false,
          noBorder    : props.noBorder,
          closeScroll : props.closeScroll,
          align : 'middle',
          overlayStyle: {"width":props.menuWidth+'px'},
          menuItems   : menuItems
        });

        jNode.click();
      }

    });

  } else {

    nextNode = jNode.next();
    nodeId   = jNode.attr('id');

    overlayData = jNode.data( 'mini-menu-overlay' );
      
    // der nächste node muss als klasse die id des triggers haben
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
      button : props.button,
      plain : props.plain,
      globalClose : false,
      noBorder : props.noBorder,
      closeScroll : props.closeScroll,
      overlayStyle:{"width":props.menuWidth+'px'},
      menuItems : menuItems
    });

  }


});