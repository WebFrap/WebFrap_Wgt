/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
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

// Map jQuery in an non conclickt mode in $S
//window.$G = window;
window.$S = jQuery.noConflict();

(function(window){

  "use strict";
  
  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   * 
   * das Wgt Objekt
   * Die Mutter des WGT WebFrap Gui Toolkit
   * Ich möchte an dieser Stelle mir danken dass ich so total bescheuert bin
   * und mich darauf einlasse mal noch schnell ein GUI Toolkit aus dem Boden
   * zu stampfen dass eine saubere Architektur hat.
   *
   * Hier ist der Konstruktor des WGT Objektes
   *
   * @extends js_wgt/jquery.js
   */
  function Wgt(){

    // use correct document
    var document = window.document;
    
    /**
     * referenz auf this für das parent object
     */
    var self = this;
    
    /**
     * referenz auf prototype um das WGT objekt leicht erweitern zu können
     */
    this.fn = Wgt.prototype;
    
    /**
     * @var string
     */
    this.name = 'WGT WebFrap Gui Toolkit';

    /**
     * @var int
     */
    this.version = '0.6';

    /**
     * pool for actions that has to be done on window ready
     */
    this.initPool = [];
    
    /**
     * Pool für generische Elemente, um nicht jedesmal den iterator implementieren
     * zu müssen
     */
    this.eventsPool = {};
    
    /**
     * Liste der Module die schon geladen wurden
     * zu müssen
     */
    this.modules = {};
    
    /**
     * Einzelne JS Dateien
     * zu müssen
     */
    this.singleFiles = {};
    
    /**
     * Style Listen verwalten
     */
    this.styles = {};

/*
 * Module Logik
 ********************/
    
    /**
     * @param key string der key für das zu ladente Modul
     */
    this.moduleIsLoaded = function( key ){
      
      if( self.modules[key] === undefined ){
        
        return false;
      }
      else{
        
        return true;
      }
      
    };//end this.moduleIsLoaded
    
    /**
     * @param key string der key für das zu ladente Modul
     */
    this.loadModule = function( key, callback ){

      if( self.modules[key] === undefined ){

        var tmp = new RegExp('(?:^|; )' + encodeURIComponent('WEB_GW') + '=([^;]*)').exec(document.cookie);
        var WEB_GW = tmp ? decodeURIComponent(tmp[1]) : null;
        
        self.modules[key] = true;
        
        if( WEB_GW !== undefined && WEB_GW !== null ){
          $S('head').append( '<script type="text/javascript" src="'+WEB_GW+'js.php?l=list.'+key+'" ></script>' );
        }
        else if( window.$C.WEB_GW !== undefined && window.$C.WEB_GW !== null ){
          $S('head').append( '<script type="text/javascript" src="'+window.$C.WEB_GW+'js.php?l=list.'+key+'" ></script>' );
        }
        else{
          $S('head').append( '<script type="text/javascript" src="js.php?l=list.'+key+'" ></script>' );
        }
        
        if( callback ){
          callback();
        }
         
      }
      
    };//end this.loadModule
    
/*
 * JS File Logik
 ********************/
    
    /**
     * @param key string der key für das zu ladente Modul
     */
    this.fileIsLoaded = function( file ){
      
      if( self.singleFiles[file] === undefined ){
        return false;
      }
      else{
        return true;
      }
      
    };//end this.moduleIsLoaded
    
    /**
     * @param file string der key für das zu ladente Modul
     */
    this.loadSingleFile = function( file ){
      
      if( self.singleFiles[file] === undefined ){
        
        self.singleFiles[file] = true;
        $S('head').append( '<script type="text/javascript" src="'+file+'" ></script>' );
      }
    };//end this.loadSingleFile
    
/*
 * Style Logik
 ********************/
      
    /**
     * @param key string der key für das zu ladente Modul
     */
    this.styleIsLoaded = function( key ){
      
      if( self.styles[key] === undefined ){
        return false;
      }
      else{
        return true;
      }
      
    };//end this.moduleIsLoaded
    
    /**
     * @param key string der key für das zu ladente Modul
     */
    this.loadStyle = function( key ){
      
      //console.log( 'request to load csspack: '+key );
      
      if( self.styles[key] === undefined ){
          
        var tmp = new RegExp( '(?:^|; )' + encodeURIComponent('WEB_GW') + '=([^;]*)' ).exec(document.cookie);
        var WEB_GW = tmp ? decodeURIComponent(tmp[1]) : null;
        
        self.styles[key] = true;
        
        if( WEB_GW !== undefined ){
          $S('head').append( '<link type="text/css" href="'+WEB_GW+'css.php?l=list.'+key+'" rel="stylesheet" />' );
        }
        else if( $C.WEB_GW ){
          $S('head').append( '<link type="text/css" href="'+$C.WEB_GW+'css.php?l=list.'+key+'" rel="stylesheet" />' );
        }
        else{
          $S('head').append( '<link type="text/css" href="css.php?l=list.'+key+'" rel="stylesheet" />' );
        }

      }
      
    };//end this.loadStyle
    
/*
 * Event Logik
 ********************/
    

    /**
     * request the actual running version
     * @param callBack
     */
    this.addInitCall = function( callBack ){
      
      this.initPool.push(callBack);
    };//end this.addInitCall
    
    /**
     * @param string key den key des Events
     * @param function callBack ein annonyme funktion die aufgerufen werden soll 
     */
    this.addEvent = function( key, callBack ){
      
      if( undefined === this.eventsPool[key] ){
        this.eventsPool[key]=[];
      }
      
      this.eventsPool[key].push(callBack);

    };//end addEvent */
    
    /**
    * Triggern eines bestimmten Events
    * 
    * @param string key, der Key des Events das getriggert werden soll
    */
   this.triggerEvent = function( key ) {

     if( undefined === this.eventsPool[key] ) {
       return;
     }
     
     var length = this.eventsPool[key].length;
     for (var index = 0; index < length; ++index) {

       var callback = this.eventsPool[key][index];
       try {

         callback();
       } 
       catch( e ) {

         window.$D.errorWindow( e.name, e.message );
       }
     }

   };// this.triggerEvent

    /**
     *
     */
   this.eventInit = function( ) {

    var length = this.initPool.length;
    for (var index = 0; index < length; ++index) {

      var callback = this.initPool[index];
      try {

        callback();
      } 
      catch( e ) {
        
        //alert(e.message);
        window.$D.errorWindow( e.name, e.message );
        //this.desktop.errorWindow( exception.name, exception.message );
      }
    }

   };//end this.eventInit

  /**
   * request the actual running version
   */
  this.getVersion = function( ){
    
    return this.version;
  };//end this.getVersion */

  /**
   * Die Sandbox ist dazu da um Methode einfach in einer gesicherte
   * Umgebung laufen zu lassen.
   * Im Moment beschränkt sich die Sicherung auf einen Try Catch Block
   */
  this.sandbox = function( callback ){

    try{

      callback();
    } 
    catch( e ) {

      $D.errorWindow( e.name, e.message );
    }

  };//end this.sandbox  */

    /**
     * create an empty document fragment
     */
    this.fragment = function(){
      
      return $S(document.createDocumentFragment());
      
    };//end his.fragment


    /**
     * check the type of an object
     * @param obj
     * @param type
     */
    this.nodeType = function(obj,type){
      
      return ( obj.nodeName.toLowerCase() === type.toLowerCase() )?true:false;

    };

    /**
     * check the type of an object
     * @param obj
     */
    this.typeOf = function(obj){
      
      if ( typeof(obj) === 'object' ){
        
        if (obj.length) {

          return 'array';
        } 
        else {

          return 'object';
        }
      } 
      else {
        
        return typeof(obj);
      }
      
    };

    /**
     * check if a given variable is undefined
     * @param obj
     */
    this.undef = function(obj){

      if( typeof obj === 'undefined' ){
        return true;
      }
      else{
        return false;
      }
    };

    /**
     * check if a given variable is empty
     * @param obj
     */
    this.empty = function(obj){

      if( obj === undefined || obj === null || obj === '' ){
        return true;
      }
      else{
        return false;
      }

    };

    /**
     * add a default value to an object
     * @param obj
     * @param key
     * @param val
     */
    this.dval = function(obj,key,val){

      if(this.undef(obj[key])){
        obj[key] = val;
      }

    };
    
    /**
     * @param string classText
     * @param string prefix
     * @param boolean justKey
     */
    this.getClassByPrefix = function( classText, prefix, justKey  ){

      if( justKey === undefined ){
        justKey = true;
      }
      
      if( !classText || typeof classText !== 'string'  ){
        this.printStackTrace("Got empty classText");
        return null;
      }

      var classParts  = classText.split(' ');
      var tmpLenght   = classParts.length;
      var prFixL      = prefix.length;

      for (var index = 0; index < tmpLenght; ++index){

        var classKey = classParts[index];
        if( prefix === classKey.substring(0,prFixL) ) {
          return justKey  ? classKey.substring(prFixL,classKey.length)  : classKey;
        }
      }
      
      return null;

    };//end this.getClassByPrefix
    

    /**
     * 
     * @param string tplId
     */
    this.getTemplate = function( tplId  ){
      
      var tmp = $S( "#"+tplId ).clone();
      tmp.attr('id','');

      return tmp;

    };//end this.getTemplate
    
    /**
     * robuster JSON parser, fängt fehler ab und gibt null zurück
     * wenn das parsen fehlgeschlagen ist
     */
    this.robustParseJSON = function( data ){
     
      var jsonData = {};

      try{
        jsonData = $S.parseJSON(data);
      }
      catch( err ){
        console.error( 'Failed to parse JSON : '+data );
        ///TODO some error handling here
      }
      
      return jsonData;
    
    };//end this.robustParseJSON
    
    /**
     * Create a stacktrace
     * @var message string
     */
    this.printStackTrace = function( message ) {
      
      var callstack = [],
        isCallstackPopulated = false,
        lines;
      
      try {
        
        i.dont.exist+=0; //doesn't exist- that's the point
      } 
      catch(e) {
        
        if (e.stack) { //Firefox
          lines = e.stack.split('\n');
          for (var i=0, len=lines.length; i<len; i++) {
            if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
              callstack.push(lines[i]);
            }
          }
          //Remove call to printStackTrace()
          callstack.shift();
          isCallstackPopulated = true;
        }
        else if (window.opera && e.message) { //Opera
          
          lines = e.message.split('\n');
          
          for (var i=0, len=lines.length; i<len; i++) {
            if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
              var entry = lines[i];
              //Append next line also since it has the file info
              if (lines[i+1]) {
                entry += ' at ' + lines[i+1];
                i++;
              }
              callstack.push(entry);
            }
          }
          //Remove call to printStackTrace()
          callstack.shift();
          isCallstackPopulated = true;
        }
      }
      if (!isCallstackPopulated) { //IE and Safari
        var currentFunction = arguments.callee.caller;
        while (currentFunction) {
          var fn = currentFunction.toString();
          var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf('')) || 'anonymous';
          callstack.push(fname);
          currentFunction = currentFunction.caller;
        }
      }
      
      //console.log( message+" call: "+callstack );
    };
    
    /**
     * den aktuell höchsten z-index auslesen und +1 zurückgeben
     * @return int
     */
    this.getNextHighestZindex = function(){
      
      var highestIndex = 0;
      var currentIndex = 0;
      var elArray = [];
      elArray = document.getElementsByTagName('*');
      
      for(var i=0; i < elArray.length; i++){
        
        if (elArray[i].style){
          
          currentIndex = parseInt(elArray[i].style.zIndex);
        }
        else if(window.getComputedStyle){
          
          currentIndex = parseInt(document.defaultView.getComputedStyle(elArray[i],null).getPropertyValue('z-index'));
        }
        if(!isNaN(currentIndex) && currentIndex > highestIndex){ 
          
          highestIndex = currentIndex; 
        }
      }
      return(highestIndex+1);
    };

  }//end function Wgt  */
  
  

  // Expose Wgt to the global object
  ///@todo get rid of .wgt and .$WGT
  window.$B = window.wgt = window.$WGT = new Wgt();

})(window);

