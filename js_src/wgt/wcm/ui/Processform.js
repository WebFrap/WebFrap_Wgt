/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_processform', function( jNode ){


  jNode.click(function( event ){
    
    var nextNode = jNode.next();
    var nodeId   = jNode.attr('id');
    
    if( !nextNode.is( '.'+nodeId ) ){

      $R.get( jNode.find('var').text()+'&input='+nodeId );
      
      var theContentNode = $S( '.'+nodeId );
      var theContent = $S( '<div>'+theContentNode.html()+'</div>' );
      
      var menuWidth = menuWidth = 450;

      var menuItems = [];
      
      
      theContent.find(':input').removeClass('flag-template');

      ///TODO add i from search form to make order persistent
      menuItems.push({
        type    : 'html',
        content : theContent.html()
      });

      jNode.miniMenu({
        button      : 'Close',
        globalClose : false,
        align : 'middle',
        overlayStyle:{width:menuWidth+'px'},
        menuItems   : menuItems
      });
      
      event.stopPropagation();
      
      jNode.click();
    }
    
    return false;
    
  });
  
  jNode.removeClass('wcm_ui_processform');
  
});