/* Licence see: /LICENCES/wgt/licence.txt */

(function( $S, $R ) {

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   * @param jNode the jQuery Object of the target node
   */
  $R.addAction( 'ui_dbl_list_selector', function( jNode ){

    jNode.removeClass( "wcm_ui_dbl_list_selector" );

    var settings = {};

    try{

      var cfgData = $S( 'var#'+jNode.attr('id')+'-cfg-dbl_list' );
      
      if( cfgData.is('var') ){
        settings = $WGT.robustParseJSON( cfgData.text() );
        cfgData.remove();
      }
      else{
        settings = {};
      }

    }
    catch(err){
      
      if( undefined !== $D )
        $D.errorWindow( 'UI Error', err.description );
    }
    
    jNode.dblListSelector( settings );
    
  });

  
})( jQuery, $R );





