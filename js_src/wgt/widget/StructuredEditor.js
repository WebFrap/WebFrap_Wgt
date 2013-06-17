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
 * @author dominik alexander bonsch <dominik.bonsch@webfrap.net>
 * 
 * 
 * 
 */
(function( $S ) {

  $S.widget( "wgt.tagCloud", {


    /**
     * Standard Options
     */
    options: { 
      // technische Eigenschaften
      c_class: 'wgt-tag_cloud', // css klasse des Tag containers
      t_class: 'tag',           // css klasse auf dem tag
      
      url_auto_complete: null,  // url für tag autocompletion
      url_tag_create: null,     // url zum erstellen und verknüpfen eines neuen tags
      url_tag_append: null,     // url zum verknüpfen eines bereits existierende Tags
      url_tag_disconnect: null, // url zum löschen einer Tag verknüpfung
      
      call_tag_delete: function(){}, // callback welcher on tag delete aufgerufen wird
      call_tag_click: null
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {

      this.initEvents();
      
      return this;

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    initEvents: function(){

      var self = this,
          opts = this.options,
          el   = this.element,
          cont   = this.element.find('.content'),
          tags = this.element.find( '.'+opts.t_class );
        
      
      if( !el.hasClass( opts.c_class ) )
        el.addClass( opts.c_class );

      this.bindTagEvent( tags, opts );
      this.initAddTagInput( el, opts, cont );
      
    },
    
    initAddTagInput: function( el, opts, cont ){
      
      var self = this;
 
      el.find('.c_input_add').change(function(){
        var inp = $S(this);
        cont.append('<span class="tag new" >'+inp.val()+'</span>');
        
        var newTags = cont.find('.new')
        self.bindTagEvent( newTags, opts );
        newTags.removeClass('new');
        inp.val('');
      });
    },
    
    bindTagEvent: function( tagNodes, opts ){
      
      tagNodes.bind( 'mouseover.tag', function( e ){
        var tNode = $S(this);
        $S('#wgt-tag-control').remove();
        tNode.append( ' <button id="wgt-tag-control" class="wgt-button"  ><img src="'+$C.iconClose+'" alt="Close" /></button>' );
        $S('#wgt-tag-control').click( function(){
          opts.call_tag_delete();
          tNode.remove();
        });

      }).bind( 'mouseout.tag', function( e ){

      }).removeClass('new');

    },
    
    loadAutocomplete: function(){
      
    }
    
  });

}( jQuery ) );

