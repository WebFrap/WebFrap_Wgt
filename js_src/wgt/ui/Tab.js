/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 *
 */
;(function($UI,undefined){
/*
 * ////////////////////////////////////////////////////////////////////////////// //
 * First extend UI
 * //////////////////////////////////////////////////////////////////////////////
 */
  
/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
  $UI.fn.tab = {

    create: function( containerId, params ){

      var $sCont = $S('#'+containerId);
        
      if( undefined != $sCont ){
        var cont = new tabContainer( containerId, params );
        
        $sCont.data('wgt-tab_cont-obj',cont);
        return cont;
      }
      else{
        $D.message.error('Internal Error');
        $D.console('Tried to create a tabcontainer for a nonexisting id: '+containerId);
        return null;
      }

    },
  
    init: function( containerId, settings ){
        
      try{
        
        var $sCont = $S('#'+containerId);
        // alert(containerId);
        if( undefined !== $sCont ){
          
          var cont = new WgtTabContainer( containerId, settings );
          $sCont.data('wgt-tab_cont-obj',cont);
          
          if( !cont.hasTabs() ){
            
            cont.setNoTabs();
            cont.addMenuButton();
            
          }
          else{
            
            cont.loadTabs();
            cont.appendTabbingEvents();          
            cont.addResizeEvent();
            cont.addMenuButton();
            cont.setActiv(0);
            cont.addScrolling();
          }
  
          return cont;
          
        }
        else{
          
          $D.message.error(' Internal Error' );
          $D.console( 'Tried to create a tabcontainer for a nonexisting id: '+containerId );
          return null;
          
        }
        
      }
      catch( err ){
        //alert( err.description );
      }
    },
  
    get: function( containerId ) {
      
      return $S('#'+containerId).data('wgt-tab_cont-obj');  

    },
      
    add: function( containerId, tabData ) {
      
      try {
        
        var cnt = $UI.tab.get(containerId);
        var tabIndex = cnt.addTab(tabData);
        cnt.appendTabbingEvents();
        cnt.setActiv( tabIndex );
        cnt.addScrolling();
        
      }
      catch( err ) {
        console.log( err.description );
      }

    },
    
    remove: function( containerId, tabId ) {
      var cnt = $UI.tab.get(containerId);
      cnt.removeTab(tabId);
      cnt.removeScrolling();
    },
    
    removeonadd: function( containerId, tabId ) {
      var cnt = $UI.tab.get(containerId);
      cnt.removeTabOnAdd(tabId);
      cnt.removeScrolling();
    },
    // tab entfernen wenn er existiert
    removeIfExists: function( containerId, tabId ) {
      var cnt = $UI.tab.get(containerId);
      
      if( cnt.tabExists( tabId ) ){
        console.log( 'Remove TAB '+tabId+' first' );
        cnt.removeTab( tabId );
        cnt.removeScrolling();
      }
    },
    
    render: function( _containerId ) {
      cnt = $UI.tab.get( _containerId );
    },
    
    parentTab: function( _node ) {
      
      var pTab = _node.parentX('.wgt-maintab'); 
      
      if( !pTab )
        return null;
      
      return pTab.data('wgt-tab-obj');
      
    }
      
  };// end WgtUi.prototype.tab
  
   
/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
  function WgtTabContainer( tabId, _settings ){

    /**
     * @param string
     */
    var container   = $S('#'+tabId),
    
    /**
     * head container
     * 
     * @param string
     */
    headContainer = $S('#'+tabId+'-head'),
    
    /**
     * head container
     * 
     * @param string
     */
    bodyContainer = $S('#'+tabId+'-body'),

    /**
     * @param string
     */
    contId = tabId,
     
    /**
     * @param tabs
     */
    tabs = new Array(),

    /**
     * @var settings Settings
     */
    settings = $S.extend(
      {},
      {"reFocus":true},
      _settings
    ),

    /**
     * @param string
     */
    self = this,
    
    /**
     * 
     */
    clicked = [];

    console.log( "refocus "+settings.reFocus );
     
    // constructor block

    if( !headContainer.length )
      headContainer = container.find('.wgt_tab_head').first();
    
    if( !bodyContainer.length )
      bodyContainer = container.find('.wgt_tab_body').first();
    
    // Methodes
     
    /**
     * @lang de:
     * 
     * Methode zum erstellen der Tabs
     * 
     */
    this.loadTabs = function(){

      // check if there is allready a tabcontainer
      // if not load from template
      if( !headContainer.find(".wgt-container-controls").length ){
        self.appendTabHead();
      }
      
      // New Style Tabs
      bodyContainer.find('div.wgt_tab').each(function( ) {

        var tabObj   = $S(this);

        // only use tabs that have the tabid as class
        if( !tabObj.hasClass(contId) )
          return;

        tabObj.addClass('wgt_tab_content');

        var tabData  = {};
        
        tabData.text = '';
        var tabIcon = tabObj.attr("wgt_icon");
        if( tabIcon )
          tabData.text += '<img alt="'+tabObj.attr("title")+'" src="'+$C.WEB_ICONS+tabIcon+'" /> ';
        
        tabData.text += tabObj.attr("title");
        
        // das title attribute entfernen, sonst nervt der browser mit den titles
        tabObj.removeAttr("title");
        
        // flags laden
        tabData.disabled  = tabObj.hasClass('tab_disabled');
        tabData.closeable = tabObj.hasClass('tab_close_able');
        
        
        tabData.id = tabObj.prop("id");

        console.log( 'TAB id '+tabData.id );

        // if there is a on
        if( tabObj.find("a.wgt_ref").is("a.wgt_ref") ){
          tabData.initLoad = tabObj.find("a.wgt_ref").prop('href');
        }

        self.addTab( tabData );
       

      });
      
    };// end this.loadTabs
    
    /**
     * Prüfen ob es überhaupt Tabs im Container gibt
     * Nötig für Elemente die Standardmäßig einen Tabcontainer haben
     * wie Maintabs oder Subwindows
     */
    this.hasTabs = function(){

      //alert( 'length '+bodyContainer.find('div.wgt_tab').length );
      
      // New Style Tabs
      if( bodyContainer.find('div.wgt_tab').length > 0 )
        return true;
      else
        return false;

    };// end this.hasTabs
    
    /**
     * Das Element hat keine Tabs, also kann der outercontainer entfernt werden
     */
    this.setNoTabs = function(){
        
      headContainer.find('.tab_outer_container').remove();

    };// end this.setNoTabs
    
    /**
     * 
     */
    this.addMenuButton = function() {
      
      headContainer.find('.tab_outer_container .tab_left, .tab_outer_container .tab_right').remove();
      
      var num_hidden = 0;
      var newimg = $S("<div/>", {
        "class": "tab_nav ui-corner-top",
        style: "position:absolute;right:5px;cursor:pointer;margin:2px;width:32px;height:22px;",
        click: function(){ 
          
          var menuItems = [];
         
          headContainer.find(".tab_container .tab_hidden").each(function(){
            
            var click = "$S('#"+$S(this).prop('id')+"').find('a').click();";
            num_hidden ++;         
            var name = "<b>"+$S(this).find('a').html()+"</b>";
            menuItems.push({
              caption: name,
              onClickLink: click
            });

          });

          $S(this).menuSelector1({
            overlayStyle:{},
            menuItems   : menuItems
          });
       
          
        },
        mouseover: function(){
          $S(this).addClass('ui-state-highlight');
        },
        mouseout: function(){
          $S(this).removeClass('ui-state-highlight');
        }
      });
      var span = $S("<span style='position:relative; color:#2E6E9E; top:0px;left:-1px'>>></span>");
      var label = $S("<label style='position:relative; color:#2E6E9E; top:10px;left:-1px'>"+num_hidden+"</label>");
      newimg.append(span);
      newimg.append(label);  
      headContainer.find('.tab_outer_container').append(newimg);

    };//end this.addMenuButton 

    
    /**
     * append a tab head to the tab body by using the default template
     */
    this.appendTabHead = function(  ){
      
      var tabHead = $D.getTemplate('wgt_template_tab_container');
      // container.find('.wgt_tab_head').append(tabHead.html());
      headContainer.append( tabHead.html() );
        
    };// end this.appendTabHead */
   
    /**
     * Dem Container einen neuen Tab hinzufügen
     * 
     * @param tab object
     *   id:
     *   text:
     *   closeable:
     *   disabled:
     *   content:
     *   script:
     *   
     * @return int the index of the new tab
     */
    this.addTab = function( tab ){
      
      var newTab = $S('#'+contId+"_tab_"+tab.id);

      if( newTab.length ){
        
        $UI.tab.removeonadd(contId,tab.id);

      }

      var tab_size = tabs.length;
      tabs[tab_size] = tab;
      
      newTab = $S($D.getTemplate('wgt_template_tab_head').html());
      
      var tabLink = newTab.find( "a" );

      tabLink.html(tab.text);
      newTab.prop( "id", contId+"_tab_"+tab.id );
      
      tabLink.addClass( "wgt_tabkey_"+tab.id );

      if( tab.initLoad != undefined  ){
        tabLink.prop('href',tab.initLoad);
      }
      
      // dem tab ein close action icon hinzufügen
      if( tab.closeable ){
        tabLink.after(
          '&nbsp;<strong class="wgt_icon_close_tab cursor" '
            +'onclick="$UI.tab.remove(\''+contId+'\',\''+tab.id+'\');">'
            +'&nbsp;&nbsp;&nbsp;&nbsp;</strong>&nbsp;'
        );
      }

      
      if( tab.disabled )
        newTab.addClass( 'tab_disabled' );

      headContainer.find( ".tab_container" ).append(newTab);
      
      // check for visibility

      if( tab.content != undefined )
        bodyContainer.append( '<div id="'+tab.id+'" class="wgt_tab_content '+contId+'" >'+tab.content+'</div>' );
        
      var tabObj = new Tab(contId, tab.id);
      $S('#'+tab.id).data('wgt-tab-obj',tabObj);
      
      
      if( tab.check_valid ){
        tabObj.addOnClose( 'check_valid', function(){
          
          var jObj = tabObj.getObject();
          if( jObj.find('.state-invalid').length )
            throw new WgtUserException("Please recheck your data. It seams that some of the given informations were invalid.");
          
        });
      }
      
      try{
        
        if( tab.script != undefined )
          (new Function("self",tab.script))(tabObj);
      }
      catch( err ) {
        console.error( 'Tab code Failed '+err.description );
      }
      
      var position = headContainer.find(".tab_container .tab").length-1;

      clicked.push(contId+"_tab_"+tab.id);
      
      console.log("Added tab");
      
      // fokus auf das erste inputelement
      if( 'false' !== settings.reFocus )
        $S('#'+tab.id).find('input:first').focus();
      
      // potentiell offenen menü schliesen
      $D.requestCloseMenu();
      // schliesen des Menüs nach dem Request
      $D.requestCloseMenu = function(){};

      return position;

    };// end this.addTab
    
    /**
     * prüfen ob ein bestimmter Tab existiert
     * 
     * @param tabKey
     * @return boolean
     */
    this.tabExists = function( tabKey ){

      return headContainer.find('#'+contId+"_tab_"+tabKey).length;
      
    };// end tabExists
    

    /**
     * removes a tab from the container
     * 
     * @param tabKey
     */
    this.removeTab = function( tabKey ){

      var toRemove = headContainer.find('#'+contId+"_tab_"+tabKey);
      var indexKey = headContainer.find(".tab_container .tab").index(toRemove);
      var wasActive = toRemove.hasClass('ui-state-active');
      var tabCont = bodyContainer.find("#"+tabKey);
      
      if( !tabCont.data('wgt-tab-obj').onClose() )
        return false;
      

      toRemove.remove();
      tabCont.remove();
      
      if( wasActive ){
        
        while( clicked.length > 0 ){
          
          var prevTabId = clicked.pop();
          var findTab = headContainer.find(".tab_container").find("#"+prevTabId);
          
          if( findTab.length > 0 ){
            
            findTab.click();
            break;
          }
       }
          
      }
      
      for(var i=0; i< clicked.length; i++){
        
        if(clicked[i]==toRemove.prop('id')){
          
            clicked.splice(i,1);
            break;
        }
      }
      
      if( wasActive )
        this.setActiv( (indexKey-1) );

    };// end this.removeTab
    
    /**
     * @param tabKey
     */
    this.removeTabOnAdd = function( tabKey ){

      var toRemove = headContainer.find('#'+contId+"_tab_"+tabKey);
      var indexKey = headContainer.find(".tab_container .tab").index(toRemove);
      var wasActive = toRemove.hasClass('ui-state-active');
      toRemove.remove();
      
      var tabCont = bodyContainer.find("#"+tabKey);
      tabCont.data('wgt-tab-obj').onClose();
      tabCont.remove();

      for(var i=0; i< clicked.length; i++){
        if(clicked[i]==toRemove.prop('id')){
          
          clicked.splice(i,1);
          break;
        }
      }

    };// end this.removeTabOnAdd
    

    /**
     * append the events to the tabs, to be able to switch the tabs
     */
    this.appendTabbingEvents = function(){
      
      // / TAB Wechsel
      
      var tabs = headContainer.find(".tab_container .tab").not('.initialized');
    
      var tabScroll = headContainer.find('.tab_scroll');
      var tabOuterContainer = tabScroll.parentX('.tab_outer_container');


      tabs.click( function(){
       
        var tabNode = $S(this);
        
        if( tabNode.hasClass('tab_disabled') )
          return false;
      
        var tabLink      = tabNode.find('a').first();
        var classNames   = tabLink.classes();
        var tabId        = null;
        
        for( var i=0; i<classNames.length; i++ ){
          
          var tmp = classNames[i];
  
          if( tmp.indexOf("wgt_tabkey_") != -1 ){
            
            tabId = classNames[i].substr(11);
            break; // break after the first match
            
          }
        }
          
        // if there is a url on the tab send a get request
        var tabUrl = tabLink.prop( 'href' );
  
        if( tabUrl != undefined ){
            
          if( !tabLink.hasClass('wgt_loaded') ){
            
            $R.get( tabUrl, {async:true} );
            tabLink.addClass('wgt_loaded');
          }
          
        }
  
        var children  = headContainer.find(".tab_container .tab");
        var index     = children.index(this);
        children.removeClass("ui-state-active");
          
        for( var i=0; i< clicked.length; i++ ){
          if( clicked[i]==$S(this).prop('id') ){
            
            clicked.splice(i,1);
            break;
          }
        }
          
        clicked.push(tabNode.prop('id'));
         
        if( tabNode.css('display') == "none" ){
  
          tabNode.css('display','inline').removeClass('tab_hidden');
          var rightVisible = (
              tabScroll.outerWidth()
                < self.getTabsWidth( tabOuterContainer.find('.tab_container') )
          );
              
          var temp =null;
          var lastTab =null;
          var clickedid = null;
              
          while( (!rightVisible) && (tabScroll.find(".tab_container .tab_hidden").length>0) ){
            
            var i = clicked.length - 1;
            clickedid = null;
                
            while(i >= 0){
              
              clickedid = clicked[i];
              temp = tabScroll.find(".tab_container #"+clickedid);
              if(temp.hasClass('tab_hidden'))
              { 
                temp.removeClass('tab_hidden').css('display','inline');
                lastTab = temp;
                break;
              }
           i--;
         }
            
            if( i < 0){
              
              temp = tabScroll.find('.tab_hidden:first');
              temp.removeClass('tab_hidden').css('display','inline');
            }
                
            rightVisible = (
                tabScroll.outerWidth()
                  < self.getTabsWidth( tabOuterContainer.find('.tab_container') ) 
            );
                
          }
              
          while( rightVisible ){
            
            var i = 0;
            var clickedid=null;
               
            while(i < clicked.length){
              
              clickedid = clicked[i];
              temp = tabScroll.find(".tab_container #"+clickedid);
              if( !temp.hasClass('tab_hidden') ){ 
                
                temp.addClass('tab_hidden').css('display','none');
                break;
              }
              i++;
                
            }
            
            if( i == clicked.length){
              
              temp = tabScroll.find('.tab:not(.tab_hidden,.tab_no_hide):first');
              temp.addClass('tab_hidden').css('display','none');
           }
              
            rightVisible = (
               tabScroll.outerWidth()
                 < self.getTabsWidth( tabOuterContainer.find('.tab_container') ) 
            );
                
          }
          
        }
          
        var hidden = tabScroll.find(".tab_container .tab_hidden").length;
        var menu_button = tabScroll.next('div.tab_nav');
        
        if( hidden > 0 ){
          
          menu_button.show();
          var menu_label = menu_button.find('label');
          menu_label.html(hidden);
          
        } else {
          
          menu_button.hide();
        }
  
        var thisTab   = children.eq(index);
        thisTab.addClass("ui-state-active");
          
        
        var newActiveTab = null;
        
        // show/hide the tab contentboxes
        if( tabId == null ){
          
          bodyContainer.find('div.'+contId).hide();
          newActiveTab = bodyContainer.find('div.'+contId).eq(index);
          
        }
        else {
          
          bodyContainer.find('div.'+contId).hide();
          newActiveTab = bodyContainer.find('#'+tabId);
          
        }
        newActiveTab.show().trigger('tabactivate');
        if( 'false' !== settings.reFocus )
          newActiveTab.find('input:first').focus();
        
        tabNode.addClass('initialized');
        
  
        return false;

      });

    };// end this.appendTabbingEvents */

    /**
     * 
     */
    this.addResizeEvent = function() {
       
      var tabScroll = headContainer.find('.tab_scroll');
      var record=this;
      
      $S(window).bind('resize',{t:record},function(event) {
        event.data.t.addScrolling();
        event.data.t.removeScrolling();
      });


    };//end this.addResizeEvent */
    
    /**
     * @param index
     */
    this.setActiv = function(index){
      
      headContainer.find(".tab_container .tab").eq(index).click();
      
      console.log( "set tab active "+index );
      if( 'false' !== settings.reFocus )
        bodyContainer.find("div.wgt_tab").eq(index).find('input').not(':hidden,button').first().focus();
    };
    
    /**
     * 
     */
    this.addScrolling = function(){
      
      var tabScroll = headContainer.find( '.tab_scroll' );
      
      if( !tabScroll )
        throw new WgtException( 'did not find the tab scroll area' );
  
      tabScroll.css('left', headContainer.find('.wgt-container-buttons').outerWidth(true)+'px');
      //tabScroll.css('left', (headContainer.find('.wgt-container-buttons').outerWidth(true) + 50 )+'px');
     
      var tabOuterContainer = tabScroll.parentX('.tab_outer_container');
      
      if( !tabOuterContainer )
        throw new WgtException( 'did not find the tab container' );

      var rightVisible = (
           tabScroll.outerWidth()
            < self.getTabsWidth( tabOuterContainer.find('.tab_container') )
      );

      var temp = null;
      while( rightVisible ){

        var i = clicked.length - 2;
        var clickedid = null;
        if( clicked.length == 0 ){
          break;
        }  

        while( i >= 0 ) {
          
          clickedid = clicked[i];
          
          temp = tabScroll.find( ".tab_container #"+clickedid );
          if( !temp.hasClass( 'tab_hidden' ) && !temp.hasClass( 'tab_no_hide' ) ){ 
            //alert( i+" : "+clickedid );
            temp.addClass('tab_hidden').css('display','none');
            break;
          }
        i--;
          
   }
        
     if( i < 0 ){
       
       temp = tabScroll.find('.tab:not(.tab_hidden,.tab_no_hide):last');
       temp.addClass('tab_hidden').css('display','none');
     }

         rightVisible = (
             tabScroll.outerWidth()
               < self.getTabsWidth( tabOuterContainer.find('.tab_container') ) 
        );

      }
      
      
      var hidden = tabScroll.find(".tab_container .tab_hidden").length;
      var menu_button = tabScroll.next('div.tab_nav');
      
      if( hidden > 0 ){
        
        menu_button.show();
        var menu_label = menu_button.find('label');
        menu_label.html(hidden);
        
      }
      else{
        
        menu_button.hide();
      }


    };// end this.addScrolling
    
    /**
     * 
     */
    this.removeScrolling = function(){
        
      var tabScroll = headContainer.find('.tab_scroll');

      var tabOuterContainer = tabScroll.parentX('.tab_outer_container');

       
      var lastTab = null;
      var rightVisible = (
        tabScroll.outerWidth()
          < self.getTabsWidth( tabOuterContainer.find('.tab_container') )
      );
       
      var temp = null;
      while( (!rightVisible) && (tabScroll.find(".tab_container .tab_hidden").length > 0) ) {
        
      var i = clicked.length - 1;
      var clickedid=null;
      
      while( i >= 0 ) {
        
        clickedid = clicked[i];
        temp = tabScroll.find(".tab_container #"+clickedid);
        
        if(temp.hasClass('tab_hidden')){ 
          temp.removeClass('tab_hidden').css('display','inline');
              lastTab = temp;
              break;
        }
        i--;
      }
        
       if( i < 0 ){
         
         temp = tabScroll.find('.tab_hidden:first');
         temp.removeClass('tab_hidden').css('display','inline');
       }
        
       rightVisible = (
           tabScroll.outerWidth()
                < self.getTabsWidth( tabOuterContainer.find('.tab_container') ) 
        );
        
      }// end while
        
    if( rightVisible && temp )
      temp.addClass('tab_hidden').css('display','none');
      
     
     var hidden = tabScroll.find(".tab_container .tab_hidden").length;
     var menu_button = tabScroll.next('div.tab_nav');
     
     if( hidden > 0 ){
       
       menu_button.show();
       var menu_label = menu_button.find('label');
       menu_label.html(hidden);
     }
     else {
       menu_button.hide();
     }

   
   };// end this.removeScrolling


  /**
   * Auslesen der aktuellen Tabweite
   * @param tc
   * @return int
   */
   this.getTabsWidth = function( _tc ){
     
     if( !_tc.find('.tab').length )
      return 0;
     
     if( !_tc.find('.tab:not(.tab_hidden)').length )
      return 0;

    // alert(tc.find('.tab:last').css('display'));
     return (
         _tc.find('.tab:not(.tab_hidden):last').position().left
       - _tc.find('.tab:not(.tab_hidden):first').position().left
       + _tc.find('.tab:not(.tab_hidden):last').outerWidth(true)
       + 6
     );
     
   };// end this.getTabsWidth

    /**
     * 
     * @param _tabScroll
     * @return
     */
    this.checkTabButtonVisibility = function( _tabScroll ){

      var rightVisible = (
          _tabScroll.outerWidth()
                  < self.getTabsWidth( tabOuterContainer.find('.tab_container') )
      );
     
      if( rightVisible )
      {
        _tabScroll.find(".tab_container .tab:not(.tab_hidden,.tab_no_hide)").eq(1).addClass('tab_hidden').css('display','none');

      }
      else
      {
        
        _tabScroll.find(".tab_container .tab_hidden").eq(0).removeClass('tab_hidden').css('display','inline'); 
      }
      
    };// end this.checkTabButtonVisibility
    
    /**
     * Anzahl der Tabs des Tabcontainers auslesen
     * @return int
     */
    this.getTabsNumber = function(){
      
      return headContainer.find(".tab_container .tab").length;
    };// end this.getTabsNumber
            
  };// end function WgtTabContainer

  /**
   * @param _contId
   * @param _tabId
   */
  var Tab = function( _contId, _tabId ){

    /**
     * @var contId
     */
    var contId = _contId;

    /**
     * @var tabId
     */
    var tabId  = _tabId;

    /**
     * @var jObject
     */
    var jObject = $S('#'+tabId);

    /**
     * @var
     */
    var closeEvent = {};

    /**
     * flag to check if there where changes on formelements in the tab
     * 
     * @var boolean
     */
    var changed = false;

    /**
     * 
     */
    this.close = function() {
      
      if(!changed || confirm("This Tab contains unsaved data. Please save first, or confirm to drop the changes.")){
        // potentiell offenen menü schliesen
        $D.requestCloseMenu();
        // schliesen des Menüs nach dem Request
        $D.requestCloseMenu = function(){};
        $D.closeView();
        $UI.tab.remove(contId, tabId);
      }
    };

    /**
     * @param name
     * @param callBack
     */
    this.addOnClose = function( name , callBack ){

      closeEvent[name] = callBack;
      
      return true;

    };// end function addOnClose */

    /**
     * @param name
     * @param callBack
     */
    this.onClose = function( ){

      //Overwrite me to register to the closing event;
      for( var eventKey in closeEvent ){

        var callback = closeEvent[eventKey];
        try{
          
          callback( tabId  );
        }
        catch( e ){
          
          $D.errorWindow( e.name, e.message );
          return false;
        }
      }
      
      return true;
      
    };// end function onClose */

    /**
     * @return $S
     */
    this.getObject = function(){
      
      return jObject;
    };

    /**
     * @return boolean
     */
    this.getChaged = function(){
      
      return changed;
    };

     /**
       * @param _changed:boolean
       */
    this.setChanged = function(_changed){
      
      changed = _changed;
    };

  };// end var Tab
  
  
  
  (function($S){
    
    var overlayID = "menuSelectorOverlay";
    
    // The actual function
    $S.fn.menuSelector1 = function(options){  
      
      return this.each(function() {
        
        // Save reference
        var $this = $S(this);
    
        // Merge default options with passed options
        var opts = $S.extend({}, $S.fn.menuSelector1.defaults, options);
        // Save options to element
        $this.data('menuSelectorOptions', opts);   
        $S.fn.menuSelector1.initOverlay1(opts);
        $S.fn.menuSelector1.openOverlay(this);
         
      });
      
    };
    
    // Closes the overlay box
    $S.fn.menuSelector1.closeOverlay = function(){
      
      if ($S('#'+ overlayID +':visible').length) {
        
        $S('#'+overlayID).slideUp('fast', function() {
          $S('.menuSelectorOverlay').removeClass('menuSelectorOverlay');
        });
      }
    };
    
    // Opens the overlay box
    $S.fn.menuSelector1.openOverlay = function(target){
      
      var $target = $S(target);
      // Get options of the element
      var opts = $target.data('menuSelectorOptions');
      // Close overlay box in case it's still open
      $S.fn.menuSelector1.closeOverlay();    
      $target.addClass('hasmenuSelectorOverlay');
      
      // get $S object of overlay box
      var $overlay   = $S('#'+overlayID);
      // get current value of the passed input field
      var currentVal   = typeof opts.stringField != 'undefined' ?
          opts.stringField.val() : '';  
          
     
      // Content of the overlay box
      var content = "";
      
      // If there are any additional menu items to be shown ...
      if (opts.menuItems != null){
        var length = opts.menuItems.length;
        for (var i = 0; i < length; i++){
          var item = opts.menuItems[i];
         
          content += '<div style="cursor: pointer; padding-top: 3px; padding-bottom: 3px;margin-top:1px;margin-bottom:1px;" '
            +  ' onclick="'+item.onClickLink+';$S.fn.menuSelector1.closeOverlay()" ' 
            +  ' onmouseover="$S(this).removeClass(\'ui-state-default\').addClass(\'ui-state-hover\');" '
            +  ' onmouseout="$S(this).removeClass(\'ui-state-hover\').addClass(\'ui-state-default\');" '
            +  ' class="ui-corner-all ui-state-default  menuSelectorMenuButton" >'
            +  item.caption +'</div>'; 
            
        }
      }    
      //content += '<div style=""></div>';
        
      $overlay.find('#menuSelectorContent').html(content);
      
      // get the offset coordiantes
      var style = $target.offset();
      // adjust top coordinate
      style.top = style.top + $target.outerHeight();  
      style.left=style.left - $overlay.outerWidth()+$target.outerWidth();
      $overlay.css(style);
      
      $overlay.slideDown('fast');
    };
    
    // Reset input fields
    $S.fn.menuSelector1.emptyFields = function(ids){
      
      $S('#'+ids.stringFieldID).val("");
      $S('#'+ids.hiddenFieldID).val("");
    };
    
    // Mousedown handler on the document
    function docMouseDown1(e){
      
      $S.fn.menuSelector1.closeOverlay();
    };
    
    // Initialise overlay box and apply the style
    $S.fn.menuSelector1.initOverlay1=function(opts){
      
      if ($S("#"+overlayID).length == 0){
        
        $S("body").append(
            '<div style="width:auto; position:absolute; z-index:1000; display:none"  id="'+overlayID+'" class="">'
          +  '    <div class="ui-widget ui-widget-content ui-corner-all">'
          +  '    <div class="ui-widget-content ui-corner-all" style="padding: 0;">'
          +  '      <div id="menuSelectorContent"></div>'
          //+  '      <div style="clear: left;"></div>'
          +  '    </div>'
          +  '    <!--[if lte IE 6.5]>'
          +  '      <iframe style="display:block; position:absolute;top: 0;left:0;z-index:-1;'
          +  '        filter:Alpha(Opacity=\'0\');width:3000px;height:3000px"></iframe>'
          +  '    <![endif]-->'
          +  '</div></div>'
        );
        // alert('hh');
        $S(document).mousedown(function(e){docMouseDown1(e);});
        
      }
      else{
        
        $S("#"+overlayID).html(
            '    <div class="ui-widget ui-widget-content ui-corner-all">'
          +  '    <div class="ui-widget-content ui-corner-all" style="padding: 0;">'
          +  '      <div id="menuSelectorContent"></div>'
          +  '      <div style="clear: left;"></div>'
          +  '    </div>'
          +  '    <!--[if lte IE 6.5]>'
          +  '      <iframe style="display:block; position:absolute;top: 0;left:0;z-index:-1;'
          +  '        filter:Alpha(Opacity=\'0\');width:3000px;height:3000px"></iframe>'
          +  '    <![endif]-->'
          +  '   </div>'
        ).width('auto');
        
      }
      
      $S("#"+overlayID).css(opts.overlayStyle);
    };
    
    // Default options
    $S.fn.menuSelector1.defaults = {
      overlayStyle: {},
      menuItems: null
    };
    
  })($S);

})($UI);