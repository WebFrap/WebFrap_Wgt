/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['reload'] = function( element, menuBody, targetElement ){

    // undefined and everything else will fail
    // only true is fine
    var checked = '';
    if( true === element.checked ) {
      checked = 'checked="checked"';
    }

    var content =  '<div class="miniMenuMenuButton" >'
     + '  <input type="checkbox" name="reload" '+checked+' /> reload'
     + '  <br style="clear: both;" />'
     + '</div>';

    menuBody.append( content );
  };


})($S);

