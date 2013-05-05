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
    
    var calId = jNode.attr('id'),
    	tmpId = calId.substring( 4, calId.length );
	  
    var defSettings = {
        header: {
            left: 'prevYear,prev,today,next,nextYear',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
          
          // Event verschieben
          alert(
              event.title + " was moved " +
              event.start.toString("yyyy-mm-dd HH:ii") + " new start "
          );
  
        },
        eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
        
          // Event
          alert(
              event.title + " was resized " +
              event.start.toString("yyyy-mm-dd HH:ii") + " new start "
          );
  
        }
  
    };
    
	var cfgData = jNode.next(),
		settings = cfgData.is('var')
	    ? $WGT.robustParseJSON(cfgData.text())
	    : {};
	          
    settings = $S.extend({}, defSettings, settings);
    
    settings.events = function(start, end, callback) {
    	
    	var data = $R.get('ajax.php?c=Webfrap.Calendar.search&calendar='+calId+'=&start='+Math.round(start.getTime() / 1000)+'&end='+Math.round(end.getTime() / 1000),{},true);
    	callback(data.data);
    };
    
    
    var formObj = $S('#wgt-form-'+tmpId);

    // erstellen des calendar nodes
    var calendarObj = jNode.fullCalendar(settings);
  
    // das calendar objekt wird an ein formular gebunden
    //formObj.data( 'wgt-calendar' , calendarObj );
  });
  
  

});