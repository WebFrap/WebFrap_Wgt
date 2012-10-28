/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Milos Kosanovic 
 */
$R.addAction( 'ui_color_picker', function( jNode ){
  
  jNode.parent().css( 'backgroundColor', jNode.val() );
  
  var tmp = jNode.next();
  var tmpProps = tmp.is('var') 
    ? $WGT.robustParseJSON(tmp.text())
    :{};
  
  jNode.ColorPicker({
      color: '#0000ff',
      //flat: true,
      onShow: function (colpkr) 
      {
        (jQuery)(colpkr).fadeIn(600);
        return false;
      },
      onHide: function (colpkr) 
      {
        (jQuery)(colpkr).fadeOut(500);
        return false;
      },
      onSubmit: function (hsb, hex, rgb ) 
      {
        jNode.val('#'+hex);
        //$S(el).ColorPickerHide();
      },
      onChange: function (hsb, hex, rgb ) 
      {
        jNode.parent().css( 'backgroundColor', '#'+ hex );
        jNode.val( '#'+ hex );
      }
    })
    .bind( 'keyup', function(){
	$S(this).ColorPickerSetColor( jNode.val() );
    })
    .removeClass('wcm_ui_color_picker');
      
    // Kann auch über einen Button getriggert werden
    if( tmpProps.button )
    {
      $S('#'+tmpProps.button).click( function(){
        jNode.click();
      });
    }

});
