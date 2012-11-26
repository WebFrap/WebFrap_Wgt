/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $R, $S ){

  $R.getHandler().addElementHandler( 'modal', function( childNodes ){

    childNodes.each(function(){
      
      $S.modal.close();

      var modalNode = $S(this);
      var modalBody = modalNode.find('body'),
        modalScript = modalNode.find('script').text(),
        title = modalNode.attr('title'),
        mW = modalNode.attr('width'),
        mH = modalNode.attr('height'),
        modalObj = null,
        settings = {
            overlayClose: true,
            opacity:10
        };
      
      if( title ){
        $D.setTitle( title );
      }

      settings.minWidth = mW?parseInt(mW):600;
      settings.minHeight = mH?parseInt(mH):360;
      //settings.onClose = function(){ $D.closeView(); };

      modalObj = $S.modal( modalBody.text(), settings  );
      
      if( modalScript ){
        (new Function("self",modalScript))( $S('#simplemodal-container') );
      }

    });
  
  });

})( $R, $S );