/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
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


(function( $S, $WGT ) {

  $S.widget( "wgt.treetable", {
 

    // These options will be used as defaults

    options: { 
      clear: null,
      border: 'wgt-border',
      prefixNode : 'n_',
      prefixChild : 'c_'
    },
 

    // Set up the widget
    _create: function() {

      if( !this.element.is( '.wgt_table' ) )
        this.element.addClass( 'wgt_table' );
      
      if( this.options.border )
        this.element.addClass( this.options.border );

    },

    // Set up the widget
    createTree: function() {

      var rows = this.element.find('tr');
      
      rows.each(function(){
        
         var classes = $S(this).prop('class');
      });
        
    },
 

    // Use the _setOption method to respond to changes to options

    _setOption: function( key, value ) {

      switch( key ) {

        case "clear":
          // handle changes to clear option

          break;

      }
 
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget

      $.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super( "_setOption", key, value );

    },
 
    /* 
     * Use the destroy method to clean up any modifications your 
     * widget has made to the DOM
     */
    destroy: function() {

      $.Widget.prototype.destroy.call( this );
    }

  });

}( jQuery, $WGT ) );

