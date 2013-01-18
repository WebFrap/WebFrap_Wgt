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


;(function( $S, window,undefined){

  "use strict";

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  var WgtDesktop = function( ){

    /**
     * make it extendable
     */
    this.fn = WgtDesktop.prototype;

    /**
     * timestamp
     */
    this.timestamp = Date.now();

    /**
     * Array mit Closures welche clear funktionen implementieren
     */
    this.clearCall = {};

    /**
     * Der aktive Maincontainer
     */
    this.actMainCont = null;

    /**
     * self reference
     */
    var self = this;

    /**
     * Schliesen des aktiven Menüs
     * Wird gesetzt um alle möglichen menüs
     */
    this.requestCloseMenu = function(){};

    /**
     * Schliesen des aktiven Menüs
     * Wird gesetzt um alle möglichen menüs
     */
    this.globalCloseMenu = function(){};

    /**
     * Actions für einen globalen klick
     * Nur on demand befüllen wenn etwas aktiv ist
     * ansonsten muss geleert werden.
     *
     * Key muss ein valider Selector sein.
     * Es wird regelmäßig gecheckt ob die elemente noch vorhanden sind ansonsten
     * wird die action rausgeworfen
     */
    this.globalClick = {};

    /**
     * global click triggern
     */
    this.triggerGlobalClick = function( event ){

      for (var prop in this.globalClick) {
        if( this.globalClick.hasOwnProperty( prop ) ) {
          if( undefined !== this.globalClick[prop] ){
            this.globalClick[prop]( event );
          }
        }
      }

      return true;

    };//end this.triggerGlobalClick */


    /**
     * Schliesen des aktiven Menüs
     * Wird gesetzt um alle möglichen menüs
     */
    this.closeView = function(){

      $S('.wgt-tip').remove();
      this.setTitle( $C.windowTitle );
    };

    /**
     * Shortcut für Save on Strg + S
     */
    this.shortCutSave = function(){};

    /**
     * aktivieren und deaktivieren der lightbox
     * @param activate boolean
     */
    this.lightBox = function( activate ){
      ///TODO implement a lighbox here
    };

    /**
     * Den Desktop aufräumen,
     * Tooltips, schliesen, offenen Menüs schliesen etc.
     */
    this.clear = function(  ){
      ///TODO implement a lighbox here
    };

   /**
     * Den Desktop aufräumen,
     * Tooltips, schliesen, offenen Menüs schliesen etc.
     */
    this.setTitle = function( title ){

      window.document.title = title;

    };

    /**
     * Den Desktop neu laden
     */
    this.refresh = function( ){

      var tmp = this.timestamp;
      this.timestamp = Date.now();
      $R.get( 'ajax.php?c=Webfrap.Desktop.refresh&timestamp='+tmp, {}, true );

    };

    /**
     * create an error window
     * use this function instead of ulgy alert windows
     * @param title
     * @param message
     */
    this.errorWindow = function( title, message ){

      if( console.trace ){
        console.trace();
      }

      if( typeof title === 'string' ){
        // den 2ten parameter optional machen we
        if( !message ){
          message = title;
          title = 'Error';
        }
      }
      else if( undefined === message ){

        // ok sieht so aus als ob wir eine exception bekommen haben
        message = title.message;
        title = title.name;
      }

      var template = this.template( $S("#wgt-template-dialog").html(), {'title':title,'message':message}, false );

      $S(template).dialog({
        bgiframe: false,
        resizable: true,
        height:200,
        modal: true,
        overlay:{
          backgroundColor: '#000',
          opacity: 0.5
        },
        buttons:{
          confirm : function(){$S(this).dialog('close');}
        }
      });

      /*
      if( $S.dialog ){
        $S(template).dialog({
          bgiframe: false,
          resizable: true,
          height:200,
          modal: true,
          overlay:{
            backgroundColor: '#000',
            opacity: 0.5
          },
          buttons:{
            confirm : function(){$S(this).dialog('close');}
          }
        });
      }
      else{
        // ausgabe per allert wenn dialog fehlen sollte
        alert( 'Error: '+message );
      }
      */

    };

    /**
     * @param title the title for the dialog
     * @param message the message content for the dialog
     * @param Confirm
     * @param callBack function to be called on confirm
     */
    this.confirmWindow = function( title, message, Confirm, callBack ){

      var templateNode = this.template(
        $S("#wgt-template-dialog").html(),
        {'title':title,'message':message}
      );

      $S(templateNode).dialog({
        bgiframe  : false,
        resizable : true,
        height    : 200,
        modal     : true,
        overlay   :{
          backgroundColor: '#000',
          opacity: 0.5
        },
        buttons:{
          Confirm : function(){
            callBack();
            $S(this).dialog('close');
          },
          Cancel : function(){
            $S(this).dialog('close');
          }
        }
      });

    };


    /**
     * open a new dialog window
     * @param content
     * @param params
     */
    this.openWindow = function( content , params ){

      // umschreiben auf extends
      if( params === undefined  ){
        params = {};
      }
      if( params.resizable === undefined  ){
        params.resizable = true;
      }
      if( params.height === undefined  ){
        params.height = 300;
      }
      if( params.width === undefined ){
        params.width = 400;
      }

      $S(content).dialog(params);

    };//end this.openWindow

    /**
     * open an new browser window / popup
     * @param params
     * @return
     */
    this.openBrowserWindow = function( params ){

      // check for required parameters
      if( typeof params === 'undefined' || typeof params.src === 'undefined'  ){
        throw new WgtException('Tried to open Windows without source');
      }

      // check optional Parameters
      if( typeof params.title === 'undefined' ){
        params.title = 'WebFrap Wgt Window';
      }
      if( typeof params.width === 'undefined' ){
        params.width = 1000;
      }
      if( typeof params.height === 'undefined' ){
        params.height = 600;
      }

      var windowParam = "width="+params.width+",height="+params.height;
      windowParam += ",scrollbars=yes,locationbar=false,menubar=false";

      var newWindow = window.open(params.src, params.title, windowParam );
      newWindow.focus();

    };//end this.openBrowserWindow

    /**
    *
    * @param params
    * @return
    */
   this.openImageWindow = function( params ) {

     // check for required parameters
     if( typeof params === 'undefined' || typeof params.src === 'undefined'  ){
       throw new WgtException('Tried to open Windows without source');
     }

     // check optional Parameters
     if( typeof params.title === 'undefined' ){
       params.title = 'Image Viewer';
     }
     if( typeof params.width === 'undefined' ){
       params.width = 1000;
     }
     if( typeof params.height === 'undefined' ){
       params.height = 600;
     }
     if( typeof params.alt === 'undefined' ){
       params.alt = 'Some Image';
     }

     var windowParam = "width="+params.width+",height="+params.height;
       windowParam += ",scrollbars=yes,locationbar=false,menubar=false";

     var newWindow = window.open('', params.title, windowParam );
     newWindow.document.writeln('<html><head><title>'+params.title+'</title></head><body><img onclick="window.close()" src="'+params.src+'" alt="'+params.src+'" /></body></html>');
     newWindow.focus();

   };//end this.openBrowserWindow

    /**
     * show the progress bar
     */
    this.showProgressBar = function(){


      // sicher stellen, dass der z-index auch ganz oben ist
      var zIndex = window.$B.getNextHighestZindex();

      var progBar = $S('#wgt_progress_bar');
      progBar.show();

      progBar.css( 'z-index', zIndex );

    };//end this.showProgressBar

    /**
     * hide the pogress bar
     */
    this.hideProgressBar = function(){

      $S('#wgt_progress_bar').hide();
    };

    /**
     * @param e
     */
    this.activateProgressIcon = function(e){

      $S('#wgt_wait_icon').show();
      $S("body").bind("mousemove", self.moveProgessIcon );

    }; //end this.activateProgressIcon

    /**
     * @param e
     */
    this.deactivateProgressIcon = function(e){

      $S('#wgt_wait_icon').hide();
      $S("body").unbind("mousemove", self.moveProgessIcon );

    };//end this.deactivateProgressIcon

    /**
     * @param e
     */
    this.moveProgessIcon = function(e){

      var mouseX = document.all ? window.event.x : e.pageX;
      var mouseY = document.all ? window.event.y : e.pageY;
      $S("#wgt_wait_icon").css({top:mouseY, left:mouseX});

    };//end this.moveProgessIcon

    /**
     * @param template
     * @param data
     * @param asObject
     */
    this.template = function( template, data, asObject ){

      //if as Object ist 'undefined' return the data as object
      if( typeof asObject === 'undefined' ){
        asObject=true;
      }

      for( var key in data ){
        template = str_replace( '{$'+key+'}', data[key], template );
      }

      // return string or $S object
      if (asObject === false){
        return template;
      }
      else{
        return $S(template);
      }

    };//end this.template

    /**
     * @param tplId string
     */
    this.getTemplate = function( tplId  ){

      var tmp = $S( "#"+tplId ).clone();
      tmp.attr('id','');

      return tmp;

    };//end this.getTemplate

    /**
     *
     * @param tc
     * @return
     */
    this.getTabsWidth = function( tc ){

      return ( tc.find('.tab:last').position().left - tc.find('.tab:first').position().left + tc.find('.tab:last').outerWidth(true) + 6 );

    };//end this.getTabsWidth

    /**
     *
     * @param tc
     * @param offset
     * @return
     */
    this.scrollTabs = function(tc, offset){

      tc
      .find('.tab_scroll')
      .animate(
        {scrollLeft: offset},
        500,
        'swing',
        function(){self.checkTabButtonVisibility($S(this));}
      );
    };

    /**
     *
     * @param tc
     * @return
     */
    this.checkTabButtonVisibility = function(tc){

      var tabOuterContainer = tc.parents('.tab_outer_container');
      var leftVisible = (tc.scrollLeft() === 0);
      var rightVisible = (
            ( tc.scrollLeft() + tc.outerWidth(true) )  === self.getTabsWidth(tabOuterContainer.find('.tab_container'))
      );

      if(tabOuterContainer.find('.tab_left').is(':visible')){
        tabOuterContainer.find('.tab_left').fadeTo(1000, leftVisible ? 0.4 : 1);
      }

      if(tabOuterContainer.find('.tab_right').is(':visible')){
        tabOuterContainer.find('.tab_right').fadeTo(1000, rightVisible ? 0.4 : 1);
      }

    };//end this.checkTabButtonVisibility

    /**
     * @param message
     * @param content
     */
    this.console = function( message, content ){

      var timeStamp = new Date;

      var consoleHtml = '<h3 style="cursor: pointer;" onclick="$S(\'#wgtIdDebug_'+timeStamp+'\').toggle()">'+message+'</h3>';
      consoleHtml += '<pre id="wgtIdDebug_'+timeStamp+'" style="display: none;">'+var_dump(content)+'</pre>';

      $S('#wgt_debug_console').append(consoleHtml);

    };//end this.console


  };//end function WgtDesktop( )

  // create instance
  window.$D = new WgtDesktop();

  // short cuts
  $S(window).keypress(function(event) {

    //console.log( "pressed "+event.which );

    /*
    if ( (event.which === 115 && event.ctrlKey) || (event.which === 19) ){
      // context element speichern
      alert("Ctrl-S pressed");
      event.preventDefault();
      return false;
    }
    else if ( (event.which === 110 && event.ctrlKey) || (event.which === 19) ){
      // context element new
      alert("Ctrl-N pressed");
      event.preventDefault();
      return false;
    }
    else if ( (event.which === 101 && event.ctrlKey) || (event.which === 19) ){
      // soll globales event sein
      alert("Ctrl-E pressed");
      event.preventDefault();
      return false;
    }
    */

    return true;
  });

  // global click
  $S(window).mouseup(function(event) {
    return $D.triggerGlobalClick( event );
  });

  setInterval( function(){ $D.refresh(); }, 150000  );

})( jQuery, window);
