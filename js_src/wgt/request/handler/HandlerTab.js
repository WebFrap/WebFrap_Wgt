/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function($R,$S){

  $R.getHandler().addElementHandler( 'tab', function( childNodes ){
    
    childNodes.each(function() {

      // first check if the window should be closed

      var tabObj = $S(this);

      var closeTab = tabObj.attr("close");
      
      if( undefined != closeTab && closeTab == "true"){
        
        console.log('Close Tab: '+tabObj.attr("id"));
        $UI.tab.remove('wgt-maintab',tabObj.attr("id"));
      }

    });

    childNodes.each(function() {

      // first check if the window should be closed

      var tabObj = $S(this);
      
      $UI.tab.removeIfExists('wgt-maintab',tabObj.attr("id"));
      
      var title = tabObj.attr('title');
      if( title )
        $D.setTitle( title );

      var closeTab = tabObj.attr("close");
      if( !(undefined != closeTab && closeTab == "true") ){
        
        console.log('Open Tab: '+tabObj.attr("id"));

        var tabData        = {};
        tabData.text       = tabObj.attr('label');
        tabData.id         = tabObj.attr('id');
        tabData.closeable  = (tabObj.attr('closeable')==undefined)?false:true;
        tabData.content    = tabObj.find('body').text();
        tabData.script     = tabObj.find('script').text();
        $UI.tab.add( 'wgt-maintab', tabData );
        
      }

    });
  
  });

})($R,$S);