/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function($R,$S,$W){

  $R.getHandler().addElementHandler( 'window', function( winNodes ){

    winNodes.each(function() {

      // first check if the window should be closed
      var closeWindow = $S(this).attr("close");
      if( typeof closeWindow != 'undefined' && closeWindow == "true" ) {
        
        if( $W($S(this).attr("id")) !=  undefined ) {
          $W($S(this).attr("id")).setChanged(false);
          $W($S(this).attr("id")).close();
        }
        else {
          //alert('got request to close noexisting window '+$S(this).attr("id"));
        }
      }
      else {// if not create or recreate

        var newWin = wgt.factory.createWindowFromJQ(this);
        newWin.render();
        
        /*
        var tabLeft = newWin.getWgtWindow().find('.tab_outer_container .tab_left');
        var tabRight = newWin.getWgtWindow().find('.tab_outer_container .tab_right');
        if (tabLeft.length > 0 && tabRight.length > 0){

          tabLeft.fadeTo(0, 0.4);
          tabLeft.click(function(){
            $D.scrollTabs($S(this).parents('.tab_outer_container'), '-=150px');
          });
          tabRight.click(function(){
            $D.scrollTabs($S(this).parents('.tab_outer_container'), '+=150px');
          });
        }
        */

        newWin.setLoading();

        $S('.wgt_window.wgt-window-layer.loading').remove();
        newWin.getWgtWindow().resize();

      }

    });
  
  });

})($R,$S,$W);