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
$R.addAction( 'pie_chart', function( jNode ){
  
  jNode.removeClass('wcm_pie_chart');

  window.$B.loadModule('d3');

  var width = jNode.innerWidth(),
      height = jNode.innerHeight(),
      radius = Math.min(width, height) / 2;
  
  console.log("w: "+width+" h:"+height+" r:"+radius);
  
  var color = d3.scale.category20();

  var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });
  
  var svg = d3.select('#'+jNode.attr('id')).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  var data = d3.csv.parse(graphData.values);
  jNode.find('var').remove();
  
  data.forEach(function(d) {
    d.value = +d.value;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.key); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + (arc.centroid(d)+50) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.key; });

});
