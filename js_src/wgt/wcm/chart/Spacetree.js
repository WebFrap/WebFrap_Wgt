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
$R.addAction( 'chart_spacetree', function( jNode ){
  
  window.$B.loadModule('graph');

  jNode.removeClass("wcm_chart_spacetree");

  var dataContainer = jNode.find('var.data');
  var chartData     = window.$B.robustParseJSON(dataContainer.text());
  
  // remove the data container
  dataContainer.remove();
  
  //init PieChart
  var chart = new $jit.ST({
    
    //id of the visualization container
    injectInto: jNode.find('.container').prop('id'),
    
    // Annimation Speed / Duration
    duration: 300,  
    
    // distance between node and its children
    levelDistance: 50,
    
    // Annimation transition type
    transition: $jit.Trans.Quart.easeInOut,  
    
    //Add navigation capabilities:  
    //zooming by scrolling and panning.  
    Navigation: {  
      enable: true,  
      panning: true 
      //zooming: 20  
    },  
    
    //Optional: create a background canvas that plots  
    //concentric circles.  
    /*
    background: {  
      CanvasStyles: {  
        //strokeStyle: '#555'  
      }  
    },
    */  
    

    //Set Node  styles.  
    Node: 
    {  
      height: 23,  
      width: 200,  
      type: 'rectangle',  
      color: '#aaa',  
      overridable: true  
    },  
    
    // Set Edge Styles
    Edge: {  
      type: 'bezier',  
      overridable: true  
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
    onCreateLabel: function(label, node)
    {  
      
      var callbackClick = jNode.parent().data('nodeClick');
      var callbackHover = jNode.parent().data('nodeHover');
      var callbackOut = jNode.parent().data('nodeOut');
      
      label.id = node.id;              
      label.innerHTML = node.name;  
      label.onclick  = function()
      {  
        if(callbackClick != undefined)
          callbackClick(node.data);
        
        chart.onClick(node.id);  
      };

      //set label styles  
      var style = label.style;  
      style.width = 200 + 'px';  
      style.height = 20 + 'px';              
      style.cursor = 'pointer';  
      style.color = '#333';  
      style.fontSize = '0.9em';  
      style.textAlign= 'center';  
      style.paddingTop = '3px';  
      
      label.onmouseover = function()
      {  
        if(callbackHover != undefined)
          callbackHover(node.data);   
      };
      
      label.onmouseout = function()
      {  
        if(callbackOut != undefined)
          callbackOut(node.data); 
      };
       
    },  
    
    //This method is called right before plotting  
    //a node. It's useful for changing an individual node  
    //style properties before plotting it.  
    //The data properties prefixed with a dollar  
    //sign will override the global node style properties.  
    onBeforePlotNode: function(node)
    {  
      //add some color to the nodes in the path between the  
      //root node and the selected node.  
      if (node.selected) 
      {  
        node.data.$color = "#ff7";  
      }  
      else 
      {  
        delete node.data.$color;  
        //if the node belongs to the last plotted level  
        if(!node.anySubnode("exist")) 
        {  
          //count children number  
          var count = 0;  
          node.eachSubnode(function(n) { count++; });  
     
          //assign a node color based on  
          //how many children it has  
          node.data.$color = ['#eee', '#ddd', '#ccc', '#bbb', '#aaa', '#999'][count];                      
        }  
      }  
    },  
    
    //This method is called right before plotting  
    //an edge. It's useful for changing an individual edge  
    //style properties before plotting it.  
    //Edge data proprties prefixed with a dollar sign will  
    //override the Edge global style properties.  
    onBeforePlotLine: function(adj)
    {  
      if (adj.nodeFrom.selected && adj.nodeTo.selected) 
      {  
        adj.data.$color = "#eed";  
        adj.data.$lineWidth = 3;  
      }  
      else 
      {  
        delete adj.data.$color;  
        delete adj.data.$lineWidth;  
      }  
    }  
  });
  
  //load JSON data.
  chart.loadJSON(chartData);
  //end
  
  //compute node positions and layout  
  chart.compute();  
  //optional: make a translation of the tree  
  chart.geom.translate(new $jit.Complex(-200, 0), "current");  
  //emulate a click on the root node.  
  chart.onClick(chart.root);  

});