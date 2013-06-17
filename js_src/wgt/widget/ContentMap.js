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

  $S.widget( "wgt.content_map", {
    
    /**
     * das map element
     */
    container: null,

    /**
     * flag ob der Content verschoben werden können soll
     */
    moveBg: true,
    
    /**
     * flag ob der Content verschoben werden können soll
     */
    moveBgCheck: false,
    
    /**
     * 
     */
    actX: -4625,
    
    /**
     * 
     */
    actY: -4625,

    /**
     * 
     */
    startX: 0,
    
    /**
     * 
     */
    startY: 0,

    /**
     * 
     */
    centerX: -4625,
    
    /**
     * 
     */
    centerY: -4625,
    
    /**
     * Content Size X
     */
    cs_x: 720,
    
    /**
     * Content Size Y 
     */
    cs_y: 750,
    
    /**
     * Content Border
     */
    cb : 20,
    
    /**
     * Content Border
     */
    scroll_v : false,

    /**
     * Standard Options
     */
    options: { 
      // technische Eigenschaften
      container_x: 10000,
      container_y: 10000,
      content_x:750,
      content_y:750
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        
      var opt = this.options;
      
      this.actX = this.centerX = 0-((opt.container_x - opt.content_x)/2);
      this.actY = this.centerY = 0-((opt.container_y - opt.content_y)/2);

      this.initEvents();
      
      return this;

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    initEvents: function(){

      var self = this,
          cont = this.element.find('.wgt-graph_body');

      var moveEvent = function( e ){

       if( !self.moveBg ){
        return;
       }

        //console.log("map mousemove move");

        cont.css( 'marginLeft', self.actX - ( self.startX - e.pageX ) );
        cont.css( 'marginTop', self.actY - ( self.startY - e.pageY ) );

      };

      cont.bind( 'mousedown.bscroll', function( e ){
          
        //console.log("content map mousedown");

        if( !self.moveBg ){
          return;
        }
        
        self.moveBgCheck = true;
        
        //console.log("map mousedown move");
        
        self.scroll_v = true;
        
        self.startX = e.pageX;
        self.startY = e.pageY;

        cont.bind( 'mousemove.bscroll', moveEvent );

      }).bind( 'mouseup.bscroll',  function( e ){
        
       //console.log("content map mouseup");

       if( !self.moveBg || !self.moveBgCheck ){
        return;
       }
      
      
       
       self.scroll_v = false;
    
       self.actX = self.actX - ( self.startX - e.pageX );
       self.actY = self.actY - ( self.startY - e.pageY );
        
       self.moveBgCheck = false;
       //console.log("map mouseup move");

       cont.unbind( 'mousemove.bscroll' );
     });
      
     cont.bind('mousewheel', function(event, delta) {
       
       var dir = delta > 0 ? 'Up' : 'Down',
           vel = Math.abs(delta);
       
       //cont.css( 'marginLeft', self.actX - ( self.startX - e.pageX ) );
       if( !self.scroll_v ){
         
         self.actY = (delta > 0) 
           ? self.actY + (vel * 30)
           : self.actY - (vel * 30);
         
         cont.css( 'marginTop', self.actY );
       }
       else{
         
         self.actX = (delta > 0) 
         ? self.actX + (vel * 30)
         : self.actX - (vel * 30);
       
         cont.css( 'marginLeft', self.actX );
       }

       return false;
     });
      
    },//end initEvents
  

    /**
     * Den Editor zum Center bewegen
     */
    moveToCenter: function(){
      
      this.actX = this.centerX;
      this.actY = this.centerY;
       
      this.container.css( 'marginLeft', this.centerX );
      this.container.css( 'marginTop', this.centerY );

    },//end moveToCenter

    injectInstance: function( parentNode ){
      parentNode.container = this;
    }
    
  });

}( jQuery ) );

