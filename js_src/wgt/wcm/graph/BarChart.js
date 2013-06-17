/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Data structure
{
 "xl":"",
 "yl":"Label",
 "values":"key,value\n
A,.08167\n
B,.01492\n
C,.02780\n
D,.04253\n
E,.12702\n
F,.02288
}
 */

/* css
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {
  fill: steelblue;
}

.x.axis path {
  display: none;
}
 */

/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 * 
 * Based on: http://bl.ocks.org/mbostock/3885304
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'bar_chart', function( jNode ){
  
  jNode.removeClass('wcm_bar_chart');

  window.$B.loadModule('d3');

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatPercent = d3.format(".0%");

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
  
  var y = d3.scale.linear()
    .range([height, 0]);
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

  var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

  var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

  var svg = d3.select('#'+jNode.attr('id'))
    .append("svg")
    .attr("width", jNode.innerWidth() )
    .attr("height", jNode.innerHeight() )
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  var data = d3.csv.parse(graphData.values);
  jNode.find('var').remove();
  
  data.forEach(function(d) {
    d.value = +d.value;
  });

  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("value");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
});
