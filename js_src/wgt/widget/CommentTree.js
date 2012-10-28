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
 * 
 * Comment Tree Widget
 * 
 * @passed http://www.jshint.com
 */
(function( $S ) {
  
  "use strict";

  $S.widget( "wgt.commentTree", {


    /**
     * Standard Options
     */
    options: { 
      // technische Eigenschaften
      c_class: 'wgt-comment_tree', // css klasse des Tag containers
      t_class: 'comment',           // css klasse auf dem tag
      
      refid:   null,            // css klasse auf dem tag

      url_delete: null,
      
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
          el   = this.element;

      opts.domainKey = el.attr('wgt_key');
      opts.refId = el.attr('wgt_refid');

      this.initFormEvents( el, opts );
      
    },
    
    initFormEvents: function( el, opts ){
      
      var 
        self = this,
        cntrl = el.find( '#wgt-input-commenttree-'+opts.domainKey+'-cntrl-'+opts.refId );

      cntrl.bind( 'click.commenttree', function(){

        $R.form( 'wgt-form-commenttree-'+opts.domainKey+'-'+opts.refId );

        self.resetFormInputs();
      });
      
    },

    addEntryEvents: function( jNode ){

      var 
        cntrlNode = jNode.find('.cntrl'),
        answerNode = jNode.find('.answer'),
        citateNode = jNode.find('.citate'),
        rateNode = jNode.find('.rate'),
        editNode = jNode.find('.edit'),
        deleteNode = jNode.find('.delete'),
        opts = this.options,
        el = this.element;

        var urlPre = '#wgt-input-commenttree-'+opts.domainKey;

        if( answerNode.length ){
          answerNode.bind( 'click', function(){

            $S( urlPre+'-parent-'+opts.refId ).val( jNode.attr('wgt_eid') );
            $S( urlPre+'-rowid-'+opts.refId ).val( '' );
            $S( urlPre+'-comment-'+opts.refId ).val( "" );
            $S( urlPre+'-title-'+opts.refId ).val( 'Re: '+jNode.find('h3').text() ).focus();
            
          });
        }

        if( citateNode.length ){
          citateNode.bind( 'click', function(){

            $S( urlPre+'-parent-'+opts.refId ).val( jNode.attr('wgt_eid') );
            $S( urlPre+'-rowid-'+opts.refId ).val( '' );
            $S( urlPre+'-comment-'+opts.refId ).val( "<i>"+jNode.find('.content').text()+"</i>" );
            $S( urlPre+'-title-'+opts.refId ).val( 'Re: '+jNode.find('h3').text() ).focus();

          });
        }

        if( editNode.length ){
          editNode.bind( 'click', function(){

            $S( urlPre+'-parent-'+opts.refId ).val( '' );
            $S( urlPre+'-rowid-'+opts.refId ).val( jNode.attr('wgt_eid') );
            $S( urlPre+'-comment-'+opts.refId ).val( jNode.find('.content').text() );
            $S( urlPre+'-title-'+opts.refId ).val( jNode.find('h3').text() ).focus();

          });
        }

        if( deleteNode.length ){
          deleteNode.bind( 'click', function(){

            $R.del( opts.url_delete+'&objid='+jNode.attr('wgt_eid') );
            el.find('.comment-'+jNode.attr('wgt_eid')).remove();

          });
        }

        

        //wgt-input-commenttree-{$id}-title-{$this->refId}
    },

    resetFormInputs: function(){
      this.element.find( '.asgd-wgt-form-commenttree-'+this.options.domainKey+'-'+this.options.refId ).not('.static').val('');
    },
    
    disconnect: function( tNode ){
      
      return $R.del( this.options.url_tag_disconnect+'&objid='+tNode.attr('wgt_eid')+'&tagid='+tNode.attr('wgt_tid') ).data;
    }

  });

}( jQuery ) );

