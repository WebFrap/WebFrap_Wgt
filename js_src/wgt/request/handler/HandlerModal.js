/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $R, $S ){

  $R.getHandler().addElementHandler( 'modal', function( childNodes ){

    childNodes.each(function(){
      
      $S.modal.close();

      var modalNode = $S(this);
      var modalBody = modalNode.find('body');
      var modalScript = modalNode.find('script').text();
      
      var title = modalNode.attr('title');
      if( title )
        $D.setTitle( title );
      
      var settings = {
          overlayClose: true,
          opacity:10
      };
      
      var mW = modalNode.attr('width');
      var mH = modalNode.attr('height');
      
      settings.minWidth = mW?parseInt(mW):600;
      settings.minHeight = mH?parseInt(mH):360;
      //settings.onClose = function(){ $D.closeView(); };
      
      console.log( "minw: "+settings.minWidth+" maxw: "+settings.minHeight );
        
      var modalObj = $S.modal( modalBody.text(), settings  );
      
      if( modalScript )
        (new Function("self",modalScript))( $S('#simplemodal-container') );

    });
  
  });

})( $R, $S );