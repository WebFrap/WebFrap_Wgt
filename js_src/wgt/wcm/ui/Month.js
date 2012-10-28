/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */

$R.addAction( 'ui_month', function( jNode ){

  jNode.monthpicker({
    buttonImage: $C.iconCallendar
  }).removeClass('wcm_ui_month');
  
  /*
  jNode.find('#ui-monthpicker-div .ui-datepicker-year option').each(function(){
    if($(this).val()==year)
      $(this).attr("selected","selected");
  });

  jNode.find('.month'+month+' a').addClass("ui-state-highlight");
  
  jNode.removeClass('wcm_ui_month');
  */

});