window.$MOM = moment;
window.$NUM = numeral;

/* 
 * Error Handling 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error 
 */

/**
 * Exception für technische fehler, wird nur geworfen wenn ein fehler vom system
 * erkannt wurde.
 * Pi mal Schnauze, wenn der Benutzer egal was er macht den Fehler nicht vermeiden kann.
 * 
 * @param message
 * @param debugInfo
 * @returns {WgtException}
 */
function WgtException( message, debugInfo ) {  
  "use strict";
  this.name = "Internal Error";  
  this.message = message || "Sorry the system detected an error. Try to reload the browser. If this message persists please send a bug report.";  
  this.debugInfo = debugInfo;
}  
WgtException.prototype = new Error();  
WgtException.prototype.constructor = WgtException;  

/**
 * Exception die geworfen wird, wenn ein Benutzer einen fehler gemacht hat
 * der Angefangen werden musste.
 * Das heißt der Benutzer kann durch einen Korrektur seinens Verhaltens den
 * Fehler beheben.
 * 
 * @param message
 * @param debugInfo
 * @returns {WgtUserException}
 */
function WgtUserException( message, debugInfo ) {  
  "use strict";
  this.name = "Ups, that was the wrong way...";  
  this.message = message || "Sorry the system detected an error. Try to reload the browser. If this message persists please send a bug report.";  
  this.debugInfo = debugInfo;
}  
WgtUserException.prototype = new Error();  
WgtUserException.prototype.constructor = WgtUserException;  

/**
 * Exception die geworfen wird, wenn der verwendete Browser nicht kompatibel
 * zu dem ist was eigentlich gerade passieren sollte
 * 
 * @param message
 * @param debugInfo
 * @returns {WgtClientException}
 */
function WgtClientException( message, debugInfo ) {  
  "use strict";
  
  var defMsg = "Your client / browser is to old or ignores common internet standards.";
  defMsg += " Please try Mozilla Firefox, or Google Chrome. This browsers provide a high performance and support ";
  defMsg += " all common internet standards as it is required for this application.";
  
  this.name = "Invalid Client";  
  this.message = message || defMsg;  
  this.debugInfo = debugInfo;
}  
WgtClientException.prototype = new Error();  
WgtClientException.prototype.constructor = WgtUserException;  

// Initialize the system

$S(document).ready(function(){
  "use strict";
  $WGT.eventInit();
});
