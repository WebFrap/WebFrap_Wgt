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
 * Take from the jquery ui examples
 */
(function( $S, $G ){
  
  "use strict";
  $S.widget( "wgt.dblListSelector",{
    
    // These options will be used as defaults
    options: { 
      refid : null,
      url_connect : null,
      url_disconnect  : null
    },
 
    
    _create : function(){
      
      var el = this.element,
        opts = this.options;
      
      /*
      if( !opts.url_connect  )
        el.find( "ul.in" ).removeClass('dbl_list');
      
      if( !opts.url_disconnect  )
        el.find( "ul.out" ).removeClass('dbl_list');
      */

      el.find( "ul.out, ul.in" ).sortable({
        
        /**
         * markieren worauf gedroppt werden kann
         */
         connectWith: ".dbl_list",
         
        /**
         * the remove event
         */
         items: "li:not(.ui-state-disabled)",

         /**
         * the remove event
         */
         receive: function( event, ui) {
           
           var inpData;

           if( $S(ui.sender).find('li').length === 0  ){
             
             $S(ui.sender).append('<li class="ui-state-disabled" >no entries...</li>');
           }
           
           if( $S(this).find('.ui-state-disabled').length !== 0   ){
             
             $S(this).find('.ui-state-disabled').remove();
           }

           if( $S(this).is('.in') ){
             
             inpData = ui.item.find('input').serialize();
             $G.$R.post( opts.url_connect+'&refid='+opts.refid , inpData );
             ui.item.find('input').removeClass('wgt-ignore');

             el.find( "ul.in li,ul.out li" ).removeClass('ui-state-highlight');
             
           }
           else {
             
             inpData = '&'+ui.item.find('input').serialize();
             $G.$R.del( opts.url_disconnect+'&refid='+opts.refid+inpData  );
             
             ui.item.find('input').addClass('wgt-ignore');

             el.find( "ul.out li,ul.in li" ).removeClass('ui-state-highlight');
           }
           

         }
             
       }).disableSelection();
       
       // die list elemente selectierbar machen
       el.find( "ul li" ).each(function(){

         $S(this).mousedown(function(){
           $S(this).toggleClass('ui-state-highlight');
         });
       });
       
       
       // in nur wenn connect vorhanden ist
       if( opts.url_connect ){
         
         /**
          * Action all in
          */
         el.find( "button.all_in" ).click(function(){
           
           var allEntries = el.find( "ul.out li:not(.ui-state-disabled)" );
           var inpData = allEntries.find('input').serialize();
           
           el.find( "ul.in" ).append( allEntries );
           el.find( "ul.in input" ).removeClass('wgt-ignore');
           el.find( "ul.in li.ui-state-disabled" ).remove();
           el.find( "ul.in li" ).removeClass('ui-state-highlight');
           
           $G.$R.post( opts.url_connect+'&refid='+opts.refid , inpData );
           
           if( el.find( "ul.out li" ).length === 0 ){
             el.find( "ul.out" ).append('<li class="ui-state-disabled" >no entries...</li>');
           }
           
         }).addClass('ui-icon ui-icon-arrowthickstop-1-e');
  
         /**
          * Only selected in
          */
         el.find( "button.seleted_in" ).click(function(){
           
           var entries = el.find( "ul.out li.ui-state-highlight:not(.ui-state-disabled)" );
           
           if( !entries.length ){
             return;
           }
           
           var inpData = entries.find('input').serialize();
           
           $G.$R.post( opts.url_connect+'&refid='+opts.refid , inpData );
           
           el.find( "ul.in" ).append( entries );
           el.find( "ul.in input" ).removeClass('wgt-ignore').removeClass('ui-state-highlight');
           el.find( "ul.in li.ui-state-disabled" ).remove();
           el.find( "ul.in li" ).removeClass('ui-state-highlight');
           
           
           if( el.find( "ul.out li" ).length === 0 ){
             el.find( "ul.out" ).append('<li class="ui-state-disabled" >no entries...</li>');
           }
         });
       }

       // in nur wenn disconnect vorhanden ist
       if( opts.url_disconnect ){
         
         /**
          * Action all out
          */
         el.find( "button.all_out" ).click(function(){
           
           var allEntries = el.find( "ul.in li:not(.ui-state-disabled)" );
           var inpData = '&'+allEntries.find('input').serialize();
           
           el.find( "ul.out" ).append( allEntries );
           el.find( "ul.out input:not(.wgt-ignore)" ).addClass('wgt-ignore').removeClass('ui-state-highlight');
           el.find( "ul.out li.ui-state-disabled" ).remove();
           el.find( "ul.out li" ).removeClass('ui-state-highlight');
           
           $G.$R.del( opts.url_disconnect+'&refid='+opts.refid+inpData );
           
           if( el.find( "ul.in li" ).length === 0 ){
             el.find( "ul.in" ).append('<li class="ui-state-disabled" >no entries...</li>');
           }
           
         });
         
         /**
          * Only selected out
          */
         el.find( "button.seleted_out" ).click(function(){
           
           var entries = el.find( "ul.in li.ui-state-highlight:not(.ui-state-disabled)" );
           if( !entries.length ){
             return;
           }
           
           var inpData = '&'+entries.find('input').serialize();
           
           el.find( "ul.out" ).append( entries );
           el.find( "ul.out input:not(.wgt-ignore)" ).addClass('wgt-ignore').removeClass('ui-state-highlight');
           el.find( "ul.out li.ui-state-disabled" ).remove();
           el.find( "ul.out li" ).removeClass('ui-state-highlight');
           
           $G.$R.del( opts.url_disconnect+'&refid='+opts.refid+inpData );
           
           if( el.find( "ul.in li" ).length === 0 ){
             el.find( "ul.in" ).append('<li class="ui-state-disabled" >no entries...</li>');
           }
           
         });
         
       }
      
    },
  
    destroy : function(){
  
      $S.Widget.prototype.destroy.call(this);
    }
            
  });
  
})(jQuery,window);
