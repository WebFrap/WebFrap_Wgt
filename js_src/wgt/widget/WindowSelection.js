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
 * Dropmenu Widget
 * @author dominik alexander bonsch <db@webfrap.net>
 * 
 * @todo mit der Contextbox verheiraten
 * 
 */
(function( $S, $WGT ) {

  $S.widget( "wgt.windowSelection", {
 
    // These options will be used as defaults
    options: { 
      element:null,
      add:null,
      selection:null,
      open:null
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

      // dropdown aktivieren
      ge.dropdown({
        onOpen:function(){
          self.open();
        },
        align:"right"
      });

      var inpElem = $S( '#'+opts.element );
      var dropBoxId = ge.attr( 'wgt_drop_box' );
      var dropBox   = $S( '#'+dropBoxId+'-init' );
      
      dropBox.find('li').hide();
      
      if( '' == inpElem.val() ){
        dropBox.find( 'li.add' ).show();
      }
      else{
        dropBox.find( 'li.change,li.open,li.unset' ).show();
      }
      
      dropBox.find( 'li.add>a' ).bind( 'click.win_sel', function(){
        $R.get( opts.selection  );
      });
      
      dropBox.find( 'li.change>a' ).bind( 'click.win_sel', function(){
        $R.get( opts.selection  );
      });
      
      dropBox.find( 'li.open>a' ).bind( 'click.win_sel', function(){
        $R.get( opts.open +''+inpElem.val()  );
      });
      
      dropBox.find( 'li.unset>a' ).bind( 'click.win_sel', function(){
        inpElem.val('');
        $S( '#'+opts.element+'-tostring' ).val('');
      });
      
    },
    
    // Set up the widget
    open: function(  ){

      var
        self = this,
        ge = this.element,
        opts = this.options;

      var inpElem = $S( '#'+opts.element );
      var dropBoxId = ge.attr( 'wgt_drop_box' );
      var dropBox   = $S( '#'+dropBoxId+'-init' );
      dropBox.find('li').hide();
      
      if( '' == inpElem.val() ){
        dropBox.find( 'li.add' ).show();
      }
      else{
        dropBox.find( 'li.change,li.open,li.unset' ).show();
      }

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

