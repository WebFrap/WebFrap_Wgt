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
  
      // Editierbare Cells im Grid
      save_form: null,        // ID des Save Formulars bei editierbaren Tabellen
      edit_able: false,       // Flag ob
      allow_insert: false    // Sollen neue Datensätze angelegt werden können
      
    },

    /**
     * Das Grid Element Editierbar machen
     */
    startEditMode: function( jHeadTab ){

      var el = this.element.parent(),
        self = this,
        editLayers = $S('.wgt-editlayer');
      
      console.log("start editmode");
      
      jHeadTab.find('table').append(el.find('tbody.editor'));

      el.parent().click(function( e ){

        var cTarget =  $S(e.target);
        
        if( !(cTarget.is('td') && !cTarget.is('.pos,.ro,.nav,.sort')) ){
          editLayers.trigger('blur');
          editLayers.unbind('blur');
          editLayers.hide();
          return;
        }

        var ofs = cTarget.offset(),
          oW  = cTarget.outerWidth(),
          oH  = cTarget.outerHeight(),
          type = $G.$WGT.getClassByPrefix( cTarget.prop('class'), 'type_' );
        
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
        else if( 'select' === type ){
          editLayer.find('select').val(cTarget.text());
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
            
            } else if('select'===type) {
              
              userInp = editLayer.find('select').val();
              
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
            
            el.find('tbody:first').prepend(tplRow);
              self.makeSelectable(el);
 
          } else {
              
            if( 'date' === type ){
              
              userInp = editLayer.find('input').val();
            
            } else if( 'select' === type ){
              
              userInp = editLayer.find('select').val();
              
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
    }
 
  });
  
}( jQuery, window ) );

