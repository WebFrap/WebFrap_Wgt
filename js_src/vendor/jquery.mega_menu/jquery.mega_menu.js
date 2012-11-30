/*
 * DC Mega Menu - jQuery mega menu
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($){

  "use strict";
  
  //define the defaults for the plugin and how to call it
  $.fn.wgtMegaMenu = function(options){
    
    //set default options
    var defaults = {
      classParent: 'wgt-mega-menu',
      classContainer: 'sub-container',
      classSubParent: 'mega-hdr',
      classSubLink: 'mega-hdr',
      classWidget: 'wgt-extra',
      rowItems: 3,
      speed: 'fast',
      effect: 'fade',
      event: 'hover',
      fullWidth: false,
      onLoad : function(){},
      beforeOpen : function(){},
      beforeClose: function(){}
    };

    //call in the default otions
    var options = $.extend(defaults, options);
    var $wgtMegaMenuObj = this;
    
    $wgtMegaMenuObj.find("select").bind('mouseout',function(e) {
      e.stopPropagation();
    });
    

    //act upon the element that is passed into the design
    return $wgtMegaMenuObj.each(function(options){

      var clSubParent = defaults.classSubParent,
        clSubLink = defaults.classSubLink,
        clParent = defaults.classParent,
        clContainer = defaults.classContainer,
        clWidget = defaults.classWidget;
      
      megaSetup();
      
      function megaOver(){

        //if( console.trace ){
        //  console.trace(  );
        //}
        
        //console.log( 'open mega' );
        
        var subNav = $('.subcnt',this);
        
        $(this).addClass('mega-hover');
          
        $(subNav).show();
        
        // schliesen des Menüs nach dem Request
        
        var closeMega = function( key ){
          if( 'mega_menu' !== key  ){
            megaReset();
          }
        };
        
        $D.requestCloseMenu( 'mega_menu' );
          
        $D.requestCloseMenu = closeMega;

        // beforeOpen callback;
        defaults.beforeOpen.call(this);
      }

      function megaAction(obj){

        var subNav = $('.subcnt',obj);
        //$('.mega-hover').removeClass('mega-hover');
        $(obj).addClass('mega-hover');
        
        $(subNav).show();
        
        // beforeOpen callback;
        defaults.beforeOpen.call(this);
      }

      function megaOut(){

        var subNav = $('.subcnt',this);
        $(this).removeClass('mega-hover');
        $(subNav).hide();
        // beforeClose callback;
        defaults.beforeClose.call(this);
      }

      function megaActionClose(obj){

        var subNav = $('.subcnt',obj);
        $(obj).removeClass('mega-hover');
        $(subNav).hide();
        // beforeClose callback;
        defaults.beforeClose.call(this);
      }

      function megaReset(){

        $('li',$wgtMegaMenuObj).removeClass('mega-hover');
        $('.subcnt',$wgtMegaMenuObj).hide();
      }

      function megaSetup(){

        var $arrow = '<span class="wgt-mega-menu-icon"></span>';
        var clParentLi = clParent+'-li';
        var menuWidth = $wgtMegaMenuObj.outerWidth();
     
        $('> li',$wgtMegaMenuObj).each(function(){

          var actLi = $(this);

          if( actLi.hasClass( 'custom' ) ){

            var $mainSub = $('.subcnt',this);
            $('.subcnt',this).wrap('<div class="'+clContainer+'" />');
            
            var pos = $(this).position();
            var pl = pos.left;
            var iw = $('.subcnt',this).outerWidth(true);
              
            var newPos = pl - (iw/2);
            if( newPos < 0 ){
              newPos = 0;
            }

            $('.'+clContainer,this).css('left', newPos+'px');
            
          }
          else{

            //Set Width of sub
            var $mainSub = $('> ul',this);
            var $primaryLink = $('> a,> p',this);

            if( $mainSub.length ){

              $primaryLink.addClass(clParent).append($arrow);
              $mainSub.addClass('sub').addClass('subcnt').wrap('<div class="'+clContainer+'" />');

              var pos = actLi.position();
              var pl  = pos.left;

              if($('ul',$mainSub).length){

                actLi.addClass(clParentLi);
                $('.'+clContainer,this).addClass('mega');

                $('> li',$mainSub).each(function(){

                  if( !$(this).hasClass(clWidget) ){

                    $(this).addClass('mega-unit');

                    if( $('> ul',this).length ){

                      $(this).addClass(clSubParent);
                      $('> a,> p',this).addClass(clSubParent+'-a');
                    }
                    else {

                      $(this).addClass(clSubLink);
                      $('> a,> p',this).addClass(clSubLink+'-a');
                    }

                  }
                }); //end $('> li',$mainSub).each(function(){

                // Create Rows
                var hdrs    = $('.mega-unit',this);
                var rowSize = parseInt(defaults.rowItems);

                for(var i = 0; i < hdrs.length; i+=rowSize){
                  
                  hdrs.slice(i, i+rowSize).wrapAll('<div class="row" />');
                }

              }

              // Get Sub Dimensions & Set Row Height
              $mainSub.show();
              
              // Get Position of Parent Item
              var pw = actLi.width();
              var pr = pl + pw;
              
              // Check available right margin
              var mr = menuWidth - pr;
              
              // // Calc Width of Sub Menu
              var subw = $mainSub.outerWidth();
              var totw = $mainSub.parent('.'+clContainer).outerWidth();
              var cpad = totw - subw;
              
              if( defaults.fullWidth == true ){
                
                var fw = menuWidth - cpad;
                $mainSub.parent('.'+clContainer).css({
                  width: fw+'px'
                });
                $wgtMegaMenuObj.addClass('full-width');
              }

              var iw = $('.mega-unit',$mainSub).outerWidth(true);
              var rowItems = $('.row:eq(0) .mega-unit',$mainSub).length;
              var inneriw = iw * rowItems;
              var totiw = inneriw + cpad;
              
              // Set mega header height
              $('.row',this).each(function(){
                
                $('.mega-unit:last',this).addClass('last');
                var maxValue = undefined;
                
                $('.mega-unit > a,.mega-unit > p',this).each(function(){
                  var val = parseInt($(this).height());
                  if (maxValue === undefined || maxValue < val){
                    maxValue = val;
                  }
                });
                
                $('.mega-unit > a,.mega-unit > p',this).css('height',maxValue+'px');
                $(this).css('width',inneriw+'px');
                
              });
              
              // Calc Required Left Margin incl additional required for right align
              
              if(defaults.fullWidth == true){
                params = {
                  left: 0
                };
              }
              else {
                
                var ml = mr < ml ? ml + ml - mr : (totiw - pw)/2;
                var subLeft = pl - ml;

                // If Left Position Is Negative Set To Left Margin
                var params = {
                  left: pl+'px',
                  marginLeft: -ml+'px'
                };
                
                if(subLeft < 0){
                  params = {
                    left: 0
                };
                  
                }
                else if(mr < ml){
                  params = {
                    right: 0
                  };
                }
              }
              $('.'+clContainer,this).css(params);
              
              // Calculate Row Height
              $('.row',$mainSub).each(function(){
                
                var rh = $(this).height();
                $('.mega-unit',this).css({
                  height: rh+'px'
                });
                $(this).parent('.row').css({
                  height: rh+'px'
                });
                
              });
              $mainSub.hide();
          
            }
            else {
              
              $('.'+clContainer,this).addClass('non-mega').css('left',pl+'px');
            }

          }

        });
        
        // Set position of mega dropdown to bottom of main menu
        var menuHeight = $('> li > a,> li > p',$wgtMegaMenuObj).outerHeight(true);
        
        $('.'+clContainer,$wgtMegaMenuObj).css({
          top: menuHeight+'px'
        }).css('z-index','1000');
        
        if( defaults.event === 'hover' ){
          
          // HoverIntent Configuration
          var config = {
            sensitivity: 1,
            interval: 100,
            over: megaOver,
            timeout: 100,
            out: megaOut
          };
          
          $('li',$wgtMegaMenuObj).hoverIntent(config); // feals much to slow!
          //$wgtMegaMenuObj.children().bind( 'mouseover' ,megaOver ).bind('mouseout',megaOut);
          
        }
        else if( defaults.event === 'click' ){
        
          $('body').mouseup(function(e){
            if(!$(e.target).parents('.mega-hover').length){
              megaReset();
            }
          });

          $('> li > a.'+clParent+',> li > p.'+clParent,$wgtMegaMenuObj).click(function(e){
            var $parentLi = $(this).parent();
            if($parentLi.hasClass('mega-hover')){
              megaActionClose($parentLi);
            } 
            else {
              megaAction($parentLi);
            }
            e.preventDefault();
          });
          
        }
        
        // onLoad callback;
        defaults.onLoad.call( this );
      }
      
    });
  };
})(jQuery);