/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/* 
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   code lang: english
 *   naming style: camel case
 * 
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
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
	  if( !dataBody.is('var') ){
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
	      eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
	        
	        // Event verschieben
	        alert(
	            event.title + " was moved " +
	            event.start.toString("yyyy-mm-dd") + " new start "
	        );
	
	      },
	      eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
	
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