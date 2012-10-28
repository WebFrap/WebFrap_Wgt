/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['activInput'] = function( element, menuBody, targetElement ){

    var content =  '<div class="miniMenuMenuButton" >'
     + '  <input type="text" style="width:96%" id="miniMenuActivInput"  />'
     + '  <br style="clear: both;" />'
     + '</div>';

    menuBody.append( content );

    $UI.activInput(
      '#miniMenuActivInput', {
        filter      :element.filter,
        resetFilter :element.reset,
        close       :function(){jQuery.fn.miniMenu.close();}
      },{
        minChars    :element.minChars
      }
    );

  };


})($S);

