
(function($,$C){

  $.monthpicker={}
  
  $.monthpicker.defaults={ buttonImage:'calendar.png'};
  $.monthpicker.options={};
  
  // container erstellen
  $.monthpicker.createContainer = function(pos)
  {
    var container=jQuery('<div id="ui-monthpicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible" style="position: absolute; top:'+pos.top+'px; left: '+pos.left+'px; display: none; text-align:center; z-index:10"></div>');
    $('body').append(container);
    $(document).mousedown($.monthpicker.doCheckMouseClick);
  };

  // controll element erstellen
  $.monthpicker.createControl = function( selectedmonth, selectedyear, input )
  {
		
    var container = $("#ui-monthpicker-div");
    var t = input.offset().top + input.outerHeight();
    var l = input.offset().left;
    container.css({'top':t,'left':l});
    container.html('');
    
    var head=$('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>');

    var in_val = $.trim(input.val());
    var actualDate = null;
     
    if( in_val != '' )
    {
      //in_val = in_val.split($C.dateSep || '-');
      try
      {
        actualDate = $.datepicker.parseDate( $C.formatDate, in_val+'-01' );
  	  
        selectedmonth    = actualDate.getMonth()+1;
        selectedyear     = actualDate.getFullYear();
      }
      catch( e )
      {
        //$D.errorWindow( "UI Error", e );
      }
		
	 /*
	  if( in_val[1] != '' ) 
	    selectedmonth = parseFloat( in_val[1] );
	  
	  if( in_val[0] != '' ) 
	    selectedyear = parseFloat( in_val[0] );
	 */
    }
    
    // implementierung eines start und endes
    var name = input.attr('name');
    var start_input = input.parent().find('[name=start_'+name+']');
    var end_input = input.parent().find('[name=end_'+name+']');
    
    if( start_input.length == 0 )
    {
      var start_y = selectedyear-10;
      var start_m = 1;
    }
    else
    {   
      var start = start_input.val();
      start=start.split('_');
      var start_y = parseFloat(start[0]);
      var start_m = parseFloat(start[1]);
    }
    
    if( end_input.length == 0 )
    {
      var end_y = selectedyear+10;
      var end_m = 1;
    }
    else
    {
      var end = end_input.val();
      end = end.split('_');
      var end_y = parseFloat(end[0]);
      var end_m = parseFloat(end[1]);
    }
                 
    var year_select=$('<select class="ui-datepicker-year" onclick="" onchange=""></style>');
	
    year_select.bind('change',function()
    {
      $.monthpicker.refreshMonths( container, input );
    });
    
    var x=start_y;
    var opt=null;
    var tr=null;
    var td=null;
    var a=null;
	
    while( x <= end_y )
    {  
      opt=$("<option value="+x+">"+x+"</option>");
      
      if(x==selectedyear)
        opt.attr("selected","selected");
	 
      year_select.append(opt);
	 x++;
    }
	
    head.append(year_select);
	
    var month_select = $( '<table class="ui-datepicker-calendar" style="margin-top:0.2em"><tbody></tbody></table>' );
    var months = new Array( "","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" );
    var r = 1;
    var c = 1;
    var m = 1;
	
    while(r<=3)
    {
      tr=$("<tr></tr>");
      c=1;
      while(c<=4)
      {
			
        td=$('<td class="month'+m+'" onclick=""></td>');
        if((selectedyear == start_y && m < start_m)||(selectedyear == end_y && m > end_m))
        {
          a=$('<a class="ui-state-disable" href="#">'+months[m]+'</a>');
        }
        else
        {
  
          a=$('<a class="ui-state-default" href="#">'+months[m]+'</a>');
          a.bind('mouseout', function()
          {
            $(this).removeClass('ui-state-hover');	
          })
          .bind('mouseover', function()
          {
            $(this).addClass('ui-state-hover');
          })
          .bind('click',function()
          {
            var month=$(this).parent().prop('class');
            month = month.replace('month','');
            
            var year = $('.ui-datepicker-year').val();
            input.val( $.datepicker.formatDate( $C.formatDateMonth, new Date(year,(month-1),1)  ));
            $.monthpicker.deleteControl();
					      
          });
        }
			
        if( m==selectedmonth ) 
          a.addClass("ui-state-active"); 
			
        tr.append(td.append(a));
        c++;
        m++;
      }
      
      month_select.append(tr);
      r++;
    }
    
    container.append(head);
    container.append(month_select);

	
  };

  $.monthpicker.deleteControl=function()
  {
    $('#ui-monthpicker-div').hide();
  };

  $.monthpicker.doCheckMouseClick = function(e) 
  {
    if (!$('#ui-monthpicker-div:visible').length) 
    {
      return;
    }
    if (!$(e.target).closest('#ui-monthpicker-div').length)
    {
      $.monthpicker.deleteControl();
    }
  };

  $.monthpicker.refreshMonths = function( container, input )
  {
    //var container=$("#ui-monthpicker-div");
    var selectedyear = container.find('.ui-datepicker-year').val();

    
    var actualDate = null;
    var selectedmonth = null;
    var in_val = input.val();
     
    if( in_val != '' )
    {
      actualDate    = $.datepicker.parseDate( $C.formatDate, in_val+'-01' );
      selectedmonth = actualDate.getMonth()+1; 
      
    }
	
    var name = input.attr( 'name' );
    var start_input = input.parent().find( '[name=start_'+name+']' );
    var end_input = input.parent().find( '[name=end_'+name+']' );
    
      if( start_input.length == 0 )
      {
        var start_y = selectedyear-10;
        var start_m = 1;
      }
      else
      {   
         var start = start_input.val();
      	start = start.split( '_' );
      	var start_y = parseFloat( start[0] );
         var start_m = parseFloat( start[1] );
      }
      
      if( end_input.length == 0 )
      {
        var end_y = selectedyear+10;
        var end_m = 1;
      }
      else
      {
         var end = end_input.val();
         end = end.split( '_' );
         var end_y = parseFloat( end[0] );
         var end_m = parseFloat( end[1] );
      }
    
	var month_select = container.find('.ui-datepicker-calendar');
	month_select.html('');
	var months= new Array("","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var r=1;
	var c=1;
	var m=1;
	
	while(r<=3)
	{
		tr=$("<tr></tr>");
		c=1;
		while(c<=4)
		{
			
			td=$('<td class="month'+m+'" onclick=""></td>');
			if((selectedyear == start_y && m < start_m)||(selectedyear == end_y && m > end_m))
			{
				a=$('<a class="ui-state-disable" href="#">'+months[m]+'</a>');
			}
			else
			{
		    
				a=$('<a class="ui-state-default" href="#">'+months[m]+'</a>');
				a.bind('mouseout', function(){
					$(this).removeClass('ui-state-hover');	
				})
				.bind('mouseover', function()
						{
						$(this).addClass('ui-state-hover');
				})
		          .bind('click',function()
		          {
		            var month=$(this).parent().prop('class');
		            month = month.replace('month','');
		                
		            var year = $('.ui-datepicker-year').val();
		            input.val( $.datepicker.formatDate( $C.formatDateMonth, new Date(year,(month-1),1)  ));
		            $.monthpicker.deleteControl();
		                                   
		          });
			}
			
			if( m==selectedmonth ) 
			  a.addClass("ui-state-active"); 
			
			tr.append(td.append(a));
			c++;
			m++;
		}
		
		month_select.append(tr);
		r++;
	}
     //container.find('table').html(month_select);

  };
  
  // die eigentliche funtion
  $.fn.monthpicker = function( opt )
  {
    
    $.monthpicker.options = $.extend({}, $.monthpicker.defaults, opt);
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var year =  myDate.getFullYear();
  	
    return this.each(function()  {
      	
      var input = $(this);
      
      var inpVal = $.trim(input.val());
      
      if( '' != inpVal )
      {
        try
        {
          input.val( $.datepicker.formatDate( $C.formatDateMonth, $.datepicker.parseDate(  $C.formatDate, inpVal+'-01'  ) ) );
        }
        catch( e )
        {
          $D.errorWindow( "Failed to set Monthpicker value", e );
        }
      }
      
      var t = input.offset().top + input.outerHeight();
      var l = input.offset().left;
    /*  var button_image=$('<img class="ui-month-picker-trigger" src="'+$.monthpicker.options.buttonImage+'" ></img>');
      
      button_image.bind( 'click', function()
      { 
        $.monthpicker.createControl( month, year, input ); 
        $('#ui-monthpicker-div').animate({width:'show',height:'show'},'fast'); 
      });
      
      input.after(button_image); */
      
      if( !$('#ui-monthpicker-div').length )
        $.monthpicker.createContainer({'top':t,'left':l});	
      
    });
    
  };


})(jQuery,$C);

/*
jQuery(document).ready(function(){



    jQuery('.inputmonth').monthpicker().removeClass('.inputmonth');
 
    

    
/*
    jQuery('#ui-monthpicker-div .ui-datepicker-year option')
    			.each(function()
    	    		{
    	    		if($(this).val()==year)
        	    		$(this).attr("selected","selected");
        			});

	jQuery('#ui-monthpicker-div .ui-datepicker-calendar .month'+month+' a').addClass("ui-state-highlight");
				
    	*/		
    
	
/*		
});
*/