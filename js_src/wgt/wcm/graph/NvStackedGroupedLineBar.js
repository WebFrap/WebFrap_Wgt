$R.addAction( 'nv_stacked_grouped_line_bar', function( jNode ){
  
  jNode.removeClass('wcm_nv_stacked_grouped_line_bar');

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
  
  //########################################
  
  var parseDate = d3.time.format("%Y-%m-%d").parse;
  var dateFormat = d3.time.format("%b-%y");

  var graphData = data.data;
  
  graphData[0].bar = true;
  graphData[1].bar = true;
  
  var testParse = d3.time.format("%Y-%m-%d").parse;
  var testFormat = d3.time.format("%b %y");

  var dateFormat = d3.time.format("%Y-%m-%d");

  graphData.map( function(nodes) {
      nodes.values.map( function(d) {
          d.x = dateFormat.parse(d.x);
      } );
  } );
  
  var chart;
  
  nv.addGraph(function() {
      chart = nv.models.stackedGrouped_lineBar()
          .x(function(d,i) { return i })
          .y(function(d) { return d.y });
                
      chart.xAxis
          .tickFormat(function(d) {
              var localDate = graphData[0].values[d].x
              return testFormat(localDate);
           } )
           .rotateLabels(-45);

      chart.yAxis
          .tickFormat(d3.format(',.1f'))
          .axisLabel('Effort in person days');
      
      chart.bars.stacked(true);

      d3.select('#'+jNode.attr('id')+' svg')
          .datum(graphData)
          .transition()
          .duration(500)
          .call(chart);
      
      nv.utils.windowResize(function() { d3.select('#'+jNode.attr('id')+' svg').call(chart) });

      return chart;
  });
 
});
