
/*******************************************************************************
*   ____    _    ____    ____                              _
*  / ___|  / \  |  _ \  |  _ \ ___ ___  ___  __ _ _ __ ___| |__
*  \___ \ / _ \ | |_) | | |_) / _ \ __|/ _ \/ _` | '__/ __| '_ \
*   ___) / ___ \|  __/  |  _ <  __\__ \  __/ (_| | | | (__| | | |
*  |____/_/   \_\_|     |_| \_\___|___/\___|\__,_|_|  \___|_| |_|
*
********************************************************************************
*
* @author      : Marko Andrijasevic <marko.andrijasevic@sap.com>
*              : integration Milos Kosanovic
* @company     : SAP Research
* @copyright   : SAP Research
* @project     : InnoSuite Plattform
* @projectUrl  : https://innosuite.qkal.sap.corp
* @licence     : NON GPL, Free for SAP internal use, no distribution
*
* @version     : 1
* @revision    : 1
*
* Changes:
*
*******************************************************************************/

/**
* jQuery plugin that displays circle popup menu 
* @param cacheData optional, default true
* Requires: jit.js, excanvas.js
*/

;(function($, undefined){
  
  jQuery.fn.colorPicker = function(cascheData){
      cont = new colorPickerContainer(); 
      return cont;
  };


  function colorPickerContainer(){
  
  
  //class name of the elements that should display circle menu onClick
  var menuParentClass = '.circleMenu';
  
  //dim2 is set to true if 2d menu is used
  var dim2 = false;
  
  var config2d = {
      //default values for 2d menu
      levelDistance: 70
  }
  
  var config = {
      //default values for 1d menu
      useGradients: true, 
      nativeTextSupport: true,
      levelDistance: 25,
      nodeHeight: 80,
      labelType: 'HTML',
      labelFontSize: 13,
      labelFontFamily: 'sans-serif',
      nodeHoverColor: '#dd3333',  //'#EFAB00',
      nodeClickColor: '#dd3333',  //'#EFAB00',
      nodeHoverDuration: 500,
      htmlFontSize: '10pt',
      htmlFontColor: '#fff'
    };    
  
     
    (function(){
      var ua = navigator.userAgent,
          iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
          typeOfCanvas = typeof HTMLCanvasElement,
          nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
          textSupport = nativeCanvasSupport 
            && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
      //I'm setting this based on the fact that ExCanvas provides text support for IE
      //and that as of today iPhone/iPad current text support is lame
      labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
      nativeTextSupport = labelType == 'Native';
      useGradients = nativeCanvasSupport;
      animate = !(iStuff || !nativeCanvasSupport);
    })();
    
    //assing menu id that is needed for JIT library injection
    //if( typeof $.fn.bindCircleMenu.counter == 'undefined' )
    //      $.fn.bindCircleMenu.counter = 0;
    //$.fn.bindCircleMenu.counter++;
    //var menuId = "circleMenu_" + $.fn.bindCircleMenu.counter;
    
    //initialises circle menu and draws it into the div
    function init(jsonData){
      //init Sunburst
      var sb = new $jit.Sunburst({
        //id container for the visualization
        injectInto: 'circleMenuBox',
        //Change node and edge styles such as
        //color, width, lineWidth and edge types
        Node: {
          overridable: true,
          type: config.useGradients? 'gradient-multipie' : 'multipie'
        },
        //Draw canvas text. Can also be
        //'HTML' or 'SVG' to draw DOM labels
        Label: {
            overridable: false,  
        type: config.labelType, //'SVG', 'Native', 'HTML  
        //type: config.nativeTextSupport? 'Native' : 'SVG',
        //style: ' ',  
        size: config.labelFontSize,  
        family: config.labelFontFamily,  
        textAlign: 'center',  
        textBaseline: 'alphabetic',  
        color: '#fff'
        },
        //Add animations when hovering and clicking nodes
    
        NodeStyles: {
          enable: true,
          type: 'Native',
          stylesClick: {
      'color': config.nodeClickColor,
      'height': 80
          },
          stylesHover: {
            'color': config.nodeHoverColor,
      'height': 75
          },
          duration: config.nodeHoverDuration
        },
        Events: {
          enable: true,
          type: 'Native',
          onClick: function(node, eventInfo, e){
        if (!node){
          closeCircleMenu();
          return;
        }
        onClickHandler(node.data.$url, node.data.$handlerCode, eventInfo, e);
        closeCircleMenu();
          }
        },
        levelDistance: config.levelDistance,
        // Only used when Label type is 'HTML' or 'SVG'
        // Add text to the labels. 
        // This method is only triggered on label creation
        onCreateLabel: function(domElement, node){
          var labels = sb.config.Label.type;
          if (labels === 'HTML') {
            domElement.innerHTML = node.name;
          } else if (labels === 'SVG') {
            domElement.firstChild.appendChild(document.createTextNode(node.name));
          }
        },
        // Only used when Label type is 'HTML' or 'SVG'
        // Change node styles when labels are placed
        // or moved.
        onPlaceLabel: function(domElement, node){
          var labels = sb.config.Label.type;
          if (labels === 'SVG') {
            var fch = domElement.firstChild;
            var style = fch.style;
            style.display = '';
            style.cursor = 'pointer';
            style.fontSize = "0.9em";
            fch.setAttribute('fill', "#fff");
          } else if (labels === 'HTML') {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            if (node._depth <= 1) {
              style.fontSize = config.htmlFontSize;
              style.color = config.htmlFontColor;
            } 
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
          }
        }
      }); 
      // load JSON data.
      sb.loadJSON(jsonData);
      // compute positions and plot.
      sb.refresh();
      //end
    }
  
  function init2d(jsonData){
   //end
    //init Sunburst
    var sb = new $jit.Sunburst({
        //id container for the visualization
        injectInto: 'circleMenuBox',
        //Distance between levels
        levelDistance: config2d.levelDistance,
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
          overridable: true,
          type: useGradients? 'gradient-multipie' : 'multipie'
        },
        //Select canvas labels
        //'HTML', 'SVG' and 'Native' are possible options
        Label: {
          type: labelType
        },
        //Change styles when hovering and clicking nodes
        NodeStyles: {
          enable: true,
          type: 'Native',
          stylesClick: {
            'color': '#33dddd'
          },
          stylesHover: {
            'color': '#dd3333'
          }
        },
       
        //implement event handlers 
        Events: {
          enable: true,
          onClick: function(node, eventInfo, e) {
              if(!node){
                closeCircleMenu();
                return;
              }
            if(node._depth < 2){
              //rotate
              sb.rotate(node, animate? 'animate' : 'replot', {
              duration: 1000,
              transition: $jit.Trans.Quart.easeInOut
              });
            }
            else{
              //execute handler
              onClickHandler(node.data.$url, node.data.$handlerCode, eventInfo, e);
              closeCircleMenu();
            }
          }
        },
        // Only used when Label type is 'HTML' or 'SVG'
        // Add text to the labels. 
        // This method is only triggered on label creation
        onCreateLabel: function(domElement, node){
          var labels = sb.config.Label.type,
              aw = node.getData('angularWidth');
          if (labels === 'HTML' && (node._depth < 2 || aw > 2000)) {
            domElement.innerHTML = node.name;
          } else if (labels === 'SVG' && (node._depth < 2 || aw > 2000)) {
            domElement.firstChild.appendChild(document.createTextNode(node.name));
          }
        },
        // Only used when Label type is 'HTML' or 'SVG'
        // Change node styles when labels are placed
        // or moved.
        onPlaceLabel: function(domElement, node){
          var labels = sb.config.Label.type;
          if (labels === 'SVG') {
            var fch = domElement.firstChild;
            var style = fch.style;
            style.display = '';
            style.cursor = 'pointer';
            style.fontSize = "0.8em";
            fch.setAttribute('fill', "#fff");
          } else if (labels === 'HTML') {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            style.fontSize = "0.8em";
            style.color = "#ddd";
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
          }
        }
   });
    //load JSON data.
    sb.loadJSON(jsonData);
    //compute positions and plot.
    sb.refresh();
    //end
  }
  
  
    //Checks for cached data for circle menu
    function fetchJsonData(obj){    
        //If data is set with jquery .data() method read it from there
    tempData = $(obj).data("circleMenuData")
        if (typeof tempData != 'undefined') return tempData;
        
        //If it's set as a hidden span inside of clicked element
    tempData = $(obj).find('span.circleMenuData');
    
        if($(tempData).length > 0){
          
          try
          {
            var jsonData = jQuery.parseJSON($(tempData).text())
            return jsonData;
          }
          catch( e )
          {
            return null;
          }
          
            
        }   
    
        return null;
    }
    
    //Checks if there is a custom handler defined within the current element
    function onClickHandler(url, handler, eventInfo, e){        
        if(typeof handler != 'undefined'){
      handler();
        }
        else{ 
            window.location = url;
        }
    }
  
  //Appends the div that it needed for JIT to display data
  function drawCircleMenu(jsonData, e){
    //size of the menu div
    var boxSize = 2 * (config.nodeHeight + config.levelDistance);
    if(dim2) boxSize = 6 * config2d.levelDistance;
  
    var width = boxSize;
        var height = boxSize;       
    
    //adjust coords if they are too close to the page border
        docWidth = document.documentElement.clientWidth;
        docHeight = document.documentElement.clientHeight;
        var x = e.pageX - width/2;
        var y = e.pageY - height/2;
    
    if((docWidth - e.pageX) < width) x = (e.pageX - width);
        if((docHeight - e.pageY) < height) y = (e.pageY - height);
    
    if((e.pageX - width/2) < 0) x = 0;
        if((e.pageY - width/2) < 0) y = 0;
     
    /* 
      //find max z-index
      var z = Math.max.apply(null,$.map($('*'), function(e,n){ 
            return parseInt($(e).css('z-index')) || 1;
        }));
    */
    
    //Dominik's constant :)
    z = 5000;
        
    //close the menu if it's already opened
    closeCircleMenu();
    
    var $closer = jQuery("<div id=\"closeArea\"></div>").appendTo('body');
    $closer.css({width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', 'z-index': z});
    jQuery('#closeArea').click(function(e){
      closeCircleMenu();  
    });
    
    var $menu = jQuery("<div id=\"circleMenuBox\"></div>").appendTo('body').hide();
    $menu.css({width: width+'px', height: height+'px', position: 'absolute', left: x + 'px', top: y + 'px', 'z-index': z+1});
    $menu.fadeIn(500);
    
    if(dim2) init2d(jsonData);
    else init(jsonData);
  }
  
  //closes the circle menu
  function closeCircleMenu(){
    $('#closeArea').remove();
    $('#circleMenuBox').remove();
  }
  
    jQuery('document').ready(function(){    
        jQuery(menuParentClass).each(function(){    
            $(this).click(function(e){
                var $currentItem = $(this);
                    
        jsonData = fetchJsonData(this);
        if(jsonData){
          if(typeof jsonData.children != 'undefined') dim2 = true;
          else dim2 = false;
          drawCircleMenu(jsonData, e);
        }
        else{
          $circleMenuData = $(this).find('a.circleMenuData');
          if($circleMenuData.length > 0){
            url = $circleMenuData.prop('href');
            $.ajax({url: url,
              async: 'false',
              dataType: 'json',
              success: function(data){
                if(typeof data.children != 'undefined') dim2 = true;
                else dim2 = false;
                if(cacheData){
                  $currentItem.data('circleMenuData', data);
                }
                if(data){
                  drawCircleMenu(data, e);                                      
                }
                else{
                   throw "CircleMenuDataError";
                }
              },
              error:  function(){
                throw "CircleMenuAjaxError";    
                }
              });
          } 
          else{
            throw "CircleMenuDataError";
          }
        }   
             }) //end click
            }); //end each
        }); //end ready
    return this;
    };//end plugin


})(jQuery);
