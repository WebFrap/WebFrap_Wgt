/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['colorPicker'] = function( element, menuBody, targetElement ){
    
    var content = '<div class="color-menu-item ' + element.className + '"'
    //+ ' onclick='+ element.action 
      + '  onmouseover="jQuery(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      + '  onmouseout="jQuery(this).removeClass(\'ui-state-hover\').addClass(\'default\');">'
     + '<a style="cursor: pointer;" '
     + '  class="ui-corner-all default" >'
     //+ '<img class="icon xsmall " src="'+$C.iconPath+'xsmall/'+element.icon+'" />'
     +  element.label
     + '</a>'
     + '<br style="clear: both;" />'
     + '</div>';
    
    var bla = ((jQuery)(content));

    bla.click( function() {
      bla.ColorPicker({
        color: '#0000ff',
        //flat: true,
        onShow: function (colpkr) {
        $('.color-menu-ul', calendarElement).slideUp(300);
          $(colpkr).fadeIn(600);
          return false;
          },
        onHide: function (colpkr) {
          $(colpkr).fadeOut(500);
          return false;
          },
        onSubmit: function (hsb, hex, rgb) {
            //var calendarId = $(this).parent().parent().attr('calendarId');
            changeEventColor(calendarId, hex);
            calendarElement.css('backgroundColor', '#' + hex);
          }
        });
      });
    
    menuBody.append( bla );
  };


})($S);

