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
      allow_insert: false,    // Sollen neue Datensätze angelegt werden können
      edit_hidden_def_values: {} // versteckte default Werte für das Editable grid, wichtig z.B bei Referenzen
    },

    /**
     * Object mit den den Änderungen
     */
    changedData: {},

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
      

      el.parent().bind('click.edit_cell', function(e){

        var cTarget =  $S(e.target);
        
        // wenn innerhalb des edit layers
        if (self.activEditLayer && cTarget.parentX(self.activEditLayer)){
          return;
        }
        
        editLayers.trigger('blur');
        
        // wenn click auf editor
        if (cTarget.parentX('tbody.editor')){
          
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
            
            for (var prop in self.changedData) {
              // es muss geprüft werden ob prop existier
              if (self.changedData.hasOwnProperty(prop)) {
                if( !prop.indexOf(indexCheck)){
                  tmpStack[prop] = self.changedData[prop];
                }
              }
            }
            self.changedData = tmpStack;
            $S(this).parent().remove();
          });
          
          /*
          tplRow.find('td').each(function(){
            var tmpNode = $S(this), 
              tmpName = tmpNode.attr('name');
            
            if (tmpName) {
              tmpNode.attr('name', tmpName.replace('{$new}','new-'+self.cCount));
            }
            
          });
          */
          
          // hinzufügen von default values, z.B in referenzen
          if (opts.edit_hidden_def_values){
            for (var defValName in opts.edit_hidden_def_values) {
              if (opts.edit_hidden_def_values.hasOwnProperty(defValName)) {
                self.changedData[defValName.replace('{$new}','new-'+self.cCount)] = opts.edit_hidden_def_values[defValName];
              }
            }
          }
          ++self.cCount;

          
          el.find('tbody:first').prepend(tplRow);
          self.makeSelectable(el);
          
          $R.eventAfterAjaxRequest(false,'wcmt');
          
          return;
        } // end click auf editor
        
        if (cTarget.is('input')) {
          
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
              
              self.changedData[cTarget.parent().attr('name')] = userInp;
            }); 
          }
          
          // bei window elementen
          if(cTarget.is('input.wgt_window')){
            cTarget.parent().find('input:hidden').change(function(){
              self.changedData[cTarget.parent().attr('name')] = $S(this).val();
            }); 
          }
         
          
          return;
        }
        
        // prüfen ob das feld überhaupt editierbar ist
        if (!(cTarget.is('td') && !cTarget.is('.pos,.ro,.nav,.sort,.nav_split'))){
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
        

        
        // eine temporär id zuweisen
        if (!cTarget.attr('id')){
          cTarget.attr('id','wgt-id-'+new Date().getTime());
        }

        var ofs = cTarget.offset(),
          oW  = cTarget.outerWidth(),
          oH  = cTarget.outerHeight(),
          type = $G.$WGT.getClassByPrefix(cTarget.prop('class'), 'type_');
        
        if (!type) {
          type = 'text';
        }

        if( 'window' === type || 'check' === type || 'element' === type  ){
          return 
        }
        
        //console.log('#wgt-edit-field-'+type);
        self.activEditLayer = $S('#wgt-edit-field-'+type);
        
        if(!self.activEditLayer.length){
          console.log('missing layer #wgt-edit-field-'+type);
          return;
        }
        
        // dem editlayer mitgeben welches feld befüllt werden soll,
        // nötig bei rich ui widgets
        self.activEditLayer.attr('wgt_target',cTarget.attr('id')).attr('wgt_list',elId);

        //console.log(cTarget.parentX('table').css('margin-top')+' type '+type+' '+cTarget.prop('class'));
        /**/
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
         
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(self.activEditLayer.get(0));//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
          }
        }
        
        // bei globalen klicks den editlayer entfernen
        $S('#wbf-body').bind('mousedown.editable_grid',function(e){
            
          var gTarget =  $S(e.target);
          if (!self.activEditLayer){
            return;
          }
            
          if (gTarget.is(self.activEditLayer) || gTarget.parentX(self.activEditLayer)){
            return;
          }
          editLayers.trigger('blur')
            .unbind('blur')
            .hide();
        });

        
        self.activEditLayer.blur(function(){
          
          // global event entfernen
          $S('#wbf-body').unbind('mousedown.editable_grid');
          
          var userInp = '', 
            displTxt = '',
            fieldName = '';
          
          // wenn es eine neue Zeile ist
          if (cTarget.parent().is('.new')){
            
            editLayers.unbind('blur').hide();
            
            
            if ('date'===type || 'datetime'===type) {
              
              displTxt = userInp = self.activEditLayer.find('input').val();
            
            } else if ('select'===type) {
              
              userInp  = self.activEditLayer.find('select').val();
              displTxt = self.activEditLayer.find('select option:selected').text();
              
            } else if ('check'===type) {
                
            if (self.activEditLayer.find('input').is(':checked')) {
              userInp = 't';
              } else {
                userInp = 'f';
              }
            
              displTxt = cTarget.html();
                
            } else {
              
              displTxt = userInp = self.activEditLayer.text();
            }
            
            // keine leeren
            if (!displTxt || '' === displTxt.trim()){
              return;
            }
            
            
            var tplRow = cTarget.parent().parent().find('tr.template')
              .clone()
              .removeClass('template');
            
            var tmpRowId = tplRow.attr('id');
          
            if (tmpRowId) {
              tplRow.attr('id', tmpRowId.replace('{$new}','new-'+self.cCount));
            }
            
            tplRow.find('td.pos').html('<i class="icon-remove" ></i>').click(function(){
              $S(this).parent().remove();
            });
            
            tplRow.find('td').each(function(){
              var tmpNode = $S(this), 
                tmpName = tmpNode.attr('name');
              
              if (tmpName) {
                tmpNode.attr('name', tmpName.replace('{$new}','new-'+self.cCount));
              }
              
            });
            
            // hinzufügen von default values, z.B in referenzen
            if (opts.edit_hidden_def_values){
              for (var defValName in opts.edit_hidden_def_values) {
                if (opts.edit_hidden_def_values.hasOwnProperty(defValName)) {
                  self.changedData[defValName.replace('{$new}','new-'+self.cCount)] = opts.edit_hidden_def_values[defValName];
                }
              }
            }
            ++self.cCount;
            
            var fIdx = cTarget.parent().find('td').index(cTarget),
              newField = tplRow.find('td:eq('+fIdx+')');
            
            newField.html(displTxt);
            fieldName = newField.attr('name');
            self.changedData[fieldName] = userInp;
            
            el.find('tbody:first').prepend(tplRow);
            self.makeSelectable(el);
            
            
 
          } else {
              
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
            
            if (undefined !==self.changedData[fieldName] && self.changedData[fieldName] === userInp)
              return;
          
            cTarget.html(displTxt);
            cTarget.addClass('changed');
            cTarget.attr('value',userInp);
            fieldName = cTarget.attr('name');
            self.changedData[fieldName] = userInp;
          }
          
          self.activEditLayer = null;
          editLayers.unbind('blur');
          editLayers.hide();
          
        });

        //editLayer.selection(0, editLayer.text().length);
        
        self.activEditLayer.show();
        if ('date' === type || 'datetime' === type) {
          
          self.activEditLayer.find('input').datepicker('show').focus();
          
        } else if ('select' === type) {
          
          self.activEditLayer.find('select').focus();
          
        } else if ('check' === type) {
            
            self.activEditLayer.find('input').focus();
            
        } else {
          
          self.activEditLayer.focus();
          self.activEditLayer.bind('keyup',function(){
            if($S(this).hasScrollBar()){
              $S(this).addWidth(20);
              console.log('scrollbar');
            } else {
              console.log('no scrollbar');
            }
          });
        }


      });
        
      self.addKeyEvents(opts,el,elId);
    },
    
    /**
     * keyboard events definieren
     */
    addKeyEvents: function(opts,el,elId){
      
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
        
        alert('bin da');
        
      });
      
    },
    
    /**
     * Das Grid Element Editierbar machen
     */
    save: function(){

      var el = this.element.parent(),
        opt = this.options,
        self = this,
        editLayers = $S('.wgt-editlayer'),
        requestBody = '';
      
      if (!self.changedData){
        $D.message('nothing to save');
        return;
      }
      
      for (var key in self.changedData){
        
        if (undefined===self.changedData[key]){
          continue;
        }

        requestBody += '&'+key+'='+self.changedData[key];
      }
      
      $R.form(opt.save_form, null, {'data':self.changedData,'success':function(){
        // empty changed data
        self.changedData = {};
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
      
      var tmpStack = {};
      
      for (var prop in self.changedData) {
        // es muss geprüft werden ob prop existier
        if (self.changedData.hasOwnProperty(prop)) {
          if( !prop.indexOf('['+indexCheck+']')){
            tmpStack[prop] = self.changedData[prop];
          }
        }
      }
      this.changedData = tmpStack;
      
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
      this.changedData[name] = value;
      
    },
    
    /**
     * Leeren des Save Indexes
     */
    emptySavedata :function(  ){

      this.changedData = {};
      
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    writeCell: function(cellId, value, text){

      var cell = $S('#'+cellId),
        cellName = cell.attr('name');
      
      console.log('write cell n:'+cellName+' v: '+value+' t: '+text);
      
      this.changedData[cellName] = value;
      cell.html(text);
      cell.attr('value',value);
      cell.addClass('changed');
        
    }
 
  });
  
}(jQuery, window));

