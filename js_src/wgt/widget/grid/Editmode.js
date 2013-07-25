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
 * Editmode zum Grid hinzufügen
 */
(function($S, $G, undefined) {
  
  "use strict";
  
  $S.widget("wgt.grid", $S.wgt.grid, {
    
    /**
     * Standard Options
     */
    options: {
      // Editierbare Cells im Grid
      save_form: null,        // ID des Save Formulars bei editierbaren Tabellen
      edit_able: false,       // Flag ob
      append_bottom: false,       // Flag ob
      allow_insert: false,    // Sollen neue Datensätze angelegt werden können
      edit_hidden_def_values: {}, // versteckte default Werte für das Editable grid, wichtig z.B bei Referenzen
      changedData: {}
    },


    /**
     * Counter mit den erstellten Datensätzen
     * zum hochzählen
     */
    cCount: 0,
    
    /**
     * der aktive Edit layer
     */
    activEditLayer: null,
    
    /**
     * Welche tds sollen ignoriert werden?
     */
    ignorePattern: '.pos,.ro,.nav,.sort,.nav_split',

    /**
     * Das Grid Element Editierbar machen
     */
    startEditMode: function(jHeadTab){

      var opts = this.options, 
        el = this.element.parent(),
        elId = this.element.attr('id'),
        self = this,
        editLayers = $S('.wgt-editlayer');
      
      //console.log("start editmode");
      // create verschieben wenn vorhanden
      if( el.find('tbody.editor').length ){
        jHeadTab.find('table').append(el.find('tbody.editor'));
      }
      
      opts.changedData = {};
      

      el.parent().bind('click.edit_cell', function(e){

        var cTarget =  $S(e.target),
          type = null;
        
        // wenn innerhalb des edit layers
        if (self.activEditLayer && cTarget.parentX(self.activEditLayer)){
          return;
        }
        
        editLayers.trigger('blur');
        
        
        if (cTarget.parentX('tbody.editor')){
          // hinzufügen einer neuen Zeile
          self.createNew( editLayers);
          return;
        } 
        
        // beim klick auf ein inputelement wird das event gesondert behandelt
        if (cTarget.is('input')) {
          self._addInputEvent(cTarget, opts);
          return;
        }
        
        // prüfen ob das feld überhaupt editierbar ist
        if (!(cTarget.is('td') && !cTarget.is(self.ignorePattern))){
          //editLayers.trigger('blur');
          editLayers.unbind('blur');
          editLayers.hide();
          return;
        }
        
        // check ob die ganze reihe vielleicht readonly ist
        if (cTarget.parent().is('.ro')){
          editLayers.unbind('blur');
          editLayers.hide();
          return;
        }
        
        // erstellen des editlayers
        type = self._createEditlayer(elId, cTarget, editLayers);
        
        if (!type) {
          return;
        }
        
        
        // bei globalen klicks den editlayer entfernen
        $S('#wbf-body').bind('mousedown.editable_grid', function(e) {
          
          // keine aktion wenn kein editlayer aktiv ist
          var gTarget =  $S(e.target);
          if (!self.activEditLayer) { 
            return;
          }
          
          // bei clicks in den editlayer keine aktion
          if (gTarget.is(self.activEditLayer) || gTarget.parentX(self.activEditLayer)) {
            return;
          }
          editLayers.trigger('blur')
            .unbind('blur')
            .hide();
        });

        // zurückschreiben der werte aus den editlayern in die cols / den speicher array
        if (self.activEditLayer) {
          self.activEditLayer.blur(function() {
            self._editorBlur(cTarget, editLayers, type);
          });
        }

        // anzeigen des editlayers
        self._showEditlayer(type);
     
      });
        
      self.addKeyEvents(opts,el,elId);
    },
    
    /**
     * keyboard events definieren
     */
    addKeyEvents: function(opts,el,elId){
      
      /*
      el.parent().on('keydown', function(e){
        
        var keyCode = e.keyCode || e.which; 
        console.log("got keycode "+keyCode );
        //alert("got keycode "+keyCode );

        if (keyCode !== 9) { 
          return true;
        } 
        
        e.preventDefault(); 
        // call custom function here
      
        var cTarget =  $S(e.target);
            
        // wenn innerhalb des edit layers
        if (self.activEditLayer && cTarget.parentX(self.activEditLayer)){
          return;
        }
        
      });
      */
      
    },
    
    /**
     * keyboard events definieren
     */
    _addInputEvent: function(cTarget, opts){
      
      if(cTarget.is('input.gredit')){
        return;
      }
      
      cTarget.addClass('gredit');
      
      // entweder es ist eine checkbox
      if(cTarget.is('input:checkbox')){
        
        var userInp;
        cTarget.change(function(){
          if (cTarget.is(':checked')) {
            userInp = 't';
          } else {
            userInp = 'f';
          }
          
          opts.changedData[cTarget.parent().attr('name')] = userInp;
        }); 
      }
      
      // bei window elementen
      if(cTarget.is('input.wgt_window')){
        cTarget.parent().find('input:hidden').change(function(){
          console.log('input name: '+cTarget.parent().attr('name')+' val: '+$S(this).val());
          opts.changedData[cTarget.parent().attr('name')] = $S(this).val();
        }); 
      }
     
    },
    
    /**
     * keyboard events definieren
     */
    _editorBlur: function(cTarget, editLayers, type){
      
      
      var userInp = '', 
        self = this,
        opts = this.options,
        displTxt = '',
        fieldName = '';
      
      // global event entfernen
      $S('#wbf-body').unbind('mousedown.editable_grid');

      
      if ('date' === type || 'datetime' === type) {
        
        displTxt = userInp = self.activEditLayer.find('input').val();
      
      } else if ('select' === type) {
        
        userInp = self.activEditLayer.find('select').val();
        displTxt = self.activEditLayer.find('select option:selected').text();
        
      } else if ('check' === type) {
          
        if (self.activEditLayer.find('input').is(':checked')) {
          userInp = 't';
        } else {
          userInp = 'f';
        }
      
        displTxt = cTarget.html();
          
      }  else {
        
        displTxt = userInp = self.activEditLayer.text();
      }
      
      if (undefined !==opts.changedData[fieldName] && opts.changedData[fieldName] === userInp)
        return;
    
      cTarget.html(displTxt);
      cTarget.addClass('changed');
      cTarget.attr('value',userInp);
      fieldName = cTarget.attr('name');
      opts.changedData[fieldName] = userInp;
      
      self.syncColWidth();
    
      self.activEditLayer = null;
      editLayers.unbind('blur');
      editLayers.hide();
     
    },
    
    /**
     * Erstellen des Editor Overlays
     */
    _createEditlayer: function(elId, cTarget, editLayers){
      
      var self = this,
        opts = this.options;
      
      // eine temporär id zuweisen
      if (!cTarget.attr('id')){
        cTarget.attr('id','wgt-id-'+new Date().getTime());
      }

      var ofs = cTarget.offset(),
        oW  = cTarget.outerWidth(),
        oH  = cTarget.outerHeight(),
        type = $WGT.getClassByPrefix(cTarget.prop('class'), 'type_');
      
      if (!type) {
        type = 'text';
      }

      if( 'window' === type || 'check' === type || 'element' === type  ){
        return type;
      }
      
      //console.log('#wgt-edit-field-'+type);
      self.activEditLayer = $S('#wgt-edit-field-'+type);
      
      if(!self.activEditLayer.length){
        console.log('missing layer #wgt-edit-field-'+type);
        return null;
      }
      
      // dem editlayer mitgeben welches feld befüllt werden soll,
      // nötig bei rich ui widgets
      self.activEditLayer.attr('wgt_target',cTarget.attr('id')).attr('wgt_list',elId);

      //console.log(cTarget.parentX('table').css('margin-top')+' type '+type+' '+cTarget.prop('class'));
      /* vorhandene editlayer schliesen und werte zurückschreiben */
      editLayers.trigger('blur')
        .unbind('blur')
        .hide();
      

      self.activEditLayer.css({
        left:ofs.left,
        top:ofs.top,
        width:oW,
        height:oH
      });

      if ('date' === type || 'datetime' === type ){
        
        self.activEditLayer.find('input').val(cTarget.html());
        
      } else if ('select' === type) {
        
        self.activEditLayer.html($S('#'+cTarget.attr('data_source')).text());
        
        if(!self.activEditLayer.find('option[value="'+cTarget.attr('value')+'"]').length){
          self.activEditLayer.find('select').append('<option value="'+cTarget.attr('value')+'" >'+cTarget.text()+'</option>');
        }
        
        self.activEditLayer.find('select').val(cTarget.attr('value'));
        
      } else if ('window' === type) {
          
          self.activEditLayer.html($S('#'+cTarget.attr('data_source')).text());
          
          if(!self.activEditLayer.find('option[value="'+cTarget.attr('value')+'"]').length){
            self.activEditLayer.find('select').append('<option value="'+cTarget.attr('value')+'" >'+cTarget.text()+'</option>');
          }
          
          self.activEditLayer.find('select').val(cTarget.attr('value'));
          
      } else if ('check' === type) {

        self.activEditLayer.html(cTarget.html());
          
      } else {
        
        self.activEditLayer.html(cTarget.html());
        
        var range,
          selection;
        
        if (document.createRange) {//Firefox, Chrome, Opera, Safari, IE 9+
        
          range = document.createRange();//Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(self.activEditLayer.get(0));//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          selection = window.getSelection();//get the selection object (allows you to change selection)
          selection.removeAllRanges();//remove any selections already made
          selection.addRange(range);//make the range you have just created the visible selection
        
        } else if (document.selection) { //IE 8 and lower 
          /* HMM let me say it sooo: FCK IE < 9
          range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
          range.moveToElementText(self.activEditLayer.get(0));//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          range.select();//Select the range (make it the visible selection
          */
        }
      }
      
      // type muss zurück gegeben werden
      return type;
      
    },
    
    /**
     * Anzeigen und fokusieren des aktuellen edit layers
     */
    _showEditlayer: function(type){
      
      if(!this.activEditLayer){
        return;
      }
      
      this.activEditLayer.show();
      if ('date' === type || 'datetime' === type) {
        
        this.activEditLayer.find('input').datepicker('show').focus();
        
      } else if ('select' === type) {
        
        this.activEditLayer.find('select').focus();
        
      } else if ('check' === type) {
          
        this.activEditLayer.find('input').focus();
          
      } else {
        
        this.activEditLayer.focus();
        this.activEditLayer.bind('keyup',function(){
          if($S(this).hasScrollBar()){
            $S(this).addWidth(20);
          }
        });
      }
    },
    
    /**
     * Das Grid Element Editierbar machen
     */
    save: function(){

      var el = this.element.parent(),
        elId = this.element.attr('id'),
        opts = this.options,
        self = this,
        editLayers = $S('.wgt-editlayer'),
        requestBody = '';
      
      if (!opts.changedData) {
        $D.message('nothing to save');
        return;
      }
      
      for (var key in opts.changedData){
        
        if (undefined===opts.changedData[key]){
          continue;
        }

        requestBody += '&'+key+'='+opts.changedData[key];
      }
      
      $R.form(opts.save_form, null, {'data':opts.changedData,'success':function(){
        // empty changed data
        opts.changedData = {};
        self.reColorize();
        self.syncColWidth();
      }});
      
      this.element.find('td.changed').removeClass('changed');
      
      //alert('changed: '+requestBody);
    },
    
    /**
     * Datensatz aus dem save Index werfen. 
     * Ist nötig wenn der Datensatz gelöscht wurde, vorher jedoch im Editor
     * bearbeitet und nicht gespeichert wurde
     * 
     * @param indexCheck
     */
    dropFromSavedata :function( indexCheck ){
      
      var tmpStack = {},
        opts = this.options;
      
      for (var prop in opts.changedData) {
        // es muss geprüft werden ob prop existier
        if (opts.changedData.hasOwnProperty(prop)) {
          if( !prop.indexOf('['+indexCheck+']')){
            tmpStack[prop] = opts.changedData[prop];
          }
        }
      }
      opts.changedData = tmpStack;
      
    },
    
    /**
     * Datensatz aus dem save Index werfen. 
     * Ist nötig wenn der Datensatz gelöscht wurde, vorher jedoch im Editor
     * bearbeitet und nicht gespeichert wurde
     * 
     * @param indexCheck
     */
    writeSavedata :function( name, value ){
      
     
      console.log("name:"+name+" value: "+value);
      this.options.changedData[name] = value;
      
    },
    
    /**
     * Leeren des Save Indexes
     */
    emptySavedata :function(  ){

      this.options.changedData = {};
      
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    writeCell: function(cellId, value, text){

      var cell = $S('#'+cellId),
        elId = this.element.attr('id'),
        cellName = cell.attr('name');
      
      console.log('write cell n:'+cellName+' v: '+value+' t: '+text);
      
      this.options.changedData[cellName] = value;
      cell.html(text);
      cell.attr('value',value);
      cell.addClass('changed');
        
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    writeCellByTd: function(tdNode, value, text){

      var tdNode = $S(tdNode), 
      type = this._getCellType(tdNode),
      name = tdNode.attr('name');
  
      if ('window' === type) {
        
        tdNode.find('input:hidden').val(value);
        tdNode.find('input').not(':hidden').val(text);
      
      } if ('check' === type) {
        
        if(value){
          tdNode.find('input').attr('checked','checked');
        }
        
      } else {
        
        tdNode.html(text);
        tdNode.attr('value',value);
      }
      

      tdNode.addClass('changed');
      this.options.changedData[name] = value;

    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    readCellByTd: function(tdNode){
        
      var tdNode = $S(tdNode), 
        type = this._getCellType(tdNode),
        value = null,
        text = null;
    
      
      if ('date' === type || 'datetime' === type || 'text' === type) {
        
        value = text = tdNode.html();
      
      } else if('select' === type||'window' === type) {
        
        text = $S('#'+tdNode.attr('data_source')).text();
        value = tdNode.attr('value');  
        
      } else if('check' === type) {
        
        value = text = tdNode.find('input').is(':checked');  
      }
      
      return {
        'name': tdNode.attr('name'),
        'value': value,
        'text': text
      };
      
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    readCellContentByTd: function(tdNode){
        
      var tdNode = $S(tdNode), 
        type = this._getCellType(tdNode),
        value = null,
        text = null;
    
      
      if ('date' === type || 'datetime' === type || 'text' === type) {
        
        value = text = tdNode.html();
      
      } else if('select' === type||'window' === type) {
        
        text = tdNode.html();
        value = tdNode.attr('value');  
        
      } else if('check' === type) {
        
        value = text = tdNode.find('input').is(':checked');  
      }
      
      return {
        'name': tdNode.attr('name'),
        'value': value,
        'text': text
      };
      
    },
    
    /**
     * @param cTarget DomNode oder jQuery objekt eines 'td's 
     */
    _getCellType: function(cTarget){
      

      var type = $WGT.getClassByPrefix(cTarget.prop('class'), 'type_');
      if(!type){
        type = 'text';
      }
      
      return type;
      
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    cloneRow: function(toCopy){
      
      var elId = this.element.attr('id'),
        editLayers = $S('.wgt-editlayer'),
        oldRows = $S(toCopy).parentX('tr').find('td'),
        self = this;

      var newRow = this.createNew(editLayers);
      
      
      newRow.find('td').each(function(idx,node){
        var tNode = $S(this),
          oldNode = null,
          data = {};
        
        if(tNode.is(self.ignorePattern)){
          return;
        }
        
        
        oldNode = oldRows.get(idx);
        
        data = self.readCellContentByTd(oldNode);
        self.writeCellByTd(tNode, data.value, data.text);

        console.log('write in '+idx+' val: '+data.value+' text: '+data.text  );
        
      });
      
      self.syncColWidth();
        
      console.dir(this.options.changedData);
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    createNew: function(editLayers){
      
      var self = this,
        el = this.element,
        elId = el.attr('id'), 
        opts = this.options;
      
      if (undefined===editLayers) {
        editLayers = $S('.wgt-editlayer');
      }

      editLayers.unbind('blur');
      editLayers.hide();
        
      console.log('search for #'+elId+'-editor-tpl');
      var tplRow = $S('#'+elId+'-editor-tpl').text();

      //console.dir(tplRow);
     
      var indexCheck = '[new-'+self.cCount+']'; // checkstring um den savedata array cleanen zu können
    
      tplRow = tplRow.replace(/{\$new}/g,'new-'+self.cCount);
      tplRow = $S(tplRow); 
      tplRow.attr('eid','new-'+self.cCount);
      
      // remove event
      tplRow.find('td.pos').html('<i class="icon-remove" ></i>').click(function(){
        
        var tmpStack = {};
        
        for (var prop in opts.changedData) {
          // es muss geprüft werden ob prop existier
          if (opts.changedData.hasOwnProperty(prop)) {
            if( !prop.indexOf(indexCheck)){
              tmpStack[prop] = opts.changedData[prop];
            }
          }
        }
        opts.changedData = tmpStack;
        $S(this).parent().remove();
        self.reColorize();
        self.syncColWidth();
      });

      
      // hinzufügen von default values, z.B in referenzen
      if (opts.edit_hidden_def_values){
        for (var defValName in opts.edit_hidden_def_values) {
          if (opts.edit_hidden_def_values.hasOwnProperty(defValName)) {
            opts.changedData[defValName.replace('{$new}','new-'+self.cCount)] = opts.edit_hidden_def_values[defValName];
          }
        }
      }
      ++self.cCount;

      if (opts.append_bottom) {
        el.find('tbody:first').append(tplRow);
      } else {
        el.find('tbody:first').prepend(tplRow);
      }
      self.makeSelectable(el);
      opts.gridCont.scrollTo(tplRow);
      
      
      $R.eventAfterAjaxRequest(false,'wcmt');
      
      return tplRow;
        
    }
 
  });
  
}(jQuery, window));

