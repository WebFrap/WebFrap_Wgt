var Graph = JS.Class({
   
    construct: function(data) {
        // Setup the dimensions of our chart
        this.margin = {top: 40, right: 100, bottom: 60, left: 40};
        this.width = (data.width || 1800) - this.margin.left - this.margin.right;
        this.height = (data.height || 500) - this.margin.top - this.margin.bottom;
        
        // Keep the original series data (read only)
        this.rawSeries = data.series;
        
        // Split the original data
        this.category = data.category;
        this.description= data.description;
        this.options = data.options;
        
        this.prepareData();
        
    },
        
    prepareData: function() {

        // Max value of our series
        this.maxValue = 0;
        
        // Copy the old series and prepare the data
        this.series = JSON.parse(JSON.stringify(this.rawSeries));
        
        // First value of category indicates the axis type
        firstElementCategory = this.category[0];
        
        if(typeof firstElementCategory == "number") {
            this.type = "linear";
        } else {
            this.type = "ordinal";
        }
        
        var self = this;
        
        // Parse category if necessary
        if(this.options.inputDateFormat) {
            
            var inputDateFormat = d3.time.format(this.options.inputDateFormat).parse;
            
            this.category = this.category.map(function(d){
                if(typeof d != "object") {
                    return inputDateFormat(d);
                } else {
                    return d;
                }
                 
            });
        }
        
        
        
        // Check if data should be aggregated
        if(this.options.aggregate) {
            
            // Loop over the data and mix category + series
            this.series.map(function(node){
                
                var aggregatedValue = 0;
                
                node.series = node.series.map(function(d){
                    aggregatedValue += d;
                    return d3.round(aggregatedValue, 2);
                });
                
                // Get the max of our current series
                var maxValue = d3.max(node.series);
                
                if(maxValue > self.maxValue) {
                    self.maxValue = d3.round(maxValue);
                }
                
                node.series = node.series.map(function(d, i){
                    return { x : self.category[i], y : d };
                });
                
            });
                    
        } else {

            this.series.map(function(node){
                var maxValue = d3.max(node.series);
                
                if(maxValue > self.maxValue) {
                    self.maxValue = d3.round(maxValue);
                }
                
                node.series = node.series.map(function(d, i){
                    
                    return { x : self.category[i], y : d };
                });
                
            });
            
        }
                
        this.barSeries = this.series.filter(function(d) {return d.type == "bar";} );
        this.lineSeries = this.series.filter(function(d) {return d.type == "line";} );

    },
    
    createAxis: function() {
        
        firstElementCategory = this.category[0];
        
        if(this.type = "ordinal") {
            this.xScale = d3.scale.ordinal()
                .rangeRoundBands([ 0, this.width ], .1)
                .domain(this.category);     
        } else {
            this.xScale = d3.scale.linear()
                .range([0, this.height])
                .domain([0, this.maxValue]);
        }
        
        this.yScale = d3.scale.linear()
                .range([this.height, 0])
                .domain([0, this.maxValue]);
        
        if(this.options.outputDateFormat) {
            
            var outputDateFormat = d3.time.format(this.options.outputDateFormat);
            
            this.xAxis = d3.svg.axis()
                .scale(this.xScale)
                .orient("bottom")
                .tickFormat(function(d) {
                    return outputDateFormat(d);
                });
            
        } else {
            this.xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom");
        }
                
        
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
        
        if(this.options.stack == this.options.group) {
            this.options.group = true;
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
        
        if(data) {
            this.rawSeries = data.series;
            this.category = data.category;
            this.description= data.description;
            this.options = data.options;
        }
                
        this.prepareData();
        this.draw();
        this.enableOptions();
                
    },
    
    drawAxis: function() {
        
        var self = this;
        
        element = data.options.element || "body";
        
        this.chart = d3.select(element)
            .append("svg")
            .attr("class", "chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        if(this.type == "linear") {
            this.chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(this.xAxis);
        } else {
            this.chart.append("g")
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
            this.chart
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
            this.chart.append("g")
                .attr("class", "y axis")
                .call(this.yAxis);
        }
        
    },
    
    drawGrid: function() {
        
        var self = this;
        
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
            
        this.chart.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + self.height + ")")
            .call(xGrid()
                .tickSize(-self.height, 0, 0)
                .tickFormat("")
    );
        
        this.chart.append("g")
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
        
        var self = this;
        
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
        
        var bars = this.chart.selectAll(".bar")
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
        
        var self = this;
        
        var bars = this.chart.append("g")
                .attr("class", "bars");
        
        this.barSeries.map( function(bar) {
            
            bars.selectAll(bar.name)
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
    
    drawBarsDefault: function() {
                
        var self = this;
                
        this.barSeries.map(function(bar){
           
            self.chart.selectAll(bar.name)
                .data(bar.series)
                .enter()
                .append("rect")
                .attr("class", bar.name )
                .attr("x", function(d) { return self.xScale(d.x); } )
                .attr("width", self.xScale.rangeBand() )
                .attr("y", function(d) { return self.yScale(d.y); } )
                .attr("height", function(d) { return self.height - self.yScale(d.y); } )
                .style("fill", bar.color )
                .style("opacity", "0.8");
        });
        
    },
    
    drawLine: function() {
        
        var self = this;
        
        var lineOffset = this.xScale.rangeBand() / 2;
        
        var generateLine = d3.svg.line()
                .x(function(d) { return self.xScale(d.x) + lineOffset; })
                .y(function(d) { return self.yScale(d.y); });
        
        var lines = this.chart.append("g")
                .attr("class", "lines");
        
        this.lineSeries.map( function(line) {
            lines.append("path")
                    .attr("class", line.name)
                    .attr("d", generateLine(line.series))
                    .style("stroke", line.color)
                    .style("opacity", "0.8");
        });
        
    },
    
    enableTooltip: function() {
        
        var self = this;
        
        var outputDateFormat = d3.time.format(this.options.outputDateFormat);
        
        var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")               
                .style("opacity", 0);
        
        this.chart.selectAll("rect")
                .on("mouseover", function(d){
                    
                    var left = parseInt(d3.select(this).attr("x"));
                    var top = parseInt(d3.select(this).attr("y")) - 40;
                                    
                    d3.select(this).transition()
                        .duration(100)
                        .style("opacity", 1.0);
                    
                    tooltip.transition()
                            .delay(200)
                            .duration(200)
                            .style("opacity", .9);
                    
                    tooltip.html(outputDateFormat(d.x) + "<br/>"  + d.y)
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
        
        var lineDots = this.chart.append("g")
                .attr("class", "lineDots");
        
        this.lineSeries.map( function(line){
            lineDots.selectAll(line.name)
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
                    
                    tooltip.html(outputDateFormat(d.x) + "<br/>"  + d.y)
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
        
        var legend = this.chart.append("g")
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
            .attr("y", function(d, i){ return i * 20 + 9;})
            .text(function(d) { return d.name; });
        
    },
    
    enableOptions: function() {
        
        var self = this;
        
        var controls = this.chart.append("g")
                .attr("class", "controls");
        
        controls.append("circle")
                .attr("r", 5)
                .attr("cx", 100)
                .attr("cy", -20)
                .style("fill", self.options.aggregate ? "black" : "white")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .on("click", function(d){
                    self.aggregate();
                });
        
        controls.append("text")
                .attr("x", 110)
                .attr("y", -15)
                .text("Aggregate")
                .on("click", function(d){
                    self.aggregate();
                });
                
    },
    
    stack: function() {
        
        if(this.options.group) {
            this.options.stack = true;
            this.options.group = false;
            this.draw();
        }

    },
    
    group: function() {
        
        if(this.options.stack) {
            this.options.stack = false;
            this.options.group = true;
            this.draw();
        }
        
    },
    
    aggregate: function() {
        
        if(this.options.aggregate) {
            this.options.aggregate = false;
            this.redraw();
        } else {
            this.options.aggregate = true;
            this.redraw();
        }
        
    }
    
});
