/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_calendar', function( jNode ){
  
  
  jNode.removeClass('wcm_ui_calendar');
  
  jNode.appear(function(){
  var dataBody = jNode.next();
  
  var tmpId = jNode.attr('id');
  tmpId = tmpId.substring( 4, tmpId.length );
  
  var formObj = $S('#wgt-form-'+tmpId); ;
  
  // var ist der datencontainer der benötigt wird um einen callendar
  // mit daten zu befüllen
  if( !dataBody.is('var') )
  {
    alert('found no body');
    return;
  }
  
  // extrahieren der json daten aus dem request
  dataBody = $S.parseJSON( dataBody.text() );

  // erstellen des calendar nodes
  var calendarObj = jNode.fullCalendar({
    
      header: {
          left: 'prevYear,prev,today,next,nextYear',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      events: dataBody.data||[], // wenn data nicht existiert einen leeren array übergeben
      eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) 
      {
        
        // Event verschieben
        alert(
            event.title + " was moved " +
            event.start.toString("yyyy-mm-dd") + " new start "
        );

      },
      eventResize: function(event,dayDelta,minuteDelta,revertFunc) 
      {

        alert(
            event.title + " was resized " +
            event.start.toString("yyyy-mm-dd") + " new start "
        );

      }

  });
  
  // das calendar objekt wird an ein formular gebunden
  formObj.data( 'wgt-calendar' , calendarObj );
  });
  
  

});