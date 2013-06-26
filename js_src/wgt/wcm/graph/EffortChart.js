$R.addAction('project_effort_chart', function(jNode) {

    jNode.removeClass('wcm_project_effort_chart');

    window.$B.loadModule('d3');

    var data = window.$B.robustParseJSON(jNode.find('var').text());

    // console.log(jNode.find('var').text());

    jNode.find('var').remove();

    // jNode.html('<svg style="height:100%;">');

    /**
     * data format { "x":{"label":"Label X-Axis","format":d3_format},
     * "y":{"Label Y-Axis","format":d3_format}, "data":[ {
     * "values":["x":int,"y":int], "key":"Line label", "color":"#hexvaue", } ], }
     */

    // Setup data
    var layers = data.data;

    var innerWidth = window.innerWidth - 250;
    var innerHeight = window.innerHeight - 450;

    var margin = {
	top : 30,
	right : 100,
	bottom : 50,
	left : 50
    };
    var width = 1200 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var inputDateFormat = d3.time.format("%Y-%m-%d").parse;
    var outputDateFormat = d3.time.format("%b-%y");

    var barSeries = layers.data.filter(function(d) {
	return d.type == "bar"
    });

    var lineSeries = layers.data.filter(function(d) {
	return d.type == "line"
    });

    var barData = [];

    var lineData = [];

    var graphCategory = [];

    var seriesMax = [];

    var maxBarWidth = 30;

    // #########################################################################
    // Parse string to date for all categories
    // #########################################################################

    layers.category.map(function(d) {
	graphCategory.push(inputDateFormat(d));
    });

    // #########################################################################
    // Map data to match d3 standards
    // #########################################################################

    barSeries.map(function(bar, i) {
	barData.push({});

	barData[i].key = bar.name;
	barData[i].color = bar.color;
	barData[i].values = [];

	bar.series.map(function(d, j) {
	    barData[i].values.push({
		"x" : graphCategory[j],
		"y" : d
	    });
	});
	seriesMax.push(d3.max(bar.series));
    });

    lineSeries.map(function(line, i) {
	lineData.push({});

	lineData[i].key = line.name;
	lineData[i].color = line.color;
	lineData[i].values = [];

	line.series.map(function(d, j) {
	    lineData[i].values.push({
		"x" : graphCategory[j],
		"y" : d
	    });
	});
	seriesMax.push(d3.max(line.series));
    });

    // #########################################################################

    var stack = d3.layout.stack()
    	.offset("zero")
    	.values(function(d) { return d.values; });

    stack(barData);

    var actual = barData[0];
    var plan = barData[1];
    var demand = lineData[0];

    var isDataAvailiable = layers.category.length > 0;

    var xScale = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

    var yScale = d3.scale.linear().range([ height, 0 ]);

    xScale.domain(graphCategory);
    yScale.domain([ 0, d3.round(d3.max(seriesMax)) ]);

    if (isDataAvailiable) {
	// #####################################################################
	// Axis, grid setup
	// #####################################################################

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickFormat( function(d) { return outputDateFormat(d) } );

	function xGrid() {
	    return d3.svg.axis()
	    	.scale(xScale)
	    	.orient("bottom")
	    	.ticks(10)
	}

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	function yGrid() {
	    return d3.svg.axis()
	    	.scale(yScale)
	    	.orient("left").ticks(10)
	}

	// #####################################################################
	// Line generation
	// #####################################################################

	var line = d3.svg.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });

	// #####################################################################
	// Append Axis, Grid, Description
	// #####################################################################

	var chart = d3.select("#" + jNode.attr("id"))
		.append("svg")
		.attr("class", "chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function(d) { return "rotate(-65)" });

	chart.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0," + height + ")")
		.call(xGrid().tickSize(-height, 0, 0).tickFormat(""));

	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis).append("text")
		.attr("transform", "rotate(-90)");

	chart.append("g").attr("class", "grid").call(
		yGrid().tickSize(-width, 0, 0).tickFormat(""));

	// #####################################################################
	// Append bar
	// #####################################################################

	var calculatedBarWidth = xScale.rangeBand();

	chart.selectAll(".actual").data(actual.values).enter().append("rect")
		.attr("class", "actual").attr("x", function(d) {
		    return xScale(d.x);
		}).attr("width", calculatedBarWidth).attr("y", function(d) {
		    return yScale(d.y + d.y0);
		}).attr("height", function(d) {
		    return height - yScale(d.y);
		}).style("fill", function(d) {
		    return actual.color;
		});

	chart.selectAll(".plan").data(plan.values).enter().append("rect").attr(
		"class", "plan").attr("x", function(d) {
	    return xScale(d.x);
	}).attr("width", calculatedBarWidth).attr("y", function(d) {
	    return yScale(d.y + d.y0);
	}).attr("height", function(d) {
	    return height - yScale(d.y);
	}).style("fill", function(d) {
	    return plan.color;
	});

	// ####################################################################
	// Adjust bar width if necessary
	// ####################################################################

	if (calculatedBarWidth > 30) {
	    var barWidth = ((calculatedBarWidth - maxBarWidth) / 2);

	    chart.selectAll("rect").attr("x", function(d) {
		return xScale(d.x) + barWidth;
	    }).attr("width", maxBarWidth);
	}

	// ####################################################################
	// Append line
	// ####################################################################

	chart.append("path").attr("class", "line").attr("d",
		line(demand.values)).style("stroke", function(d) {
	    return demand.color;
	}).style("opacity", "0.8");

	// ####################################################################
	// Append legend
	// ####################################################################

	var legend = chart.append("g").attr("class", "legend").attr("height",
		100).attr("width", 100).attr("transform", "translate(-20,50)");

	legend.selectAll("rect").data(layers.data).enter().append("rect").attr(
		"x", width + 50).attr("y", function(d, i) {
	    return i * 20;
	}).attr("width", 10).attr("height", 10).style("fill", function(d) {
	    return d.color;
	});

	legend.selectAll("text").data(layers.data).enter().append("text").attr(
		"x", width + 65).attr("y", function(d, i) {
	    return i * 20 + 9;
	}).text(function(d) {
	    return d.name;
	});
    } else {
	var chart = d3.select("#" + jNode.attr("id")).append("svg")
		.attr("class", "chart").attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom);

	chart.append("rect").attr("x", 0).attr("y", 0).attr("width", width)
		.attr("height", height).style("stroke", "red").style("fill",
			"white");

	chart.append("text").text("No data available").attr("x", width / 2)
		.attr("y", height / 2).attr("font-size", 45).style(
			"text-anchor", "middle");
    }

});
