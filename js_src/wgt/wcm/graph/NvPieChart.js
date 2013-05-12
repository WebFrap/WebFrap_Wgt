/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'nv_pie_chart', function( jNode ){
  
  jNode.removeClass('wcm_nv_pie_chart');

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
    var chart = nv.models.pieChart()
       .x(function(d) { return d.label })
       .y(function(d) { return d.value })
       .showLabels(true);

    d3.select('#'+jNode.attr('id')+' svg')
       .datum(data)
         .transition().duration(1200)
       .call(chart);

    return chart;
  });
 
  
});
