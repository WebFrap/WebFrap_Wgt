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
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

/**
 * add a message system to the desktop
 */
;(function($D,$S,undefined){
  
  "use strict";

    /**
     * @author dominik alexander bonsch <db@webfrap.net>
     */
    $D.fn.message = {
      error: function( title , message  ){
        $D.errorWindow( title , message );
        
        var msg = '<tr class="ui-state-error" >';
        msg += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/error.png" alt="error"  /></td>';
        msg += '<td class="time" >'+(new Date).toLocaleString()+'</td>';
        msg += '<td class="message" >'+message.substring(0,400)+'</td>';
        msg + '</tr>';
        
        var d = new Date();
        var timeStr = d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
        
        var msgD = '<tr class="ui-state-error" >';
        msgD += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/error.png" alt="error"  /> '+timeStr+'</td>';
        msgD + '</tr>';
        
        $S('#footer_status tbody').html(msgD);
        $S('#wbf-footer-history tbody').append(msg);
        
      },
      warning: function( title , message  ){
        $S.toaster({
          base:'body',
          position:'bl',
          closable:true,
          //title:title,
          text:message,
          timeout:3500,
          cssclass:'ui-state-highlight '
        });
        
        var msg = '<tr class="ui-state-highlight" >';
        msg += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/warning.png" alt="warning"  /></td>';
        msg += '<td class="time" >'+(new Date).toLocaleString()+'</td>';
        msg += '<td class="message" >'+message.substring(0,400)+'</td>';
        msg + '</tr>';
        
        var d = new Date();
        var timeStr = d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
        
        var msgD = '<tr class="ui-state-error" >';
        msgD += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/warning.png" alt="warning"  /> '+timeStr+'</td>';
        msgD + '</tr>';
        
        $S('#footer_status tbody').html(msgD);
        $S('#wbf-footer-history tbody').append(msg);
        
      },
      message: function( title , message  ){
        $S.toaster({
          base:'body',
          position:'bl',
          //title:title,
          closable:true,
          text:message,
          timeout:3500
        });
        
        var msg = '<tr class="ui-state-default" >';
        msg += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/info.png" alt="info"  /></td>';
        msg += '<td class="time" >'+(new Date).toLocaleString()+'</td>';
        msg += '<td class="message" >'+message.substring(0,400)+'</td>';
        msg + '</tr>';
        
        var d = new Date();
        var timeStr = d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
        
        var msgD = '<tr class="ui-state-error" >';
        msgD += '<td class="status" ><img src="'+$C.iconPath+'xsmall/status/info.png" alt="info"  /> '+timeStr+'</td>';
        msgD + '</tr>';
        
        $S('#footer-status tbody').html(msgD);
        $S('#wbf-footer-history tbody').append(msg);
      }
    };

})(
    window.$D,
    window.$S
);