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

    }//end startEditMode 
 
  });
  
}( jQuery, window ) );

