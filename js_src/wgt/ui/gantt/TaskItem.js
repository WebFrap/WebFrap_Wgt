/* Licence see: /LICENCES/jsgantt/licence.txt */
/* Licence see: /LICENCES/wgt/licence.txt */

/**
* JSGantt component is a UI control that displays gantt charts based by using CSS and HTML 
* @module    jsgantt
* @title    JSGantt
*/
;(function(gantt,undefined){
  


/**
* Creates a task (one row) in gantt object
* @class TaskItem 
* @namespace JSGantt
* @constructor
* @for JSGantt

* @param taskId {Number} Task unique numeric ID
* @param taskName {String} Task Name
* @param startDate {Date} Task start date/time (not required for group=1 )
* @param endDate {Date} Task end date/time, you can set the end time to 12:00 to indicate half-day (not required for group=1 )
* @param taskColor {String} Task bar RGB value
* @param taskLink {String} Task URL, clicking on the task will redirect to this url. Leave empty if you do not with the Task also serve as a link
* @param milestone {Boolean} Determines whether task is a milestone (1=Yes,0=No)
* @param resource {String} Resource to perform the task
* @param complete {Number} Percent complete (Number between 0 and 100)
* @param group {Boolean}
* @param pParent {Number} ID of the parent task
* @param pOpen {Boolean}
* @param pDepend {String} Comma seperated list of IDs this task depends on
* @param pCaption {String} Caption to be used instead of default caption (Resource). 
* note : you should use setCaption("Caption") in order to display the caption
* @return void
*/
  gantt.itemClass = function(
    taskId, 
    taskName, 
    startDate, 
    endDate, 
    taskColor, 
    taskLink, 
    milestone, 
    resource, 
    complete, 
    group, 
    pParent, 
    pOpen, 
    pDepend, 
    pCaption
){

  /**
  * The name of the attribute.
  * @property id 
  * @type String 
  * @default taskId
  * @private
  */    
  this.id    = taskId;

  /**
  * @property vName 
  * @type String 
  * @default taskName
  * @private
  */   
  this.name  = taskName;
  
  /**
  * @property startDate 
  * @type Datetime 
  * @default new Date()
  * @private
  */    
  this.startDate = new Date();	
  
  /**
  * @property endDate 
  * @type Datetime 
  * @default new Date()
  * @private
  */    
  this.endDate   = new Date();
  
  /**
  * @property vColor 
  * @type String 
  * @default taskColor
  * @private
  */    
  this.color = taskColor;
  
  /**
  * @property vLink 
  * @type String 
  * @default taskLink
  * @private
  */    
  this.link  = taskLink;
  
  /**
  * @property milestone 
  * @type Boolean 
  * @default milestone
  * @private
  */    
  this.milestone  = milestone;
  
  /**
  * @property vRes 
  * @type String 
  * @default resource
  * @private
  */    
  this.resource   = resource;
  
  /**
  * @property vComp 
  * @type Number 
  * @default complete
  * @private
  */    
  this.complete  = complete;
  
  /**
  * @type Boolean
  */    
  this.group = group;
  
  /**
  * @property vParent 
  * @type Number 
  * @default pParent
  * @private
  */    
  this.parent = pParent;
  
  /**
  * @property vOpen 
  * @type Boolean 
  * @default pOpen
  * @private
  */    
  this.opened   = pOpen;
  
  /**
  * @property vDepend 
  * @type String 
  * @default pDepend
  * @private
  */    
  this.depend = pDepend;
  
  /**
  * @property vCaption 
  * @type String 
  * @default pCaption
  * @private
  */    
  this.caption = pCaption;
  
  /**
  * @property vDuration 
  * @type Number 
  * @default ''
  * @private
  */    
  this.duration = '';
  
  /**
  * @property vLevel 
  * @type Number 
  * @default 0
  * @private
  */    
  this.level = 0;
  
  /**
  * @property vNumKid 
  * @type Number 
  * @default 0
  * @private
  */   
  this.numKid = 0;

  /**
  * @property visible 
  * @type Boolean 
  * @default 0
  * @private
  */   
  this.visible  = 1;

  this.startX = null;
  
  this.startY = null;
  
  this.endX = null;
  
  this.endY = null;
  
  if (this.group != 1){  
     startDate = $DATE.byString(startDate);
     endDate   = $DATE.byString(endDate);
  }


  
  /**
  * Returns task resource name as string
  * @method getResource
  * @return {String}
  */    
  this.getResource = function(){ 
    
    if(this.resource) 
      return this.resource; 
    else 
      return '&nbsp';  
  };
  
  /**
  * Returns task completion percent as numeric value
  * @method getCompVal
  * @return {Boolean}
  */    
  this.getCompVal  = function(){ 
    if(this.complete) 
      return this.complete; 
    else 
      return 0; 
  };
  
  /**
  * Returns task completion percent as formatted string (##%)
  * @method getCompStr
  * @return {String}
  */    
  this.getCompStr  = function(){ 
    if(this.complete) 
      return this.complete+'%'; 
    else return ''; 
  };

  /**
  * Returns task duration as a fortmatted string based on the current selected format
  * @method getDuration
  * @param vFormat {String} selected format (minute,hour,day,week,month)
  * @return {String}
  */ 	  
  this.getDuration = function(vFormat){ 
    
    if (milestone){
      visible = '-';
    }
    else if (vFormat=='hour'){
 
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  ( 60 * 60 * 1000) );
      if(tmpPer == 1)  
        vDuration = '1 Hour';
      else
        vDuration = tmpPer + ' Hours';
    }
    else if (vFormat=='minute'){
      
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  ( 60 * 1000) );
      if(tmpPer == 1)  
        vDuration = '1 Minute';
      else
        vDuration = tmpPer + ' Minutes';
    }
    else if ( vFormat == 'day') {
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  (24 * 60 * 60 * 1000) + 1);
      if(tmpPer == 1) 
        vDuration = '1 Day';
      else             
        vDuration = tmpPer + ' Days';
    }

   else if(vFormat == 'week') {
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  (24 * 60 * 60 * 1000) + 1)/7;
      if(tmpPer == 1)  vDuration = '1 Week';
      else             vDuration = tmpPer + ' Weeks'; 
   }

   else if(vFormat == 'month') {
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  (24 * 60 * 60 * 1000) + 1)/30;
      if(tmpPer == 1) vDuration = '1 Month';
      else            vDuration = tmpPer + ' Months'; 
   }

   else if(vFormat == 'quater') {
      tmpPer =  Math.ceil((this.endDate - this.startDate) /  (24 * 60 * 60 * 1000) + 1)/120;
      if(tmpPer == 1) vDuration = '1 Qtr';
      else            vDuration = tmpPer + ' Qtrs'; 
   }
    
    return( vDuration );
  };


};
	

})($UI.gantt);
