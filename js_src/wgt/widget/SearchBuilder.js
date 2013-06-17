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
 * @author dominik alexander bonsch <db@webfrap.net>
 * @passed http://www.jshint.com
 */
(function( $S, $G, undefined ) {

  "use strict";


  $S.widget( "wgt.searchBuilder", {

    /**
     * Standard Options
     */
    options: {

      // technische Eigenschaften
      dkey: '', // Klasse für die Deklaration als Grid Element
      search_form: '', // die ID des Suchformulars
      save_service: '' // speichern einer suche
    },

    /**
     * Counter mit den erstellten Datensätzen
     * zum hochzählen
     */
    cCount: 1,

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {

      this.init();

    },//end _create

    /**
     * @param formId
     * @param element
     * @deprecated wird über wcm + forms geregelt
     */
    init: function( ){

      var el = this.element,
        o = this.options,
        self = this;
      
      // button action
      
      var addEvent = function( e, el, o, parentId, depth ){

        if(!depth)
          depth = 0;
        
        var fNode = el.find('.wd-fields :selected');
        
        // den klick ignorieren wenn keine option gefunden wurde
        // oder auf eine leere option geklick wurde
        if ( !fNode.is('option') || !fNode.attr('type') ){
          return;
        }

        var rawNode = $S('#wgt-tpl-search-'+fNode.attr('type')).text();
        rawNode = rawNode.replace( /{\$pos}/g , self.cCount);
        rawNode = rawNode.replace( /{\$dkey}/g, o.dkey);
        
        
        var newNode = $S(rawNode);
        
        newNode.find('.wa_remove_line').bind('click',function( ){
          $S(this).parent().parent().remove();
        });
        
        newNode.find('input.label').val(fNode.text());
        newNode.find('input.field').val(fNode.val());
        
        
        
        newNode.find('select.wcm_widget_selectbox').each(function(){
          $R.callAction( 'widget_selectbox', $S(this) );
        });
        
        if ( parentId ) {
          newNode.find('td:first').append('<input type="hidden" name="as['+self.cCount+'][parent]" value="'+parentId+'"  />');
          newNode.addClass('n-'+self.cCount+' '+'p-'+parentId);
        } else {
          newNode.addClass('n-'+self.cCount);
        }
        
        newNode.find(':input').addClass('fparam-'+o.search_form+' as');
        
        if( 2 === depth ){
          newNode.find('td:first').prepend('&nbsp;&nbsp;&nbsp;<i class="icon-double-angle-right" ></i>');
          newNode.find('.wa_search_add').remove();
        } else if( depth ) {
          newNode.find('td:first').prepend('&nbsp;<i class="icon-double-angle-right" ></i>');
        }
        
        var tmpCounter = 0+self.cCount,
          tempDepth = 1+depth;
        
        newNode.find('.wa_search_add').bind('click',function(e){
          addEvent(e,el,o,tmpCounter,tempDepth);
        });
        
        if ( parentId ) {
          
          if ( el.find('.p-'+parentId).length ){
            var tmpL = el.find('.p-'+parentId+':last' );
            
            if( tmpL.length ){
              var tmpId = tmpL.getActionClass('n',true,'-');
              
              if ( el.find('.p-'+tmpId).length ){
                el.find('.p-'+tmpId+':last' ).after(newNode);
              } else {
                tmpL.after(newNode);
              }
              
            }
            
          } else {
            el.find('.n-'+parentId).after( newNode );
          }
          
        } else {
          el.find('table.search-container tbody').append( newNode );
        }
        
        ++self.cCount;
        
      };
      
      el.find('.wa_add_line').bind('click',function(e){
        addEvent(e,el,o);
      });
      
      el.find('.wa_save_filter').bind('click',function(e){
        self.saveSearch();
      });
      
      el.find('.wa_reset_filter').bind('click',function(e){
        self.resetFilter();
      });
      
    },//end this.search 
    
    /**
     * Setzen des Counter Values
     * Wir später für save & load benötigt
     * @param  val int
     */
    setCounter: function( val ){

      this.cCount = val;

    },//end setCounter
    
    /**
     * Setzen des Counter Values
     * Wir später für save & load benötigt
     * @param  val int
     */
    reset: function( ){

      this.cCount = 1;

    },//end setCounter
    
    /**
     * Aufbauen des Suchformulars aus einem Save String
     * @param  val int
     */
    buildEntriesByData: function( struct ){

    },//end buildEntriesByData
    
    /**
     * Speichern der Suche
     */
    saveSearch: function( ){
      
      var opts = this.options;
      
      $R.form(opts.search_form, opts.save_service,{'method':'post'});
      
    },//end saveSearch
    
    /**
     * Speichern der Suche
     */
    resetFilter: function( ){
      
      var el = this.element;  
      
      el.find('table.search-container tbody').replace('<tbody />');
      el.find('input.filter_name').val('');
      
    },//end resetFilter

    /**
     * @param formId
     * @param element
     * @deprecated wird über wcm + forms geregelt
     */
    search: function( formId, element ){

      $S('form#'+formId).data('qsize',$S(element).val());
      $S('form#'+formId).data('start',0);

      $R.form(formId);

    }//end this.search

  });


}( jQuery, window ) );

