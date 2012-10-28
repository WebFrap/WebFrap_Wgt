/* Licence see: /LICENCES/wgt/licence.txt */

(function( $S, $UI, $C ){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['sortbox'] = function( element, menuBody, targetElement ){

    var colHead = $UI.tableCol($S(targetElement).parentX('th'));
    //var tableNode = trNode.parents('table:first');

    var content = '<div class="miniMenuMenuButton" style="text-align:center;" >'
     + '  <img id="wgt_minimenu_sort_asc" class="icon xsmall" src="'+$C.iconSortAsc+'"  /> asc |'
     + '  <img id="wgt_minimenu_sort_desc" class="icon xsmall" src="'+$C.iconSortDesc+'"  /> desc '
     + '  <br style="clear: both;" />'
     + '</div>';

    menuBody.append( content );
    $S('#wgt_minimenu_sort_asc').click(function(e){ colHead.sort('asc') });
    $S('#wgt_minimenu_sort_desc').click(function(e){ colHead.sort('desc') });

  };


})( $S, $UI, $C );

