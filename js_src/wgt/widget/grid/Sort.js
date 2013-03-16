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
 * Editmode zum Grid hinzufügen
 */
(function( $S, $G, undefined ) {
  
  "use strict";
  
  $S.widget( "wgt.grid", $S.wgt.grid, {
    
    /**
     * Standard Options
     */
    options: {
    },

    /**
     * Grid im Browser sortieren ohne Refresh vom Server
     *
     * @param colId int, the numeric index of the col
     * @param params Object, named params array
     */
    sort: function( colId, params ){

      if ( params === undefined ) {
        params = {};
      }

      if ( params.sort === undefined ) {
        
        params.sort =  this.getOrderByFromCol(colId, true);
        
      } else {
        
        params.sort = 'sort_'+params.sort;
      }

      var sortKeys  = [];
      var rows      = this.element.find( 'tbody > tr' );

      rows.each(function() {
         var tmp = $S(this).find('td').get(colId);
         tmp = $S(tmp).text().toUpperCase();
         sortKeys.push( [tmp , this] );
      });

      sortKeys.sort();
      if (params.sort === 'sort_desc') {
        
        sortKeys.reverse();
      }

      for (var pos = 0; pos < sortKeys.length; pos++) {
        
        this.element.append(sortKeys[pos][1]);
      }

      this.reColorize();

    },//end this.sort
    
    /**
     * @param colId
     * @param changeIcon
     */
    getOrderByFromCol: function( colId, changeIcon ){

      if( changeIcon === undefined ){
        changeIcon = false;
      }

      var sort  = null;
      var tmp   = this.element.find('thead').find('th');

      if( tmp.length !== 0 ){

        var colHead = $S(tmp.get(colId));
        var classes = colHead.prop('class');

        if( classes.indexOf('sort_asc') !== -1 ) {
          sort = 'sort_desc';
          if( changeIcon ) {
            colHead.removeClass('sort_asc');
            colHead.addClass('sort_desc');
            colHead.find('i.sort').removeClass().addClass('icon-sort-down sort');
          }
        }
        else if( classes.indexOf('sort_desc') !== -1 ) {
          sort = 'sort_asc';
          if( changeIcon ) {
            colHead.removeClass('sort_desc');
            colHead.addClass('sort_asc');
            colHead.find('i.sort').removeClass().addClass('icon-sort-up sort');
          }
        }
        else {
          
          sort = 'sort_asc';
          if (changeIcon) {
            colHead.addClass('sort_asc');
            colHead.find('i.sort').removeClass().addClass('icon-sort-up sort');
          }
        }

        return sort;

      }
      else{

        return 'sort_asc';
      }

    }//end this.getOrderByFromCol
 
  });
  
}( jQuery, window ) );

