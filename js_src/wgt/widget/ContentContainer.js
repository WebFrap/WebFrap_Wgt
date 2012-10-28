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
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S ) {
  
  "use strict";
  
  $S.widget( "wgt.contentContainer", {

    /**
     * Die ID des Container Elements
     */
    containerId: null,
    
    /**
     * das container element
     */
    containers: null,

    /**
     * Das Kontrollelement für die Tabs
     */
    controlEl: null,

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
        
      this.initEvents();
      return this;

    },//end _create
    
    /**
     * Setup des Datencontainers
     */
    initEvents: function(){

      var el = this.element;

      this.conatinerId = el.attr('id');

      // without id it's bad
      if( !this.conatinerId ){
        console.error( "Missing the ID for the container" );
      }

      this.containers  = el.find('>div.container');

      if( this.containers.find( '.active' ).length ){
        this.containers.not('.active').hide();
      }
      else{
        this.containers.not(':first').hide();
      }

    },

    /**
     * Aktiv setzen eines Containers
     */
    setActive: function( key ){

      var el = this.element,
        self = this;
      
      console.log( 'ContentContainer::setActive: #'+self.conatinerId+'-'+key );

      this.containers.hide();
      el.find( '#'+self.conatinerId+'-'+key ).addClass('active').show();
    },

    /**
     * Remove an a Content Container
     * The Controll Element is not affected
     */
    remove: function( key ){

      var el = this.element,
        self = this;

      // check if exists

      this.containers.find( '#'+self.conatinerId+'-'+key ).remove();
    },

    /**
     * Append a new Content Container
     * The Controll Element is not affected
     */
    add: function( key, content ){

      var el = this.element,
        self = this;

      if( !content ){
        el.append( '<div id="#'+self.conatinerId+'-'+key+'" class="container" >'+content+'</div>' );
      }
      else{
        el.append( key );
      }

    }
    
  });

}( jQuery ) );

