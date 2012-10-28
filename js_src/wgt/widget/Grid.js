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
 * @passed http://www.jshint.com
 */
(function( $S, $G ) {
  
  "use strict";
  $S.widget( "wgt.grid", {
    
    /**
     * Array mit den Resize Elementen
     */
    dragBars: [],
    
    /**
     * Array mit den Head Cols
     */ 
    headCols: [],

    /**
     * Array mit den Head Cols
     */
    changedData: [],
    
    /**
     * Referenz auf die erste row im grid
     */
    firstRow: null,

    /**
     * Standard Options
     */
    options: {
      
      // technische Eigenschaften
      grid_class: 'wgt-grid', // Klasse für die Deklaration als Grid Element
      hpad: 0,                // Größe des Paddings im Heads ( sollte dynamisch errechnet werden )
      border: 'wgt-border',   // Klasse für den Element Rahmen
      body_height: 'large',   // Klasse für die Höhe des bodies
      body_resize_able: false,// flag ob der Databody resizeable ist
      cols_resize_able: true, // flag ob die Cols Resizeable sind
      select_able: false,     // flag ob die Einträge selektiert werden können

      // Editierbare Cells im Grid
      save_form: null,        // ID des Save Formulars bei editierbaren Tabellen
      edit_able: false,       // Flag ob
      allow_insert: false,    // Sollen neue Datensätze angelegt werden können
      
      // Sort Daten und Optionen
      icon_sort_asc:  'control/sort_asc.png',    // Icon für das absteigenden sortieren
      icon_sort_desc: 'control/sort_desc.png',   // Icon für das aufsteigenden sortieren
      icon_sort_none: 'control/sort_none.png',   // noch nicht sortiert
      
      // Layout
      color_scheme: null,     // Klasse für das Farbschema
      
      // Eigenschaften für die Suchleiste
      search_able: false,     // flag ob die Einträge selektiert werden können
      search_form: null,      // ID des Suchformulars / Paging / Datenquelle
      
      // Treeeigenschaften des Grids
      expandable: false       // Flag ob der Baum colapsable ist 
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        
      var self = this;
      
      this.element.appear(function(){
        self.buildGrid();
      });

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    buildGrid: function(){
      
      var self = this,
        ge = this.element,
        opt = this.options,
        gridBody = null,
        oldHCols = ge.find('thead th'), // der original head
        headTab   = "<div class=\"wgt-grid-head\" ><div><table><thead><tr>", // start des neuen heads
        searchBox = '', // Box mit den Suchelementen, wird nur bei Bedarf gefüllt
        resizeBox = '<div class="wgt-drag" >', // die Box mit den resize elementen
        sizes = []; // liste mit den größen
        
      // setzen der Grid Basisklasse wenn noch nicht vorhanden
      if( !ge.hasClass( opt.grid_class ) ){
        ge.addClass( opt.grid_class );
      }
      
      // Einträge Selektiebar machen
      if( opt.select_able ){  
        this.makeSelectable( ge );
      }
        
      if( opt.search_able ){
        searchBox += '<tbody><tr>';
      }

      // die tabelle wird mit dem grid element umrahmt
      ge.wrap('<div class="wgt-grid-body '+opt.height+'" id="'+ge.attr('id')+'-body" />');

      gridBody = $S( '#'+ge.attr('id')+'-body' );

      // erstellen einer head zeile + resize bar pro alter col
      oldHCols.each( function(){
        var cNode = $S(this);
        var tmpWidth = this.clientWidth;

        headTab += self.renderHeadCell( this, cNode, tmpWidth , opt  );

        // anhängen der Search Col
        if( opt.search_able ){
          searchBox += self.renderSearchCell( cNode, tmpWidth, opt  );
        }
        
        resizeBox += '<div></div>';
        sizes.push( tmpWidth );
        
      });
      
      // schliesen des heads
      headTab += "</tr></thead>";
      headTab += "</table></div></div>";
      
      if( opt.search_able ){
        searchBox += '</tr></tbody>';
      }
      
      // schliesen der resize box
      resizeBox += '<div class="helper" ></div></div>';
      
      // Sortierelemente im Head anhängen
      var jHeadTab = $S(headTab);
      
      // anhängen der Searchbar wenn gewünscht
      if( opt.search_able ){
        jHeadTab.find('table').append(searchBox);
      }
      
      this.injectSortControls( jHeadTab );
      
      
      // den neuen kopf sowie die resize box vor die tabelle kopieren
      ge.parent().wrap( '<div class="body-scroll">' );
      ge.parent().before(jHeadTab);
      ge.parent().before(resizeBox);
      
      // store the head
      var headBar = ge.parent().parent().find('.wgt-grid-head');
      var headOff = headBar.position();
      
      var tbodyHeight = ge.parent().height() + headBar.height();
      
      // add the scroll events
      var tmpBox    = ge.parent();
      var scrolling = false;
      tmpBox.get(0).onscroll = function(){
        scrolling = true;
        headBar.scrollLeft(this.scrollLeft);
      };
      
      tmpBox.mouseup(function(){
        
        // only execute after scrolling
        if( scrolling ){
          
          self.recalcXPosDragHelper();
          scrolling = false;
        }
      });
      
      // all drag helper divs
      this.dragBars = ge.parent().parent().find('div.wgt-drag>div');
      
      // the content boxes of the head
      this.headCols = headBar.find('th>div');
        
      // the first Row
      this.firstRow = ge.find('thead th');
      
      // Resize für das Grid implementieren
      var helper    = ge.parent().parent().find('div.wgt-drag>div.helper');
      
      helper.css({top:headOff.top})
        .height(tbodyHeight+'px')
        .hide();
      
      gridBody.scroll( function(){

        var gof = gridBody.get(0);
        
        headBar.css( 'marginLeft', '-'+gof.scrollLeft+'px' );
        ge.parent().parent().find('div.wgt-drag').css( 'marginLeft', '-'+gof.scrollLeft+'px' );

        
        //console.log('scroll '+gof.scrollLeft+'  '+gof.scrollTop);
      });
      
      this.firstRow.each( function( idx ){
        
        var actualCol    = $S(this);
        var actualHead   = $S( self.headCols.get(idx) );
        
        var cWidth = actualHead.outerWidth();
        
        //console.log( "Grid: col: "+idx+" width "+cWidth );
        
        //actualCol.width(cWidth);
        var nextPos = actualHead.outerWidth()+actualHead.offset().left-2;
  
        
        // store the position on drag start
        var startPos = null;
        var mover    = null;
        
        $S( self.dragBars.get(idx) )
          .css( {top:headOff.top} )
          .offset( {left:nextPos} )
          .height( tbodyHeight+'px' )
          .draggable({ 
            axis: "x",
            start: function( event, ui ){
              mover = $S(this);
              
              if( idx === 0 ){
                startPos = 0;
              }
              else{
                startPos = $S( self.dragBars.get(idx-1) ).position().left;
              }
              
            },
            drag: function( event, ui ){
              
              /*
              var newPos = mover.position().left;
              
              // min size of a column is 50px
              if( (newPos-startPos) <= 57 )
              {
                var tmpPos = 60 + actualHead.offset().left-2;
                mover.addClass('dissabled');
                helper.show();
                helper.offset({left:tmpPos});
              }
              else
              {
                mover.removeClass('dissabled');
                helper.hide();
              }
              */
              
            },
            stop: function(){
              
              //var tw     = actualCol.width();
              //var mover  = $S(this);
              var newPos  = mover.position().left;
              var oldWith = actualCol.outerWidth();
              
              var newWidth = (newPos-startPos);
              if( newWidth<=40 && !actualCol.hasClass('pos') ) {
                
                newWidth = 40;
                mover.offset( {left:actualHead.offset().left-40} );
              }
              
              if( actualCol.hasClass('pos') ) {
                
                newWidth = 30;
                mover.offset( {left:actualHead.offset().left-30} );
              }
              
              actualCol.width(newWidth);
              
              var tmpNewW = ge.outerWidth()+(newWidth-oldWith)+opt.hpad;
              
              ge.width( tmpNewW );
              self.syncColWidth();

              /*
              actualHead.width(newWidth);
              actualCol.width(actualHead.outerWidth());
              */
              
              self.recalcXPosDragHelper();
            }
          });
        
      });
      
      // nach dem Init nocheinmal sicher stellen das ResizeBars und Size
      // auch in sync sind
      self.syncColWidth();

      if( opt.edit_able ){
        self.startEditMode();
      }
      
    },//end buildGrid

    /**
     * Das Grid Element Editierbar machen
     */
    startEditMode: function(){

      var el = this.element;
      var editLayers = $S('.wgt-editlayer');

      el.click(function( e ){

        var cTarget =  $S(e.target);
        if( cTarget.is('td') ){

          var ofs = cTarget.offset();
          var oW  = cTarget.outerWidth();
          var oH  = cTarget.outerHeight();

          var type = $G.$WGT.getClassByPrefix( cTarget.prop('class'), 'type_' );

          var editLayer = $S('#wgt-edit-field-'+type);

          console.log( cTarget.parentX('table').css('margin-top')+' type '+type+' '+cTarget.prop('class') );

          editLayers.unbind('blur');
          editLayers.hide();

          editLayer.css({
            left:ofs.left,
            top:ofs.top,
            width:oW,
            height:oH
          });

          editLayer.show();
          editLayer.focus();

          if( 'date' === type ){
            editLayer.find('input').val(cTarget.html());
          }
          else{
            editLayer.html( cTarget.html() );
          }

          editLayer.blur(function(){
            if( 'date' === type ){
              cTarget.html( editLayer.find('input').val() );
            }
            else{
              cTarget.html( editLayer.html() );
            }
          });
          
          //editLayer.selection( 0, editLayer.text().length );

          if( 'date' === type ){
            editLayer.find('input').datepicker('show');
          }


        }

      });

    },
    
    /**
     * Berechnen der korrekten position für die Drag Bar Elemente
     * Werden für das Resizing der Cols benötigt
     */
    recalcXPosDragHelper: function(){
      
      var self = this;
      
      ///@todo hier brauchen wir dringend ne fehlerbehandlung
      if( this.headCols ){
        
        this.headCols.each(function (idx){
          
          var actualHead   = $S(self.headCols.get(idx));
          var mover        = $S(self.dragBars.get(idx));
          var tmpPos = actualHead.outerWidth()+actualHead.offset().left-2;
          mover.offset({left:tmpPos});
          /*
          mover.removeClass('dissabled');
          helper.hide();
          */
        });
      }
    },//end recalcXPosDragHelper
    
    /**
     * Injizieren der Sortelements in den Tabellenhead
     */
    injectSortControls: function( jHeadTab ){
      
      var opt = this.options;
        
      jHeadTab.find('img').each( function(){
        
         var imgNode = $S(this);
         
         imgNode.bind("click.grid", function() {

          var nIcon = $S(this);
          var pIcon = nIcon.parent();

          if( pIcon.hasClass('sort-asc') ){
            pIcon.removeClass('sort-asc').addClass('sort-desc');
            nIcon.attr( 'src', $G.$C.WEB_ICONS+"xsmall/"+opt.icon_sort_desc );
            nIcon.next().val('desc').change();
          }
          else if( pIcon.hasClass('sort-desc') ){
            pIcon.removeClass('sort-desc');
            nIcon.attr( 'src', $G.$C.WEB_ICONS+"xsmall/"+opt.icon_sort_none );
            nIcon.next().val('').change();
          }
          else{
            pIcon.addClass('sort-asc');
            nIcon.attr( 'src', $G.$C.WEB_ICONS+"xsmall/"+opt.icon_sort_asc );
            nIcon.next().val('asc').change();
          }

        });
      });
      
      jHeadTab.find('input.wcm_req_search,select.wcm_req_search').each(function(){
        $G.$R.callAction( 'req_search', $S(this) );
      });

    },//end injectSortControls
    
    /**
     * Sc
     * @param cNode jQuery jQuery Object des th nodes
     * @param tmpWidth int Weite der aktuellen col
     * @param opt Object Options Object
     */
    renderSearchCell: function( cNode, tmpWidth, opt  ){
      
      var searchBox = '';
      var searchName = cNode.attr('wgt_search');
          
      if( searchName ){

        var tmp   = searchName.split(':'),
          sType = '',
          sName = '';

        if( 2 === tmp.length ){
          sType = tmp[0];
          sName = tmp[1];
          
        }
        else{
          sType = 'text';
          sName = searchName;
          
        }

        searchBox += '<td style="width:'+(tmpWidth-opt.hpad)+'px;text-align:center;" >';
        searchBox += '<input type="'+sType+'" name="'+sName+'" class="wcm wcm_req_search search wgt-no-save fparam-'+opt.search_form+'" style="width:100%" />';
        searchBox += '</td>';
      }
      else{
        
        searchBox += '<td style="width:'+(tmpWidth-opt.hpad)+'px;text-align:center;" ><span>&nbsp;</td>';
        
      }
      
      return searchBox;

    },//end renderSearchCell
    
     /**
     * Render einer Head Label Cell bei Bedarf mit Order Feld
     * 
     * @param node DOMNode
     * @param cNode jQuery of DOMNode
     * @param tmpWidth int
     * @param opt Object Options Object
     */
    renderHeadCell: function( node, cNode, tmpWidth, opt  ){
    
      var nodeName  = cNode.attr('wgt_sort_name'),
        headTab   = '',
        tmpNewWdth = null;
      
      if( nodeName ){

        var sortIcon  = opt.icon_sort_none;
        var sortClass = '';
        var sortVal   = '';

        var sortDir  = cNode.attr('wgt_sort');
        if( sortDir ){

          sortIcon  = opt['icon_sort_'+sortDir] === undefined? opt.icon_sort_none: opt['icon_sort_'+sortDir] ;
          sortClass = ' sort-'+sortDir;
          sortVal   = sortDir;
        }

        tmpNewWdth = tmpWidth-opt.hpad;
        headTab += "<th style=\"width:"+tmpNewWdth+"px;\" orig_width=\""+tmpNewWdth+"\" ><div style=\"width:"+tmpNewWdth+"px;\" >";
        headTab += "<p class=\"label\" >"+node.innerHTML+"</p>";
        headTab += "<p class=\"order"+sortClass+"\" >";
        headTab += "<img src=\""+$G.$C.WEB_ICONS+"xsmall/"+sortIcon+"\"  alt=\"Sort\"  class=\"icon xsmall\" />";
        headTab += '<input type="hidden" name="'+nodeName+'" value="'+sortVal+'" class="wcm wcm_req_search wgt-no-save fparam-'+opt.search_form+'" />';
        headTab += "</p>";
        headTab += "</div></th>";
        
      } 
      else{
        
        tmpNewWdth = tmpWidth-opt.hpad;
        headTab += "<th style=\"width:"+tmpNewWdth+"px;\" orig_width=\""+tmpNewWdth+"\" ><div style=\"width:"+tmpNewWdth+"px;\" ><p class=\"label\" >"+node.innerHTML+"</p></div></th>";
      }

      return headTab;

    },//end renderHeadCell
    
    /**
     * Die Listeneinträge selektierbar machen
     * Diese Funktion ermöglicht es primär die rows mit wgt-selected zu tagen
     * Wie diese Information verwendet wird ist in der spezifischen Logik
     * der Multi Action zu definieren.
     */
    makeSelectable: function( lElem ){
      
      lElem.find('tbody>tr')
        .mouseover( function(){

          $S(this).addClass('wgt-hover'); 
        })
        .mouseout(function(){

          $S(this).removeClass('wgt-hover'); 
        })
        .click(function(){

          $S(this).toggleClass( 'wgt-selected' );
        });

    },//end makeSelectable

    /**
     * Synchronisation von Head und Body Breite
     */
    syncColWidth: function(){

      var self = this;
      
      if( this.firstRow ){
        
        this.firstRow.each(function(idx){
          
          var actualCol  = $S(this);
          var actualHead = $S(self.headCols.get(idx));
          
          var cWidth = actualCol.outerWidth();
          var newWidth = cWidth -6 ;//-(self.options.hpad+1);
          actualHead.width( newWidth ).parent().width( newWidth );
          //actualHead.width(cWidth-15);
  
        });
      }

      this.recalcXPosDragHelper();

    },
    
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
    },
    
    /**
     * Colobject für eine bestimmte Col erfragen
     */
    getCol: function( colId ){
      
      return new WgtUiCol( this , colId );
      
    },

    /**
     * Grid im Browser sortieren ohne Refresh vom Server
     * 
     * @param colId int, the numeric index of the col
     * @param params Object, named params array
     */
    sort: function( colId, params ){

      if( params === undefined ){
        params = {};
      }

      if( params.sort === undefined ){
        params.sort =  this.getOrderByFromCol(colId, true);
      }
      else{
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
      if( params.sort === 'sort_desc' ) {
        sortKeys.reverse();
      }

      for( var pos = 0; pos < sortKeys.length; pos++ ){
        this.element.append(sortKeys[pos][1]);
      }
      
      this.reColorize();

    },//end this.sort

    /**
     * @param colId int, the numeric index of the col
     * @param input Object, named params array
     */
    filter: function( colId , input  ){

      var rows  = this.element.find( 'tbody > tr' );
      var reg   = new RegExp("("+escapearg(htmlspecialchars(input.toUpperCase()))+")",'g');

      rows.each(function(){
        
        var row = $S(this);
        var col = row.find('td').get(colId);
        if( reg.test( $S(col).text().toUpperCase() ) ){
          row.show();
        }
        else{
          row.hide();
        }
      });

      this.reColorize();

    },//end this.filter

    
    /**
     * Inkrementieren der Anzahl gelisteter Einträge
     */
    incEntries: function(){

      var fNum = this.element.parent().parent().parent().find('.wgt-num-entry');

      if( !fNum.length ){
        return;
      }
      
      var numVal = Number(fNum.text());
      ++numVal;
      fNum.text(numVal);
      
    },//end incEntries
    
    /**
     * Dekrementieren der Anzahl gelisteter Einträge
     */
    decEntries: function(){

      var fNum = this.element.parent().parent().parent().find('.wgt-num-entry');

      if( !fNum.length ){
        return;
      }
      
      var numVal = Number(fNum.text());
      --numVal;
      fNum.text(numVal);

    },//end decEntries
    
    /**
     * Setzen der Anzahl gelisteter Einträge
     */
    setNumEntries: function(num){

      var fNum = this.element.parent().parent().parent().find( '.wgt-num-entry' );

      if( !fNum.length ){
        console.log('Did not find wgt-num-entry');
        return;
      }

      fNum.text(num);

    },//end setNumEntries

    /**
     * Toggle Body
     */
    toggle: function( ){

      this.element.find('tbody').toggle();
      
    },//end this.toggle

    /**
     */
    cleanFilter: function( ){

      var rows  = this.element.find( 'tbody > tr' );
      rows.each(function(){
        $S(this).show();
      });

      this.reColorize();
    },//end this.cleanFilter

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
            colHead.find('img').attr('src', $G.$C.iconSortAsc );
          }
        }
        else if( classes.indexOf('sort_desc') !== -1 ) {
          sort = 'sort_asc';
          if( changeIcon ) {
            colHead.removeClass('sort_desc');
            colHead.addClass('sort_asc');
            colHead.find('img').attr('src', $G.$C.iconSortDesc );
          }
        }
        else {
          sort = 'sort_asc';
          if( changeIcon ) {
            colHead.addClass('sort_asc');
            colHead.find('img').attr('src',  $G.$C.iconSortDesc );
          }
        }

        return sort;

      }
      else{
        
        return 'sort_asc';
      }

    },//end this.getOrderByFromCol

    /**
     *
     */
    reColorize: function(){

      var rows = this.element.find( 'tbody > tr' ).not('.wgt-block-appear');
      var fact = 3;
      var pos = 2;
      
      var oldNode = $G.$WGT.getClassByPrefix( $S(rows.get(0)).prop('class'), 'node-', false  );
      
      rows.each(function(){

        var row = $S(this);
        row.removeClass('row1').removeClass('row2');
        
        var nodeKey = $G.$WGT.getClassByPrefix( row.prop('class'), 'node-', false  );
        
        if( nodeKey !== oldNode ){

          row.find('td.pos').text(pos);
          oldNode = nodeKey;
          ++fact;
          ++pos;
        }
        
        row.addClass('row'+((fact%2)+1));

      });

      
    },//end this.reColorize
    
    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
      // in 1.9 would use _superApply
      $S.Widget.prototype._setOptions.apply( this, arguments );
      this._refresh();
    },

    // Use the _setOption method to respond to changes to options
    /**
     *
     */
    _setOption: function( key, value ) {

      $S.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      //$.Widget.prototype._setOption.apply( this, arguments );
      
      // In jQuery UI 1.9 and above, you use the _super method instead
      //this._super( "_setOption", key, value );

    },
 
    // called when created, and later when changing options
    _refresh: function() {

      // trigger a callback/event
      this._trigger( "change" );
    },

    /**
     * Use the destroy method to clean up any modifications your 
     * widget has made to the DOM
     */
    destroy: function() {

      $S.Widget.prototype.destroy.call( this );
    },//end destroy
    

    /**
     * @param formId
     * @param element
     * @deprecated wird über wcm + forms geregelt
     */
    pageSize: function( formId, element  ){

      $S('form#'+formId).data('qsize',$S(element).val());
      $S('form#'+formId).data('start',0);

      $G.$R.form(formId);

    },//end this.pageSize
    
    /**
     * @param formId
     * @param element
     * @deprecated wird über wcm + forms geregelt
     */
    search: function( formId, element ){

      $S('form#'+formId).data('qsize',$S(element).val());
      $S('form#'+formId).data('start',0);

      $G.$R.form(formId);

    }//end this.search

  });
  
  /**
   * @param pTab
   * @param pColId
   */
  function WgtUiCol( pTab , pColId ){

    var tabObj    = pTab,
      colIndex = null;

    if( typeof pColId === 'number' ){
      colIndex  = pColId;
    }
    else{
      colIndex  = pColId.index();
    }

    /**
     * @return WgtUiTable
     */
    this.getTable = function(){
      return tabObj;
    };

    /**
     * @param direction
     */
    this.sort = function( direction ){
      return tabObj.sort( colIndex, {sort:direction} );
    };

    /**
     * @param userInput
     */
    this.filter = function( userInput ){
      return tabObj.filter( colIndex, userInput  );
    };

    /**
     *
     */
    this.cleanFilter = function(){
      return tabObj.cleanFilter( colIndex  );
    };

  }//end function WgtUiCol */

}( jQuery, window ) );

