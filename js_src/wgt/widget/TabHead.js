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
 * Tab Head Implementierung
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S, $WGT ) {
  
  "use strict";

  $S.widget( "wgt.tabHead", {
 
    
    // These options will be used as defaults
    options: { 
      align         : 'right',
      triggerEvent  : 'click'
    },

    /**
     * Die Contentbox
     */
    contentBox: null,
 

    // Set up the widget
    _create: function() {

      this.init();

    },

    // Set up the widget
    init: function(  ){
        
      var el = this.element,
        self = this;

      var ctbId = el.attr('wgt_body');
      var ctB = $S('#'+ctbId);
      this.contentBox = ctB;
      
      if( !el.find( 'a.tab' ).length  ){
        
        var tabhead = el.find('.tab_head');
        
        ctB.find( '.container' ).each(function(){
          var contCon = $S(this);
          tabhead.append( '<a class="tab wgt-corner-top" wgt_key="'+contCon.attr('wgt_key')+'" >'+contCon.attr('title')+'</a>' );
        });
        
      }

      // das tabbing event
      el.find( 'a.tab' ).bind( 'click.tab_head', function(){

        var tabNode = $S(this);
        self.activateTab( tabNode.attr('wgt_key') );

      });
      
      el.find( 'a.tab' ).each( function(){
        $S(this).addClass('tab_'+$S(this).attr('wgt_key'));
      });
        
      el.find('.tab_overflow button').dropdown( {align:'right'} );
      
      var activeTab = el.find( 'a.tab.active:first' );
      if( activeTab.length ){
        this.activateTab( activeTab.attr('wgt_key') );
      }
      else{
        this.activateTab( el.find( 'a.tab:first' ).attr('wgt_key') );
      }


    },//end init: function
    

    // Set up the widget
    open: function(  ){

     

    },//end open: function

    // Set up the widget
    handleOverflow: function(  ){

      var el = this.element,
        self = this,
        hiddenTabs = {},
        allTabWidth = 0;

      var headSize = el.innerWidth()-5;
      var tabHeadSize = el.innerWidth()-30;
      
      var activeTab = el.find( 'a.tab.active' );
      activeTab.show();
      allTabWidth += activeTab.outerWidth( )+3;

      el.find( 'a.tab' ).not('.active').each( function(){
        
        var actTab = $S(this);
        allTabWidth += actTab.outerWidth( )+3;
        
        //console.log( "tab "+actTab.attr('wgt_key')+" width "+allTabWidth+' > '+tabHeadSize +' '+(actTab.outerWidth( )+3) );
        
        if( tabHeadSize < allTabWidth ){
          hiddenTabs[actTab.attr('wgt_key')] = actTab;
          actTab.hide();
        }
        else{
          actTab.show();
        }
        
      });

      if( headSize < allTabWidth ){

        var oOFl = el.find('.tab_overflow');
        
        var oOFlMenu = $S( '#'+oOFl.find('button').attr('wgt_drop_box')+'-init ul' ) ;
        var oTh = el.find('.tab_head').not('.hidden');// keine versteckten tab heads verwenden
        var oOFlw = oOFl.outerWidth();

        oTh.width( headSize - oOFlw  );

        oOFlMenu.find('li').remove();

        for( var tabKey in hiddenTabs ) {
          
          var newTabEntry = $S('<li><a class="'+tabKey+'" wgt_tab="'+tabKey+'" >'+hiddenTabs[tabKey].html()+'</a></li>');

          oOFlMenu.append( newTabEntry );
          oOFlMenu.find('a.'+tabKey).bind( 'click', function(){
            //self.activateTab( ''+tabKey );
            self.activateTab( $S(this).attr('wgt_tab') );
            $S('.wgt-dropdownbox.opened').removeClass('opened').hide();
          });
          
        }
   
        
        oOFl.show();
      }

      //console.log( 'headSize '+headSize+' allTabWidth '+allTabWidth ) ;

    },//end handleOverflow: function
      
    /**
     * Den Index eines Tabs über die ID auslesen
     * @param tabId string
     * @return int
     */
    getTabIndex: function( tabId ){
      
      return this.element.find( 'a.tab' ).index( this.element.find( 'a.tab_'+tabId ) );
    },//end getTabIndex: function
    
    /**
     * Die TabId über den Index auslesen
     */
    getIdByIndex: function( idx ){
      
      return $S(this.element.find( 'a.tab' ).get(idx)).attr('wgt_key');
    },//end getIdByIndex: function
    
    /**
     * Einen Tab Löschen
     */
    addTab: function( tabData ){
        
      var el = this.element,
        self = this;
      
      var tabHead = $S('.tab_head'); 
      var tabHeadCode = '<a wgt_key="'+tabData.key+'" class="tab tab_'+tabData.key+' wgt-corner-top" >'+tabData.label+'</a>';
      var tabContentCode = '<div class="container" wgt_key="'+tabData.key+'" id="'+this.contentBox.attr('id')+'-'+tabData.key+'">'+tabData.content+'</div>';
      
      tabHead.append( tabHeadCode );
      
      // das tabbing event
      el.find( 'a.tab.tab_'+tabData.key ).bind( 'click.tab_head', function(){

        var tabNode = $S(this);
        self.activateTab( tabNode.attr('wgt_key') );

      });
      
      this.contentBox.append( tabContentCode );
      this.activateTab( tabData.key );
      
    },//end addTab: function
    
    /**
     * Einen Tab Löschen
     */
    removeTab: function( tabId ){
        
      var el = this.element,
        nextActiveId = null;
      
      var tabIndex = this.getTabIndex( tabId ); 

      el.find( 'a.tab_'+tabId ).remove();
      $S('#'+this.contentBox.attr('id')+'-'+ tabId ).remove();
      
      if( 0 == tabIndex ){
        nextActiveId = this.getIdByIndex(tabIndex);
      }
      else{
        nextActiveId = this.getIdByIndex((tabIndex-1));
      }
      
      this.activateTab( nextActiveId );

    },//end removeTab: function
    
    /**
     * Einen versteckten Tab sichtbar machen
     */
    activateTab: function( tabId ){
      
      var el = this.element;
      
      var newActTab = el.find( 'a.tab_'+tabId );
      
      // events von disabled tags ignorieren
      if( newActTab.hasClass('disabled') ){
        return false;
      }
      
      el.find( 'a.tab.active' ).removeClass('active');
      
      this.contentBox.find('>div.container').hide();
      $S('.'+this.contentBox.attr('id')).hide();
      
      //console.log( 'tab activate #'+this.contentBox.attr('id')+'-'+ tabId+',.'+this.contentBox.attr('id')+'.box-'+tabId );
      $S('#'+this.contentBox.attr('id')+'-'+ tabId+',.'+this.contentBox.attr('id')+'.box-'+tabId ).show();
      newActTab.addClass('active').show();
      
      var loadUrl = newActTab.attr('wgt_load');
      if( loadUrl ){
        newActTab.removeAttr('wgt_load');
        $R.get( loadUrl, {async:true} );
      }
        
      
      this.handleOverflow();
      
    },//end activateTab: function
    
    /**
     * Einen Tab verschieben
     */
    moveTab: function( tabId, newIndex ){

    },//end moveTab: function
    
    /**
     * Einen Tab im head verstecken
     */
    hideTab: function( tabId ){
      
      this.element.find( 'a.tab_'+tabId ).addClass('hidden').removeClass('active').hide();
      this.handleOverflow();
      
    },//end hideTab: function
    
    /**
     * Einen Tab im head verstecken
     */
    showTab: function( tabId ){
      
      this.element.find( 'a.tab_'+tabId ).removeClass('hidden').show();
      this.handleOverflow();
      
    },//end showTab: function
    
    /**
     * Einen Tab aktivieren & klickbar machen
     */
    enableTab: function( tabId ){
      
      this.element.find( 'a.tab_'+tabId ).removeClass('disabled');
    },//end enableTab: function
    
    /**
     * Einen Tab deaktivieren
     * klick triggert keine action
     */
    disableTab: function( tabId ){
      
      this.element.find( 'a.tab_'+tabId ).addClass('disabled');
    },//end disableTab: function

    /* 
     * Use the destroy method to clean up any modifications your 
     * widget has made to the DOM
     */
    destroy: function() {

      $S.Widget.prototype.destroy.call( this );
    }

  });

}( jQuery, $WGT ) );

