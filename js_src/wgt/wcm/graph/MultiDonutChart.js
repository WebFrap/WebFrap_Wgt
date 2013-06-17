/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Data structure
{
 "xl":"",
 "yl":"",
 "values":"key,value
<5,2704659\n
5-13,4499890\n
14-17,2159981\n
18-24,3853788\n
25-44,14106543\n
45-64,8819342\n
≥65,612463\n"
}
 */

/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'multi_donut_chart', function( jNode ){
  
  jNode.removeClass('wcm_multi_donut_chart');

  window.$B.loadModule('d3');

  var radius = 74,
    padding = 10;
  
  var color = d3.scale.category20();

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);
  
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  var data = d3.csv.parse(graphData.values);
  jNode.find('var').remove();
  
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });

  var legend = d3.select('#'+jNode.attr('id')).append("svg")
      .attr("class", "legend")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .selectAll("g")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  var svg = d3.select('#'+jNode.attr('id')).selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  svg.selectAll(".arc")
      .data(function(d) { return pie(d.ages); })
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  svg.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.State; });

});
