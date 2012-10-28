/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['checklist'] = function( element, menuBody, targetElement ){

    var content   = '<p>filter by:</p>';

    var numEle    = element.elements.length;
    for (var pos  = 0; pos < numEle; pos++) {
      var elem    = element.elements[pos];
      var checked = '';

      if( elem[2] == 1 ) {
        checked = 'checked="checked"';
      }

      content += '<div class="miniMenuMenuButton" >'
       + '<input type="checkbox" name="'+ elem.name +'['+elem[0]+']" '+checked+'  />'
       + '<b>'+ elem[1] +'</b>'
       + '<br style="clear: both;" />'
       + '</div>';
    }

    menuBody.append( content );

  };


})($S);

