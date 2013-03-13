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
(function( $S, $G, undefined ) {

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
     * Object mit den den änderungen
     */
    changedData: {},

    /**
     * Counter mit den erstellten Datensätzen
     * zum hochzählen
     */
    cCount: 0,

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
      select_able: true,     // flag ob die Einträge selektiert werden können

      // Editierbare Cells im Grid
      save_form: null,        // ID des Save Formulars bei editierbaren Tabellen
      edit_able: false,       // Flag ob
      allow_insert: false,    // Sollen neue Datensätze angelegt werden können

      load_urls: {}, // urls zum nachladen von content

      // Sort Daten und Optionen
      icon_sort_asc:  'icon-sort-down',    // Icon für das absteigenden sortieren
      icon_sort_desc: 'icon-sort-up',   // Icon für das aufsteigenden sortieren
      icon_sort_none: 'icon-sort',   // noch nicht sortiert

      // open / closed
      icon_opened: 'control/opened.png',   // Icon für einen geschlossenen abschnitt
      icon_closed: 'control/closed.png',   // Icon für einen offenen abschnitt

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

      // erst mal alle benötigten variablen deklarieren
      var self = this,
        ge = this.element,  // shortcut aufs das element
        opt = this.options, // shortcut für die options
        gridBody = null,    // die box in welcher sich die content tabelle befindet
        parentBox = ge.parent(),
        parentHeight = null,
        parentHeightStyle = null,
        scrollHeightStyle = null,
        jHeadTab  = null,
        oldHCols = ge.find('thead th'), // der original head
        headTab   = "<div class=\"wgt-grid-head\" ><div><table><thead><tr>", // start des neuen heads
        searchBox = '', // Box mit den Suchelementen, wird nur bei Bedarf gefüllt
        resizeBox = '<div class="wgt-drag" >', // die Box mit den resize elementen
        sizes = []; // liste mit den größen

      // setzen der Grid Basisklasse wenn noch nicht vorhanden
      if( !ge.hasClass( opt.grid_class ) ){
        ge.addClass( opt.grid_class );
      }
      
      //console.log( 'height '+ge.parent().parent().height() );
      if ('full' === opt.height) {
        
        parentHeight = parentBox.parent().height();
        parentBox.css('height', parentHeight+'px');
        
        // hier noch ein check für create
          
        parentHeight -= 32;
        scrollHeightStyle = ' style="height:'+(parentHeight)+'px;" ';

        parentHeight -= 20;
        if (opt.search_able) {
          parentHeight -= 23;
        }
        
        
        parentHeightStyle = ' style="height:'+(parentHeight)+'px;" ';
      }

      // Einträge Selektiebar machen
      if( opt.select_able ){
        this.makeSelectable( ge );
      }

      if( opt.search_able ){
        searchBox += '<tbody><tr>';
      }

      // die tabelle wird mit dem grid element umrahmt
      ge.wrap('<div class="wgt-grid-body '+opt.height+'" id="'+ge.attr('id')+'-body" '+parentHeightStyle+' />');

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
      jHeadTab = $S(headTab);

      // anhängen der Searchbar wenn gewünscht
      if( opt.search_able ){
        jHeadTab.find('table').append(searchBox);
      }

      this.injectSortControls( jHeadTab );


      // den neuen kopf sowie die resize box vor die tabelle kopieren
      ge.parent().wrap( '<div class="body-scroll" '+scrollHeightStyle+' >' );
      ge.parent().before(jHeadTab);
      ge.parent().before(resizeBox);

      // store the head
      var headBar = ge.parent().parent().find('.wgt-grid-head');
      var headOff = headBar.position();

      var tbodyHeight = ge.parent().height() + headBar.height();

      // add the scroll events
      var tmpBox    = ge.parent(),
        scrolling = false;
      
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

        $D.scrollTrigger();
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
              if( newWidth <= 40 && !actualCol.hasClass('pos') ) {

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

      if( opt.load_urls !== {} ){
        self.initLoaderEvent();
      }

    },//end buildGrid

    /**
     * Das Grid Element Editierbar machen
     */
    startEditMode: function(){

      var el = this.element.parent(),
        self = this,
        editLayers = $S('.wgt-editlayer');
      
      console.log("start editmode");

      el.click(function( e ){

        var cTarget =  $S(e.target);
        if( !(cTarget.is('td') && !cTarget.is('.pos,.ro,.nav,.sort')) ){
          editLayers.unbind('blur');
          editLayers.hide();
          return;
        }

        var ofs = cTarget.offset();
        var oW  = cTarget.outerWidth();
        var oH  = cTarget.outerHeight();

        var type = $G.$WGT.getClassByPrefix( cTarget.prop('class'), 'type_' );
        
        if( !type ){
          type = 'text';
        }

        var editLayer = $S('#wgt-edit-field-'+type);

        //console.log( cTarget.parentX('table').css('margin-top')+' type '+type+' '+cTarget.prop('class') );
        /**/
        editLayers.trigger('blur');
        editLayers.unbind('blur');
        editLayers.hide();
        

        editLayer.css({
          left:ofs.left,
          top:ofs.top,
          width:oW,
          height:oH
        });

        if( 'date' === type ){
          editLayer.find('input').val(cTarget.html());
        }
        else{
          editLayer.html( cTarget.html() );
          
          var range,selection;
          if(document.createRange){//Firefox, Chrome, Opera, Safari, IE 9+
          
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(editLayer.get(0));//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
          
          } else if(document.selection) { //IE 8 and lower
         
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(editLayer.get(0));//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
          }
        }

        editLayer.blur(function(){
          
          var userInp = '',
            fieldName = '';
          
          // wenn es eine neue Zeile ist
          if(cTarget.parent().is('.new')){
            
            editLayers.unbind('blur');
            editLayers.hide();
            
            
            if ('date'===type) {
              
              userInp = editLayer.find('input').val();
            
            } else {
              
              userInp = editLayer.text();
            }
            
            // keine leeren
            if( '' === userInp.trim() ){
              return;
            }
            
            
            var tplRow = cTarget.parent().parent().find('tr.template')
              .clone().removeClass('template');
            
            var tmpRowId = tplRow.attr('id');
          
            if (tmpRowId) {
              tplRow.attr( 'id', tmpRowId.replace('{$new}','new-'+self.cCount) );
            }
            
            tplRow.find('td.pos').html('<i class="icon-remove" ></i>').click(function(){
              $S(this).parent().remove();
            });
            
            tplRow.find('td').each(function(){
              var tmpNode = $S(this), 
                tmpName = tmpNode.attr('name');
              
              if (tmpName) {
                tmpNode.attr( 'name', tmpName.replace('{$new}','new-'+self.cCount) );
              }
              
            });
            
            ++self.cCount;
            
            var fIdx = cTarget.parent().find('td').index(cTarget),
              newField = tplRow.find('td:eq('+fIdx+')');
            
            newField.html( userInp );
            fieldName = newField.attr('name');
            self.changedData[fieldName] = userInp;
            
            cTarget.parent().parent().parent().find('tbody:first').append(tplRow);
              self.makeSelectable(el);
 
            } else {
              
              if( 'date' === type ){
              
              userInp = editLayer.find('input').val();
            
            } else {
              
              userInp = editLayer.text();
            }
            
            cTarget.html( userInp );
            fieldName = cTarget.attr('name');
            self.changedData[fieldName] = userInp;
          }
          
          //console.log( "changed: "+fieldName+' to: '+userInp  );
          editLayers.unbind('blur');
          editLayers.hide();
          
        });

        //editLayer.selection( 0, editLayer.text().length );
        
        editLayer.show();
        if( 'date' === type ){
          editLayer.find('input').datepicker('show');
        }
        editLayer.focus();


      });

    },
    
    /**
     * Das Grid Element Editierbar machen
     */
    save: function(){

      var el = this.element.parent(),
        opt = this.options,
        self = this,
        editLayers = $S('.wgt-editlayer');
      
      var requestBody = '';
      
      if (!self.changedData){
        $D.message('nothing to save');
        return;
      }
      
      for( var key in self.changedData ){
        
        if(undefined===self.changedData[key]){
          continue;
        }

        requestBody += '&'+key+'='+self.changedData[key];
      }
      
      $R.form( opt.save_form, null, {'data':self.changedData,'success':function(){
        // empty changed data
        self.changedData = {};
        self.reColorize();
        self.syncColWidth();
      }});
      
      //alert( 'changed: '+requestBody );
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

      jHeadTab.find('i.sort').each( function(){

         var imgNode = $S(this);

         imgNode.bind("click.grid", function() {

          var nIcon = $S(this),
            pIcon = nIcon.parent();

          if( pIcon.hasClass('sort-asc') ){
            pIcon.removeClass('sort-asc').addClass('sort-desc');
            nIcon.removeClass().addClass( opt.icon_sort_desc+' sort' );
            nIcon.next().val('desc').change();
          }
          else if( pIcon.hasClass('sort-desc') ){
            pIcon.removeClass('sort-desc');
            nIcon.removeClass().addClass( opt.icon_sort_none+' sort' );
            nIcon.next().val('').change();
          }
          else{
            pIcon.addClass('sort-asc');
            nIcon.removeClass().addClass( opt.icon_sort_asc+' sort' );
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

      var searchBox = '',
        searchName = cNode.attr('wgt_search');

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

        //width:'+(tmpWidth-opt.hpad)+'px;
        searchBox = ''.concat(
            '<td style="text-align:center;" >',
            '<input type="'+sType+'" name="'+sName+'" class="wcm wcm_req_search search wgt-no-save fparam-'+opt.search_form+'" style="width:100%" />',
            '</td>'
        );
      }
      else{

        //width:'+(tmpWidth-opt.hpad)+'px;
        searchBox = '<td style="text-align:center;" ><span>&nbsp;</td>';

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

        var sortIcon  = opt.icon_sort_none, 
          sortClass = '',
          sortVal = '';

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
        headTab += "<i class=\""+sortIcon+" sort\" ></i>";
        headTab += '<input type="hidden" name="'+nodeName+'" value="'+sortVal+'" class="wcm wcm_req_search wgt-no-save fparam-'+opt.search_form+'" />';
        headTab += "</p>";
        headTab += "</div></th>";

      }
      else{

        tmpNewWdth = tmpWidth-opt.hpad;
        headTab += "<th style=\"width:"+tmpNewWdth+"px;\" orig_width=\""+tmpNewWdth+"\" >"
          +"<div style=\"width:"+tmpNewWdth+"px;\" ><p class=\"label\" >"+node.innerHTML+"</p></div>"
          +"</th>";
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

      lElem.find('tbody>tr>td.pos').not('.ini')
        .click(function(){

          $S(this).parent().toggleClass( 'wgt-selected' );
        }).addClass('ini');

        /*
        .mouseover( function(){

          $S(this).addClass('wgt-hover');
        });
        .mouseout(function(){

          $S(this).removeClass('wgt-hover');
        })
        */

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
     * Einen Teil der Tabelle nachladen
     */
    triggerLoad: function( key, append, triggerNode ){

      if( triggerNode && triggerNode.is('state-loaded') ){
        
        return;
      }

      if( undefined !== this.loadUrls[key]  ){
        
        $R.get( this.loadUrls[key]+append );

        if( triggerNode ){
          triggerNode.addClass('state-loaded');
        }
      }
    },

    /**
     * Events zum nachladen
     */
    initLoaderEvent: function(){

      var el = this.element,
        opts = this.options
        self = this;

      el.click( function( e ){

        var cTarget = $S( e.target );

        if( !cTarget.is('.wgt-loader') ){
          cTarget = cTarget.parentX('.wgt-loader');
        }

        if( !cTarget || !cTarget.is('.wgt-loader') ){
          return;
        }

        if( cTarget.is('.state-loaded') ){
          return;
        }

        var loadUrl = opts.load_urls[cTarget.attr('wgt_source_key')];

        if( cTarget.attr('wgt_eid') ){
          loadUrl += '&objid='+cTarget.attr('wgt_eid');
        }

        if( cTarget.attr('wgt_param') ){
          loadUrl += cTarget.attr('wgt_param');
        }

        var parentTr = cTarget.parentX('tr');

        if( parentTr ){
          loadUrl += '&p_row_id='+parentTr.attr('id')+'&p_row_pos='+parentTr.find('td.pos').text();
        }

        //console.log("data "+cTarget.attr('wgt_source_key')+" "+loadUrl );

        $R.get( loadUrl );

        cTarget.addClass('state-loaded');
        cTarget.find('img').attr( 'src', $G.$C.WEB_ICONS+"xsmall/"+opts.icon_opened );

        parentTr.bind( 'rowclose', function(){
          cTarget.find("img").attr('src', $G.$C.WEB_ICONS+"xsmall/"+opts.icon_closed);
          $S('.c-'+parentTr.attr('id')).hide().trigger('rowclose');
          parentTr.removeClass('state-open');
        });

        parentTr.addClass('state-open');


        cTarget.bind( 'click', function(){

          if( parentTr.hasClass('state-open') ) {

            parentTr.trigger('rowclose');
            self.syncColWidth();
          }
          else{

            cTarget.find("img").attr('src', $G.$C.WEB_ICONS+"xsmall/"+opts.icon_opened);
            $S('.c-'+parentTr.attr('id')).show();
            parentTr.addClass('state-open');
            self.syncColWidth();
          }

        });

      });

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
     * @param colId int, the numeric index of the col
     * @param input Object, named params array
     */
    filter: function(colId , input){

      var rows  = this.element.find( 'tbody > tr' ),
        reg   = new RegExp("("+escapearg(htmlspecialchars(input.toUpperCase()))+")",'g');

      rows.each(function(){

        var row = $S(this);
        var col = row.find('td').get(colId);
        if( reg.test( $S(col).text().toUpperCase() ) ){
          
          row.show();
          
        } else {
          
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

      if (!fNum.length) {
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

      if (!fNum.length) {
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

      if (!fNum.length) {
        console.log('Did not find wgt-num-entry');
        return;
      }

      fNum.text(num);

    },//end setNumEntries

    /**
     * Selectieren alle entries
     */
    selectAll: function(){

      this.element.find('tr').addClass( 'wgt-selected' );

    },//end selectAll

    /**
     * Deselect all selected entries
     */
    deSelectAll: function(){

      this.element.find('tr').removeClass( 'wgt-selected' );

    },//end deSelectAll

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

    },//end this.getOrderByFromCol

    /**
     *
     */
    reColorize: function(){

      var rows = this.element.find( 'tbody > tr' ).not('.wgt-block-appear'),
        fact = 3,
        pos = 2,
        oldNode = $G.$WGT.getClassByPrefix( $S(rows.get(0)).prop('class'), 'node-', false  );

      rows.each(function(){

        var row = $S(this);
        row.removeClass('row1 row2');

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

    /**
    *
    */
   renderRowLayout: function(){
       
     // nur auf dem ersten body
     var rows = this.element.find( 'tbody:first > tr' ).not('.wgt-block-appear'),
       fact = 3,
       pos = 2,
       oldNode = $G.$WGT.getClassByPrefix( $S(rows.get(0)).prop('class'), 'node-', false  );

     rows.find('>td.pos').not('.ini')
     .click(function(){

       $S(this).parent().toggleClass( 'wgt-selected' );
     }).addClass('ini');

     rows.each(function(){

       var row = $S(this);
       row.removeClass('row1 row2');

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


}( jQuery, window ) );

