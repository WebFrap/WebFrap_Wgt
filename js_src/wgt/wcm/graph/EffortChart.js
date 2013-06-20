$R.addAction( 'project_effort_chart', function( jNode ){
  
  jNode.removeClass('wcm_project_effort_chart');

  window.$B.loadModule('d3');

  var data = window.$B.robustParseJSON(jNode.find('var').text());
  console.log(jNode.find('var').text());
  jNode.find('var').remove();
  jNode.html('<svg style="height:500px;">');
  
  
  /** data format
    {
      "x":{"label":"Label X-Axis","format":d3_format},
      "y":{"Label Y-Axis","format":d3_format},
      "data":[
      {
        "values":["x":int,"y":int],
        "key":"Line label",
        "color":"#hexvaue",
      }
      ],
    }
   */
  
  var graphData = data.data;
  
  var actual = graphData[0].values;
  graphData[0].color = "steelblue";
  
  var plan   = graphData[1].values;
  graphData[1].color = "orange";
  
  var demand = graphData[2].values;
  graphData[2].color = "green";
  
  var isDataAvailiable = actual.length > 0;
  
  var margin = {top: 30, right: 100, bottom: 100, left: 50},
      width = parseInt(d3.select("#" + jNode.attr("id")).style("width")) - margin.left - margin.right,
      height = parseInt(d3.select("#" + jNode.attr("id")).style("height")) - margin.top - margin.bottom;

  var inputDateFormat = d3.time.format("%Y-%m-%d").parse;
  var outputDateFormat = d3.time.format("%b-%y");
 
  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);
      
  var yScale = d3.scale.linear()
      .range([height, 0]);
      
  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(function(d) {
          return outputDateFormat(d)
      });

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");
  
  function xGrid() {
      return d3.svg.axis()
          .scale(xScale)
           .orient("bottom")
           .ticks(10)
  }
  
  function yGrid() {
      return d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(10)
  }
  
  var chart = d3.select('#'+jNode.attr('id')+' svg')
      .attr("class", "chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var line = d3.svg.line()
     .x(function(d) { return xScale(d.x); })
     .y(function(d) { return yScale(d.y); });
     
 demand.forEach( function(d) {
     d.x = inputDateFormat(d.x);
     } );
    
 actual.forEach( function(d) {
     d.x = inputDateFormat(d.x);
     } );
    
 plan.forEach( function(d) {
     d.x = inputDateFormat(d.x);
     } );
 
  // Finde min und max für die Einteilung der Achse
  xScale.domain(demand.map(function(d) { return d.x; }));
  yScale.domain([0, d3.round(d3.max(demand, function(d) { return d.y; }))]);
  
  if(isDataAvailiable) {
  // X-Achse
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
          return "rotate(-65)" 
       });

  // Y-Achse
  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Effort [PM]  ");
  
  // X-Grid
  chart.append("g")         
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke", "lightgrey")
      .style("opacity", "0.7")
      .call(xGrid()
          .tickSize(-height, 0, 0)
          .tickFormat("")
      );
  
  // Y-Grid
  chart.append("g")
      .attr("class", "grid")
      .style("stroke", "lightgrey")
      .style("opacity", "0.7")
      .call(yGrid()
          .tickSize(-width, 0, 0)
          .tickFormat("")
      )

  // Line (Demand)
  chart.append("path")
      .attr("class", "line")
      .attr("d", line(demand))
      .style("stroke", "green")
      .style("opacity", "0.8");
      
  // Bar (Actuals)
  chart.selectAll(".actual")
      .data(actual)
      .enter()
      .append("rect")
      .attr("class", "actual")
      .attr("x", function(d) { return xScale(d.x); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.y); })
      .attr("height", function(d) { return height - yScale(d.y); })
      .style("fill", "steelblue")
      .style("opacity", "0.8");
  
  var actualHeight = height - d3.min(actual, function(d) { return yScale(d.y) });
  
  // Bars (Planned)
  // Das "stacken" funktioniert indem die Plan Bar um die Höhe der Actuals nach oben verschoben wird.
  chart.selectAll(".plan")
      .data(plan)
      .enter()
      .append("rect")
      .attr("class", "plan")
      .attr("x", function(d) { return xScale(d.x); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.y) - actualHeight; })
      .attr("height", function(d) { return height - yScale(d.y); })
      .style("fill", "orange")
      .style("opacity", "0.8");
      
  var legend = chart.append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 100)
      .attr("transform", "translate(-20,50)");
    
  legend.selectAll("rect")
      .data(graphData)
      .enter()
      .append("rect")
      .attr("x", width + 50)
      .attr("y", function(d, i){ return i *  20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) { 
          var color = graphData[graphData.indexOf(d)].color;
          return color;
    });
  
  legend.selectAll("text")
      .data(graphData)
      .enter()
      .append("text")
      .attr("x", width + 65)
      .attr("y", function(d, i){ return i *  20 + 9;})
      .text(function(d) {
          var text = graphData[graphData.indexOf(d)].key;
          return text;
    });

  } else {
  	chart.append("g")
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", width)
	.attr("height", height)
	.style("stroke", "red")
	.style("fill", "white");

chart.append("g")
	.append("text")
	.text("No data available")
	.attr("dx", width / 2)
    .attr("dy", height / 2)
    .attr("font-size", 45);
  }
 
});
