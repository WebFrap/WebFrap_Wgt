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
 *   - WGT 0.9
 *
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 *
 * Code Style:
 *   indent: 2 spaces
 *   codelang: english
 *   identStyle: camel case
 *
 */

/**
 * Selectbox Widget
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S, $WGT ) {

  $S.widget( "wgt.contextBox", {


    // These options will be used as defaults
    options: {
      clear         : null,
      align         : 'left',
      triggerEvent  : 'click',
      overlayStyle  : {width:200},
      closeOnLeave  : true,
      closeScroll   : false,
      onOpen        : function(){},
      onClose       : function(){}
    },


    // Set up the widget
    _create: function() {

      this.init();

    },

    // Set up the widget
    init: function(  ){

      var
        self = this,
        ge = this.element,
        opts = this.options;

      var contextBoxId = ge.attr( 'wgt-context_box' );
      var contextBox   = $S( '#'+contextBoxId );

      // browser contextmenü deaktivieren
      contextBox.bind('contextmenu', function() { return false; });

      if ($S("#"+contextBoxId+'-init').length == 0){
        $S("body").append( contextBox );
      }
      else{
        $S("#"+contextBoxId+'-init').replaceWith( contextBox );
      }

      contextBox.attr( 'id', contextBoxId+'-init'  );

      // schliesen des Overlays wenn es verlassen wird
      if( true === opts.closeOnLeave || 'true' === opts.closeOnLeave  ){

        var dEnter = null;
        var dClose = null;

        setTimeout( function(){

            if( !contextBox.hasClass('mouse_in') && !contextBox.hasClass('mouse_in') ){
              self.close();
            }

          },
          600
        );

        contextBox.bind( 'mouseenter.context_box', function(){

          contextBox.addClass('mouse_in');
          contextBox.removeClass('mouse_in');
        }).bind( 'mouseleave.context_box', function(){

          contextBox.removeClass('mouse_in');
        });

        contextBox.bind( 'mouseenter.context_box', function(){

          dEnter = new Date().getTime();
          contextBox.addClass('mouse_in');
          //$target.removeClass('mouse_in');

          contextBox.bind( 'mouseleave.context_box', function(){

            dClose = new Date().getTime();
            contextBox.unbind('mouseleave.context_box');
            contextBox.removeClass('mouse_in');

            setTimeout( function(){
                if( (dClose - 400) > dEnter ){
                  self.close();
                }
              },
              450
            );

          });
        });

      }//end if( true === opts.closeOnLeave || 'true' === opts.closeOnLeave  )

      if( opts.triggerEvent ){
        ge.bind( opts.triggerEvent+'.context_box' ,function(){
          self.open();
        });
      }

    },


    // Set up the widget
    open: function(  ){

      var
        self = this,
        ge = this.element,
        opts = this.options;

      var contextBoxId = ge.attr( 'wgt-context_box' );
      var contextBox   = $S( '#'+contextBoxId+'-init' );

      // Get options of the element
      this.closeAll();
      
      // leere menüs gar nicht erst öffnen
      if( !contextBox.find('li') ){
        return false;
      }

      if( opts.closeScroll ){
        //console.log( "closeScroll true" );
        $D.scrollEvents[contextBoxId] = function(){
          self.close();
        };
      }

      //$target.addClass('flag-menu-overlay');
      // Die ausrichtung und position des Overlays berechnen
      // sicher stellen, dass es nicht über die Ränder hinaus floatet
      var style     = ge.offset();
      var tStyleW   = ge.outerWidth();
      var oStyleH   = contextBox.outerHeight();
      var oStyleW   = contextBox.outerWidth();
      var winW      = $S(document).width();
      var winH      = $S(document).height()-40;

      if( !style ){

        console.error( 'Contextbox is missing the style' );

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

      if( style.left < 0 ){
        style.left = 0;
      }

      if( ( style.top + oStyleH ) > winH ){
        style.top = winH - oStyleH;
      }

      style['z-index'] = '10000';

      // adjust top coordinate
      style.top = style.top + ge.outerHeight();
      style.position = 'absolute';
      contextBox.css(style);
      contextBox.addClass('opened');
      contextBox.show( );

    },

    /**
     * globales schliesen aller drowpdown boxes
     */
    closeAll: function(){

      $S('.wgt-context_box.opened').removeClass('opened').hide();

    },

    /**
     * schliesen des aktuellen dropdowns
     */
    close: function(){

      var contextBox   = $S( '#'+this.element.attr( 'wgt-context_box' )+'-init' );
      contextBox.removeClass('opened').hide();

      ge = this.element,
      opts = this.options;

      if( opts.closeScroll ){
        $D.scrollEvents[ge.attr( 'wgt-context_box' )] = undefined;
      }

    },

    /**
     * schliesen des aktuellen dropdowns
     */
    remove: function(){

      $S(document).unbind('keypress.context_box');
      $S( '#'+this.element.attr( 'wgt-context_box' )+'-init' ).remove();

    },

    /*
     * Use the destroy method to clean up any modifications your
     * widget has made to the DOM
     */
    destroy: function() {

      $S.Widget.prototype.destroy.call( this );
    }

  });

}( jQuery, $WGT ) );

