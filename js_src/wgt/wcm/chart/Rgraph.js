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
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'chart_rgraph', function( jNode ){

  window.$B.loadModule('graph');
  
  jNode.removeClass("wcm_chart_rgraph");

  var dataContainer = jNode.find('var.data');
  var chartData     = window.$B.robustParseJSON(dataContainer.text());
  
  // remove the data container
  dataContainer.remove();
  
  //init PieChart
  var chart = new $jit.RGraph({
    
    //id of the visualization container
    injectInto: jNode.find('.container').prop('id'),
    
    //Optional: create a background canvas that plots  
    //concentric circles.  
    background: {  
      CanvasStyles: {  
        strokeStyle: '#555'  
      }  
    },  
    
    //Add navigation capabilities:  
    //zooming by scrolling and panning.  
    Navigation: {  
      enable: true,  
      panning: true,  
      type:'replot',
      zooming: 20  
    },  
    
    //Set Node  styles.  
    Node: {  
        color: '#ddeeff'  
    },  
    // Set Edge Styles
    Edge: {  
      color: '#C17878',  
      lineWidth:1.5  
    },  

    onBeforeCompute: function(node)
    {    
      //Add the relation list in the right column.  
      //This list is taken from the data property of each JSON node.  
      //$jit.id('inner-details').innerHTML = node.data.relation;  
    },  
      
    onAfterCompute: function()
    {  

    },  
    //Add the name of the node in the correponding label  
    //and a click handler to move the graph.  
    //This method is called once, on label creation.  
    onCreateLabel: function(domElement, node)
    {  
      
      domElement.innerHTML = node.name;  
      var style = domElement.style;
      
      var callbackClick = jNode.parent().data('nodeClick');
      var callbackHover = jNode.parent().data('nodeHover');

      domElement.onclick = function()
      {  
        chart.onClick(node.id);  
        if(callbackClick != undefined)
          callbackClick(node.data);
      };
      
      domElement.onmouseover = function()
      {  
        style.fontSize = "14px";  
        style.backgroundColor = '#FFDCA8'; 
        style.zIndex = 2; 
        
        if(callbackHover != undefined)
          callbackHover(node.data);   
      };
      
      domElement.onmouseout = function()
      {  
        style.fontSize = "12px";  
        style.backgroundColor = ''; 
        style.zIndex = 1; 
      };
       
    },  
    //Change some label dom properties.  
    //This method is called each time a label is plotted.  
    onPlaceLabel: function(domElement, node)
    {  
      var style = domElement.style;  
      style.display = '';  
      style.cursor = 'pointer';  

      if (node._depth <= 1) 
      {  
        style.fontSize = "12px";  
        style.color = "#000000";  
      } 
      else if(node._depth == 2)
      {  
        style.fontSize = "12px";  
        style.color = "#494949"; 
      } 
      else 
      {  
        style.display = 'none';  
      }  

      var left = parseInt(style.left);  
      var w = domElement.offsetWidth;  
      style.left = (left - w / 2) + 'px';  
    }  
  });
  
  //load JSON data.
  chart.loadJSON(chartData);
  //end
  
  //trigger small animation  
  chart.graph.eachNode(function(n) {  
    var pos = n.getPos();  
    pos.setc(-200, -200);  
  });  

  
  chart.compute('end');  
  chart.fx.animate({  
    modes:['polar'],  
    duration: 100
  });  

});