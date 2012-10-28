/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_wysiwyg', function( jNode ){

  /*
  $WGT.loadSingleFile( $C.WEB_WGT+'js_src/vendor/ckeditor/ckeditor.js' );
  $WGT.loadSingleFile( $C.WEB_WGT+'js_src/vendor/ckeditor/adapters/jquery.js' );
  */
  
  //jNode.addClass('wgt_wysiwyg');
  jNode.removeClass( 'wcm_ui_wysiwyg' );
  
  if( jNode.is( '.wgt_replaced' ) )
    return false;
  
  jNode.addClass( 'wgt_wysiwyg' );
  jNode.addClass( 'wgt_replaced' );

  var jNodeId = jNode.attr('id');

  //TODO FIX THAT SHIT with the path!
  //customConfig : $C.WEB_WGT+'js_src/vendor/ckeditor/config.js'
  try
  {
    
    var parentForm = jNode.parentX('form');
    
    // break if there is no parent form
    if( !parentForm )
    {
      var pFormId = jNode.getActionClass('asgd',true,'-');

      if( !pFormId  )
        return null;
      
      parentForm = $S('#'+pFormId);
        
    }
    
    // sicher stellen, dass der
    var oldNode = $S('#wgt_data_container').data( 'wysiwyg-'+jNodeId );
    if( oldNode ){
      CKEDITOR.remove( oldNode );
    }
        
    parentForm.append( '<span class="meta wgt_wysiwyg_flag" name="'+jNodeId+'"  ></span>' );
    
    var configClass = jNode.getActionClass('config',true);
    if( !configClass )
      configClass = 'custom';
    
    var wysiwygObj = CKEDITOR.replace( 
      jNodeId,
      {customConfig : 'config.'+configClass+'.js'}
    );  
      
    $S('#wgt_data_container').data( 'wysiwyg-'+jNodeId, wysiwygObj );
    
    // if the wysiwyg editor in a window add a onclose event to the window
    var parentWindowId = $WM.getElementWindowId( jNode );
  
    if( parentWindowId ){
      
      var parentWindow = $W(parentWindowId);
  
      parentWindow.addOnClose( 'rem_wysiwyg_'+jNodeId , function(){
        CKEDITOR.remove( wysiwygObj );
        $S('#wgt_data_container').removeData( 'wysiwyg-'+jNodeId );
      });
  
    }
    else{
      
      // if the wysiwyg editor in a tab add an onclose event to the tab
      var tabObj = $UI.tab.parentTab( jNode );
      if( tabObj ){
        
        tabObj.addOnClose( 'rem_wysiwyg_'+jNodeId, function(){
          CKEDITOR.remove( wysiwygObj );
          $S('#wgt_data_container').removeData( 'wysiwyg-'+jNodeId );
        });
      }
    }
         
  }
  catch( err ){
    $D.errorWindow('error','failed to initialize the wysiwyg editor '+err.message ); 
  }

});