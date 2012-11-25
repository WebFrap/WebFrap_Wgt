/* 
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */


if ( !console ){
  // console log fix
  // sicher stellen, dass der IE keinen fehler bei console wirft
  var console = {
    log: function(){},
    debug: function(){},
    info: function(){},
    warn: function(){},
    error: function(){},
    time: function(){},
    timeEnd: function(){},
    trace: function(){},
    group: function(){},
    groupEnd: function(){},
    assert: function(){}
  };
}

// no need for ; here
(function(window,undefined){

  /**
   * Configuration Class
   * @return
   */
  function WgtConf(){
    
    this.windowTitle      = 'WebFrap Desktop';
    
    this.fn               = WgtConf.prototype;
  
    //this.DEBUG = <?php if( DEBUG ) echo 'true'; else echo 'false'; ?>;
    this.DEBUG = {
      WCM: {
        ACTION : false,
        UI : false,
        WIDGET : false
      },
      UI: false,
      REQUEST : true
    };
    
    this.WEB_ROOT         = '<?php echo WEB_ROOT; ?>';
    this.SERVER_ADDR      = '<?php echo SERVER_ADDR; ?>';
    this.WEB_WGT          = '<?php echo WEB_WGT; ?>';
    this.WEB_STYLE        = '<?php echo WEB_STYLE; ?>';
    this.WEB_ICONS        = '<?php echo WEB_ICONS; ?>icons/default/';
    this.WEB_THEME        = '<?php echo WEB_THEME; ?>themes/default/';
    
    this.WEB_GW           = '<?php echo WEB_GW; ?>';
    this.HTTPS            = <?php echo ( isset($_SERVER['HTTPS'] ) && 'on' == $_SERVER['HTTPS'] )? 'true': 'false'; ?>;

    document.cookie = [
     'WEB_ROOT', '=',
     encodeURIComponent(this.WEB_ROOT),
     '; path=/',
     this.HTTPS ? '; secure' : ''
   ].join('');
    
    document.cookie = [
      'WEB_WGT', '=',
      encodeURIComponent(this.WEB_WGT),
      this.HTTPS ? '; secure' : ''
    ].join('');
    
    document.cookie = [
      'WEB_ICONS', '=',
      encodeURIComponent(this.WEB_ICONS),
      this.HTTPS ? '; secure' : ''
    ].join('');
    
    document.cookie = [
      'WEB_THEME', '=',
      encodeURIComponent(this.WEB_THEME),
      this.HTTPS ? '; secure' : ''
    ].join('');
    
    document.cookie = [
      'WEB_GW', '=',
      encodeURIComponent(this.WEB_GW),
      this.HTTPS ? '; secure' : ''
    ].join('');
  
    this.iconPath         = this.WEB_ICONS;
    this.imagePath        = this.WEB_THEME+'images/';
    
    var cpath = this.iconPath+'xsmall/control/';
    
    /*
    this.icon ={
      callendar    :cpath+'calendar.png',
      clock        :cpath+'clock.png',
      sortDesc     :cpath+'sort_up.png',
      sortAsc      :cpath+'sort_down.png',
      sortNone     :cpath+'sort_none.png',
      refresh      :cpath+'cancel.png',
      add          :cpath+'add.png',
      edit         :cpath+'edit.png',
      show         :cpath+'show.png',
      delete       :cpath+'delete.png',
      save         :cpath+'save.png',
      connect      :cpath+'connect.png',
      opened       :cpath+'opened.png',
      closed       :cpath+'closed.png'
    };
    */
    
    this.iconCallendar    = cpath+'calendar.png';
    this.iconClock        = cpath+'clock.png';
    this.iconSortDesc     = cpath+'sort_up.png';
    this.iconSortAsc      = cpath+'sort_down.png';
    this.iconSortNone     = cpath+'sort_none.png';
    this.iconRefresh      = cpath+'cancel.png';
    this.iconAdd          = cpath+'add.png';
    this.iconEdit         = cpath+'edit.png';
    this.iconShow         = cpath+'show.png';
    this.iconDelete       = cpath+'delete.png';
    this.iconSave         = cpath+'save.png';
    this.iconConnect      = cpath+'connect.png';
    this.iconClose        = cpath+'close.png';
    
    this.iconOpened       = cpath+'opened.png';
    this.iconClosed       = cpath+'closed.png';
  
    this.formatTime       = 'h:i';
    this.formatTimeSec    = 'h:i:s';
    this.timeSep          = ':';
    this.formatDate       = 'yy-mm-dd';
    this.formatDateMonth  = 'yy-mm';
    this.dateSep          = '-';
    this.theme            = 'default';
    this.lang             = 'en';
    
    /**
     * color codes for selectbox & status
     */
    this.colorCodes = {
        'access':{
          '0':'#C85E60',
          '1':'#D6EBBE',
          '2':'#B6DB8C',
          '4':'#99CD5D',
          '8':'#7ABE2F',
          '16':'#CAE2FF',
          '32':'#9EC9FF',
          '64':'#77B4FF',
          '128':'#4096FF',
          '256':'#AE2CFF'
        },
        'system':{
          'controll':'#ffffff',
          'defbg':'#E0F0FC'
        }
      };
  
  }
  
  // Expose Wgt to the global object
  window.$C = new WgtConf();

})(window);
