/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * _variable are DOM/JQery elements
 * 
 * @author milos kosanovic
 */
;(function($, undefined){

  $S.fn.calendarInit = function( calendarId, miniCalendarId, calendarMenuId ){
    var _calendar       = $('#' + calendarId),
        _miniCalendar   = $('#' + miniCalendarId),
        _calendarMenu   = $('#' + calendarMenuId);

    if( undefined !== _calendar
          && undefined !== _miniCalendar 
          && undefined !== _calendarMenu 
    ){
      
      var cont = new WgtDesktopCalendar( 
          _calendar, 
          _miniCalendar, 
          _calendarMenu
      );

      cont.load();

      return cont;
    }
    else {
      $D.message.error('Internal Error');
      $D.console('Tried to create a tabcontainer for a nonexisting id: '.containerId);
      return null;
    } 
  };
 
 
 
/*//////////////////////////////////////////////////////////////////////////////
// class WgtDesktopCalendar
//////////////////////////////////////////////////////////////////////////////*/

  /**
   * @author milos kosanovic
   * @param _calendar     - jQuery object for calendar 
   * @param _mcalendar   - jQuery object for mini calendar 
   * @param _calendarMenu - jQuery object for calendar menu
   */
  function WgtDesktopCalendar( _calendar, _miniCalendar, _calendarMenu ) {
    
    var self    = this;
      //calendar    = $('#'+_calendarId),
      //_miniCalendar   = $('#'+_mCalendarId),
      //calendarMenu     = $('#'+_calendarMenuId),
    
    var calendars = Array();                    //array of active calendars
    
    var proxy = new WgtCalendarProxy(_calendar);
    
    /**
     * 
     */
    this.load = function() {
      loadCalendars("1", _calendarMenu.find('#calendar-menu-categories'));
      addButtons();
      addMiniCalendar();
      //$('#'+calendarId).fullCalendar('render');
    };
      
    /*//////////////////////////////////////////////////////////////////////////////
     // WgtCalendarProxy class
     //////////////////////////////////////////////////////////////////////////////*/
  
  /**
   * Proxy class responsible for communication between server and calendar
   */
  function WgtCalendarProxy(_calendar, url){
    
    var self = this;
    
    this.url = 'ajax.php?c=Widget.Calendar.';
    
    this.reset = function() {
      _calendar.fullCalendar('refetchEvents');
    };
    
    /**
     * Get Calendar DAta
     */
    this.getCalendar = function(title)
    {
      var json = $R.get(this.url + 'getCalendar&title=' + title).data;
      //alert (json);
      //json = $.parseJSON(json); 
      return json;
    }
   
   
   /**
    * Show default calendars for user with userId, else show default
    * initialize calendar-menu
    * @param userId
    */    
   this.loadCalendars = function(userId) {
     var tmp;
     var i=0;
     var json = $R.get(this.url + 'loadCalendars&userId=' + userId);
     json = json.data;
     //json = $.parseJSON(json);      // when parsing empty array it returns null
     // check if json is empty
     if(json.categories === undefined)
       return null;
     else
       return json;
   };
         
   
   /**
    * returns only names of the calendars for autocomplete
    */ 
   this.getAllCalendars = function(){
     var tmp = $R.get(this.url + 'getAllCalendars').data;
     return tmp;
   };
    
   
   
   /**
    *get Events 
    *@param ids -  json array of events
    */
   this.getEvents = function(ids){
     var view = _calendar.fullCalendar('getView'),
         start, 
         end,
         events,
         json;
     
     start = Math.round( view.start.getTime()/1000);
     end   = Math.round( view.end.getTime()/1000);   
     ids = JSON.stringify(ids);
    
     if (ids === "[]"){
       return [];
     }
     
     json = $R.get(proxy.url        + 'getEvents&'+ 
                       'ids='       +  ids    +
                       '&start='    +  start   +
                       '&end='      +  end)
                       .data;
     events =  $.parseJSON(json);
     if (events == null){
       return [];
     }
    
     return events;
   }
   
   
   /**
    * 
    */
   this.addEventSource = function(calendarId){
     _calendar.fullCalendar('addEventSource', this.url + 'getEvents&calendarId=' + calendarId);
   };
   
   
   /**
    * 
    */
   this.removeEventSource = function(calendarId) {
     this.saveDialog();
     _calendar.fullCalendar('removeEventSource', this.url + 'getEvents&calendarId=' + calendarId);
   };
   
   /**
    * Optimized remove. Fewer req to server
    */
    this.removeEventSource1 = function(calendarId)
    {
      var events = _calendar.fullCalendar('clientEvents'),
          i=0;
      
      this.saveDialog(events);
      for (i=0; i<events.length; i++){
        if (events[i].calendarId == calendarId){
          _calendar.fullCalendar('removeEvents', events[i].id);
        }
      }
    }
    
   /**
    * Show save Dialog/Warning 
    * SaveEvents can be called when view state is already changed so we must get events 
    * before opening dialog 
    */
   this.saveDialog = function()
   {
     //get events first and then open the dialog
     var events = _calendar.fullCalendar('clientEvents');
     
     _button = $('#button-save');
     if ( !(_button.hasClass('ui-state-disabled')) && _button.length !== 0 ){
       
       $( "<div> You made changes to events and did not save. Do you want to do " +
           "it now?</div>" )
           .dialog({
             resizable: false,
             height:140,
             modal: true,
             buttons: {
                 "Save all events": function() {
                     $( this ).dialog( "close" );
                     proxy.saveEvents(events);
                 },
                 Cancel: function() {
                     $( this ).dialog( "close" );
                 }
             }
       });
       
       _button.addClass('ui-state-disabled');
     };
   }
   
   
   /**
    * send all events to the server 
    */
   this.saveEvents = function(events){
     
     if (events === undefined){
       events = _calendar.fullCalendar('clientEvents'); 
     }
     
     events = toPostString(events);
     
     if (events!==""){
       $R.post('ajax.php?c=Wbfsys.CalendarAppointment_Multi.multisave', events);
     }
   };
   
   
   /**
    * save calendar data
    */
   this.saveCalendar = function(calendarId){
     var _calendar = getActiveCalendar(calendarId);
     var str = "wbfsys_calendar[" + calendarId + "][description]= " + _calendar.colorScheme;
     $R.post('ajax.php?c=Wbfsys.Calendar_Multi.multisave', str);

     //$('#button-save').addClass('ui-state-disabled');
     };
   
     
   /**
    * 
    */
   this.saveNewEvent = function(event){
     var json, newEvent;
     json = JSON.stringify(event);
     newEvent = $R.get(this.url + 'saveNewEvent&event=' + json).data;
     //event["id"] = newEvent["id"];
     return newEvent;
     };
   
   /**  
   * function is called whenever event data is changed
   * event must be original event object, not reconstructed 
   * @TODO: decide: call server, check data, give event id, and return data
   */
   this.updateEvent = function(event){  
     _calendar.fullCalendar('updateEvent', event);
     event.dirty = true;
     $('#button-save').removeClass('ui-state-disabled');
   };
    
   
   /**
    * remove from calendar, call server and remove from database
    */
   this.deleteEvent = function(id){
     _calendar.fullCalendar('removeEvents', id);
     var json = $R.get(this.url + 'deleteEvent&id=' + id);
   };
   
   /**
    * Help functon, turns event data to json
    */
   var toJson = function (events){
     var temp=[];
     $.each(events, function(index, val) {
         event={};
         event.id = val.id;
         event.title = val.title;
         event.allDay = val.allDay;
         event.dirty = val.dirty;
         event.start = $.fullCalendar.formatDate(val.start, 'u');
         event.end = $.fullCalendar.formatDate(val.end, 'u');
         event.className = val.className;
         event.calendarId = val.calendarId;
         
         //alert(val.className);
         temp[temp.length] = event;
       
     });
     data = JSON.stringify(temp);
     //chEvents = [];
     return data;
   };
   
   
   /**
    * Serialize event data so they can be sent with post
    */
   var toPostString = function (events){
     var str="";
     var start, end;

     $.each(events, function(index, val) {
         if (val.dirty===true){
           val.dirty = false;
           start = $.fullCalendar.formatDate(val.start, 'yyyy-MM-dd HH:mm:ss');
           end   = $.fullCalendar.formatDate(val.end, 'yyyy-MM-dd HH:mm:ss');
           
           str += "&wbfsys_calendar_appointment[" + val.id + "][title]="            + val.title;
           str += "&wbfsys_calendar_appointment[" + val.id + "][id_calendar]="      + val.calendarId;
           str += "&wbfsys_calendar_appointment[" + val.id + "][timestamp_start]="  + start;
           str += "&wbfsys_calendar_appointment[" + val.id + "][timestamp_end]= "   + end;
           str += "&wbfsys_calendar_appointment[" + val.id + "][description]="      + val.description;
           
           if (val.allDay === false)
             str += "&wbfsys_calendar_appointment[" + val.id + "][all_day]=";
           else
             str += "&wbfsys_calendar_appointment[" + val.id + "][all_day]="         +val.allDay;
           
           if (val.isMultiple === false)
             str += "&wbfsys_calendar_appointment[" + val.id + "][is_multiple]=";
           else
             str += "&wbfsys_calendar_appointment[" + val.id + "][is_multiple]=" + val.isMultiple;
           };
     });
     
     return str;
   };
       
 }//end proxy
   
     
////////////// initialization and settings for Full calendar //////////
    _calendar.fullCalendar({ 
      header: {
        left: '',
        center: 'title',
        right: 'month,agendaWeek,agendaDay, prev,next, today'
      },
      selectable: true,
      selectHelper: true,
      theme: true,
      weekMode: 'variable',
      aspectRatio: 1.7,
      //height: 250,
      firstHour: 7,
      minTime: 7,
      maxTime: 22,
      editable: true,
      timeFormat: {
        agenda: 'h:mm{ - h:mm}', // 5:00 - 6:30
        '': 'h(:mm)tt '            // 7p
      },
      columnFormat: {
        week: 'ddd d/M',
        day: 'dddd d/M'
      },
      events: function(start, end, callback){
        //var ids = getIds();
        var i   = 0,
            ids = [],
            events = [];
        
        /*
        if (calendars !== undefined){
          for (i=0; i < calendars.length; i++){
            ids.push(calendars[i].id);
            }
        } 
        */
        
        $.each($('.calendar-menu-checkbox'), function(i, val){
          
          if (val.checked === true){
            ids.push($(val).parent().parent().attr("calendarId"));
          }
        });
        
        events = proxy.getEvents(ids);
        callback(events);
        
      },
      viewDisplay: function( view) {
        var date = _calendar.fullCalendar('getDate');
        _miniCalendar.datepicker('setDate', date);
      },
      
      beforeChangeDisplay: function(view) {
        //var events = calendar.fullCalendar('clientEvents');
        proxy.saveDialog();
      },
      
      //on selection do 
      select: function(start, end, allDay){
        select(start, end, allDay);
      },

      eventDrop: function(event, dayDelta, minuteDelta, allDay) {
        proxy.updateEvent(event); 
      }, 
      eventResize: function(event, dayDelta, minuteDelta){
        proxy.updateEvent(event); 
      },

      eventClick: function(event, jsEvent, view){
        // event click has problems, it gets confused with draging and resizeing
      },

      eventRender: function (event, element, view){
        //element.attr('title', event.title);
        
        //select and bind menu for the menu div
        var temp = $('.fc-event-menu', element);
        var data;
        temp.addClass('circlemenu');

        //TO DO: call to server, send id and get menu information, delete json1
        data = createMenuData(event);
        temp.data('circleMenuData', data);
        temp.bindCircleMenu(cacheData = true);
      },

      eventAfterRender: function(event, element, view){
        //var tmp = element.parent().parent().css('background-color');
        $('.circlemenu', element).addClass('ui-icon-arrowthick-1-ne');
        $('.circlemenu', element).addClass('ui-icon');
      },

      loading: function(bool) {
        if (bool) 
          $('#loading').show();
        else 
          $('#loading').hide();
      }
    });

    
   
    /**
     * on select add new task 
     */
    var select = function (start, end, allDay) {
      var event = {
          start: start,
          end: end,
          allDay: allDay
      };
      createEvent(event);        
      _calendar.fullCalendar('unselect');
    };
    
    
    /**
     * 
     */
    var addButtons = function(){
      //Adding buttons to Full Calendar
      var tmp = $('<tr>' +
          '<td>' +
            '<div id="button-add-calendar" class="ui-state-default ui-no-right ui-corner-left"' + 
              '<a ><span>Add Calendar</span></a>' +
            '</div>' +
            '</td>' +
            '<td>' +
              '<div id="button-new" class="ui-state-default ui-no-right"' + 
                '<a><span>Init</span></a>' + 
              '</div>' +
            '</td>' +
            '<td>' +
              '<div id="button-save" class="ui-state-default ui-state-disabled ui-no-right"' + 
                 '<a ><span>Save</span></a>' + 
               '</div>' +
            '</td>' +
            '<td>' +
              '<div id="button-reset" class="ui-state-default ui-corner-right"' + 
                '<a ><span>Reset</span></a>' + 
              '</div>' +
            '</td>' +
          '</tr>');
 
      $('#button-add-calendar', tmp).click(function(){
        $('#add-calendar-div').dialog('open');
        $('#add-calendar-search').val("");
      });
      
      $('#button-save', tmp).click(function(){ 
          proxy.saveEvents();
          $(this).addClass('ui-state-disabled');
        });
      
      $('#button-new', tmp).click(function(){
        $R.get('ajax.php?c=Widget.Calendar.init');
      });
      
      $('#button-reset', tmp).click(function(){
        proxy.reset(null, null);
        $('#button-save').addClass('ui-state-disabled');
      });
      
      tmp = $('<tbody></tbody>').append(tmp);
      tmp = $('<table></table>').append(tmp);
      $('td.fc-header-left').append(tmp);
      
      
      //Add Calendar Dialog initialzation
      $('#add-calendar-div').dialog({
        autoOpen: false,
        title: "Add Calendar",
        width: '500px',
        modal: true,
        hide: "fold",
        open: function() {
          var availableTags = proxy.getAllCalendars();
          var input;
          
          var bl = $('#add-calendar-search').data();
          var blacat = $('#add-calendar-search1').data();
          var blacombo = $('#add-calendar-search2').data();
          
          $('#add-calendar-search').autocomplete();
          
          $('#add-calendar-search').autocomplete("option", "source", availableTags);
          $('#add-calendar-search1').catcomplete("option", "source", availableTags);
          $('#add-calendar-search2').combocomplete("option", "source", availableTags);
          
          
          $('#add-calendar-search2').combocomplete({
            select: function(event, ui){
              $('#add-calendar-search' ).data("id", ui.item.id);
            }
          });
        },
        close: function() {
          $('#add-calendar-search').val("");
          $('#add-calendar-search').data("id", undefined);
        },
        buttons: { 
          "Add": function() {
            var data = $( '#add-calendar-search' ).data("id");
            var newCalendar, events;
            
            
            if (data === undefined){
              alert("This calendar does not exist!");
              $('#add-calendar-search').data("id", undefined);
              return;
            }
            else {
              data = proxy.getCalendar(data);
            }
            
            if ( calendarNotActive(data) ){
              $('#menu-calendar-' + data.category).find('table').append(addCalendar(data));
              
              events = proxy.getEvents(data.id);
              
              for (var i=0; i < events.length; i++){
                _calendar.fullCalendar( 'renderEvent', events[i]);
              }
              
              calendars.push(data);
              
              $(this).dialog("close");
            }
            else {
              alert("This calendar is allredy added or does not exist!");
              $('#add-calendar-search').data("id", undefined);
            }
          },
          "Cancel": function() {
            $(this).dialog("close");  
          }
        }
      });
    };

    
    /**
     * add mini Calendar
     */
    var addMiniCalendar = function() {
       _miniCalendar.datepicker('option', 'onSelect',
         function(dateText, inst){      
            var date = dateText.split('-');
            
            _calendar.fullCalendar('gotoDate',date[0],date[1]-1,date[2]);
            var view = $('#calendar-full').fullCalendar('getView');
            
            if (view.name == 'agendaWeek')
              _calendar.fullCalendar( 'changeView', 'agendaWeek' );
            else
              _calendar.fullCalendar( 'changeView', 'agendaDay' );
          }   
        );
    };

    
    /**
     * Checks if calendar is allredy active/added
     */
    var calendarNotActive = function(data)
    {
      var i;
      var exist = true;
      
      for (i=0; i < calendars.length; i++){
        if (calendars[i].id == data.id){
          exist = false;
        }
      }
      return exist;
    }
    /**
     * Get calendars, and events on initialization for userId 
     */
    var loadCalendars = function(userId, calendarContainer){
      var json = proxy.loadCalendars(userId);
      var i=0;
      var categories, events;
      var content;
      var data = json.data;
      
      console.log(json);
      
      if ( Boolean(json) ){    //check if json is null or []
        categories = json.categories;
        for (i = 0; i < categories.length; i++){
          calendars = calendars.concat(categories[i].calendars);
        }
      }
      else return;
      
      for ( i = 0; i < categories.length; i++)
        {
           content = $('<hr /><div id="calendar-menu-category">' +
                     categories[i].title + 
                   '<table class="menu-calendar-list">' + 
                   '</table></div>');
              
          $.each(categories[i].calendars, function(i, calendarData){
            //alert(calendarData.id);
            content.find('table').append( addCalendar( calendarData ));
            //proxy.addEventSource(calendarData.id);
            });
          calendarContainer.append(content);
        };
      
      _calendar.fullCalendar('refetchEvents');
    }

    
    /**
     * renders calendar, it does not check the validity of calendarData 
     */
    var addCalendar = function(calendarData){  
      var calendarId = calendarData.id;
      var colorScheme = calendarData.colorScheme;
      var calendarElement = 
        $("<tr class='menu-items " + colorScheme + "' calendarid=" + calendarId + " color_scheme=" + colorScheme + ">" +
            "<td class='menu-items-first'>" + calendarData.title + "</td>" +
            "<td><input type='checkbox' class = 'calendar-menu-checkbox' checked></td>" +
            "<td>" +
              "<div class='color-menu ui-icon-arrowthick-1-ne ui-icon' calendarid=" + calendarId + 
              " classname=" + colorScheme + "></div>" + //this div saves calendarId and classScheme for this calendar
            "</td>" +
          "</tr>"); 
          
      /* new color menu */
      var menuItems = [];
      var clickAction;
      var events;
      
      clickAction = function() {
        var event = {};
        event.calendarId = calendarId;
        event.allDay = true;
        createEvent(event);
        };
        
      menuItems.push({
        type    : 'listItem',
        label   : 'add event',
        action  : clickAction
      });
        
      clickAction = function() {
        editCalendar(calendarId);
        };
        
      menuItems.push({
        type    : 'listItem',
        label   : 'edit',
        action  : clickAction
      });
 
      clickAction = function() {
        removeCalendar(calendarId);
        };
      
      menuItems.push({
        type    : 'listItem',
        label   : 'delete',
        action  : clickAction,
        className: 'color-menu-delete',
        calendarId: calendarId
      });
     
      /*
      menuItems.push({
        type    : 'colorPicker',
        label   : 'chcolor',
        className: 'color-menu-chcolor'
      });
      */
      
      //on click change color of all events and color-menu-item div
      clickAction = function() {
        var color_scheme = $(this).children('a').prop('class'); 
        var tmp;
        //alert (color_scheme + "  " + color + "  ");
        tmp = getActiveCalendar(calendarId);
        if (tmp !==  null){
          calendarElement.prop('class', 'menu item ' + color_scheme);
          tmp.colorScheme = color_scheme;
          proxy.saveCalendar(calendarId);
          changeEventColor(calendarId, color_scheme);
        }
      };
      
      menuItems.push({
        type     : 'divColor',
        action   :  clickAction
      });

      var menuCont = $('.color-menu', calendarElement).miniMenu({
        menuItems   : menuItems,
        button : 'close'
      });
      
      //Add click event to checkbox, on click show/hide that calendar events
      $('.calendar-menu-checkbox', calendarElement).click( function() {
        var calendarId = $(this).parent().parent().attr('calendarid');  
        calendarId = parseInt(calendarId, 10);  //convert from string to int
        
        if (this.checked === true){
          //get and render tasks for this calendar, and add them to calendar
          events = proxy.getEvents(calendarId);
          for (var i=0; i < events.length; i++){
            _calendar.fullCalendar( 'renderEvent', events[i]);
          }
        }
        else{      
          //remove events with calendarId form calendar
          proxy.removeEventSource1(calendarId);
          }
        });

     return calendarElement;
      };

      
      /**
       * Removes calendar from menu list, calendarId i ID of calendar
       */
      var removeCalendar = function(calendarId){
        
        var bla = $('.menu-items[calendarId=' + calendarId + ']'); 
        
        proxy.removeEventSource1(calendarId);
        bla.remove();
        
        for (var i=0; i<calendars.length; i++){
          if (calendars[i].id === calendarId){
            calendars.splice(i,1);
          }
        }
        
      };


      /**
       * Edit Calendar
       */
      editCalendar = function(calendarId){
        alert ("Edit Calendar");
      }
      
      
      /**
       * Create new event
       * Dialog is dynamicly created, this way it is easy to change program to
       * open and show several dialogs in the same time
       */
      var createEvent = function(event){
        var sdate, edate, stime, etime;
        var test = $('#edit-dialog');
        var json="";
        var availableTags;
        var dialogTitle;
        var newEvent;
        
        var _startDate      = test.find('#start-date'),
            _startTime      = test.find('#start-time'),
            _endDate        = test.find('#end-date'),
            _endTime        = test.find('#end-time'),
            _calendarId     = test.find('#calendar-id'),
            _allDay         = test.find('#allday'),
            _isMultiple     = test.find('#ismultiple'),
            _title          = test.find('#title'),
            _description    = test.find('#description'),
            
            pattern         = test.find("input[@name=pattern]:checked").val(),
            endType         = test.find("input[@name=end-type]:checked").val(),
            
            _radioEndType1  = test.find("#repeating-end-type1");
            _radioEndType2  = test.find("#repeating-end-type2");
            _radioPattern1  = test.find("#pattern1");
            _radioPattern2  = test.find("#pattern2");
            _radioPattern3  = test.find("#pattern3");
            _patternData1   = test.find("#dialog-pattern1");
            _patternData2   = test.find("#dialog-pattern2");
            _patternData3   = test.find("#dialog-pattern3");
            _repeatingData  = test.find('#repeating-data'),
            
            _rEndDate       = test.find('#repeating-end-date'),
            _noOfRepeating    = test.find('#no-of-repeating'),
            _repeatInterval = test.find('#repeat-interval'),
            _repeatType     = test.find('#repeat-type'),
            _skipMonth      = test.find('#skip-month'),
            _nthDayInMonth   = test.find('#nth-day-in-month'),
            _skipDay        = test.find('#skip-day'),
            _daysOfTheWeek  = test.find('.dialog-weekdays input'),
            _months         = test.find('.dialog-months input');
            
        var allFields = $([]) .add(_startDate)
                              .add(_startTime)
                              .add(_endDate)
                              .add(_endTime)
                              .add(_calendarId)
                              .add(_allDay)
                              .add(_isMultiple)
                              .add(_title)
                              .add(_description)
                              .add(_rEndDate)
                              .add(_noOfRepeating)
                              .add(_repeatInterval)
                              .add(_repeatType)
                              .add(_skipMonth)
                              .add(_nthDayInMonth)
                              .add(_skipDay)
                              .add(_daysOfTheWeek)
                              .add(_months);
        
        /**
         * Prepare and transform data, populate dialog fields
         */
        var beforeDialogOpen = function(event){
          
          //add ui class so fields will be themable
          allFields.addClass('ui-corner-all ui-widget-content');
          _calendarId.removeClass('ui-corner-all');
          
          //disable repeating events
          _isMultiple.attr('disabled', 'disabled');
          
          //check if new event or updete event
          if (event.id === undefined){
            newEvent = true;
            dialogTitle ="New Event";
          }
          else{
            newEvent = false;
            dialogTitle = "Edit Event"
          };
          
          //Set fields and data
          
          //if add new Event from calendar menu
          if (event.calendarId !== undefined) {
            _calendarId.data("id", event.calendarId);
            _calendarId.attr('value', getActiveCalendar(event.calendarId).title);
            _calendarId.combocomplete('disable');
          }
          else {
            // calendar is not defined, get calendars from server or only showed in menu?
            availableTags = proxy.getAllCalendars();
            _calendarId.combocomplete('option', 'source', availableTags);
            _calendarId.combocomplete('option', 'select', 
                function(event, ui){
                  _calendarId.data("id", ui.item.id);
                });
          };

          //if add new event by selection on month view
          if (event.start === undefined){
            sdate = $.fullCalendar.formatDate(new Date(), 'yyyy-MM-dd');
            stime = '';
          }
          else {
            sdate = $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd');
            stime = $.fullCalendar.formatDate(event.start, 'HH:mm');
          }
          
          //if add new event by selection on week/day view
          if (event.end === undefined ) {
            //test.find('#allday').checked=true;
            edate = '';
            etime = '';
          }
          else{
            edate = $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd');
            etime = $.fullCalendar.formatDate(event.end, 'HH:mm');
          }
          
          if (event.allDay === true){
            _allDay.get(0).checked = true;
            _endDate.datepicker('disable');
            _endTime.attr('disabled', 'disabled');
            _startTime.attr('disabled', 'disabled');
            
            stime = '';
            edate = '';
            etime = '';
         }
          else{
            _allDay.get(0).checked = false; 
            
          };
         
          if (event.title !== undefined){
            _title.attr('value', event.title);
          };
          
          _startDate.attr('value', sdate);
          _startTime.attr('value', stime);
          _endDate.attr('value', edate);
          _endTime.attr('value', etime);
        
        
        //FOR REPEATING TASKS
          if (event.isMultiple === true){
            _isMultiple.get(0).checked = true;
            
            if (event.endType === "no-of-repeating"){
              _radioEndType1.get(0).checked = true;
              _noOfRepeating.attr('disabled', '')
                            .val(event.noOfRepeating);
              
            };
            
            if (event.endType === "repeating-end-date"){
              _radioEndType2.get(0).checked = true;
              _rEndDate.datepicker( 'enabled');
              _rEndDate.val(event.rEndDate);
              
            };
            
            if(event.pattern === "pattern1"){
              _radioPattern1.get(0).checked = true;
              _patternData1.show();
              _repeatInterval.val(event.repeatInterval);
              _repeatType.val(event.repeatType);
            };
            
            if(event.pattern === "pattern2"){
              _radioPattern2.get(0).checked = true;
              _patternData2.show();
            };

            if(event.pattern === "pattern3"){
              _radioPattern3.get(0).checked = true;
              _patternData3.show();
            };
            
            _repeatingData.show();
          }
          else{
            _isMultiple.get(0).checked = false;
            _radioEndType1.get(0).checked = true;
            _noOfRepeating.attr('disabled', '');
            
            _radioPattern1.get(0).checked = true;
            _patternData1.show();
            
            _repeatingData.hide();
          };
          
      };
  
         
        /**
         * on open edit event dialog Initialize widgets 
         */
        var onDialogOpen = function(event){
          var tmp = Array();
          var oldTime;
          
          if(event.endType !== "repeating-end-date"){
            _rEndDate.datepicker( "disable" );
          }
       
          //time picker actions
          oldTime = _startTime[0].timePicker.getTime();
          _startTime.change(function() {
            if (_endTime.val()) { 
              // Only update when second input has a value. Calculate duration.
              var duration = (_endTime[0].timePicker.getTime() - oldTime);
              var time = _startTime[0].timePicker.getTime();
              // Calculate and update the time in the second input.
              _endTime[0].timePicker.setTime(new Date(new Date(time.getTime() + duration)));
              oldTime = time;
            }
          });
          
          _allDay.click( function(){
            if (this.checked === true){
              _endDate.datepicker('disable');
              _endTime.attr('disabled', 'disabled');
              _startTime.attr('disabled', 'disabled');
              _endTime.val('');
              _startTime.val('');
              _endDate.val('');
            }
            else{
              _endDate.datepicker('enable');
              _endTime.attr('disabled', '');
              _startTime.attr('disabled', '');
              _endTime.val('07:00');
              _startTime.val('07:00');
              _endDate.val(_startDate.val());
            }
          });
          
          _isMultiple.click( function(){
            if (this.checked === true){
              _repeatingData.show();
            }
            else{
              _repeatingData.hide();
            }
          });
          
         _radioEndType1.change( function(){
           if (this.checked === true){
            // _rEndDate.attr('disabled', 'disabled');
             _rEndDate.datepicker( "disable" );
             _noOfRepeating.attr('disabled', '');
           }
         });
         
         _radioEndType2.change( function(){
           if (this.checked === true){
             //_rEndDate.attr('disabled', '');
             _rEndDate.datepicker( "enable" );
             _noOfRepeating.attr('disabled', 'disabled');
           }
         })
          
          _radioPattern1.change( function(){
            if( this.checked === true){
              _patternData2.hide();
              _patternData3.hide();
              _patternData1.show();
            }
          });
          
          _radioPattern2.change( function(){
            if( this.checked === true){
              _patternData3.hide();
              _patternData1.hide();
              _patternData2.show();
            }
          });
          
          _radioPattern3.change( function(){
            if( this.checked === true){
              _patternData2.hide();
              _patternData1.hide();
              _patternData3.show();
            }
          });
          
        };

       beforeDialogOpen(event);
      
        test.dialog({
          autoOpen: false,
          width: '500px',
          modal: true,
          hide: "fold",
          title: dialogTitle,
          open: function() {
            onDialogOpen(event);
          },
          
          close: function(event, ui) {
            allFields.val("");
            
            _endTime.attr('disabled', '');
            _startTime.attr('disabled', '');
            _endDate.datepicker( "enable" );
            
            _calendarId.combocomplete('enable');
            _rEndDate.datepicker( "disable" );
            
            test.find("input[@name=pattern]:checked").checked = false;
            test.find("input[@name=end-type]:checked").checked = false;
            
            _patternData1.hide();
            _patternData2.hide();
            _patternData3.hide();
          },
          buttons: { 
            "Save": function() {
              //var data = $(this).find('input').serializeArray();
              
            if (_allDay.get(0).checked === true){
              event.allDay = true;
              event.start = _startDate.val() + ' ' + _startTime.val() + "00:00:00";
              event.end ="";
            }
            else{
              event.allDay = false;
              event.start = _startDate.val() + ' ' + _startTime.val() + ":00";
              event.end = _endDate.val() + ' ' + _endTime.val() + ":00";
            }
            
            if (_isMultiple.get(0).checked === true){
              event.isMultiple = true;
            }
            else{
              event.isMultiple = false;
            }
            
            event.title = _title.val();
            
            if(Boolean(_description.val())){
              event.description = _description.val();
            }
            else {
              event.description = "";
            }
            
            event.calendarId = _calendarId.data("id");
            
            if ( validateEvent(event) ){
              $(this).dialog("close");
              
              if (newEvent){
                event = proxy.saveNewEvent(event);
                //we add source so it can be renderd when other events from 
                //the same calendar are shown
                event.newEvent = true;
                event.source = proxy.url + 'getEvents&calendarId=' + event.calendarId;
                _calendar.fullCalendar('renderEvent', event);
              }
              else{
                proxy.updateEvent(event);
              }
            }
            else{
              alert("validation not passed, iput correct values");
              }
            },
          "Cancel": function() { 
            $(this).dialog("close"); 
            }
           }
         });
        
        test.dialog('open');
      };
      
      
    /** TO DO:
     * Edit repeating event
     */
    var editRepeatingEvent = function (event){
      alert("Repeating event");
    };


    /**
     * TO DO
     * create scheme class which we add to events
     * Domnik's module
     */
    var createScheme = function (color){
      var color_scheme = "some_color_scheme";
      
      return color_scheme;
    };

    
    /**
     * change calendarId events color  
     */
    var changeEventColor = function(calendarId, color_scheme)  {
      
      var events = _calendar.fullCalendar('clientEvents');
      $.each(events, function(i, event) {
        if (+event.calendarId === calendarId)  {
          
          event.className = color_scheme;
          //event.css('backgroundColor', 'gray');
        }  

        _calendar.fullCalendar('updateEvent', event);
      });
    };

    
    /**
     *  Data for Event menu
     */
    var createMenuData = function(event){
      var json1 = 
        [
          {
          "id": "node0",
          "name": " ",
          "data": {"$color": "#EFAB00"},
          "adjacencies": 
          [
            {
              "nodeTo": "node1",
              "data": {'$type': 'none'}
            }, 
            {
              "nodeTo": "node2",
              "data": {'$type': 'none'}
            }, 
            {
              "nodeTo": "node3",
              "data": {'$type': 'none'}
            }, 
            {
              "nodeTo": "node4",
              "data": {"$type": "none"}
            }, 
            {
              "nodeTo": "node5",
              "data": {"$type": "none"}
            }, 
            {
              "nodeTo": "node9",
              "data": {"$type": "none"}
            }, 
          ]
          }, 
          {
          "id": "node1",
          "name": "Edit",
          "data": {"$angularWidth": 36, "$color": "#0081FF", "$height": 70, "$url": "testurl1", "$handlerCode": 
              function(){ 
                //alert("title: " + event.title + " " + event.length + "  allday:" + event.allDay );
                if (event.length==null){
                  createEvent(event);
                }
                else{
                  editRepeatingEvent(event);
                }
              }
            }
          },
          {
            "id": "node2",
            "name": "Delete",
            "data": {"$angularWidth": 36, "$color": "#0078ED", "$height": 70, "$url": "testurl1", "$handlerCode": 
              function(){
                proxy.deleteEvent(event.id);
                }
            }
          }, 
          {
          "id": "node3",
          "name": "Add",
          "data": {"$angularWidth": 36, "$color": "#0070DE",  "$height": 70, "$url": "testurl1", "$handlerCode": function(){alert('Add event');}}
          }, 
          {
          "id": "node4",
          "name": "Notify",
          "data": {"$angularWidth": 36, "$color": "#0066C9", "$height": 70, "$url": "testurl1", "$handlerCode": function(){alert('Notify event');}}
          }, 
          {
          "id": "node5",
          "name": "Subtasks",
          "data": {"$angularWidth": 36, "$color": "#0055A8", "$height": 70, "$handlerCode": function(){alert('Subtasks event');}}
          }, 
          {
          "id": "node9",
          "name": "Close",
          "data": {"$angularWidth": 36, "$color": "#00478C", "$height": 70, "$handlerCode": function(){alert('Close event');}}
          }
        ];
        
      return json1;
    };
    
    
    /**
     * Validation of event Data
     */
    var validateEvent = function(event){
      var reg = new RegExp('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]');
      
      if (event.title === undefined)
        return false;
      
      if (event.start === undefined)
        return false;
      
      if (event.calendarId === undefined)
        return false;
      
     
      return true;
    };
    
    
    /**
     * Get one of local calanders which are curently acive/displayed
     * @param calendarId
     */
    var getActiveCalendar = function(id){
      
      for(var i=0; i<calendars.length; i++)
        if (calendars[i].id == id){
          return calendars[i];
        }
      return null;
    };

 
    
    
    
    /**
     * Help function for creating  event object
     */
    var createEventObject = function( title, start, end, calendarId, id, allDay, dirty, newEvent) {
      var event = {
          title: title,
          start: start,
          end: end,
          calendarId: calendarId,
          id: id,
          allDay: allDay,
          dirty:  dirty, 
          newEvent: newEvent
      };

      return event;
    };

  }// end WgtDesktopCalendar

})(jQuery);