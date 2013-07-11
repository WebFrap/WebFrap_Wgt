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
 * @author dominik bonsch <db@webfrap.net>
 * Formeln für das Editierbare Grid
 */
(function($S, $G, undefined) {
  
  "use strict";
  
  $S.widget("wgt.grid", $S.wgt.grid, {
    
    /**
     * Standard Options
     */
    options: {
      calc_able:false,
      actions:{},
      idxMap:{},
      recalcMap:{}
    },

    /**
     * Das Grid Element Editierbar machen
     */
    initFormuars: function(jHeadTab){

      var opts = this.options, 
        el = this.element,
        elp = el.parent(),
        elId = this.element.attr('id'),
        self = this;
      
      console.log('BIN DAAAA');
      
      el.detach();
        
      var head = el.find('thead th');
      
      head.each(function(pos,row){
      
        row = $S(row);
        var key = row.attr('key'),
          formula = row.attr('formula');
      
        if (key) {
          opts.idxMap[key] = pos;
        }
      
        if (row.attr('recalc')) {
          opts.recalcMap[pos] = true;
        }
      
        if (formula) {
          opts.actions[key] = new Function('self, row',$S('#'+formula).text());
        }
      
      });
      
      el.find('tbody tr').each(function(pos,row){
        self.executeRowFormulars(row);
      });
      
      elp.append(el);
      
    
    },
    
    fReader: function(row, key){
      return row.find('td:eq('+this.options.idxMap[key]+')').attr('value');
    },
    
    fWriter: function(row, key, value){
      row.find('td:eq('+this.options.idxMap[key]+')').text(value);
    },
    
    executeRowFormulars: function(row){
      var actions = this.options.actions,
        self = this;
      for (var act in actions) {
        if (actions.hasOwnProperty(act)) {
          actions[act](self,$S(row));
        }
      }
    }
 
  });
  
}(jQuery, window));

