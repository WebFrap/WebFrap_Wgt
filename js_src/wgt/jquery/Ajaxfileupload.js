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
 * @author dominik bonsch <db@webfrap.net>
 */
;(function(jQuery,undefined) {
  
  "use strict";
  
  jQuery.extend({
    
    createUploadIframe: function(id, uri){
      
      //create frame
      var frameId = 'wgtUploadFrame' + id,
        io = null;
      
      if( window.ActiveXObject && jQuery.browser.version < 9 ){
        
        io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" class="meta" />');
        if( typeof uri === 'boolean' ){
          
          io.src = 'javascript:false';
        }
        else if( typeof uri === 'string' ){
          
          io.src = uri;
        }
      }
      else{
        
        io = document.createElement( 'iframe' );
        io.id = frameId;
        io.name = frameId;
      }
      
      io.style.position = 'absolute';
      io.style.top = '-1000px';
      io.style.left = '-1000px';

      document.body.appendChild(io);

      return io;          
    },
      
    createUploadForm: function( id, oldFormId ){
      
      //create form   
      var formId = 'wgtUploadForm' + id;
      //var fileId = 'wgtUploadFile' + id;
      var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');    
      
      
      jQuery("#"+oldFormId).find(":input").not('.asgd-'+oldFormId).not("input[type='submit']").each(function(){
        
        var oldAttr = jQuery(this);
        
        var newid = 'wgtUploadForm'+oldAttr.attr('id');
        var newElement = oldAttr.clone();  
        
        if( newElement.is('input[type="checkbox"]') && !newElement.is(':checked') ){
          form.append('<input type="text" value="0" name="'+newElement.attr('name')+'" id="'+newid+'" />');
        }
        else{
          /*
          newElement.attr('id',  newid );
          newElement.appendTo(form);
          */
          oldAttr.attr('id',  newid );
          oldAttr.before(newElement);
          oldAttr.appendTo(form);
          
        } 
      });

      jQuery('.asgd-'+oldFormId).each(function(){
        
        var oldAttr = jQuery(this);
        var newid = 'wgtUploadForm'+oldAttr.attr('id');
        var newElement = oldAttr.clone();  
        
        if( newElement.is('input[type="checkbox"]') && !newElement.is(':checked') ){
          form.append('<input type="text" value="0" name="'+newElement.attr('name')+'" id="'+newid+'" />');
        }
        else{
          /*
          newElement.attr('id',  newid );
          newElement.appendTo(form);
          */
          oldAttr.attr('id',  newid );
          oldAttr.before(newElement);
          oldAttr.appendTo(form);
          
        } 

      });
   
      //set attributes
      jQuery(form).css('position', 'absolute');
      jQuery(form).css('top', '-1200px');
      jQuery(form).css('left', '-1200px');
      jQuery(form).appendTo('body');      
      return form;

    },

    ajaxFileUpload: function( settings ){

      // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout        
      settings = jQuery.extend({}, jQuery.ajaxSettings, settings);
      var id = new Date().getTime();       
      var form = jQuery.createUploadForm(id, settings.formid);
      var io = jQuery.createUploadIframe(id, settings.secureuri);
      
      var frameId = 'wgtUploadFrame' + id;
      var formId = 'wgtUploadForm' + id; 
      
      // Watch for a new set of requests
      if ( settings.global && ! jQuery.active++ ){
        jQuery.event.trigger( "ajaxStart" );
      }            
      var requestDone = false;
        
      // Create the request object
      var xml = {};
        
      if ( settings.global ){
        jQuery.event.trigger("ajaxSend", [xml, settings]);
      }
          
      // Wait for a response to come back
      var uploadCallback = function(isTimeout){
        
        var io = document.getElementById(frameId);
        try{
          
          if(io.contentWindow){
            
            xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
            xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
          }
          else if(io.contentDocument){
            
            xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
            xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
          }                       
        }
        catch(e){
          
          jQuery.handleError(settings, xml, null, e);
        }
        
        if ( xml || isTimeout === "timeout") {               
          requestDone = true;
          var status;
          try {
            status = isTimeout !== "timeout" ? "success" : "error";
            // Make sure that the request was successful or notmodified
            if ( status !== "error" ) {
              // process the data (runs the xml through httpData regardless of callback)
              var data = jQuery.uploadHttpData( xml, settings.dataType );    
              
              // If a local callback was specified, fire it and pass it the data
              if ( settings.success ){
                settings.success( data, status );
              }

              // Fire the global callback
              if( settings.global ){
                jQuery.event.trigger( "ajaxSuccess", [xml, settings] );
              }
            } 
            else {
              jQuery.handleError(settings, xml, status);
            }
          } 
          catch(evt){
          
          status = "error";
          jQuery.handleError( settings, xml, status, evt );
        }

        // The request was completed
        if( settings.global ){
          jQuery.event.trigger( "ajaxComplete", [xml, settings] );
        }

        // Handle the global AJAX counter
        if ( settings.global && ! --jQuery.active ){
          jQuery.event.trigger( "ajaxStop" );
        }

        // Process result
        if ( settings.complete ){
          settings.complete(xml, status);
        }

        jQuery(io).unbind();

        setTimeout(function(){   
          try{
            
            jQuery(io).remove();
            jQuery(form).remove();   
                                    
          } 
          catch(evt){
            
            jQuery.handleError( settings, xml, null, evt );
          }                                   

        }, 100);

        xml = null;

        }
      };
      
      // Timeout checker
      if ( settings.timeout > 0 ) {
        
        setTimeout( function(){
          
            // Check to see if the request is still happening
            if( !requestDone ) {
              uploadCallback( "timeout" );
            }
            
          }, 
          settings.timeout
        );
      }
      try {
        
        // var io = jQuery('#' + frameId);
        var form = jQuery('#' + formId);
        form.attr('action', settings.url);
        form.attr('method', 'POST');
        form.attr('target', frameId);
        
        if(form.encoding){
          form.encoding = 'multipart/form-data';              
        }
        else{               
          form.enctype = 'multipart/form-data';
        }    

        form.submit();

      } 
      catch(evt) {           
        jQuery.handleError(settings, xml, null, evt);
      }
      
      if(window.attachEvent){
        document.getElementById(frameId).attachEvent('onload', uploadCallback);
      }
      else{
        document.getElementById(frameId).addEventListener('load', uploadCallback, false);
      }       
      return {abort: function () {}}; 

    },

    uploadHttpData: function( r, type ) {
      var data = !type;
      data = type === "xml" || data ? r.responseXML : r.responseText;
      
      // If the type is "script", eval it in global context
      if ( type === "script" ){
        jQuery.globalEval( data );
      }
      
      // Get the JavaScript object, if JSON is used.
      if ( type === "json" ){
        eval( "data = " + data );
      }
      
      // evaluate scripts within html
      if ( type === "html" ){
        jQuery("<div>").html(data).evalScripts();
      }
          //alert(jQuery('param', data).each(function(){alert(jQuery(this).attr('value'));}));
      
      return data;
    }
    
  });

})(jQuery);
