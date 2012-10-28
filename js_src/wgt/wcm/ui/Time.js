/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_time', function( jNode ){
  
  jNode.addClass('valid_time');
  jNode.addTime.ptTimeSelect({
    labels:{
      x             : $I18N.close,
      popup_link    : '<img src="'+$C.iconClock+'" alt="time" />',
      set_time      : $I18N.setNewTime
    },
    convention: 24
  });
  jNode.removeClass('wcm_ui_time');

});