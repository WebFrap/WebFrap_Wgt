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
 * Hide & Show for accordions
 */
(function($S, undefined) {
  
  "use strict";
  
  $S.widget("ui.accordion", $S.ui.accordion, {
    
    /**
     * 
     */
    blocks:[],


    /**
     * Das Grid Element Editierbar machen
     */
    toggleAcc: function(idx){
        
      var head = this._getHead(idx);
      if(!head){
        return;
      }
      
      if (head.is(':visible')) {
        this.blocks.addHeight(28);
        head.hide();
      } else {
        this.blocks.subHeight(28);
        head.show();
      }
      
    },
    
    
    
    /**
     * Leeren des Save Indexes
     */
    hideAcc: function(idx){
      
      var head = this._getHead(idx);
      if(!head){
        return;
      }
      
      console.log("in hide acc "+idx);
      
      if (!head.is(':visible')) {
        return;
      }
      console.log("hide acc "+idx);
      head.hide();
      this.blocks.addHeight(28);
      
    },
    
    showAcc: function(idx){
        
      var head = this._getHead(idx);
      if(!head){
        return;
      }
      
      console.log("in show acc "+idx);
      
      if (head.is(':visible')) {
        return;
      }
      console.log("show acc "+idx);
      head.show();
      this.blocks.subHeight(28);
      
    },
    
    isAccHidden: function(idx){
        
      var head = this._getHead(idx);
      if(!head){
        return false;
      }
      
      return head.is(':visible');
      
    },
    
    _getHead: function(idx){
      
      var head = null;
      
      if (!this.blocks.length) {
        this.blocks = this.element.find('.ui-accordion-content');
      }
      
      if (!isNaN(idx)) {

        head = this.element.find( ".ui-accordion-header:eq("+idx+")" );
        
        if(!head.length){
          console.log('accordion '+this.element.attr('id')+' has no head number: '+idx);
          return null;
        }
        
      } else {
        
        head = this.element.find( 'a[tab="'+idx+'"]' ).parent();
        if (!head.length) {
          console.log('accordion '+this.element.attr('id')+' has no head key: '+idx);
          return null;
        }
      }
      

      return head;
    }
 
  });
  
}(jQuery));

