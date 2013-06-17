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
 */
(function( $S, $G, undefined ) {

  "use strict";

  $S.widget( "wgt.kvList", {


    /**
     * Standard Options
     */
    options: {

      // Eigenschaften für die Suchleiste
      search_able: false,     // flag ob die Einträge selektiert werden können
      search_form: null,      // ID des Suchformulars / Paging / Datenquelle
      
      // Editierbare Cells im Grid
      save_form: null,        // ID des Save Formulars bei editierbaren Tabellen
      srv_insert: null,       // Url für insert
      srv_edit: null,         // Url für edit
      srv_delete: null,       // Url für delete
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
     * Setup / Constructor methode des Widgets
     */
    _create: function() {

      var self = this;

      this.element.appear(function(){
        self.buildList( self.element );
      });

    },//end _create

    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    buildList: function( el ){
        
      this.startEditMode();
      this.setDelEvents( el );
      this.setCreateEvents();

    },//end buildList

    /**
     * Das Grid Element Editierbar machen
     */
    startEditMode: function(){

      var opts = this.options, 
        el = this.element,
        elId = this.element.attr('id'),
        self = this,
        editLayers = $S('.wgt-editlayer');

      el.find('ul.content').bind('click.edit_list', function(e){

        var cTarget =  $S(e.target);
        
        // wenn innerhalb des edit layers
        if (self.activEditLayer && cTarget.parentX(self.activEditLayer)){
          return;
        }
        
        editLayers.trigger('blur');
        
        // prüfen ob das feld überhaupt editierbar ist
        if (!(cTarget.is('.editable'))){
          //editLayers.trigger('blur');
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
        
        //console.log('#wgt-edit-field-'+type);
        self.activEditLayer = $S('#wgt-edit-field-'+type);
        
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

        if ('date' === type || 'datetime' === type  ){
          
          self.activEditLayer.find('input').val(cTarget.html());
          
        } else if ('select' === type) {
          
          self.activEditLayer.html($S('#'+cTarget.attr('data_source')).text());
          
          if(!self.activEditLayer.find('option[value="'+cTarget.attr('value')+'"]').length){
            self.activEditLayer.find('select').append('<option value="'+cTarget.attr('value')+'" >'+cTarget.text()+'</option>');
          }
          
          self.activEditLayer.find('select').val(cTarget.attr('value'));
          
        }
        else{
          
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
        $S('#wbf-body').bind('mousedown.editable_list',function(e){
            
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
          $S('#wbf-body').unbind('mousedown.editable_list');
          
          var userInp = '', 
            displTxt = '',
            fieldName = '';
          
          if ('date' === type || 'datetime' === type) {
            
            displTxt = userInp = self.activEditLayer.find('input').val();
          
          } else if ('select' === type) {
            
            userInp = self.activEditLayer.find('select').val();
            displTxt = self.activEditLayer.find('select option:selected').text();
            
          } else {
            
            displTxt = userInp = self.activEditLayer.text();
          }
          
          if (undefined !==self.changedData[fieldName] && self.changedData[fieldName] === userInp)
            return;
        
          cTarget.html(displTxt);
          cTarget.addClass('changed');
          cTarget.attr('value',userInp);
          fieldName = cTarget.attr('name');
          self.changedData[fieldName] = userInp;
       
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
          
        } else {
          
          self.activEditLayer.focus();
        }


      });

    },
    
    /**
     * Setzen der Delete Events
     */
    setDelEvents: function( el ){
      
      var delEvent = this._eventDelete,
        opts = this.options;
      
      el.find('.kvlac_del').not('init').bind('click',function(){
        
        var pX = $S(this).parentX('li'),
          eid = pX.attr('eid');
        
        if (eid) {
          $R.del(opts.srv_delete+pX.attr('eid'));
        }
        
        pX.remove();
      }).addClass('init');
      
    },

    /**
     * Erstellen der Create Events
     */
    setCreateEvents: function(){
      
      var el = this.element,
        opts = this.options,
        self = this;
      
      el.find('ul.wgt-list.editor input.inp_label').bind('change',function(){
        
        var tplNode,
        tmpRowId,
        newName,
        inp = $S(this);
        
        tplNode = el.find('ul.wgt-list.editor li.template').clone();
        tplNode.removeClass('template')
          .find('span.editable').text(inp.val());
        
        tplNode.find('.kvlac_del').bind('click',function(){
          
          var pX = $S(this).parentX('li'),
            eid = pX.attr('eid');
          
          if (eid) {
            $R.del(opts.srv_delete+pX.attr('eid'));
          }
          
          pX.remove();
        });
        
        tmpRowId = tplNode.attr('id');
        
        if (tplNode) {
          tplNode.attr('id', tmpRowId.replace('{$new}','new-'+self.cCount));
        }

        tplNode.find('.editable,input').each(function(){
          
          var tmpNd = $S(this);
          
          newName =  tmpNd.attr('name').replace('{$new}','new-'+self.cCount);
          tmpNd.attr('name', newName );
          
          if (tmpNd.is('input')) {
            tmpNd.addClass('asgd-'+opts.save_form);
          }
          
        });
        
        newName = tplNode.find('span.editable').attr('name');

        
        self.changedData[newName] = inp.val();
        
        // hinzufügen von default values, z.B in referenzen
        if (opts.edit_hidden_def_values){
          for (var defValName in opts.edit_hidden_def_values) {
            if (opts.edit_hidden_def_values.hasOwnProperty(defValName)) {
              self.changedData[defValName.replace('{$new}','new-'+self.cCount)] = opts.edit_hidden_def_values[defValName];
            }
          }
        }
        ++self.cCount;
        
        el.find('ul.wgt-list.content').prepend(tplNode);
        
        $S(this).val('');

        
      });
      
    },
    
    /**
     * Das Grid Element Editierbar machen
     */
    save: function(){

      var el = this.element,
        opt = this.options,
        self = this,
        editLayers = $S('.wgt-editlayer'),
        requestBody = '';
      
      if (!self.changedData && !$S('.asgd-'+opt.save_form.length) ){
        $D.message('nothing to save');
        return;
      }
      
      for (var key in self.changedData){
        
        if (undefined===self.changedData[key]){
          continue;
        }

        requestBody += '&'+key+'='+self.changedData[key];
      }
      
      console.log("save form "+opt.save_form);
      
      $R.form(opt.save_form, null, {'data':self.changedData,'success':function(){
        // empty changed data
        self.changedData = {};
      }});
      
      this.element.find('.editable.changed').removeClass('changed');
      
      //alert('changed: '+requestBody);
    },
    
    /**
     * In eine Zelle und gleichzeitig den changedData array schreiben
     */
    writeCell: function(cellId, value, text){

      var cell = $S('#'+cellId),
        cellName = cell.attr('name');

      self.changedData[cellName] = value;
      cell.html(text);
      cell.attr('value',value);
      cell.addClass('changed');
        
    },

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
    }//end destroy


  });


}( jQuery, window ) );

