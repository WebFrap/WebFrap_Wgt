/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'line_chart', function( jNode ){

  jNode.removeClass('wcm_line_chart');
  window.$B.loadModule('d3');

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.val); });

  var svg = d3.select('#'+jNode.attr('id'))
      .append("svg")
      .attr("width", jNode.innerWidth() )
      .attr("height", jNode.innerHeight() )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  var data = d3.csv.parse(graphData.values);
  jNode.find('var').remove();
  
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var gValues = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        console.log( name+" "+d[name] );
        return {date: d.date, val: parseFloat(d[name])};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(gValues, function(c) { return d3.min(c.values, function(v) { return v.val; }); }),
    d3.max(gValues, function(c) { return d3.max(c.values, function(v) { return v.val; }); })
  ]);

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
      .text(graphData.ly);

  var value = svg.selectAll(".value")
      .data(gValues)
    .enter().append("g")
      .attr("class", "value");

  value.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  value.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.val) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

});
