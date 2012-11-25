/* Licence see: /LICENCES/wgt/licence.txt */

;(function($, undefined){
	
/**
 * @author marko andrijasevic <marko_andrijasevic@sap.com>
 */
  var footerId           = '#wbf-footer';
  var footerHistoryId    = '#wbf-footer-history';
  var closeId            = "#footerCloseArea";
    
  var methods = {
		  
    init: function() {
      
      $('document').ready(function(){
	      $(footerHistoryId).hide();
	      
	      //add background area for footer closing
	      var $closer = $("<div id=\"footerCloseArea\"></div>").appendTo('body');
	      $closer.css({width: '100%', height: '100%', opacity: '0.3', position: 'fixed', 'background-color': '#100', left: '0px', top: '0px', 'z-index': 4000});
	      $closer.hide();
	      
	      var $closer = $("<div class=\"ui-dialog\" id=\"videoTutorial\"><a href=\"#\" style=\"opacity:1; top:2%; right:2%;\" onClick=\"  jQuery('#videoDiv').remove(); jQuery('#videoTutorial').fadeOut(400);  \" class=\"ui-dialog-titlebar-close ui-corner-all ui-state-hover\" role=\"button\"><span class=\"ui-icon ui-icon-closethick\">close</span></a><div style=\"width:100%; height:100%;\" id=\"videoDiv1\" ></div></div>").appendTo('body');
	      $closer.css({ width: '100%', height: '100%', opacity: '0.7', position: 'fixed', 'background-color': '#100', left: '0px', top: '0px', 'z-index': 4005});
	      $closer.hide();
	      
	      $(closeId).click(function(e){
	        $(footerHistoryId).slideUp(400);
	    	  $(closeId).data('isOpen', false);
	    	  $(closeId).fadeOut(400);
	        });
	      
	      $(footerId).click(function(){  
	    	  if($(closeId).data('isOpen')){
	    		//footer is currently open
	    		$(footerHistoryId).slideUp(400);
	    		$(closeId).data('isOpen', false);
	    		$(closeId).fadeOut(400);
	      	  }
		      else{
		    	//footer is currently closed
		  		$(footerHistoryId).slideDown(400);
		    	$(closeId).data('isOpen', true);
		        $(closeId).fadeIn(400);
		      }
	      });
      });
    },
    
	newMsg: function( time, status, message, info ) {
	  $(footerHistoryId + ' table tbody').append($(footerId +' table tbody').html());
	  $(footerId + ' table tbody').remove();
	  
	  var newRow = '<tr class="ui-state-highlight">';
	      newRow +='<td class="time">'+ time() +'</td>';
	      newRow +='<td class="status">'+ getStatusMsg(status) +'</td>';
	      newRow +='<td class="message">'+ message +'</td>';
	      newRow +='</tr>';     
	  
	  $(footerId + ' table').append($(newRow));
	    }
	  };
  
  var getStatusMsg = function(status){
	  //@todo adjust path to theme/images here
	  return "<img src=\""+status+".png\" alt=\"["+ status +"]\" />";
  };
  
  $.fn.footer = function(method){
    
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } 
    else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } 
    else {
      $.error( 'Method ' +  method + ' does not exist in jQuery.footer' );
    }         
  };
  
})(jQuery);