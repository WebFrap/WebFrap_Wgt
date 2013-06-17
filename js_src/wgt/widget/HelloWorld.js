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

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S ) {

  $S.widget( "wgt.hello_world", {
      
    text: 'hello world',
      
    /**
     * Standard Options
     */
    options: { 
      tag: 'p'
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        
        // das aktuelle element mit "hello world" ersetzen
        // tag ist konfigurierbar
        this.element.replace( '<'+this.options.tag+'>'+this.text+'</'+this.options.tag+'>'  );

    },//end _create

    /**
     *
     */
    out: function(){

    },//end this.out
    
   
    /**
     * Die Destroymethode kann dazu verwendet werden um Änderungen welche
     * Durch das Widget erstellt wurde rückgängig zu machen.
     * 
     */
    destroy: function() {

      $S.Widget.prototype.destroy.call( this );
    }//end destroy

  });
  
  

}( jQuery ) );

