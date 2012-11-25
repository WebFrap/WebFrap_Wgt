/* Licence see: /LICENCES/jsgantt/licence.txt */
/* Licence see: /LICENCES/wgt/licence.txt */

/**
* JSGantt component is a UI control that displays gantt charts based by using CSS and HTML 
* @module    jsgantt
* @title    JSGantt
*/
;(function(gantt,undefined){
  
  gantt.chartClass = function( jqNode, format){
    
    /**
     * self reference
     */
    var self = this;
    
    /**
     * all exitsting tasks
     */
    this.tasks = new Array();

    /**
     * the jquery node for the gantt chart
     */
    this.jqNode = jqNode;

    
    /**
    * Selected format (minute,hour,day,week,month,quater,year)
    * @type String 
    * @default format
    */ 
    this.format   = format;
    
    /**
     * flags which columns to show
     */
    this.show = {
        resource:1, // Show resource column
        duration:1, // Show duration column
        complete:1, // Show duration column 
        start:1,    // Show start date column 
        end:1      // Show end date column 
    }

    var vNumUnits       = 0;
    var vCaptionType;
    var vDepId          = 1;
       
    var vFormatArr      = new Array("day","week","month","quarter");
    var vQuarterArr     = new Array(1,1,1,2,2,2,3,3,3,4,4,4);
    var vMonthDaysArr   = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    var vMonthArr       = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
          
    /**
    * Set current display format (minute/hour/day/week/month/quarter)
    * Only the first 4 arguments are used, for example:
    * <code>
    * g.setFormatArr("day","week","month");
    * </code>
    * will show 3 formatting options (day/week/month) at the bottom right of the gantt chart
    * @method setFormatArr
    * @return {void}
    */ 
    this.setFormatArr = function(){
      
      vFormatArr = new Array();
      
      for(var i = 0; i < arguments.length; i++) {
        vFormatArr[i] = arguments[i];
      }
      
      if(vFormatArr.length>4){
        vFormatArr.length=4;
      }
    };
    
    /**
    * Set gantt caption
    * @param pType {String} 
    <p>Caption-Displays a custom caption set in TaskItem<br>
    Resource-Displays task resource<br>
    Duration-Displays task duration<br>
    Complete-Displays task percent complete</p>
    * @method setCaptionType
    * @return {void}
    */  
    this.setCaptionType = function(pType) { 
      vCaptionType = pType 
    };

    /**
    * Set current display format and redraw gantt chart 
    * @param this.format {String} (minute/hour/day/week/month/quarter)
    * @method setFormat
    * @return {void}
    */ 
    this.setFormat = function(format){ 
      this.format = format; 
      gant.render( self ); 
    };
    

  
    /**
    * Returns current gantt caption type
    * @method getCaptionType
    * @return {String}
    */  
    this.getCaptionType = function() { 
      return vCaptionType 
    };
  
    /**
    * Adds a TaskItem to the Gantt object task list array
    * @method AddTaskItem
    * @return {Void}
    */  
    this.addTask = function(task){
       this.tasks.push(task);
    };
  
  
    /**
    * Determine the minimum date of all tasks and set lower bound based on format
    *
    * @return {Datetime}
    */
    this.getMinDate = function getMinDate(){
  
      var minDate = new Date();
  
      minDate.setFullYear(
          this.tasks[0].getStart().getFullYear(), 
          this.tasks[0].getStart().getMonth(), 
          this.tasks[0].getStart().getDate()
      );
  
      // Parse all Task End dates to find min
      for(i = 0; i < this.tasks.length; i++){
        if(Date.parse(this.tasks[i].getStart()) < Date.parse(minDate))
          minDate.setFullYear(this.tasks[i].getStart().getFullYear(), this.tasks[i].getStart().getMonth(), this.tasks[i].getStart().getDate());
      }
  
      if ( this.format== 'minute' || this.format == 'hour' ){
        minDate.setHours(0);
        minDate.setMinutes(0);
      }
      // Adjust min date to specific format boundaries (first of week or first of month)
      else if (this.format=='day'){
  
          minDate.setDate(minDate.getDate() - 1);
          while(minDate.getDay() % 7 > 0){
              minDate.setDate(minDate.getDate() - 1);
          }
  
       }
       else if (this.format=='week'){
         
          minDate.setDate(minDate.getDate() - 7);
          while(minDate.getDay() % 7 > 0){
            
              minDate.setDate(minDate.getDate() - 1);
          }
  
       }
       else if (this.format=='month'){
         
          while(minDate.getDate() > 1){
              minDate.setDate(minDate.getDate() - 1);
          }
       }
       else if (this.format=='quarter'){
         
          if( minDate.getMonth()==0 || minDate.getMonth()==1 || minDate.getMonth()==2 ){
            minDate.setFullYear(minDate.getFullYear(), 0, 1);
          }
          else if( minDate.getMonth()==3 || minDate.getMonth()==4 || minDate.getMonth()==5 ){
            minDate.setFullYear(minDate.getFullYear(), 3, 1);
          }
          else if( minDate.getMonth()==6 || minDate.getMonth()==7 || minDate.getMonth()==8 ){
            minDate.setFullYear(minDate.getFullYear(), 6, 1);
          }
          else if( minDate.getMonth()==9 || minDate.getMonth()==10 || minDate.getMonth()==11 ){
            minDate.setFullYear(minDate.getFullYear(), 9, 1);
          }
  
       }
  
       return(minDate);
  
    };//end this.getMinDate
  
  
    /**
    * Used to determine the minimum date of all tasks and set lower bound based on format
    *
    * @return {Datetime}
    */
    this.getMaxDate = function (){
  
       var maxDate = new Date();
  
       maxDate.setFullYear(
           this.tasks[0].getEnd().getFullYear(), 
           this.tasks[0].getEnd().getMonth(), 
           this.tasks[0].getEnd().getDate()
      );
  
  
      // Parse all Task End dates to find max
      for(i = 0; i < this.tasks.length; i++){
        
        if(Date.parse(this.tasks[i].getEnd()) > Date.parse(maxDate)){
          
         //maxDate.setFullYear(this.tasks[0].getEnd().getFullYear(), this.tasks[0].getEnd().getMonth(), this.tasks[0].getEnd().getDate());
         maxDate.setTime(Date.parse(this.tasks[i].getEnd()));
  			}
  	  }
  
      if (this.format == 'minute'){
        maxDate.setHours(maxDate.getHours() + 1);
        maxDate.setMinutes(59);
      }
      else if (this.format == 'hour'){
        
        maxDate.setHours(maxDate.getHours() + 2);
      }
      else if (this.format=='day'){
        
        // Adjust max date to specific format boundaries (end of week or end of month)
        maxDate.setDate(maxDate.getDate() + 1);
  
        while(maxDate.getDay() % 6 > 0){
          maxDate.setDate(maxDate.getDate() + 1);
        }
  
      }
      else if (this.format=='week'){
        
        //For weeks, what is the last logical boundary?
        maxDate.setDate(maxDate.getDate() + 11);
  
        while(maxDate.getDay() % 6 > 0){
            maxDate.setDate(maxDate.getDate() + 1);
        }
  
      }
      else if (this.format=='month'){
        // Set to last day of current Month
        while(maxDate.getDay() > 1){
          maxDate.setDate(maxDate.getDate() + 1);
        }
    
        maxDate.setDate(maxDate.getDate() - 1);
      }
      else if (this.format=='quarter'){
        
        // Set to last day of current Quarter
        if( maxDate.getMonth()==0 || maxDate.getMonth()==1 || maxDate.getMonth()==2 ){
          maxDate.setFullYear(maxDate.getFullYear(), 2, 31);
        }
        else if( maxDate.getMonth()==3 || maxDate.getMonth()==4 || maxDate.getMonth()==5 ){
          maxDate.setFullYear(maxDate.getFullYear(), 5, 30);
        }
        else if( maxDate.getMonth()==6 || maxDate.getMonth()==7 || maxDate.getMonth()==8 ){
          maxDate.setFullYear(maxDate.getFullYear(), 8, 30);
        }
        else if( maxDate.getMonth()==9 || maxDate.getMonth()==10 || maxDate.getMonth()==11 ){
          maxDate.setFullYear(maxDate.getFullYear(), 11, 31);
        }
                 
      }
  
      return(maxDate);
  
    };//end this.getMaxDate
  
  };

})($UI.gantt);
