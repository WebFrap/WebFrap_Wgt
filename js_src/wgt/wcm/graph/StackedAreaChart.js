/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Data structure
{
 "xl":"",
 "yl":"",
 "values":"date,IE,Chrome,Firefox,Safari Opera\n
11-Oct-13,41.62,22.36,25.58,9.13,1.22\n
11-Oct-14,41.95,22.15,25.78,8.79,1.25\n
11-Oct-15,37.64,24.77,25.96,10.16,1.39\n
11-Oct-16,37.27,24.65,25.98,10.59,1.44\n
11-Oct-17,42.74,21.87,25.01,9.12,1.17\n
11-Oct-18,42.14,22.22,25.26,9.1,1.19\n
11-Oct-19,41.92,22.42,25.3, 9.07,1.21\n
11-Oct-20,42.41,22.08,25.28,8.94,1.18\n
11-Oct-21,42.74,22.23,25.19,8.5,1.25\n
11-Oct-22,36.95,25.45,26.03,10.06,1.42\n
11-Oct-23,37.52,24.73,25.79,10.46,1.43"
}
 */

/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'stacked_area_chart', function( jNode ){
  
  jNode.removeClass('wcm_stacked_area_chart');

  window.$B.loadModule('d3');

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = jNode.innerWidth() - margin.left - margin.right,
      height = jNode.innerHeight() - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatPercent = d3.format(".0%");;

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.category20();

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
  
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var vranges = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, y: d[name] / 100};
      })
    };
  }));

  x.domain(d3.extent(data, function(d) { return d.date; }));

  var vrange = svg.selectAll(".vrange")
      .data(vranges)
    .enter().append("g")
      .attr("class", "vrange");

  vrange.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) { return color(d.name); });

  vrange.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
      .attr("x", -6)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

});
