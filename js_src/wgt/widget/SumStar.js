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
 * Widget zum berechnen von Summen
 * @author dominik alexander bonsch <db@webfrap.net>
 * 
 */
(function( $S ) {

  $S.widget( "wgt.sumStar", {


    /**
     * Standard Options
     */
    options: { 
      // technische Eigenschaften
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
      
      var self = this,
          opts = this.options,
          el   = this.element;
          
      var srcFields = el.attr('wgt_fields');

      if( !srcFields || '' == srcFields.trim() ){
        el.val('0 (missing source fields)');
        return this.el;
      }

      opts.srcFields = srcFields.split(',');

      this.initEvents();
      return this.el;

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    initEvents: function(){

      var self = this,
          opts = this.options,
          el   = this.element;
        
  
      
    }
    
  });

}( jQuery ) );

