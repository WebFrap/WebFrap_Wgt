/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/**
date   New York      San Francisco
20111001      63.4   62.7
20111002      58.0   59.9
20111003      53.3   59.1
20111004      55.7   58.8
20111005      64.2   58.7
20111006      58.8   57.0
20111007      57.9   56.7
20111008      61.8   56.8
20111009      69.3   56.7
20111010      71.2   60.1
20111011      68.7   61.1
20111012      61.8   61.5 
 */

/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 * 
 * @see original: http://bl.ocks.org/mbostock/3894205
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'diffrence_area', function( jNode ){

  jNode.removeClass('wcm_diffrence_area');
  window.$B.loadModule('d3');


  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse;
  
  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  var line = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d["New York"]); });
  
  var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["New York"]); });

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
    d.date = parseDate(d.date);
    d["New York"]= +d["New York"];
    d["San Francisco"] = +d["San Francisco"];
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(data, function(d) { return Math.min(d["New York"], d["San Francisco"]); }),
    d3.max(data, function(d) { return Math.max(d["New York"], d["San Francisco"]); })
  ]);

  svg.datum(data);

  svg.append("clipPath")
      .attr("id", "clip-below")
    .append("path")
      .attr("d", area.y0(height));

  svg.append("clipPath")
      .attr("id", "clip-above")
    .append("path")
      .attr("d", area.y0(0));

  svg.append("path")
      .attr("class", "area above")
      .attr("clip-path", "url(#clip-above)")
      .attr("d", area.y0(function(d) { return y(d["San Francisco"]); }));

  svg.append("path")
      .attr("class", "area below")
      .attr("clip-path", "url(#clip-below)")
      .attr("d", area);

  svg.append("path")
      .attr("class", "line")
      .attr("d", line);

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
      .text("Temperature (ºF)");


});
