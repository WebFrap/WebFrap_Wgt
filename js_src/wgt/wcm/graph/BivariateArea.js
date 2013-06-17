/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'bivariate_area', function( jNode ){

  jNode.removeClass('wcm_bivariate_area');
  window.$B.loadModule('d3');

  var parseDate = d3.time.format("%Y-%m-%d").parse;
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;

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

  var svg = d3.select('#'+jNode.attr('id'))
      .append("svg")
      .attr("width", jNode.innerWidth() )
      .attr("height", jNode.innerHeight() )
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var area = d3.svg.area()
  .x(function(d) { return x(d.date); })
  .y0(function(d) { return y(d.low); })
  .y1(function(d) { return y(d.high); });
  
  var data = window.$B.robustParseJSON(jNode.find('var').text());
  jNode.find('var').remove();

  data.forEach( function(d) {
    d.date = parseDate(d.date);
    d.low = +d.low;
    d.high = +d.high;
  });
  
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([d3.min(data, function(d) { return d.low; }), d3.max(data, function(d) { return d.high; })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

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
