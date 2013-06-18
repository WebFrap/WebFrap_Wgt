/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'nv_stacked_line_bar', function( jNode ){
  
  jNode.removeClass('wcm_nv_stacked_line_bar');

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
  
    var graphData = data.data;
    
    graphData[0].type = "bar";
    graphData[1].type = "bar";
    graphData[2].type = "line";
        
    var dateFormat = d3.time.format("%Y-%m-%d");
    
    var outputFormat = d3.time.format("%b %y");
    
    graphData.map( function(nodes) {
        nodes.values.map( function(d) {
            d.x = dateFormat.parse(d.x);
        } );
    } );
    
    var chart;
    
    nv.addGraph(function() {
        chart = nv.models.stackedLineBar()
            .margin({top: 30, right: 60, bottom: 50, left: 80})
            .color(d3.scale.category10().range())
            .x(function(d,i) { return i })
            .y(function(d) { return d.y });
        
        chart.xAxis
        .tickFormat(function(d, i) {
            return d3.time.format("%b %y")(new Date(d));
         } )
         .rotateLabels(-45);
        
        chart.yAxis
            .tickFormat(d3.format(',.1f'))
            .axisLabel('Effort in person days')
    
        chart.bars.stacked(true);
    
        d3.select('#'+jNode.attr('id')+' svg')
            .datum(graphData)
            .transition()
            .duration(500)
            .call(chart);
        
        return chart;
    });

 
});
