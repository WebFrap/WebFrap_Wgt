var Graph = JS.Class({
   
    construct: function(arg) {
	this.margin = {top: 20, right: 100, bottom: 40, left: 40};
	this.width = (arg.width || 1200) - this.margin.left - this.margin.right;
	this.height = (arg.height || 500) - this.margin.top - this.margin.bottom;
	
	this.xAxis = null;
	this.yAxis = null;
	
	this.chartId = "#wgt-chart-project_activity-effort-1";
	
	this.svg = null;
	
	this.prepareData(arg);
	
    },
    
    prepareData: function(data) {
	
	if(!data.options.prepared) {
	    this.category = data.category;
	    this.series = data.series;
	    this.description= data.description;
	    this.options = data.options;
		
	    self = this;
		
	    this.maxValue = 0;
		
	    this.series.map( function(node) {
		var maxValue = d3.max(node.series);

		if(maxValue > self.maxValue) {
			self.maxValue = d3.round(maxValue);
		}
		    	    
		node.series = node.series.map(function(d, i) {
		    return { x : self.category[i], y : d };
		   });
	    } );
		
	    this.barSeries = this.series.filter(function(d) {return d.type == "bar";} );
	    this.lineSeries = this.series.filter(function(d) {return d.type == "line";} );
		
	    this.options.prepared = true;
	}
		
    },
    
    createAxis: function() {
	
	var firstElementCategory = this.category[0];
	
	if(typeof firstElementCategory == "string") {
	    this.xScale = d3.scale.ordinal()
	    	.rangeRoundBands([ 0, this.width ], .1)
	    	.domain(this.category);
	    this.type = "ordinal";
	} else {
	    this.xScale = d3.scale.linear()
            	.range([0, this.height])
            	.domain([0, this.maxValue]);
	    this.type = "linear";
	}
	
	this.yScale = d3.scale.linear()
        	.range([this.height, 0])
        	.domain([0, this.maxValue]);
	
	this.xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom");
	
	this.yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left");
		
    },
        
    draw: function() {
	
	d3.select("svg.chart").remove();
	d3.select("div.tooltip").remove();
	
	this.createAxis();
	
	this.drawAxis();
		
	if(this.options.grid) {
	    this.drawGrid();
	}
	
	if(this.options.stack) {
	    this.drawBarStacked();
	}
	
	if(this.options.group) {
	  this.drawBarGrouped();
	}
	
	this.drawLine();
	
	if(this.options.tooltip) {
	    this.enableTooltip();
	}
	
	if(this.options.legend) {
	    this.enableLegend();
	}
	
    },
    
    redraw: function(data) {
	
	this.prepareData(data);
	this.draw();
		
    },
    
    drawAxis: function() {
	
	self = this;
	
	this.svg = d3.select("#wgt-chart-project_activity-effort-1")
            .append("svg")
            .attr("class", "chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

	if(this.type == "linear") {
	    this.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(this.xAxis);
	} else {
	    this.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(this.xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-65)";
                 });
	}
	    
	if(this.description.category) {
	    this.svg
	    	.append("g")
	        .attr("class", "y axis")
	        .call(this.yAxis)
	        .append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("y", 6)
	        .attr("dy", ".71em")
	        .style("text-anchor", "end")
	        .text(this.description.category);
	} else {
	    this.svg.append("g")
                .attr("class", "y axis")
                .call(this.yAxis);
	}
	
    },
    
    drawGrid: function() {
	
	self = this;
	
	function xGrid() {
	        return d3.svg.axis()
	            .scale(self.xScale)
	             .orient("bottom")
	             .ticks(10);
	};
	
	function yGrid() {
	        return d3.svg.axis()
	            .scale(self.yScale)
	            .orient("left")
	            .ticks(10);
	    };
	    
	this.svg.append("g")
	    .attr("class", "grid")
	    .attr("transform", "translate(0," + self.height + ")")
	    .call(xGrid()
	        .tickSize(-self.height, 0, 0)
	        .tickFormat("")
    );
	
	this.svg.append("g")
        .attr("class", "grid")
        .call(yGrid()
            .tickSize(-self.width, 0, 0)
            .tickFormat("")
        );
	
	
    },
    
    drawBarGrouped: function() {
	
	/**
	 * This is how grouped data has to look like;
	 *   [
               { date : "2010-06-01", series : [ {x : "Actual", y : 1.13}, {x : "Plan", y : 2.13} ] },
               { date : "2010-07-01", series : [ {x : "Actual", y : 2.58}, {x : "Plan", y : 3.58} ] },
               { date : "2010-08-01", series : [ {x : "Actual", y : 3.08}, {x : "Plan", y : 4.08} ] }
             ]
	 * First we get all the raw data from all bars and then nest it via d3.nest, grouped by
	 * d.x which is the date for the entry.
	 */
	
	self = this;
	groupScaleDomain = [];
	entries = [];
	
	// Gather all raw bar data and the bar name.
	this.barSeries.map( function(bar) {
	    
	    bar.series.map(function(d) {
		entries.push( { name : bar.name, x: d.x, y : d.y, color : bar.color} );
	    });
	    
	    groupScaleDomain.push(bar.name);
	    
	} );
	
	// Nest the data to match our grouping.
	groupedBarData = d3.nest()
		.key(function(d) { return d.x; })
		.entries(entries);
	
	// We need an additional scale to group the values
	groupScale = d3.scale.ordinal();
	
	// The domain is all bar names
	groupScale.domain(groupScaleDomain)
		.rangeRoundBands([0, this.xScale.rangeBand()]);
	
	var bars = this.svg.selectAll(".bar")
		.data(groupedBarData)
		.enter()
		.append("g")
		.attr("class", "g")
		.attr("transform", function(d) { return "translate(" + self.xScale(d.key) + ",0)"; });
		
	bars.selectAll("rect")
            .data(function(d) { return d.values; } )
            .enter()
            .append("rect")
            .attr("x", function(d) { return groupScale(d.name); })
            .attr("width", groupScale.rangeBand())
            .attr("y", function(d) { return self.yScale(d.y); })
            .attr("height", function(d) { return self.height - self.yScale(d.y); })
            .style("fill", function(d) { return d.color; })
            .style("opacity", "0.8");
    },
    
    drawBarStacked: function() {
	
	var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.series; });
	
	stack(this.barSeries);
	
	self = this;
	
	this.barSeries.map( function(bar) {
	    
	    self.svg.selectAll(bar.name)
		.data(bar.series)
		.enter()
		.append("rect")
		.attr("class", bar.name )
		.attr("x", function(d) { return self.xScale(d.x); } )
		.attr("width", self.xScale.rangeBand() )
		.attr("y", function(d) { return self.yScale(d.y + d.y0); } )
		.attr("height", function(d) { return self.height - self.yScale(d.y); } )
		.style("fill", bar.color )
		.style("opacity", "0.8");
	    
	} );

    },
    
    drawLine: function() {
	
	self = this;
	
	var lineOffset = this.xScale.rangeBand() / 2;
	
	var generateLine = d3.svg.line()
        	.x(function(d) { return self.xScale(d.x) + lineOffset; })
        	.y(function(d) { return self.yScale(d.y); });
	
	this.lineSeries.map( function(line) {
	    self.svg.append("path")
        	    .attr("class", line.name)
        	    .attr("d", generateLine(line.series))
        	    .style("stroke", line.color)
        	    .style("opacity", "0.8");
	});
	
    },
    
    enableTooltip: function() {
	
	self = this;
	
	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")               
		.style("opacity", 0);
	
	this.svg.selectAll("rect")
		.on("mouseover", function(d){
		    
	            var left = parseInt(d3.select(this).attr("x"));
	            var top = parseInt(d3.select(this).attr("y")) - 40;
	            
	            console.log(left);
	            
	            d3.select(this).transition()
	                .duration(100)
	                .style("opacity", 1.0);
	            
	            tooltip.transition()
		            .delay(200)
		            .duration(200)
		            .style("opacity", .9);
	            
	            tooltip.html(d.x + "<br/>"  + d.y)
		            .style("left", ( left ) + "px")
		            .style("top", ( top > 0 ? top : 0 ) + "px");
	    })
	    	.on("mouseout", function(d){
	    	    d3.select(this)
	    	    	.transition()
	    	    	.duration(300)
	    	    	.style("opacity", .8);
	    	    
	    	    tooltip.transition()       
	                .duration(500)      
	                .style("opacity", 0);
	    });
	    
	var lineOffset = this.xScale.rangeBand() / 2;
	
	this.lineSeries.map( function(line){
	    self.svg.selectAll(line.name)
	    	.data(line.series)
	    	.enter()
	    	.append("circle")
	    	.attr("r", 10)
	    	.attr("cx", function(d) { return self.xScale(d.x) + lineOffset; })
	    	.attr("cy", function(d) { return self.yScale(d.y); })
	    	.style("fill", line.color)
	    	.style("opacity", 0)
	    	.on("mouseover", function(d) {
	    	    
	    	    var left = parseInt(d3.select(this).attr("cx"));
	    	    var top = parseInt(d3.select(this).attr("cy")) - 40;
	    	    
	    	    d3.select(this).transition()
	    	    	.duration(100)
	    	    	.style("opacity", 0.8);
	    	    
	    	    tooltip.transition()
	    	    	.duration(200)
	    	    	.style("opacity", .9);
	    	    
	    	    tooltip.html(d.x + "<br/>"  + d.y)
	    	    	.style("left", (left) + "px")
	    	    	.style("top", (top > 0 ? top : 0) + "px");
	    	})
	    	.on("mouseout", function(d) {
	    	    d3.select(this).transition()
	    	    	.duration(100)
	    	    	.style("opacity", 0);
	    	    
	    	    tooltip.transition()
	    	    	.duration(500)
	    	    	.style("opacity", 0);
	    	});
	});
	
    },
    
    enableLegend: function() {
	
	this.margin.right = 100;
	
	var legend = this.svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 100)
        .attr("transform", "translate(-20,50)");
    
	legend.selectAll("rect")
            .data(this.series)
            .enter()
            .append("rect")
            .attr("x", this.width + 50)
            .attr("y", function(d, i){ return i * 20;})
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d) { return d.color; });
    
        legend.selectAll("text")
            .data(this.series)
            .enter()
            .append("text")
            .attr("x", this.width + 65)
            .attr("y", function(d, i){ return i *  20 + 9;})
            .text(function(d) { return d.name; });
	
    },
    
    stack: function() {
	
	this.options.stack = true;
	this.options.group = false;
	this.draw();
	
    },
    
    group: function() {
	
	this.options.stack = false;
	this.options.group = true;
	this.draw();
	
    }
    
});
