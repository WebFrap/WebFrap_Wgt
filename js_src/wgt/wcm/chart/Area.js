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
$R.addAction( 'chart_area', function( jNode ){
  
  "use strict";
  
  window.$B.loadModule('graph');
  
  jNode.removeClass("wcm_chart_area");

  var dataContainer = jNode.find('var.data');
  var chartData = window.$B.robustParseJSON(dataContainer.text());
  
  // remove the data container
  dataContainer.remove();
  
  //init AreaChart
  var areaChart = new $jit.AreaChart({
    //id of the visualization container
    injectInto: jNode.find('.container').prop('id'),
    //add animations
    animate: true,
    //separation offsets
    Margin: {
      top: 5,
      left: 5,
      right: 5,
      bottom: 5
    },
    labelOffset: 10,
    //whether to display sums
    showAggregates: true,
    //whether to display labels at all
    showLabels: true,
    //could also be 'stacked'
    type: $UI.graph.useGradients? 'stacked:gradient' : 'stacked',
    //label styling
    Label: {
      type: $UI.graph.labelType, //can be 'Native' or 'HTML'
      size: 13,
      family: 'Arial',
      color: 'black'
    },
    //enable tips
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
        tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
      }
    },
    //add left and right click handlers
    filterOnClick: true,
    restoreOnRightClick:true
  });
  
  //load JSON data.
  areaChart.loadJSON(chartData);
  
  //end
  var list = $jit.id(jNode.find('.legend').prop('id')); //,
  /*
      button = $jit.id('update'),
      restoreButton = $jit.id('restore');
  */
  /*
  //update json on click
  $jit.util.addEvent(button, 'click', function() {
    var util = $jit.util;
    if(util.hasClass(button, 'gray')) return;
    util.removeClass(button, 'white');
    util.addClass(button, 'gray');
    areaChart.updateJSON(json2);
  });
  */
  
  /*
  //restore graph on click
  $jit.util.addEvent(restoreButton, 'click', function() {
    areaChart.restore();
  });
  */
  
  
  //dynamically add legend to list
  var legend = areaChart.getLegend(),
    listItems = [];
  
  for( var name in legend ) {
    listItems.push('<div class=\'query-color\' style=\'background-color:'+ legend[name] +'\'>&nbsp;</div>' + name);
  }
  
  list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
  
  /*
  // update
  jNode.data('update',function( formId ){ 
    areaChart.updateJSON($R.form(formId).data);
  });
  */

});