/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'nv_scatter_chart', function( jNode ){
  
  jNode.removeClass('wcm_nv_scatter_chart');

  window.$B.loadModule('d3');

  var data = window.$B.robustParseJSON(jNode.find('var').text());
  console.dir(data);
  jNode.find('var').remove();
  jNode.html('<svg style="height:500px;">');
  

  /** data format
[
  {
    key: "Cumulative Return",
    values: [
      { 
       "label" : "CDS / Options" ,
       "value" : 29.765957771107
      }, 
      { 
        "label" : "Cash" , 
        "value" : 0
      }
    ]
  }
]
   */
  
  nv.addGraph(function() {
    var chart = nv.models.scatterChart()
                  .showDistX(true)
                  .showDistY(true)
                  .color(d3.scale.category10().range());

    chart.xAxis.tickFormat(d3.format(data.x.format))
    chart.yAxis.tickFormat(d3.format(data.y.formt))

    d3.select('#'+jNode.attr('id')+' svg')
        .datum(data.data)
      .transition().duration(500)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });

  
});
