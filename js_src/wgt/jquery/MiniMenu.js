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
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

(function(jQuery){

  // the id for the overlay
  var overlayID = "wgt-dropform-overlay";

  // The actual function
  jQuery.fn.miniMenu = function( options ){
    
    /**
     * Soll das Menü bei globalen klicks (Auserhalb des Menüs) geschlossen werden?
     */
    this.globalClose = true;

    $S(this).each( function(){
      
      // Save reference
      var $this = jQuery(this);

      if( typeof HTMLDocument !== 'undefined'  ){
        if( this instanceof HTMLDocument ){
          console.error( "added minimenu to HTMLDocument" );
          return;
        }
      }

      // Merge default options with passed options
      var opts = jQuery.extend({}, jQuery.fn.miniMenu.defaults, options);

      // Save options to element
      $this.data( 'miniMenuOptions', opts );

      if( $this.hasClass( 'wgt-dropform-menu-selector' ) ){
        return this;
      }
      
      // Initialise the overlay box
      initMiniMenuOverlay( opts, $this );

      $this.addClass('wgt-dropform-menu-selector');
      
      // Set click handler
      //console.log( "minimenu trigger "+opts.triggerEvent );
     
      $this.bind( opts.triggerEvent, function( event ){
        jQuery.fn.miniMenu.open( $this );

        // close on mouseklick outside
        event.stopPropagation();
      });

    });
    
    return $S(this);

  };

  // Closes the overlay box
  jQuery.fn.miniMenu.close = function(  ){

    
    // das menü schliesen wenn es sichtbar ist
	//if( jQuery( '#'+ overlayID +':visible,.'+ overlayID +':visible' ).length ){
    if( jQuery( '.'+ overlayID +':visible' ).length ){
      
      //jQuery('#'+overlayID+',.'+overlayID).hide();
      jQuery('.'+overlayID).hide();

      // remove global close check
      jQuery(document).unbind( 'mouseup.wgt_mini_menu' );

      /**/
      /// was soll der abschnitt eigentlich machen???
      if( this instanceof Function ){
        //console.log( "minimenu instance of close is a function" );
      }
      else{
        
        var theOverlay = $S(this); 
        if( theOverlay.find('var.conf').is('var.conf') ){
          //console.log('#'+theOverlay.find('var.conf').text());
          $S('#'+theOverlay.find('var.conf').text()).hide();
        }
      }
      
      if( undefined !== $D.globalClick['.'+ overlayID] ){
        $D.globalClick['.'+ overlayID] = undefined;
      }
      
      //jQuery('.wgt-dropform-overlay').removeClass('wgt-dropform-overlay');
    }
    
  };

  // Opens the overlay box
  /**
   * @param target
   */
  jQuery.fn.miniMenu.open = function( target ){

    var $target   = jQuery(target);
    var $targetId = $target.attr( 'id' );
    var $overlay  = null;
    
    // Get options of the element
    var opts    = $target.data('miniMenuOptions');
    
    // globales schliesen konfigurieren
    if( opts.globalClose ){
      jQuery.fn.miniMenu.globalClose = true;
    }
    else{
      jQuery.fn.miniMenu.globalClose = false;
    }
    
    
    
    // Einfach mal die Box schliesen für den Fall, dass sie aktuell noch offen ist
    jQuery.fn.miniMenu.close();
    
    $D.globalClick['.'+ overlayID] = function( event ){
      
      if( !$S(event.target).parentX( '.'+ overlayID ) ){
        jQuery.fn.miniMenu.close();
        $D.globalClick['.'+ overlayID] = undefined;
      }
    };

    if( !jQuery( '#'+$targetId+'-mnm-overl' ).length ){
      
      console.log( "Minimenu no dropdown: "+'#'+$targetId+'-mnm-overl' );
      
      // get jQuery object of overlay box
      $overlay  = jQuery( '#'+overlayID ).clone();
      $overlay.removeClass( 'template' );
     
      // Content of the overlay box
      $overlay.attr( 'id' , $targetId+'-mnm-overl' ).addClass( overlayID );
      $overlay.find('.wgt-minimenu-content').html('<div></div>');
  
      var menuBody = $overlay.find('.wgt-minimenu-content > div');
      
      var builders = jQuery.fn.miniMenu.builders;
      // If there are any additional menu items to be shown ...
      if (opts.menuItems != null){
        
        var length = opts.menuItems.length;
        for (var i = 0; i < length; i++){
  
          var item = opts.menuItems[i];
  
          if( item.type === undefined ){
            item.type = 'url';
          }
  
          if( builders[item.type] !== undefined ){
            builders[item.type]( item, menuBody, $target );
          }
          else{
            // check for some error handling
            console.error( "Got unknown minimenu part "+item.type );
          }
        }
      }
      
      $overlay.appendTo('body');
      
      // schliesen des Overlays wenn es verlassen wird
      if( true === opts.closeOnLeave || 'true' === opts.closeOnLeave  ){

        var dEnter = null;
        var dClose = null;

        setTimeout( function(){
            if( !$overlay.hasClass('mouse_in') && !$target.hasClass('mouse_in') ){
              jQuery.fn.miniMenu.close();
            }
            	
          },
          600
        );

        $target.mouseenter( function(){
          $target.addClass('mouse_in');
          $overlay.removeClass('mouse_in');
        }).mouseleave( function(){
          $target.removeClass('mouse_in');
        });

        $overlay.mouseenter( function(){

          dEnter = new Date().getTime();
          $overlay.addClass('mouse_in');
          //$target.removeClass('mouse_in');

          $overlay.mouseleave( function(){

            dClose = new Date().getTime();
            $overlay.unbind('mouseleave');
            $overlay.removeClass('mouse_in');

            setTimeout( function(){
                if( (dClose - 400) > dEnter ){
                  jQuery.fn.miniMenu.close();
                }
              },
              450
            );

          });
       });
     }else{
       
       $overlay.mouseenter( function(){
         $overlay.removeClass('wgt-opacity-30');
       }).mouseleave( function(){
         $overlay.addClass('wgt-opacity-30');
       });
       
     }
     

      // flag setzen, dass das element auf global close events reagieren soll
      if( opts.globalClose ){
        $overlay.addClass('flag_global_close');
      }
      
    }
    else{
      
      console.log( "Minimenu found dropdown: "+'#'+$targetId+'-mnm-overl' );

      $overlay = jQuery( '#'+$targetId+'-mnm-overl' );

      if( true === opts.closeOnLeave || 'true' === opts.closeOnLeave ){
        setTimeout( function(){

            if( !$overlay.hasClass('mouse_in') && !$target.hasClass('mouse_in') ){
              jQuery.fn.miniMenu.close();
            }
          },
          700
        );
      }
    	
    }


    // event setzen
    if( opts.globalClose ){
      jQuery(document).bind( 'mouseup.wgt_mini_menu', docMouseDown );
    }
    
      
    //$target.addClass('flag-menu-overlay');
    // Die ausrichtung und position des Overlays berechnen
    // sicher stellen, dass es nicht über die Ränder hinaus floatet
    var style     = $target.offset();
    var tStyleW   = $target.outerWidth();
    var oStyleH   = $overlay.outerHeight();
    var oStyleW   = $overlay.outerWidth();
    var winW      = $S(document).width();
    var winH      = $S(document).height()-40;
    
    if( !style ){
      
      console.error( 'missing style' );

      if( console.trace ){
        console.trace(  );
      }
      
      return;
    }
    
    if( 'right' == opts.align ){
      
      style.left =  style.left + tStyleW - oStyleW;
      
      if( ( style.left + opts.overlayStyle.width ) > winW ){
        style.left = winW - opts.overlayStyle.width;
      }
      
    }
    else if( 'middle' == opts.align ){

      style.left = style.left + ( ( tStyleW - oStyleW ) / 2 ) ;
      
      if( ( style.left + opts.overlayStyle.width ) > winW ){
        style.left = winW - opts.overlayStyle.width;
      }
      
    }
    else{
      
      if( ( style.left + opts.overlayStyle.width ) > winW ){
        style.left = winW - opts.overlayStyle.width;
      }
    }
    
    if(  style.left < 0 ){
      style.left = 0;
    }
    
    if( ( style.top + oStyleH ) > winH ){
      style.top = winH - oStyleH;
    }
    
    style['z-index'] = '10000';

    // adjust top coordinate
    style.top = style.top + $target.outerHeight();
    style.position = 'absolute';
    $overlay.css(style);
    $R.eventAfterAjaxRequest();
    $overlay.show( );
    
  
  };


  // Mousedown handler on the document
  /**
   * @param evt
   */
  function docMouseDown( evt ){

    console.log( 'Minimenu Global Event '+overlayID );
    
    if( $S("."+overlayID+":visible").length === 0 ){
      return;
    }
    else if( $S(evt.currentTarget).is("."+overlayID+' descendant') || $S(evt.currentTarget).is("#"+overlayID+' descendant') ){
      return;
    }
    else if( !$S("."+overlayID+":visible").hasClass('flag_global_close')  ){
      
      // abbrechen wenn global close dektiviert ist
      return;
    }
    else{

      $S.fn.miniMenu.close();
    }

  };

  // Initialise overlay box and apply the style
  /**
   * @param opts
   * @param callerObj
   */
  function initMiniMenuOverlay( opts, callerObj ){


    if( jQuery( '#'+callerObj.attr('id')+'-mnm-overl' ).length ){
      console.log( 'Remove overlay #'+callerObj.attr('id')+'-mnm-overl' );
      jQuery( '#'+callerObj.attr('id')+'-mnm-overl' ).remove();
    }


    var codeCloseButton = '';
    if( !opts.plain ){
      codeCloseButton = '    <div class="miniMenuCloseButton" >'
      +'      <a href="javascript: void(0);" onclick="jQuery.fn.miniMenu.close()"'
      +'        onmouseover="jQuery(this).removeClass(\'ui-state-default\').addClass(\'ui-state-hover\');" '
      +'        onmouseout="jQuery(this).removeClass(\'ui-state-hover\').addClass(\'ui-state-default\');"'
      +'        class="ui-corner-all ui-state-default">'
      +'        '+opts.button
      +'      </a>'
      +'      <br style="clear: both;" /><div></div>'
      +'    </div>';
    }
      
    var codeCloseParent = '';
    if( opts.closeParent ){
      codeCloseParent += '<var class="conf" >'+callerObj.attr('id')+'</var>';
    }

    var tplOverlay = '<div id="'+overlayID+'" class="template" style="position:absolute;" >'
            +'  <div class="ui-widget ui-widget-content" style="padding: 0px;" >'
            +'    <div class="wgt-border-bottom" >'
            +'      <div class="wgt-minimenu-content"></div>'
            +'      <div style="clear:both;"></div>'
            +'    </div>'
            + codeCloseButton
            +'    <div class="wgt-clear xxsmall" ></div>'
            //+'    <div class="bottom" ></div>'
            /*+'    <!--[if lte IE 6.5]>'
            +'    <iframe style="display:block; position:absolute;top: 0;left:0;z-index:-1;'
            +'        filter:Alpha(Opacity=\'0\');width:3000px;height:3000px"></iframe>'
            +'    <![endif]-->'*/
            +'  </div>'
            + codeCloseParent
            +'</div>';
        
      

    if ($S("#"+overlayID).length === 0){
      $S("body").append( tplOverlay );
    }
    else{
      $S("#"+overlayID).replaceWith( tplOverlay );
    }
      
    
    
    $S("#"+overlayID).attr("style", "");
    $S("#"+overlayID).css(opts.overlayStyle);
    
  };

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders = {};

  /**
  * example:
  *
  * menuItems
  * - action   the click action as javascript callback
  * - icon      the path to the icon relativ to the theme project
  * - caption   the caption for the item
  * - type      possible values: url, callback  default is url
  *
  */

  // Default options
  jQuery.fn.miniMenu.defaults = {
    overlayStyle  : {},
    menuItems     : null,
    plain         : false,
    closeOnLeave  : false,
    globalClose   : true,     // soll das menü bei globalen clicks geschlossen werden?
    align         : 'left',
    triggerEvent  : 'click',
    button        : $I18N.Close||'Close'
  };

})(jQuery);
