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
$R.addAction( 'chart_pie', function( jNode ){

  window.$B.loadModule('graph');
  
  jNode.removeClass("wcm_chart_pie");

  var dataContainer = jNode.find('var.data');
  var chartData = window.$B.robustParseJSON(dataContainer.text());
  
  // remove the data container
  dataContainer.remove();
  
  //init PieChart
  var pieChart = new $jit.PieChart({
    //id of the visualization container
    injectInto: jNode.find('.container').prop('id'),
    //whether to add animations
    animate: true,
    //offsets
    offset: 30,
    sliceOffset: 0,
    labelOffset: 20,
    //slice style
    type: $UI.graph.useGradients? 'stacked:gradient' : 'stacked',
    //whether to show the labels for the slices
    showLabels:true,
    //resize labels according to
    //pie slices values set 7px as
    //min label size
    resizeLabels: 7,
    //label styling
    Label: {
      type: $UI.graph.labelType, //Native or HTML
      size: 20,
      family: 'Verdana',
      color: 'black'
    },
    //enable tips
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
         tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
      }
    }
  });
  
  //load JSON data.
  pieChart.loadJSON(chartData);
  //end
  
  var list = $jit.id(jNode.find('.legend').prop('id'));

  //dynamically add legend to list
  var legend = pieChart.getLegend(),
      listItems = [];
  
  for(var name in legend) {
    listItems.push('<div class=\'query-color\' style=\'background-color:'
        + legend[name] +'\'>&nbsp;</div>' + name);
  }
  
  list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
    
  /*
  // update
  jNode.data('update',function( formId ){ 
    
    var jsonData = $R.form(formId).data;
    //alert(jsonData.label[0]);
    
    pieChart.updateJSON(jsonData);
  });
  */

});