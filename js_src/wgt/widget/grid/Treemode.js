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
 * @author dominik bonsch <db@webfrap.net>
 * Treemode für das Gridelement
 */
(function( $S, $G, undefined ) {
  
  "use strict";
  
  $S.widget( "wgt.grid", $S.wgt.grid, {


    /**
     * Grid als Treetable darstellen
     */
    treeMode: function( ){

      //if( undefined === this.options.expandable )
        //this.options.expandable = false; // quick fix

      this.element.treeTable(this.options);
    },

    /**
     * Neu hinzugekommene Einträge in den Baum integrieren
     */
    refreshTree: function( ){

      //if( undefined === this.options.expandable )
        //this.options.expandable = false; // quick fix

      this.element.treeTable(this.options);
    }

 
  });
  
}( jQuery, window ) );

