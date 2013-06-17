/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Css Classes
  .bullet { font: 10px sans-serif; }
  .bullet .marker { stroke: #000; stroke-width: 2px; }
  .bullet .tick line { stroke: #666; stroke-width: .5px; }
  .bullet .range.s0 { fill: #eee; }
  .bullet .range.s1 { fill: #ddd; }
  .bullet .range.s2 { fill: #ccc; }
  .bullet .measure.s0 { fill: lightsteelblue; }
  .bullet .measure.s1 { fill: steelblue; }
  .bullet .title { font-size: 14px; font-weight: bold; }
  .bullet .subtitle { fill: #999; }
 */

/* Data Format
[
  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]},
  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
]
*/

/**
 * WGT Web Gui Toolkit
 *
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'bullet_chart', function( jNode ){
  
  jNode.removeClass('wcm_bullet_chart');

  window.$B.loadModule('d3');

  var margin = {top: 5, right: 40, bottom: 20, left: 120},
    width = jNode.innerWidth() - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

  var chart = d3.bullet()
    .width(width)
    .height(height);
  
  var data = window.$B.robustParseJSON(jNode.find('var').text());
  jNode.find('var').remove();

  var svg = d3.select('#'+jNode.attr('id')).selectAll("svg")
    .data(data)
  .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", jNode.innerWidth() )
    .attr("height", 50 )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart);;

  var title = svg.append("g")
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
    .attr("class", "title")
    .text(function(d) { return d.title; });

  title.append("text")
    .attr("class", "subtitle")
    .attr("dy", "1em")
    .text(function(d) { return d.subtitle; });



});
