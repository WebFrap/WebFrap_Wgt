/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 * 
 * @smell Use templates instead of inline code
 * @smell Should be a widget
 * @smell redundancy is very high, nearly the same as minimenu, it's required to combine both
 */
(function($S){

  var overlayID = "menuSelectorOverlay";

  // The actual function
  $S.fn.menuSelector = function(options){

    return this.each(function(){
      // Save reference
      var self = $S(this);

      // Merge default options with passed options
      var opts = $S.extend({}, $S.fn.menuSelector.defaults, options);
      
      // Save options to element
      self.data('menuSelectorOptions', opts);

      if (self.hasClass('hasMenuSelector'))
        return this;

      // Initialise the overlay box
      initOverlay(opts);
      self.addClass('hasMenuSelector');
      
      // Set click handler
      self.click(function() {
        initOverlay(opts);
        $S.fn.menuSelector.openOverlay(this);
      });

    });

  };
	
  // Closes the overlay box
  $S.fn.menuSelector.closeOverlay = function(){
    
    if ($S('#'+ overlayID +':visible').length){
      
      /*
      $S('#'+overlayID).slideUp('fast', function(){
        
        $S('.menuSelectorOverlay').removeClass('menuSelectorOverlay');
      });
      */
      
      $S('#'+overlayID).hide();
      $S('.menuSelectorOverlay').removeClass('menuSelectorOverlay');
    }
  };
	
  // Opens the overlay box
  $S.fn.menuSelector.openOverlay = function(target){

    var $target = $S(target);
    // Get options of the element
    var opts = $target.data('menuSelectorOptions');
    
    // Close overlay box in case it's still open
    $S.fn.menuSelector.closeOverlay();		
    $target.addClass('hasMenuSelectorOverlay');
		
    // get $S object of overlay box
    var $overlay 	= $S('#'+overlayID);
		
    // get current value of the passed input field
    var currentVal = typeof opts.stringField != 'undefined' ? opts.stringField.val() : '';	
				
    // get the offset coordiantes
    var style = $target.offset();
    // adjust top coordinate
    style.top = style.top + $target.outerHeight();		
    $overlay.css(style);	
		
    // Content of the overlay box
    var content = "";
		
    // If there are any additional menu items to be shown ...
    if (opts.menuItems != null){
      
      var length = opts.menuItems.length;
      for (var i = 0; i < length; i++) {
        
        var item = opts.menuItems[i];
        content += '<div class="menuSelectorMenuButton">'
          +'<a style="cursor: pointer;width:98%;" onclick="$R.get( \''+item.onClickLink+'\', {callback:function(){$S.fn.menuSelector.closeOverlay();}} )"' 
          +'   onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
          +'   onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');"'
          +'   class="ui-corner-all default">'
          +'<img class="icon xsmall" src="'+ item.iconPath +'" /> '
          +'<b>'+ item.caption +'</b>'
          +'</a>'
          +'<br style="clear: both;" />'
          +'</div>';			
							
      }
    }		

    if( currentVal == '' ){
      
      content = content
      + '<div class="menuSelectorMenuButton">'
      + '<a style="cursor: pointer;width:98%;"  onclick="$R.get( '+opts.add_link+' , {callback:function(){$S.fn.menuSelector.closeOverlay();}} )"'
      + ' onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      + ' onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');" class="ui-corner-all default">'			      
      + '<img class="icon xsmall" src=\''+$C.iconAdd+'\' /> '
      + '<b>append</b>'				
      + '</a>'
      + '<br style="clear: both;" />' 
      + '</div>';
    }
    else{
      //  if(opts.add && !opts.edit)
      
      content = content 
      + '<div class="menuSelectorMenuButton">'
      + '<a style="cursor: pointer;width:98%;"  onclick="$R.get( '+opts.add_link+', {callback:function(){$S.fn.menuSelector.closeOverlay();}} )" '
      +   'onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      +	'onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');" class="ui-corner-all default">'		      
      +	'<img class="icon xsmall" src=\''+$C.iconAdd+'\' /> '
      + '<b>change</b>'				
      + '</a>'
      + '<br style="clear: both;" />'
      + '</div>';
    }
		
    if (opts.edit && currentVal != ''){
      
      content = content
      +	'<div class="menuSelectorMenuButton">'
      + '<a style="cursor: pointer;width:98%;" onclick="$S.fn.menuSelector.closeOverlay();$R.showEntity( '+opts.edit_link+' );"'
      +	'onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      +	'onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');"'
      +	'class="ui-corner-all default">'
      +	'<img class="icon xsmall " src="'+$C.iconEdit+'" />'
      + '<b>   show data</b>'
      + '</a>'
      + '<br style="clear: both;" /></div>';
    }
		
    if (opts.remove && currentVal != ''){
      
      content = content
      +	'<div class="menuSelectorMenuButton">'
      + '<a style="cursor: pointer;width:98%;" onclick="$S.fn.menuSelector.closeOverlay(), $S.fn.menuSelector.emptyFields(\''+opts.stringField.attr("id")+'\',\''+opts.hiddenField.attr("id")+'\') ;"'
      +	'onmouseover="$S(this).removeClass(\'default\').addClass(\'ui-state-hover\');" '
      +	'onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'default\');"'
      +	'class="ui-corner-all default">'
      +	'<img class="icon xsmall " src="'+$C.iconDelete+'" />'
      + '<b>   disconnect</b>'
      + '</a>'
      + '<br style="clear: both;" /></div>';
    }	
		
    content += '<div style=""></div>';
    $overlay.find('#menuSelectorContent').html(content);
    $overlay.show();
  };
	
  // Reset input fields
  $S.fn.menuSelector.emptyFields = function(displayId, valId){
    
    alert( '#'+valId );
    
    $S('#'+valId).val("1");
    $S('#'+displayId).val("");
  };
	
  // Mousedown handler on the document
  function docMouseDown(e){
   
    if( $S(e.target).hasClass('menuSelectorMenuButton') ) {   

      $S(e.target).click();
      return;

    }
    else {
     
      if( $S(e.target).parent().hasClass('menuSelectorMenuButton') ) {   

       $S(e.target).parent().click();
       return;

      } 
      else {

        if ($S("#"+overlayID+":visible").length == 0) {	    		
          return;
        }
        else {

          $S.fn.menuSelector1.closeOverlay();

        }
      }
    }	
  	
  };//end function docMouseDown
	
  // Initialise overlay box and apply the style
  function initOverlay(opts){	
    
    if ($S("#"+overlayID).length == 0){
      
      $S("body").append(
        '<div id="'+overlayID+'" class="">'
        +'   <div class="ui-widget ui-widget-content">'
        +'	  <div class="ui-widget-content" style="padding: 0;">'
        +'	       <div id="menuSelectorContent"></div>'
        +'	       <div style="clear: left;"></div>'
        +'	  </div>'
        +'	  <div id="menuSelectorCloseButton">'
        +'	     <a href="javascript: void(0);" onclick="$S.fn.menuSelector.closeOverlay()"'
        +'           onmouseover="$S(this).removeClass(\'ui-state-default\').addClass(\'ui-state-hover\');" '
        +'	        onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'ui-state-default\');"'
        +'		   class="ui-corner-all ui-state-default">'
        +'				Close'
        +'		</a>'
        +'		<br style="clear: both;" /><div></div>'
        +'	</div>'
        +'	<!--[if lte IE 6.5]>'
        +'	<iframe style="display:block; position:absolute;top: 0;left:0;z-index:-1;'
        +'				filter:Alpha(Opacity=\'0\');width:3000px;height:3000px"></iframe>'
        +'	<![endif]-->'
        +'</div></div>'
      );
			
      $S(document).mousedown(function(e){docMouseDown(e)});
    }
    else{
    	
    	$S("#"+overlayID).html(
         '   <div class="ui-widget ui-widget-content">'
         +'	  <div class="ui-widget-content" style="padding: 0;">'
         +'	       <div id="menuSelectorContent"></div>'
         +'	       <div style="clear: left;"></div>'
         +'	  </div>'
         +'	  <div id="menuSelectorCloseButton">'
         +'	     <a href="javascript: void(0);" onclick="$S.fn.menuSelector.closeOverlay()"'
         +'           onmouseover="$S(this).removeClass(\'ui-state-default\').addClass(\'ui-state-hover\');" '
         +'	        onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'ui-state-default\');"'
         +'		   class="ui-corner-all ui-state-default">'
         +'				Close'
         +'		</a>'
         +'		<br style="clear: both;" /><div></div>'
         +'	</div>'
         +'	<!--[if lte IE 6.5]>'
         +'	<iframe style="display:block; position:absolute;top: 0;left:0;z-index:-1;'
         +'				filter:Alpha(Opacity=\'0\');width:3000px;height:3000px"></iframe>'
         +'	<![endif]-->'
         +'</div>'
      ).width('120px');
    	
    	
    }
    $S("#"+overlayID).attr("style", "");
    $S("#"+overlayID).css(opts.overlayStyle);
  };
	
  // Default options
  $S.fn.menuSelector.defaults = {
      overlayStyle: {},
      menuItems: null,
      add: 0,
      add_link: '',
      add_image: '',
      edit: 0,
      edit_link: ''
  };
	
})($S);
