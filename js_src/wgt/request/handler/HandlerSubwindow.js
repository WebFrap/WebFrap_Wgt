/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function($R,$S){

  $R.getHandler().addElementHandler( 'subwindow', function( childNodes ){


    childNodes.each(function() {

      // first check if the window should be closed

      var windowData = $S(this);

      var closeTab = windowData.attr("close");
      if ( !(undefined != closeTab && closeTab == "true") ) 
      {

        var tabData        = {};
        tabData.text       = windowData.attr('label');
        tabData.id         = windowData.attr('id');
        tabData.closeable  = (windowData.attr('closeable')==undefined)?false:true;
        tabData.content    = windowData.find('body').text();
        tabData.script     = windowData.find('script').text();
        $UI.tab.add('wgt-maintab',tabData);
        
      }

    });
  
  });

})($R,$S);