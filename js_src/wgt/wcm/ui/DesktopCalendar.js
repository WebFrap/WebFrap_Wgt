/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'desktop_calendar', function( jNode ){

  jNode.removeClass('wcm_desktop_calendar');
  
  var theiD = jNode.attr('id');
  
  jNode.calendarInit(
      theiD, 
      theiD+'-menu-minicalendar', 
      theiD+'-menu'
   );
  
  

});