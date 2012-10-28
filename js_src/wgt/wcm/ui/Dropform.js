/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_dropform', function( jNode ){

  var source = jNode.find( 'var' );
  
  var props  = source.is( 'var' )? $WGT.robustParseJSON( source.text() ) : {};
  
  
  var menuWidth = 450,
    menuItems = [];
  
  if( source.length > 0 ){
    
    jNode.click( function( event ){
      
      var nextNode = jNode.next(),
        nodeId   = jNode.attr('id');
      
      // wenn nicht vorhanden vom server laden
      if( !nextNode.is( '.'+nodeId ) ){

        var theTemplate = $R.get( props.url+'&input='+nodeId ).data;
        jNode.after( '<div class="'+nodeId+' template" >'+theTemplate+'</div>' );
        
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
          align : 'middle',
          overlayStyle: {width:menuWidth+'px'},
          menuItems   : menuItems
        });
        
        jNode.click();
      }
      
      event.stopPropagation();
          
    });
    
  }
  else{
      
    var theContentNode = $S( '.'+jNode.attr('id') );
    var theContent = $S('<div>'+theContentNode.html()+'</div>');
    
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
      overlayStyle:{width:menuWidth+'px'},
      menuItems   : menuItems
    });
    
  }
  
  jNode.removeClass('wcm_ui_dropform');
  
});