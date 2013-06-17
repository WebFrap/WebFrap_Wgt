/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Data structure
{
 "xl":"",
 "yl":"",
 "values":"State,Under 5 Years,5 to 13 Years,14 to 17 Years,18 to 24 Years,25 to 44 Years,45 to 64 Years,65 Years and Over\n
AL,310504,552339,259034,450818,1231572,1215966,641667\n
AK,52083,85640,42153,74257,198724,183159,50277\n
AZ,515910,828669,362642,601943,1804762,1523681,862573\n
AR,202070,343207,157204,264160,754420,727124,407205\n
CA,2704659,4499890,2159981,3853788,10604510,8819342,4114496\n
CO,358280,587154,261701,466194,1464939,1290094,511094\n
CT,211637,403658,196918,325110,916955,968967,478007\n
DE,59319,99496,47414,84464,230183,230528,121688\n
DC,36352,50439,25225,75569,193557,140043,70648"
}
 */

/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'norm_stacked_bar_chart', function( jNode ){
  
  jNode.removeClass('wcm_norm_stacked_bar_chart');

  window.$B.loadModule('d3');

  var margin = {top: 20, right: 150, bottom: 30, left: 50},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;


  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .rangeRound([height, 0]);

  var color = d3.scale.category20();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"));

  var svg = d3.select('#'+jNode.attr('id'))
    .append("svg")
    .attr("width", jNode.innerWidth() )
    .attr("height", jNode.innerHeight() )
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  var data = d3.csv.parse(graphData.values);
  jNode.find('var').remove();
  
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
  });

  data.sort(function(a, b) { return b.ages[0].y1 - a.ages[0].y1; });

  x.domain(data.map(function(d) { return d.State; }));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.select(".state:last-child").selectAll(".legend")
      .data(function(d) { return d.ages; })
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d) { return "translate(" + ((x.rangeBand() / 2)+30) + "," + y((d.y0 + d.y1) / 2) + ")"; });

  legend.append("line")
      .attr("x2", 10);

  legend.append("text")
      .attr("x", 13)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

});
