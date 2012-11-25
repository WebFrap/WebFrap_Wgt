/* Licence see: /LICENCES/jsgantt/licence.txt */
/* Licence see: /LICENCES/wgt/licence.txt */


/**
* JSGantt component is a UI control that displays gantt charts based by using CSS and HTML 
* @module    jsgantt
* @title    JSGantt
*/
;(function(gantt,undefined){
  





	




/**
* Returns an object from the current DOM
*
* @method findObj
* @param theObj {String} - Object name
* @param theDoc {Document} - current document (DOM)
* @return {Object}
*/
JSGantt.findObj = function (theObj, theDoc)

      {

         var p, i, foundObj;

         if(!theDoc) {theDoc = document;}

         if( (p = theObj.indexOf("?")) > 0 && parent.frames.length){

            theDoc = parent.frames[theObj.substring(p+1)].document;

            theObj = theObj.substring(0,p);

         }

         if(!(foundObj = theDoc[theObj]) && theDoc.all) 

            {foundObj = theDoc.all[theObj];}



         for (i=0; !foundObj && i < theDoc.forms.length; i++) 

            {foundObj = theDoc.forms[i][theObj];}



         for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++)

            {foundObj = JSGantt.findObj(theObj,theDoc.layers[i].document);}



         if(!foundObj && document.getElementById)

            {foundObj = document.getElementById(theObj);}



         return foundObj;

      };


/**
* Change display format of current gantt chart
*
* @method changeFormat
* @param pFormat {String} - Current format (minute,hour,day...)
* @param ganttObj {GanttChart} - The gantt object
* @return {void}
*/
JSGantt.changeFormat =      function(pFormat,ganttObj) {

        if(ganttObj) 
		{
		ganttObj.setFormat(pFormat);
		ganttObj.DrawDependencies();
		}
        else{alert('Chart undefined');};
      };




/**
* Parse dates based on gantt date format setting as defined in JSGantt.GanttChart.setDateInputFormat()
*
* @method parseDateStr
* @param pDateStr {String} - A string that contains the date (i.e. "01/01/09")
* @param pFormatStr {String} - The date format (mm/dd/yyyy,dd/mm/yyyy,yyyy-mm-dd)
* @return {Datetime}
*/
JSGantt.parseDateStr = function(pDateStr,pFormatStr) {
   var vDate =new Date();	
   vDate.setTime( Date.parse(pDateStr));

   switch(pFormatStr) 
   {
	  case 'mm/dd/yyyy':
	     var vDateParts = pDateStr.split('/');
         vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[0], 10) - 1, parseInt(vDateParts[1], 10));
         break;
	  case 'dd/mm/yyyy':
	     var vDateParts = pDateStr.split('/');
         vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[0], 10));
         break;
	  case 'yyyy-mm-dd':
	     var vDateParts = pDateStr.split('-');
         vDate.setFullYear(parseInt(vDateParts[0], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[1], 10));
         break;
    }

    return(vDate);
    
};

/**
* Display a formatted date based on gantt date format setting as defined in JSGantt.GanttChart.setDateDisplayFormat()
*
* @method formatDateStr
* @param pDate {Date} - A javascript date object
* @param pFormatStr {String} - The date format (mm/dd/yyyy,dd/mm/yyyy,yyyy-mm-dd...)
* @return {String}
*/
JSGantt.formatDateStr = function(pDate,pFormatStr) {
       vYear4Str = pDate.getFullYear() + '';
 	   vYear2Str = vYear4Str.substring(2,4);
       vMonthStr = (pDate.getMonth()+1) + '';
       vDayStr   = pDate.getDate() + '';

      var vDateStr = "";	

      switch(pFormatStr) {
	        case 'mm/dd/yyyy':
               return( vMonthStr + '/' + vDayStr + '/' + vYear4Str );
	        case 'dd/mm/yyyy':
               return( vDayStr + '/' + vMonthStr + '/' + vYear4Str );
	        case 'yyyy-mm-dd':
               return( vYear4Str + '-' + vMonthStr + '-' + vDayStr );
	        case 'mm/dd/yy':
               return( vMonthStr + '/' + vDayStr + '/' + vYear2Str );
	        case 'dd/mm/yy':
               return( vDayStr + '/' + vMonthStr + '/' + vYear2Str );
	        case 'yy-mm-dd':
               return( vYear2Str + '-' + vMonthStr + '-' + vDayStr );
	        case 'mm/dd':
               return( vMonthStr + '/' + vDayStr );
	        case 'dd/mm':
               return( vDayStr + '/' + vMonthStr );
      }		 
	  
};


})($UI.gantt);
