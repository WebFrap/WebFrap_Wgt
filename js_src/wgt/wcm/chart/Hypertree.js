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
$R.addAction( 'chart_hypertree', function( jNode ){

  
  window.$B.loadModule('graph');
  
  jNode.removeClass("wcm_chart_hypertree");

  var dataContainer = jNode.find('var.data');
  var chartData     = window.$B.robustParseJSON(dataContainer.text());
  
  // remove the data container
  dataContainer.remove();
  
  // get width & height
  var container = jNode.find('.container');
  var cNode = container.get(0);
  var w = cNode.offsetWidth - 50, 
    h = cNode.offsetHeight - 50;

  
  //init PieChart
  var chart = new $jit.Hypertree({
    
    //id of the visualization container
    injectInto: container.prop('id'),
    
    //canvas width and height  
    width: w,  
    height: h,    
    
    //Change node and edge styles such as  
    //color, width and dimensions.  
    Node: {  
      dim: 9,  
      color: "#f00"  
    },  
    Edge: {  
      lineWidth: 2,  
      color: "#088"  
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
      
      var callbackClick = jNode.parent().data('nodeClick');
      var callbackHover = jNode.parent().data('nodeHover');
      var callbackOut   = jNode.parent().data('nodeOut');
      
      domElement.innerHTML = node.name;  
      $jit.util.addEvent(domElement, 'click', function () 
      {  
        if(callbackClick != undefined)
          callbackClick(node.data);
        
        chart.onClick(node.id);  
      });  
      
      domElement.onmouseover = function()
      {  
        if(callbackHover != undefined)
          callbackHover(node.data);   
      };
      
      domElement.onmouseout = function()
      {  
        if(callbackOut != undefined)
          callbackOut(node.data); 
      };

       
    },  
    
    //Change node styles when labels are placed  
    //or moved.  
    onPlaceLabel: function(domElement, node)
    {  
      var style = domElement.style;  
      style.display = '';  
      style.cursor = 'pointer';  
      if (node._depth <= 1) 
      {  
        style.fontSize = "1em";  
        style.color = "#222";  
       
      } 
      else if(node._depth == 2)
      {  
        style.fontSize = "0.9em";  
        style.color = "#444";  
     
      } 
      else 
      {  
        style.display = 'none';  
      }  
       
      var left = parseInt(style.left);  
      var w = domElement.offsetWidth;  
      style.left = (left - w / 2) + 'px';  
    },  
        
    onAfterCompute: function()
    {  

    }
    
  });
  
  //load JSON data.
  chart.loadJSON(chartData);
  //end
  
  //compute node positions and layout  
  chart.refresh();   
  
  //end
  chart.controller.onAfterCompute();


});