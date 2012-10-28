/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['listItem'] = function( element, menuBody, targetElement ){
    
    if ( element.className === undefined )
      element.className = "";
    
    var content = '<div class="color-menu-item ' + element.className + '"'
    //+ ' onclick='+ element.action 
      + '  onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      + '  onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');">'
     + '<a style="cursor: pointer;" '
     + '  class="ui-corner-all default" >'
     //+ '<img class="icon xsmall " src="'+$C.iconPath+'xsmall/'+element.icon+'" />'
     +  element.label
     + '</a>'
     + '<br style="clear: both;" />'
     + '</div>';
    
    var bla = (($S)(content));
    //alert(bla.length + "   "  + bla.attr('class'));
    bla.click( element.action );
    
    menuBody.append( bla );
  };


})($S);

