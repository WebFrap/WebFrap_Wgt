/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   code lang: english
 *   naming style: camel case
 * 
 */

/**
 * @author Milos Kosanovic  <milos.kosanovic@webfrap.net>
 * @param jNode the jQuery Object of the target node
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
      onShow: function (colpkr){
        (jQuery)(colpkr).fadeIn(600);
        return false;
      },
      onHide: function (colpkr){
        (jQuery)(colpkr).fadeOut(500);
        return false;
      },
      onSubmit: function (hsb, hex, rgb ){
        jNode.val('#'+hex);
        //$S(el).ColorPickerHide();
      },
      onChange: function (hsb, hex, rgb ){
        jNode.parent().css( 'backgroundColor', '#'+ hex );
        jNode.val( '#'+ hex );
      }
    })
    .bind( 'keyup', function(){
	$S(this).ColorPickerSetColor( jNode.val() );
    })
    .removeClass('wcm_ui_color_picker');
      
    // Kann auch über einen Button getriggert werden
    if( tmpProps.button ){
      $S('#'+tmpProps.button).click( function(){
        jNode.click();
      });
    }

});
