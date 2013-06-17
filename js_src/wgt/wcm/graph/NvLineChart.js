/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'nv_line_chart', function( jNode ){
  
  jNode.removeClass('wcm_nv_line_chart');

  window.$B.loadModule('d3');

  var data = window.$B.robustParseJSON(jNode.find('var').text());
  console.log(jNode.find('var').text());
  jNode.find('var').remove();
  jNode.html('<svg style="height:500px;">');
  
  
  /** data format
    {
      "x":{"label":"Label X-Axis","format":d3_format},
      "y":{"Label Y-Axis","format":d3_format},
      "data":[
      {
        "values":["x":int,"y":int],
        "key":"Line label",
        "color":"#hexvaue",
      }
      ],
    }
   */

  nv.addGraph(function() {  
    var chart = nv.models.lineChart();
    
    chart.xAxis
       .axisLabel(data.x.label)
       .tickFormat(d3.format(data.x.format));
     
    chart.yAxis
       .axisLabel(data.y.label)
       .tickFormat(d3.format(data.y.format));
    
    d3.select('#'+jNode.attr('id')+' svg')
      .datum(data.data)
      .transition().duration(500)
      .call(chart);
    
    nv.utils.windowResize(function() { d3.select('#'+jNode.attr('id')+' svg').call(chart) });
    
    return chart;
  });
 
});
