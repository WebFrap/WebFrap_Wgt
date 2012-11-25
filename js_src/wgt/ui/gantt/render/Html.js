/* Licence see: /LICENCES/wgt/licence.txt */

/**
* JSGantt component is a UI control that displays gantt charts based by using CSS and HTML 
* @module    jsgantt
* @title    JSGantt
*/
;(function(gantt,undefined){
  
  /**
  * Draw gantt chart
  * @method Draw
  * @return {Void}
  */ 
  gantt.render = new function( ){
    
    /**
     * render the chart
     */
    this.draw = function( chart ){
       
      /**
       * the max date to display
       */
      var maxDate = new Date();
      
      /**
       * the min date to display
       */
      var minDate = new Date();   
      
      var tmpDate = new Date();
      
      var vNxtDate = new Date();
      
      var vCurrDate = new Date();
      
      var vTaskLeft = 0;
      
      var vTaskRight = 0;
      
      var vNumCols = 0;
      
      var vID = 0;
      
      var htmlMainTable = "";
      
      var htmlDataBox = "";
      
      var htmlChartBox = "";
      
      var vDateRowStr = "";
      
      var vItemRowStr = "";
      
      /**
       * with of a col in the chart
       */
      var colWidth = 0;
      
      /**
       * unit of the col dimension
       */
      var colUnit = 0;
      
      var chartBoxWidth = 0;
      
      var numDays = 0;
      
      var faktorDayWidth = 0;
      
      var vStr = "";
      
      /**
       * with of the label bar for the left data box
       */
      var dataFullLabelWith = 220;   
      
      var dataLabelWith = 70;
      
      var dBoxWidth = 15 + 220 + 70 + 70 + 70 + 70 + 70;
      
      var decorator = null;
        
      // if we have tasks
      if( chart.tasks.length > 0){
          
        // Process all tasks preset parent date and completion %
        this.processRows(chart, 0, -1, 1, 1);

         // get overall min/max dates plus padding
         minDate = chart.getMinDate( );
         maxDate = chart.getMaxDate( );

         // Calculate chart width variables.  colWidth can be altered manually to change each column width
         // May be smart to make this a parameter of GanttChart or set it based on existing pWidth parameter
         if(chart.format == 'day') {
            colWidth = 18;
            colUnit = 1;
         }
         else if(chart.format == 'week') {
            colWidth = 37;
            colUnit = 7;
         }
         else if(chart.format == 'month') {
            colWidth = 37;
            colUnit = 30;
         }
         else if(chart.format == 'quarter') {
            colWidth = 60;
            colUnit = 90;
         }
         else if(chart.format=='hour'){
            colWidth = 18;
            colUnit = 1;
         }
         else if(chart.format=='minute'){
            colWidth = 18;
            colUnit = 1;
         }
           
         numDays  = (Date.parse(maxDate) - Date.parse(minDate)) / ( 24 * 60 * 60 * 1000);
         numUnits = numDays / colUnit;
            
           
         chartBoxWidth  = numUnits * colWidth + 1;
         faktorDayWidth = (colWidth / colUnit) + (1/colUnit);

         htmlMainTable =
            '<TABLE id=theTable cellSpacing=0 cellPadding=0 border=0><TBODY><TR>' +
            '<td vAlign=top bgColor=#ffffff>';

         if(chart.show.resolution !=1) 
           dataFullLabelWith+=dataLabelWith;
         if(chart.show.duration !=1) 
           dataFullLabelWith+=dataLabelWith;
         if(chart.show.complete!=1) 
           dataFullLabelWith+=dataLabelWith;
         if(chart.show.start!=1) 
           dataFullLabelWith+=dataLabelWith;
         if(chart.show.end!=1) 
           dataFullLabelWith+=dataLabelWith;
          
         // DRAW the Left-side of the chart (names, resources, comp%)
         htmlDataBox =
            '<DIV class=scroll id=leftside style="width:' + dBoxWidth + 'px">'
            + '<TABLE cellSpacing=0 cellPadding=0 border=0><TBODY>' 
            + '<TR style="HEIGHT: 17px">'
            + '  <td style="WIDTH: 15px; HEIGHT: 17px"></td>'
            + '  <td style="WIDTH: ' + dataFullLabelWith + 'px; HEIGHT: 17px"><NOBR></NOBR></td>'; 
         
         // refresh decorator
         decorator = function( data ){
           return '  <td style="WIDTH: ' + data + 'px; HEIGHT: 17px"></td>' ;
         }

         if(chart.show.resolution ==1) 
           htmlDataBox += decorator(dataLabelWith);
         if(chart.show.duration ==1) 
           htmlDataBox += decorator(dataLabelWith);
         if(chart.show.complete==1) 
           htmlDataBox += decorator(dataLabelWith);
         if(chart.show.start==1) 
           htmlDataBox += decorator(dataLabelWith);
         if(chart.show.end==1) 
           htmlDataBox += decorator(dataLabelWith);

         htmlDataBox +=
            '<TR style="HEIGHT: 20px">' +
            '  <td style="BORDER-TOP: #efefef 1px solid; WIDTH: 15px; HEIGHT: 20px"></td>' +
            '  <td style="BORDER-TOP: #efefef 1px solid; WIDTH: ' + dataFullLabelWith + 'px; HEIGHT: 20px"><NOBR></NOBR></td>' ;
           
         // refresh decorator
         decorator = function( data ){
           return '  <td style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 60px; HEIGHT: 20px" align=center nowrap>'+data+'</td>'
         }

         
         if(chart.show.resolution ==1) 
           htmlDataBox += decorator('Resource');
         if(chart.show.duration ==1) 
           htmlDataBox += decorator('Duration');
         if(chart.show.complete==1) 
           htmlDataBox += decorator('% Comp.');
         if(chart.show.start==1) 
           htmlDataBox += decorator('Start Date');
         if(chart.show.end==1) 
           htmlDataBox += decorator('End Date');
 
         htmlDataBox += '</TR>';

         for(i = 0; i < chart.tasks.length; i++){
                
           var task = chart.tasks[i];
          
           if( task.group) {
              vBGColor = "f3f3f3";
              vRowType = "group";
           } else {
              vBGColor  = "ffffff";
              vRowType  = "row";
           }
           
           if(task.visible == 0) 
             htmlDataBox += '<TR id=child_' + task.id + ' bgcolor=#' + vBGColor + ' style="display:none"  onMouseover=g.mouseOver(this,' + task.id + ',"left","' + vRowType + '") onMouseout=g.mouseOut(this,' + task.id + ',"left","' + vRowType + '")>' ;
           else
            htmlDataBox += '<TR id=child_' + task.id + ' bgcolor=#' + vBGColor + ' onMouseover=g.mouseOver(this,' + task.id + ',"left","' + vRowType + '") onMouseout=g.mouseOut(this,' + task.id + ',"left","' + vRowType + '")>' ;

           htmlDataBox +=  '  <td class=gdatehead style="WIDTH: 15px; HEIGHT: 20px; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;">&nbsp;</td>' +
            '  <td class=gname style="WIDTH: ' + dataFullLabelWith + 'px; HEIGHT: 20px; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px;" nowrap><NOBR><span style="color: #aaaaaa">';

           for(j=1; j<task.getLevel(); j++) {
              htmlDataBox += '&nbsp&nbsp&nbsp&nbsp';
           }

           htmlDataBox += '</span>';

           if( task.group){
             
             if( task.opened == 1) 
               htmlDataBox += '<span id="group_' + task.id + '" style="color:#000000; cursor:pointer; font-weight:bold; FONT-SIZE: 12px;" onclick="JSGantt.folder(' + task.id + ','+vGanttVar+');'+vGanttVar+'.DrawDependencies();">&ndash;</span><span style="color:#000000">&nbsp</span>' ;
             else
               htmlDataBox += '<span id="group_' + task.id + '" style="color:#000000; cursor:pointer; font-weight:bold; FONT-SIZE: 12px;" onclick="JSGantt.folder(' + task.id + ','+vGanttVar+');'+vGanttVar+'.DrawDependencies();">+</span><span style="color:#000000">&nbsp</span>' ;
           } 
           else{

              htmlDataBox += '<span style="color: #000000; font-weight:bold; FONT-SIZE: 12px;">&nbsp&nbsp&nbsp</span>';
           }

           htmlDataBox += 
              '<span onclick=JSGantt.taskLink("' + task.getLink() + '",300,200); style="cursor:pointer"> ' + task.getName() + '</span></NOBR></td>' ;

           var tagBoxOpen = '  <td class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>';
           var tagBoxOpen = '</NOBR></td>';
           
           if(chart.show.resolution ==1) 
             htmlDataBox +=  tagBoxOpen + task.resource() + tagBoxOpen ;
           if(chart.show.duration ==1) 
             htmlDataBox += tagBoxOpen  + task.getDuration(chart.format) + tagBoxOpen ;
           if(chart.show.complete==1) 
             htmlDataBox += tagBoxOpen + task.getCompStr() + tagBoxOpen ;
           if(chart.show.start==1) 
             htmlDataBox += tagBoxOpen + JSGantt.formatDateStr( task.startDate, vDateDisplayFormat) + tagBoxOpen ;
           if(chart.show.end==1) 
             htmlDataBox += tagBoxOpen + JSGantt.formatDateStr( task.endDate, vDateDisplayFormat)  + tagBoxOpen ;

           htmlDataBox += '</TR>';

        }

        // DRAW the date format selector at bottom left.  Another potential GanttChart parameter to hide/show this selector
        htmlDataBox += '</td></TR>' +
          '<TR><td border=1 colspan=5 align=left style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 11px; BORDER-LEFT: #efefef 1px solid; height=18px">&nbsp;&nbsp;Powered by <a href=http://www.jsgantt.com>jsGantt</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Format:';
      
        if (vFormatArr.join().indexOf("minute")!=-1) { 
          if (chart.format=='minute') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="minute" checked>Minute';
          else                
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("minute",'+vGanttVar+'); VALUE="minute">Minute';
        }
           
        if (vFormatArr.join().indexOf("hour")!=-1) { 
          if (chart.format=='hour') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="hour" checked>Hour';
          else                
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("hour",'+vGanttVar+'); VALUE="hour">Hour';
        }
           
        if (vFormatArr.join().indexOf("day")!=-1) { 
          if (chart.format=='day') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="day" checked>Day';
          else                
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("day",'+vGanttVar+'); VALUE="day">Day';
        }
           
        if (vFormatArr.join().indexOf("week")!=-1) { 
          if (chart.format=='week') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="week" checked>Week';
          else                
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("week",'+vGanttVar+') VALUE="week">Week';
        }
           
        if (vFormatArr.join().indexOf("month")!=-1) { 
          if (chart.format=='month') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="month" checked>Month';
          else                
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("month",'+vGanttVar+') VALUE="month">Month';
        }
           
        if (vFormatArr.join().indexOf("quarter")!=-1) { 
          if (chart.format=='quarter') 
            htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="quarter" checked>Quarter';
          else                htmlDataBox += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("quarter",'+vGanttVar+') VALUE="quarter">Quarter';
        }
                 
//              htmlDataBox += '<INPUT TYPE=RADIO NAME="other" VALUE="other" style="display:none"> .';

        htmlDataBox += '</td></TR></TBODY></TABLE></td>';

        htmlMainTable += htmlDataBox;

        // Draw the Chart Rows
        htmlChartBox = 
        '<td style="width: ' + chartBoxWidth + 'px;" vAlign=top bgColor=#ffffff>' +
        '<DIV class=scroll2 id=rightside>' +
        '<TABLE style="width: ' + chartBoxWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
        '<TBODY><TR style="HEIGHT: 18px">';

        tmpDate.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        tmpDate.setHours(0);
        tmpDate.setMinutes(0);

        // Major Date Header
        while(Date.parse(tmpDate) <= Date.parse(maxDate)){     
 
          vStr = tmpDate.getFullYear() + '';
          vStr = vStr.substring(2,4);
              
              
           if(chart.format == 'minute'){
             htmlChartBox += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=60>' ;
             htmlChartBox += JSGantt.formatDateStr(tmpDate, vDateDisplayFormat) + ' ' + tmpDate.getHours() + ':00 -' + tmpDate.getHours() + ':59 </td>';
             tmpDate.setHours(tmpDate.getHours()+1);
           }
              
           if(chart.format == 'hour'){
             htmlChartBox += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=24>' ;
             htmlChartBox += JSGantt.formatDateStr(tmpDate, vDateDisplayFormat) + '</td>';
             tmpDate.setDate(tmpDate.getDate()+1);
           }
              
           if(chart.format == 'day'){
             
             htmlChartBox += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=7>' +
               JSGantt.formatDateStr(tmpDate,vDateDisplayFormat.substring(0,5)) + ' - ';
               
               tmpDate.setDate(tmpDate.getDate()+6);
               htmlChartBox += JSGantt.formatDateStr(tmpDate, vDateDisplayFormat) + '</td>';
               tmpDate.setDate(tmpDate.getDate()+1);
            }
            else if(chart.format == 'week'){
              
              htmlChartBox += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+colWidth+'px>`'+ vStr + '</td>';
              tmpDate.setDate(tmpDate.getDate()+7);
            }
            else if(chart.format == 'month'){
              
              htmlChartBox += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+colWidth+'px>`'+ vStr + '</td>';
              tmpDate.setDate(tmpDate.getDate() + 1);
              
              while(tmpDate.getDate() > 1){
                   tmpDate.setDate(tmpDate.getDate() + 1);
              }
            }
            else if(chart.format == 'quarter'){
              
              htmlChartBox += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+colWidth+'px>`'+ vStr + '</td>';
              tmpDate.setDate(tmpDate.getDate() + 81);
              while(tmpDate.getDate() > 1){
                tmpDate.setDate(tmpDate.getDate() + 1);
              }
            }

         }

         htmlChartBox += '</TR><TR>';

         // Minor Date header and Cell Rows
         tmpDate.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
         vNxtDate.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
         vNumCols = 0;
   
           while(Date.parse(tmpDate) <= Date.parse(maxDate))
           {     
              if (chart.format == 'minute')
              {
                 
                   if( tmpDate.getMinutes() ==0 ) 
                    vWeekdayColor = "ccccff";
                 else
                    vWeekdayColor = "ffffff";
                        
                        
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">' + tmpDate.getMinutes() + '</div></td>';
                  vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                  tmpDate.setMinutes(tmpDate.getMinutes() + 1);
              }
            
              else if (chart.format == 'hour')
              {
                 
                    if(  tmpDate.getHours() ==0  ) 
                    vWeekdayColor = "ccccff";
                 else
                    vWeekdayColor = "ffffff";
                        
                        
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">' + tmpDate.getHours() + '</div></td>';
                  vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                  tmpDate.setHours(tmpDate.getHours() + 1);
              }

               else if(chart.format == 'day' )
               {
                 if( JSGantt.formatDateStr(vCurrDate,'mm/dd/yyyy') == JSGantt.formatDateStr(tmpDate,'mm/dd/yyyy')) {
                    vWeekdayColor  = "ccccff";
                    vWeekendColor  = "9999ff";
                    vWeekdayGColor  = "bbbbff";
                    vWeekendGColor = "8888ff";
                 } else {
                    vWeekdayColor = "ffffff";
                    vWeekendColor = "cfcfcf";
                    vWeekdayGColor = "f3f3f3";
                    vWeekendGColor = "c3c3c3";
                 }
                 
                 if(tmpDate.getDay() % 6 == 0) {
                    vDateRowStr  += '<td class="gheadwkend" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekendColor + ' align=center><div style="width: '+colWidth+'px">' + tmpDate.getDate() + '</div></td>';
                    vItemRowStr  += '<td class="gheadwkend" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekendColor + ' align=center><div style="width: '+colWidth+'px">&nbsp</div></td>';
                 }
                 else {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">' + tmpDate.getDate() + '</div></td>';
                    if( JSGantt.formatDateStr(vCurrDate,'mm/dd/yyyy') == JSGantt.formatDateStr(tmpDate,'mm/dd/yyyy')) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                 }

                 tmpDate.setDate(tmpDate.getDate() + 1);

              }

                else if(chart.format == 'week')
              {

                 vNxtDate.setDate(vNxtDate.getDate() + 7);

                 if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                    vWeekdayColor = "ccccff";
                 else
                    vWeekdayColor = "ffffff";

                 if(vNxtDate <= maxDate) {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">' + (tmpDate.getMonth()+1) + '/' + tmpDate.getDate() + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';

                 } else {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; bgcolor=#' + vWeekdayColor + ' BORDER-RIGHT: #efefef 1px solid;" align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">' + (tmpDate.getMonth()+1) + '/' + tmpDate.getDate() + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';

                 }

                 tmpDate.setDate(tmpDate.getDate() + 7);

              }

                else if(chart.format == 'month')
              {

                 vNxtDate.setFullYear(tmpDate.getFullYear(), tmpDate.getMonth(), vMonthDaysArr[tmpDate.getMonth()]);
                 if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                    vWeekdayColor = "ccccff";
                 else
                    vWeekdayColor = "ffffff";

                 if(vNxtDate <= maxDate) {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">' + vMonthArr[tmpDate.getMonth()].substr(0,3) + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                 } else {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">' + vMonthArr[tmpDate.getMonth()].substr(0,3) + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                 }

                 tmpDate.setDate(tmpDate.getDate() + 1);

                 while(tmpDate.getDate() > 1) 
                 {
                    tmpDate.setDate(tmpDate.getDate() + 1);
                 }

              }

              else if(chart.format == 'quarter')
              {

                 vNxtDate.setDate(vNxtDate.getDate() + 122);
                 if( tmpDate.getMonth()==0 || tmpDate.getMonth()==1 || tmpDate.getMonth()==2 )
                    vNxtDate.setFullYear(tmpDate.getFullYear(), 2, 31);
                 else if( tmpDate.getMonth()==3 || tmpDate.getMonth()==4 || tmpDate.getMonth()==5 )
                    vNxtDate.setFullYear(tmpDate.getFullYear(), 5, 30);
                 else if( tmpDate.getMonth()==6 || tmpDate.getMonth()==7 || tmpDate.getMonth()==8 )
                    vNxtDate.setFullYear(tmpDate.getFullYear(), 8, 30);
                 else if( tmpDate.getMonth()==9 || tmpDate.getMonth()==10 || tmpDate.getMonth()==11 )
                    vNxtDate.setFullYear(tmpDate.getFullYear(), 11, 31);

                 if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                    vWeekdayColor = "ccccff";
                 else
                    vWeekdayColor = "ffffff";

                 if(vNxtDate <= maxDate) {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">Qtr. ' + vQuarterArr[tmpDate.getMonth()] + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                 } else {
                    vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+colWidth+'px><div style="width: '+colWidth+'px">Qtr. ' + vQuarterArr[tmpDate.getMonth()] + '</div></td>';
                    if( vCurrDate >= tmpDate && vCurrDate < vNxtDate ) 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                    else 
                       vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+colWidth+'px">&nbsp&nbsp</div></td>';
                 }

                 tmpDate.setDate(tmpDate.getDate() + 81);

                 while(tmpDate.getDate() > 1) 
                 {
                    tmpDate.setDate(tmpDate.getDate() + 1);
                 }

              }
           }

           htmlChartBox += vDateRowStr + '</TR>';
           htmlChartBox += '</TBODY></TABLE>';

           // Draw each row

           for(i = 0; i < chart.tasks.length; i++){
             
             var task = chart.task[i];

             tmpDate.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
             vTaskStart = task.startDate;
             vTaskEnd   = task.endDate;

             vNumCols = 0;

             // numUnits = Math.ceil((task.endDate - task.startDate) / (24 * 60 * 60 * 1000)) + 1;
              numUnits = (task.endDate - task.startDate) / (24 * 60 * 60 * 1000) + 1;
              if (chart.format=='hour'){
                  numUnits = (task.endDate - task.startDate) / (  60 * 1000) + 1;
              }
              else if (chart.format=='minute'){
                  numUnits = (task.endDate - task.startDate) / (  60 * 1000) + 1;
              }
              
                if(task.visible == 0) 
                 htmlChartBox += '<DIV id=childgrid_' + task.id + ' style="position:relative; display:none;">';
              else
                htmlChartBox += '<DIV id=childgrid_' + task.id + ' style="position:relative">';
              
              if( task.getMile()) {

                 htmlChartBox += '<DIV><TABLE style="position:relative; top:0px; width: ' + chartBoxWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                    '<TR id=childrow_' + task.id + ' class=yesdisplay style="HEIGHT: 20px" onMouseover=g.mouseOver(this,' + task.id + ',"right","mile") onMouseout=g.mouseOut(this,' + task.id + ',"right","mile")>' + vItemRowStr + '</TR></TABLE></DIV>';

                 // Build date string for Title
                 vDateRowStr = JSGantt.formatDateStr(vTaskStart,vDateDisplayFormat);

                 vTaskLeft = (Date.parse(task.startDate) - Date.parse(minDate)) / (24 * 60 * 60 * 1000);
                 vTaskRight = 1;

                   htmlChartBox +=
                    '<div id=bardiv_' + task.id + ' style="position:absolute; top:0px; left:' + Math.ceil((vTaskLeft * (faktorDayWidth) + 1)) + 'px; height: 18px; width:160px; overflow:hidden;">' +
                    '  <div id=taskbar_' + task.id + ' title="' + task.getName() + ': ' + vDateRowStr + '" style="height: 16px; width:12px; overflow:hidden; cursor: pointer;" onclick=JSGantt.taskLink("' + task.getLink() + '",300,200);>';

                 if(task.getCompVal() < 100)
                        {htmlChartBox += '&loz;</div>' ;}
                 else
                       { htmlChartBox += '&diams;</div>' ;}

                          if( g.getCaptionType() ) {
                             vCaptionStr = '';
                             switch( g.getCaptionType() ) {           
                                case 'Caption':    vCaptionStr = task.getCaption();  break;
                                case 'Resource':   vCaptionStr = task.getResource();  break;
                                case 'Duration':   vCaptionStr = task.getDuration(chart.format);  break;
                                case 'Complete':   vCaptionStr = task.getCompStr();  break;
                                 }
                             //htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; left: 6px; top:1px;">' + vCaptionStr + '</div>';
                             htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; top:2px; width:120px; left:12px">' + vCaptionStr + '</div>';
                         };

                   htmlChartBox += '</div>';


              } else {

                 // Build date string for Title
                 vDateRowStr = JSGantt.formatDateStr(vTaskStart,vDateDisplayFormat) + ' - ' + JSGantt.formatDateStr(vTaskEnd,vDateDisplayFormat);

                  if (chart.format=='minute')
                  {
                      vTaskRight = (Date.parse(task.endDate) - Date.parse(task.startDate)) / ( 60 * 1000) + 1/colUnit;
                      vTaskLeft = Math.ceil((Date.parse(task.startDate) - Date.parse(minDate)) / ( 60 * 1000));
                  }
                  else if (chart.format=='hour')
                  {
                      vTaskRight = (Date.parse(task.endDate) - Date.parse(task.startDate)) / ( 60 * 60 * 1000) + 1/colUnit;
                      vTaskLeft = (Date.parse(task.startDate) - Date.parse(minDate)) / ( 60 * 60 * 1000);
                  }
                  else
                  {
                      vTaskRight = (Date.parse(task.endDate) - Date.parse(task.startDate)) / (24 * 60 * 60 * 1000) + 1/colUnit;
                      vTaskLeft = Math.ceil((Date.parse(task.startDate) - Date.parse(minDate)) / (24 * 60 * 60 * 1000));
                      if (chart.format='day')
                      {
                          var tTime=new Date();
                          tTime.setTime(Date.parse(task.startDate));
                          if (tTime.getMinutes() > 29)
                              vTaskLeft+=.5;
                      }
                  }

                 // Draw Group Bar  which has outer div with inner group div and several small divs to left and right to create angled-end indicators
                 if( task.group) {
                    htmlChartBox += '<DIV><TABLE style="position:relative; top:0px; width: ' + chartBoxWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                       '<TR id=childrow_' + task.id + ' class=yesdisplay style="HEIGHT: 20px" bgColor=#f3f3f3 onMouseover=g.mouseOver(this,' + task.id + ',"right","group") onMouseout=g.mouseOut(this,' + task.id + ',"right","group")>' + vItemRowStr + '</TR></TABLE></DIV>';
                    htmlChartBox +=
                       '<div id=bardiv_' + task.id + ' style="position:absolute; top:5px; left:' + Math.ceil(vTaskLeft * (faktorDayWidth) + 1) + 'px; height: 7px; width:' + Math.ceil((vTaskRight) * (faktorDayWidth) - 1) + 'px">' +
                         '<div id=taskbar_' + task.id + ' title="' + task.getName() + ': ' + vDateRowStr + '" class=gtask style="background-color:#000000; height: 7px; width:' + Math.ceil((vTaskRight) * (faktorDayWidth) -1) + 'px;  cursor: pointer;opacity:0.9;">' +
                           '<div style="z-index: -4; float:left; background-color:#666666; height:3px; overflow: hidden; margin-top:1px; ' +
                                 'margin-left:1px; margin-right:1px; filter: alpha(opacity=80); opacity:0.8; width:' + task.getCompStr() + '; ' + 
                                 'cursor: pointer;" onclick=JSGantt.taskLink("' + task.getLink() + '",300,200);>' +
                             '</div>' +
                          '</div>' +
                          '<div style="z-index: -4; float:left; background-color:#000000; height:4px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:right; background-color:#000000; height:4px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:left; background-color:#000000; height:3px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:right; background-color:#000000; height:3px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:left; background-color:#000000; height:2px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:right; background-color:#000000; height:2px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:left; background-color:#000000; height:1px; overflow: hidden; width:1px;"></div>' +
                          '<div style="z-index: -4; float:right; background-color:#000000; height:1px; overflow: hidden; width:1px;"></div>' ;

                          if( g.getCaptionType() ) {
                             vCaptionStr = '';
                             switch( g.getCaptionType() ) {           
                                case 'Caption':    vCaptionStr = task.getCaption();  break;
                                case 'Resource':   vCaptionStr = task.getResource();  break;
                                case 'Duration':   vCaptionStr = task.getDuration(chart.format);  break;
                                case 'Complete':   vCaptionStr = task.getCompStr();  break;
                                 }
                             //htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; left: 6px; top:1px;">' + vCaptionStr + '</div>';
                             htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' + (Math.ceil((vTaskRight) * (faktorDayWidth) - 1) + 6) + 'px">' + vCaptionStr + '</div>';
                         };

                    htmlChartBox += '</div>' ;

                 } else {

                    vDivStr = '<DIV><TABLE style="position:relative; top:0px; width: ' + chartBoxWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                       '<TR id=childrow_' + task.id + ' class=yesdisplay style="HEIGHT: 20px" bgColor=#ffffff onMouseover=g.mouseOver(this,' + task.id + ',"right","row") onMouseout=g.mouseOut(this,' + task.id + ',"right","row")>' + vItemRowStr + '</TR></TABLE></DIV>';
                    htmlChartBox += vDivStr;
                    
                    // Draw Task Bar  which has outer DIV with enclosed colored bar div, and opaque completion div
                   htmlChartBox +=
                       '<div id=bardiv_' + task.id + ' style="position:absolute; top:4px; left:' + Math.ceil(vTaskLeft * (faktorDayWidth) + 1) + 'px; height:18px; width:' + Math.ceil((vTaskRight) * (faktorDayWidth) - 1) + 'px">' +
                          '<div id=taskbar_' + task.id + ' title="' + task.getName() + ': ' + vDateRowStr + '" class=gtask style="background-color:#' + task.getColor() +'; height: 13px; width:' + Math.ceil((vTaskRight) * (faktorDayWidth) - 1) + 'px; cursor: pointer;opacity:0.9;" ' +
                             'onclick=JSGantt.taskLink("' + task.getLink() + '",300,200); >' +
                             '<div class=gcomplete style="z-index: -4; float:left; background-color:black; height:5px; overflow: auto; margin-top:4px; filter: alpha(opacity=40); opacity:0.4; width:' + task.getCompStr() + '; overflow:hidden">' +
                             '</div>' +
                          '</div>';

                          if( g.getCaptionType() ) {
                             vCaptionStr = '';
                             switch( g.getCaptionType() ) {           
                                case 'Caption':    vCaptionStr = task.getCaption();  break;
                                case 'Resource':   vCaptionStr = task.getResource();  break;
                                case 'Duration':   vCaptionStr = task.getDuration(chart.format);  break;
                                case 'Complete':   vCaptionStr = task.getCompStr();  break;
                                 }
                             //htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; left: 6px; top:-3px;">' + vCaptionStr + '</div>';
                             htmlChartBox += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' + (Math.ceil((vTaskRight) * (faktorDayWidth) - 1) + 6) + 'px">' + vCaptionStr + '</div>';
                         }
                    htmlChartBox += '</div>' ;

                    

                 }
              }

              htmlChartBox += '</DIV>';

           }

           htmlMainTable += htmlChartBox + '</DIV></td></TR></TBODY></TABLE></BODY></HTML>';

           vDiv.innerHTML = htmlMainTable;

        }

     }; //this.draw
     
     
     /**
      * Clears dependency lines between tasks
      * @method clearDependencies
      * @return {Void}
      */ 
      this.clearDependencies = function(){
      
         var parent = document.getElementById('rightside');
         var depLine;
         var vMaxId = vDepId;
         for ( i=1; i<vMaxId; i++ ) {
            depLine = document.getElementById("line"+i);
            if (depLine) { 
              parent.removeChild(depLine); 
            }
         };
         vDepId = 1;
      };
          
    /**
    * Draw a straight line (colored one-pixel wide DIV), need to parameterize doc item
    * @method sLine
    * @return {Void}
    */  
    this.sLine = function(x1,y1,x2,y2) {

     vLeft = Math.min(x1,x2);
     vTop  = Math.min(y1,y2);
     vWid  = Math.abs(x2-x1) + 1;
     vHgt  = Math.abs(y2-y1) + 1;

     vDoc = document.getElementById('rightside');

     // retrieve DIV
     var oDiv = document.createElement('div');
         
     oDiv.id = "line"+vDepId++;
     oDiv.style.position = "absolute";
     oDiv.style.margin = "0px";
     oDiv.style.padding = "0px";
     oDiv.style.overflow = "hidden";
     oDiv.style.border = "0px";

     // set attributes
     oDiv.style.zIndex = 0;
     oDiv.style.backgroundColor = "red";
    
     oDiv.style.left = vLeft + "px";
     oDiv.style.top = vTop + "px";
     oDiv.style.width = vWid + "px";
     oDiv.style.height = vHgt + "px";
 
     oDiv.style.visibility = "visible";
    
     vDoc.appendChild(oDiv);

    };

    /**
    * Draw a diaganol line (calc line x,y pairs and draw multiple one-by-one sLines)
    * @method dLine
    * @return {Void}
    */
   this.dLine = function(x1,y1,x2,y2) {

       var dx = x2 - x1;
       var dy = y2 - y1;
       var x = x1;
       var y = y1;

       var n = Math.max(Math.abs(dx),Math.abs(dy));
       dx = dx / n;
       dy = dy / n;
       for ( i = 0; i <= n; i++ ){
         
          vx = Math.round(x);
          vy = Math.round(y);
          this.sLine(vx,vy,vx,vy);
          x += dx;
          y += dy;
       }

    };

    /**
    * Draw dependency line between two points (task 1 end -> task 2 start)
    * @method drawDependency
    * @return {Void}
    */ 
    this.drawDependency =function(x1,y1,x2,y2){
      
      if(x1 + 10 < x2){ 
        this.sLine(x1,y1,x1+4,y1);
        this.sLine(x1+4,y1,x1+4,y2);
        this.sLine(x1+4,y2,x2,y2);
        this.dLine(x2,y2,x2-3,y2-3);
        this.dLine(x2,y2,x2-3,y2+3);
        this.dLine(x2-1,y2,x2-3,y2-2);
        this.dLine(x2-1,y2,x2-3,y2+2);
      }
       else {
        this.sLine(x1,y1,x1+4,y1);
        this.sLine(x1+4,y1,x1+4,y2-10);
        this.sLine(x1+4,y2-10,x2-8,y2-10);
        this.sLine(x2-8,y2-10,x2-8,y2);
        this.sLine(x2-8,y2,x2,y2);
        this.dLine(x2,y2,x2-3,y2-3);
        this.dLine(x2,y2,x2-3,y2+3);
        this.dLine(x2-1,y2,x2-3,y2-2);
        this.dLine(x2-1,y2,x2-3,y2+2);
       }
     };

      /**
      * Draw all task dependencies 
      * @method DrawDependencies
      * @return {Void}
      */  
      this.drawDependencies = function ( taskList ) {

        //First recalculate the x,y
        this.calcTaskXY( taskList );

        this.clearDependencies();

        for(var i = 0; i < taskList.length; i++){

          vDepend = taskList[i].getDepend();
          if(vDepend) {
     
            var vDependStr = vDepend + '';
            var vDepList = vDependStr.split(',');
            var n = vDepList.length;

            for(var k=0;k<n;k++) {
              var vTask = this.getArrayLocationByID(vDepList[k]);

              if(taskList[vTask].getVisible()==1)
                this.drawDependency(taskList[vTask].getEndX(),taskList[vTask].getEndY(),taskList[i].getStartX()-1,taskList[i].getStartY())
              }
            }
         }
      };

      /**
      * Find location of TaskItem based on the task ID
      * @method getArrayLocationByID
      * @return {Void}
      */  
      this.getArrayLocationByID = function(pId)  {

         var tasks = this.chart.tasks;
         for(var i = 0; i < tasks.length; i++){
           
            if(tasks[i].id==pId)
               return i;
         }
      };

      /**
       * Calculates X/Y coordinates of a task and sets the Start and End properties of the TaskItem
       * @method CalcTaskXY
       * @return {Void}
       */  
       this.calcTaskXY = function ( chart ) {

          var 
            vTaskDiv,
            vParDiv,
            vLeft, 
            vTop, 
            vHeight, 
            vWidth;

          for(i = 0; i < chart.tasks.length; i++){
            
            var task = chart.tasks[i];
                  
             vTaskDiv = document.getElementById("taskbar_"+task.id);
             vBarDiv  = document.getElementById("bardiv_"+task.id);
             vParDiv  = document.getElementById("childgrid_"+task.id);

             if(vBarDiv) {
               task.setStartX( vBarDiv.offsetLeft );
               task.setStartY( vParDiv.offsetTop+vBarDiv.offsetTop+6 );
               task.setEndX( vBarDiv.offsetLeft + vBarDiv.offsetWidth );
               task.setEndY( vParDiv.offsetTop+vBarDiv.offsetTop+6 );
             };
             
          };
       };

      /**
      * Mouseover behaviour for gantt row
      * @method mouseOver
      * @return {Void}
      */  
       this.mouseOver = function( pObj, taskId, pPos, pType ) {
         
          if( pPos == 'right' )  
            vID = 'child_' + taskId;
          else 
            vID = 'childrow_' + taskId;
          
          pObj.bgColor = "#ffffaa";
          vRowObj = JSGantt.findObj(vID);
          
          if (vRowObj) 
            vRowObj.bgColor = "#ffffaa";
          
       };

      /**
      * Mouseout behaviour for gantt row
      * @method mouseOut
      * @return {Void}
      */  
       this.mouseOut = function( pObj, taskId, pPos, pType ) {
      
          if( pPos == 'right' )  
            vID = 'child_' + taskId;
          else 
            vID = 'childrow_' + taskId;
          
          pObj.bgColor = "#ffffff";
          vRowObj = JSGantt.findObj(vID);
          if (vRowObj) {
             if( pType == "group") {
                pObj.bgColor = "#f3f3f3";
                vRowObj.bgColor = "#f3f3f3";
             } else {
                pObj.bgColor = "#ffffff";
                vRowObj.bgColor = "#ffffff";
             }
          }
       };
       
       
       /**
       * Open/Close and hide/show children of specified task
       *
       * @method folder
       * @param taskId {Number} - Task ID
       * @param ganttObj {GanttChart} - The gantt object
       * @return {void}
       */
       this.folder= function (taskId,ganttObj) {

          var vList = ganttObj.getList();

          for(i = 0; i < vList.length; i++)
          {
             if(vList[i].getID() == taskId) {

                if( vList[i].getOpen() == 1 ) {
                   vList[i].setOpen(0);
                   JSGantt.hide(taskId,ganttObj);

                   if (JSGantt.isIE()) 
                      {JSGantt.findObj('group_'+taskId).innerText = '+';}
                   else
                      {JSGantt.findObj('group_'+taskId).textContent = '+';}
                           
                } else {

                   vList[i].setOpen(1);

                   JSGantt.show(taskId, 1, ganttObj);

                      if (JSGantt.isIE()) 
                         {JSGantt.findObj('group_'+taskId).innerText = '�';}
                      else
                         {JSGantt.findObj('group_'+taskId).textContent = '�';}

                }

             }
          }
       };

       /**
       * Hide children of a task
       *
       * @method hide
       * @param taskId {Number} - Task ID
       * @param ganttObj {GanttChart} - The gantt object
       * @return {void}
       */
       this.hide = function (chart, taskId ) {
         
          var vID   = 0;

          for(var i = 0; i < chart.tasks.length; i++){
            
            var task = chart.tasks[i];
            
             if( task.parent == taskId) {
               
                vID = task.id;
                
                JSGantt.findObj('child_' + vID).style.display = "none";
                JSGantt.findObj('childgrid_' + vID).style.display = "none";
                task.visible = 0;
                
                if( task.group == 1){
                  JSGantt.hide(chart,vID);
                }
             }

          }
       };

       /**
       * Show children of a task
       *
       * @method show
       * @param taskId {Number} - Task ID
       * @param ganttObj {GanttChart} - The gantt object
       * @return {void}
       */
       this.show =  function (chart, taskId, pTop ) {
         
          var vID   = 0;

          for(var i = 0; i < chart.tasks.length; i++){
            
            var task = chart.tasks[i];
            
             if( task.parent == taskId ) {
               
                vID = task.id;
                
                if(pTop == 1) {
                   if (JSGantt.isIE()) { // IE;

                      if( JSGantt.findObj('group_'+taskId).innerText == '+') {
                         JSGantt.findObj('child_'+vID).style.display = "";
                         JSGantt.findObj('childgrid_'+vID).style.display = "";
                         task.visible = 1;
                      }

                   } 
                   else{
        
                      if( JSGantt.findObj('group_'+taskId).textContent == '+') {
                         JSGantt.findObj('child_'+vID).style.display = "";
                         JSGantt.findObj('childgrid_'+vID).style.display = "";
                         task.visible = 1;
                      }

                   }

                } 
                else {

                   if (JSGantt.isIE()) { // IE;
                     
                      if( JSGantt.findObj('group_'+taskId).innerText == '�') {
                         JSGantt.findObj('child_'+vID).style.display = "";
                         JSGantt.findObj('childgrid_'+vID).style.display = "";
                         task.visible = 1;
                      }

                   } 
                   else {

                      if( JSGantt.findObj('group_'+taskId).textContent == '�') {
                         JSGantt.findObj('child_'+vID).style.display = "";
                         JSGantt.findObj('childgrid_'+vID).style.display = "";
                         task.visible = 1;
                      }
                   }
                }

                if( task.id == 1){
                  JSGantt.show(chart, vID, 0);
                }

             }
          }
       };//end this.show

   /**
    * 
    */
    this.processRows = function(chart, taskId, pRow, level, opened){

      var minDate = new Date();
      var maxDate = new Date();
      var vMinSet  = 0;
      var vMaxSet  = 0;
      var vNumKid  = 0;
      var vCompSum = 0;
      var isVisible = opened;
     
      var tasklist = chart.tasks;
      
      for(var i = 0; i < tasklist.length; i++){
       
        var task = tasklist[i];
        
        if(task.parent == taskId) {
           
          isVisible     = opened;
          task.visible = isVisible;
         
          if(isVisible==1 && task.opened == 0){
            isVisible = 0;
          }
               
          task.level = level;
          vNumKid++;
  
          if(task.group == 1) {
            this.processRows(chart, task.id, i, level+1, isVisible);
          }
  
          if( vMinSet==0 || task.startDate < minDate) {
            minDate = task.startDate;
            vMinSet = 1;
          }
  
          if( vMaxSet==0 || task.endDate > maxDate) {
            maxDate = task.endDate;
            vMaxSet = 1;
          }
  
          vCompSum += task.getCompVal();
  
        }
      }
  
      if(pRow >= 0) {
        tasklist[pRow].startDate = minDate;
        tasklist[pRow].endDate = maxDate;
        tasklist[pRow].setNumKid(vNumKid);
        tasklist[pRow].setCompVal(Math.ceil(vCompSum/vNumKid));
      }
  
    };//end this.processRows
    
  };//end gantt.render = new function( )

})($UI.gantt);
