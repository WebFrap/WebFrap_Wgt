jQuery.toasterSetting = {
  timeout : 3000, // timeout to close the toast
  title : '', // title of the toast
  text : '', // text of the toast
  animationSpeed : 500, // animationSpeed to popup a toast
  position : 'br', // br, bl, tr, tl
  cssclass : '', // additional class for the toast
  onlyone : false, // only one of this toast can appear at the same time
  base : 'body', // base of the toaster area
  closable : false, // is the toast cloasable
  onclose : false, // callback function when the toast cloases:
                    // callback(cssIdOfTheToast)
  oncreate : false
// callback that is called after creation of the toast:
// callback(cssIdOfTheToast)
};

if(!Array.indexOf) {
  Array.prototype.indexOf = function( el ){

    for( var i = 0; i < this.length; i++ )
      if(el == this[i])
        return i;
  }
}

/**
 * @author holzhauer
 */
jQuery.toaster = function( settings ){

  settings = jQuery.extend(jQuery.toasterSetting, settings);

  if(settings.timeout == 0) {
    settings.closable = true;
  }

  var msgId = 'toast' + Math.floor(Math.random() * 1000000);

  this.toasterMsgCounter = this.toasterMsgCounter || new Array();
  this.toasterMsgCounter[settings.base] = this.toasterMsgCounter[settings.base]
      || new Array();
  this.toasterMsgCounter[settings.base][settings.position] = this.toasterMsgCounter[settings.base][settings.position]
      || new Array();

  this.toasterMsgCounter[settings.base][settings.position].push(msgId);

  if(jQuery(settings.base + ' > .ui-toaster-area-' + settings.position).length == 0) {
    var toasterArea = '<div class="ui-toaster-area-' + settings.position
        + '"></div>';
    jQuery(settings.base).append(toasterArea);
  }

  if(settings.onlyone == false
      || (settings.onlyone == true && jQuery(settings.base
          + ' > div.ui-toaster-area-' + settings.position + ' div.ui-toaster').length == 0)) {
    var html = '<div class="ui-toaster ' + settings.cssclass + '" id="' + msgId
        + '">';

    if( settings.closable === true ) {
      html += '<span title="Close" class="ui-toaster-close">X</span>';
    }

    if( settings.title ) {
      html += '<h4 class="ui-toaster-title">' + settings.title + '</h4>';
    }

    html += '<p class="ui-toaster-content">' + settings.text + '</p>';
    html = jQuery(html);

    if(settings.position == 'bl' || settings.position == 'br') {
      jQuery(settings.base + ' > .ui-toaster-area-' + settings.position)
          .prepend(html);
    }
    else
      if(settings.position == 'tl' || settings.position == 'tr') {
        jQuery(settings.base + ' > .ui-toaster-area-' + settings.position)
            .append(html);
      }

    html.slideDown(settings.animationSpeed);

    // call onCreate callback
    if(typeof settings.oncreate == 'function') {
      settings.oncreate(msgId);
    }

    // create the close function
    var closeFunction = function(){

      jQuery('#' + msgId).slideUp(settings.animationSpeed, function(){

        jQuery('#' + msgId).remove();
      });
      if(typeof settings.onclose == 'function') {
        settings.onclose(msgId);
      }
    }

    // add close function to the "X"
    if(settings.closable == true) {
      jQuery('#' + msgId + ' span.ui-toaster-close').click(function(){

        closeFunction();
      });
    }

    // add the timeout to the toast
    if(settings.timeout > 0) {
      var beforeId = this.toasterMsgCounter[settings.base][settings.position]
          .indexOf(msgId);
      var before = this.toasterMsgCounter[settings.base][settings.position][(beforeId - 1)];

      var timedCloseFunction = function(){

        if(before == undefined || jQuery('#' + before).length == 0) {
          closeFunction();
        }
        else {
          window.setTimeout(timedCloseFunction, settings.timeout);
        }
      }

      window.setTimeout(timedCloseFunction, settings.timeout);
    }
  }
};