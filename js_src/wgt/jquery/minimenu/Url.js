/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['url'] = function( element, menuBody, targetElement ){
    
    var onclick = '$R.get(\''+element.action+'\',{callback:function(){jQuery.fn.miniMenu.close();}})';
    var content = '<div class="miniMenuMenuButton" >'
     + '<a style="cursor: pointer;" onclick="'+onclick+'"'
     + '  onmouseover="jQuery(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
     + '  onmouseout="jQuery(this).removeClass(\'ui-state-hover\').addClass(\'default\');"'
     + '  class="ui-corner-all default" >'
     + '<img class="icon xsmall " src="'+$C.iconPath+'xsmall/'+element.icon+'" />'
     + '<b>'+ element.label +'</b>'
     + '</a>'
     + '<br style="clear: both;" />'
     + '</div>';

    menuBody.append( content );

  };


})($S);

