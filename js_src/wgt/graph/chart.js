var Settings = function(args) {
        
    args.dimension = args.dimension || {};
    
    var dimension = {
            outerWidth : (args.dimension.width || window.innerWidth) - 20,
            outerHeight : (args.dimension.height || window.innerHeight) - 20,
            margin : {
                top: 40,
                right: 40,
                bottom: 40,
                left: 60
            }
    };
    
    var category = args.category;
    
    var series = args.series;
    
    var options = {
            aggregate : args.options.aggregate || false,
            stack : args.options.stack || false,
            rotateCategory : args.options.rotateCategory || false,
            legend : args.options.legend || false,
            element : args.options.element || "body",
            categoryInputFormat : args.options.categoryInputFormat || function(d){return d;},
            categoryOutputFormat : args.options.categoryOutputFormat || function(d){return d;},
            description : args.description || ""
    };
    
    if(options.rotateCategory) {
        dimension.margin.bottom = 60;
    }
    
    if(options.legend) {
        dimension.margin.right = 100;
    }
    
    dimension.width = dimension.outerWidth - dimension.margin.left - dimension.margin.right;
    dimension.height = dimension.outerHeight - dimension.margin.top - dimension.margin.bottom;
    
    var data = {};
    
    var xScale = d3.scale.ordinal();
    var yScale = d3.scale.linear();
    var color = d3.scale.category10();
        
    this.setup = function() {
        
        data = new Data(series, category, { aggregate : options.aggregate, format : options.categoryInputFormat});
        
        xScale.rangeRoundBands([0, dimension.width], .1)
            .domain(data.category);
                
        yScale.range([dimension.height, 0])
            .domain([data.min, data.max]);
        
        return {
            xScale : xScale,
            yScale : yScale,
            color : color,
            dimension : dimension,
            options : options,
            data : data
        };
        
    };
        
};

function Data(series, category, settings) {
    
    var _series = JSON.parse(JSON.stringify(series));
    var _category = category;
    var _settings = settings;
    var isDataAvailable = series.length > 0 && category.length > 0;
    
    var min = 0;
    var max = 0;
    
    var mergeSeriesCategory = function () {
        _series.map(function (node) {

            getSeriesMax(node.series);

            node.series = node.series.map(function (d, i) {
                return {
                    x: _category[i],
                    y: d
                };
            });
        });
    };
    
    var parseCategory = function (format) {
        _category = _category.map(function (d) {
            return format(d);
        });
    };

    var getSeriesMax = function (series) {
        var seriesMax = d3.max(series);
        var seriesMin = d3.min(series);
        
        if(seriesMin < min) {
        	min = seriesMin;
        }
        
        if(_settings.aggregate) {
        	max = seriesMax > max ? seriesMax : max;
        } else {
        	max += seriesMax * 0.7;
        }
    };

    var aggregateSeries = function () {
        _series.map(function (node) {

            var aggregatedValue = 0;

            node.series = node.series.map(function (d) {
                aggregatedValue += d;
                return d3.round(aggregatedValue, 2);
            });
        });
    };
    
    if(settings.aggregate) {
        aggregateSeries();
    }
    
    parseCategory(_settings.format);
    
    mergeSeriesCategory();
    
    return {
        series :  _series,
        category : _category,
        min : Math.ceil(min),
        max : Math.ceil(max),
        isDataAvailable : isDataAvailable,
        barSeries : _series.filter(function (d) { return d.type == "bar"; }),
        lineSeries : _series.filter(function (d) { return d.type == "line"; })
    };
    
};

function Chart() {
    
    var components = [];
    
    var settings = [];
        
    var settingsCount = 0;
    
    var settingsIndex = 0;
    
    var self = this;
    
    this.currentSetting = null;
    
    this.svg = null;
        
    this.addComponent = function(component) {
        components.push(component);
    };
    
    this.clearComponents = function() {
        components = [];
    };
    
    this.addSettings = function(setting) {
        settings.push(setting);
        
        self.currentSetting = settings[settingsIndex].setup();
                
        settingsCount++;
    };
    
    this.toggleAggregate = function() {
        self.currentSetting.options.aggregate = !self.currentSetting.options.aggregate;
        
        self.currentSetting = settings[settingsIndex].setup();
        
        components.forEach(function(d){
            d.redraw(self);
        });
    };
    
    this.nextDataset = function() {
                
        settingsIndex = settingsIndex == 0 ? 1 : 0;
                
        self.currentSetting = settings[settingsIndex].setup();
        
        components.forEach(function(d){
            d.redraw(self);
        });
        
    };
    
    this.isDataAvailable = function() {
        return self.currentSetting.data.isDataAvailable;
    };
    
    this.draw = function() {
        var element = self.currentSetting.options.element;
        var dimension = self.currentSetting.dimension;
                
        this.svg = d3.select(element)
            .append("svg")
            .attr("class", "chart")
            .attr("width", dimension.outerWidth)
            .attr("height", dimension.outerHeight)
            .append("g")
            .attr("transform", "translate(" + dimension.margin.left + "," + dimension.margin.top + ")");
        
        components.forEach(function(d){
            d.draw(self);
        });
        
    };
    
};

var XAxis = function() {
    this.draw = function(chart) {
        
        var settings = chart.currentSetting;
        var data = settings.data;
        var scale = settings.xScale;
        var dimension = settings.dimension;
        var format = settings.options.categoryOutputFormat;
        
        // This is serious magic.
        var translate = data.min < 0 ? dimension.height * (data.max / (data.max - data.min)) : dimension.height;
        
        var svg = chart.svg;
        
        var axis = d3.svg.axis()
            .scale(scale)
            .orient("bottom")
            .tickFormat(function (d) {
                return format(d);
            });
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + translate + ")")
            .call(axis);
        
        if(settings.options.rotateCategory) {
            svg.selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function (d) {
                    return "rotate(-65)";
                });
        }
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.axis.x").remove();
        this.draw(chart);
    };
    
    return this;
};

var YAxis = function() {
    
    this.draw = function(chart) {
        
        var settings = chart.currentSetting;
        var scale = settings.yScale;
        var svg = chart.svg;
        
        var axis = d3.svg.axis()
            .scale(scale)
            .orient("left");
        
        svg.append("g")
            .attr("class", "y axis")
            .call(axis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(settings.options.description);
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.axis.y").remove();
        this.draw(chart);
    };
    
    return this;
};

function Grid() {

    var xGrid = function (scale) {
        return d3.svg.axis()
            .scale(scale)
            .orient("bottom")
            .ticks(10);
    };

    var yGrid = function (scale) {
        return d3.svg.axis()
            .scale(scale)
            .orient("left")
            .ticks(10);
    };

    this.draw = function (chart) {
        
        var svg = chart.svg;
        var settings = chart.currentSetting;
        var xScale = settings.xScale;
        var yScale = settings.yScale;
        
        var dimension = settings.dimension;

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + dimension.height + ")")
            .call(xGrid(xScale)
                .tickSize(-dimension.height, 0, 0)
                .tickFormat("")
        );

        svg.append("g")
            .attr("class", "grid")
            .call(yGrid(yScale)
                .tickSize(-dimension.width, 0, 0)
                .tickFormat("")
        );

    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.grid").remove();
        this.draw(chart);
    };
    
};

var StackedBar = function() {
    
    var maxBarWidth = 30;
    
    var lastValue = 0;
    
    var month = [];
        
    var stack = d3.layout.stack()
        .offset("zero")
        .values(function (d) {
            return d.series;
        })
        .out(function(d, y0, y) {
        	
        	// Reset if month changes
        	if(month.indexOf(d.x) < 0) {
        		month.push(d.x);
        		lastValue = 0;
        	}
        	
        	// true if ancestor y was negative
        	if(lastValue > 0) {
        		d.y0 = y0 + lastValue;
        		d.y = y;
        		
        		// reset
        		lastValue = 0;
        		
        	} else {
        		d.y = y;
        		d.y0 = y0;
        	}
        	
        	// true if current y < 0
        	if(y < 0) {
        		lastValue = Math.abs(y);
        	}
        	        	
        });
    
    this.draw = function (chart) {
        
        var settings = chart.currentSetting;
        var svg = chart.svg;
        var data = settings.data;
        var dimension = settings.dimension;
        var xScale = settings.xScale;
        var yScale = settings.yScale;
        var color = settings.color;
        var series = settings.data.barSeries;
        
        var scaledBarWidth = xScale.rangeBand();
        var barWidth = scaledBarWidth > maxBarWidth ? maxBarWidth : scaledBarWidth;
        var offset = scaledBarWidth > maxBarWidth ? ((scaledBarWidth - maxBarWidth) / 2) : 0;
                
        stack(series);
        
        var bars = svg.append("g")
            .attr("class", "bars");

        series.map(function (bar, i) {

            bars.selectAll(".bar")
                .data(bar.series)
                .enter()
                .append("rect")
                .attr("class", bar.name)
                .attr("x", function (d) {
                    return xScale(d.x) + offset;
                })
                .attr("width", barWidth)
                .attr("y", function (d) {
                	return d.y >= 0 ? yScale(d.y + d.y0) : yScale(0);
                })
                .attr("height", function (d) {
                    return d.y > 0 ? dimension.height - yScale(d.y + data.min) : yScale(d.y + data.max);
                })
                .style("fill", color(bar.name))
                .style("opacity", 0.8);
        });
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.bars").remove();
        this.draw(chart);
    };
    
};

var GroupedBar = function() {
    
    var groupScale = d3.scale.ordinal();
    
    this.draw = function(chart) {
        
        var groupScaleDomain = [];
        var entries = [];
        
        var settings = chart.currentSetting;
        var barSeries = settings.data.barSeries;
        var xScale = settings.xScale;
        var yScale = settings.yScale;
        var color = settings.color;
        var height = settings.dimension.height;
        
        var svg = chart.svg;

        barSeries.map(function (bar) {

            bar.series.map(function (d) {
                entries.push({
                    name: bar.name,
                    x: d.x,
                    y: d.y,
                    color: bar.color
                });
            });

            groupScaleDomain.push(bar.name);

        });
        
        var groupedBarData = d3.nest()
            .key(function (d) {
                return d.x;
            })
            .entries(entries);

        groupScale.domain(groupScaleDomain)
            .rangeRoundBands([0, xScale.rangeBand()]);

        var bars = svg.append("g")
            .attr("class", "bars");
        
        bars.selectAll(".bar")
            .data(groupedBarData)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
                return "translate(" + xScale(d.key) + ",0)";
            });

        bars.selectAll("g").selectAll("rect")
            .data(function (d) {
                return d.values;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return groupScale(d.name);
            })
            .attr("width", groupScale.rangeBand())
            .attr("y", function (d) {
                return yScale(d.y);
            })
            .attr("height", function (d) {
                return height - yScale(d.y);
            })
            .style("fill", function (d) {
                return d.color || color(d.name);
            })
            .style("opacity", 0.8);
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.bars").remove();
        this.draw(chart);
    };
    
};

function Line() {
    
    this.draw = function (chart) {
        
        var svg = chart.svg;
        var settings = chart.currentSetting;
        
        var series = settings.data.lineSeries;
        
        var xScale = settings.xScale;
        var yScale = settings.yScale;
        var color = settings.color;

        var lineOffset = xScale.rangeBand() / 2;

        var generateLine = d3.svg.line()
            .x(function (d) {
                return xScale(d.x) + lineOffset;
            })
            .y(function (d) {
                return yScale(d.y);
            });
                
        var lines = svg.append("g")
            .attr("class", "lines");
        
        series.map(function (line) {
            lines.append("path")
                .attr("class", line.name)
                .attr("d", generateLine(line.series))
                .style("stroke", color(line.name))
                .style("opacity", 0.8);
            
        });
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.lines").remove();
        this.draw(chart);
    };

};

function Tooltip() {
    
    this.draw = function(chart) {
        
        var svg = chart.svg;
        
        var settings = chart.currentSetting;
        var xScale = settings.xScale;
        var yScale = settings.yScale;
        var color = settings.color;
        var lineSeries = settings.data.lineSeries;
        var outputDateFormat = settings.options.categoryOutputFormat;

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("left", "10px")
            .style("top", "10px");

        var bars = svg.select("g.bars").selectAll("rect");

        bars.on("mouseover", function (d) {
            
            var element = d3.select(this);
            
            var left = parseInt(element.attr("x")) + 20;
            var top = parseInt(element.attr("y")) - 40;

            d3.select(this).style("opacity", 1.0);

            tooltip.style("opacity", .9);

            tooltip.html(outputDateFormat(d.x) + "<br/>" + d.y)
                .style("left", left + "px")
                .style("top", (top > 0 ? top : 0) + "px");
        });

        bars.on("mouseout", function (d) {
            d3.select(this).style("opacity", .8);
            tooltip.style("opacity", 0);
        });

        var lineOffset = xScale.rangeBand() / 2;

        var lineDots = svg.append("g")
            .attr("class", "lineDots");

        lineSeries.map(function (line) {
            lineDots.selectAll(line.name)
                .data(line.series)
                .enter()
                .append("circle")
                .attr("r", 10)
                .attr("cx", function (d) {
                    return xScale(d.x) + lineOffset;
                })
                .attr("cy", function (d) {
                    return yScale(d.y);
                })
                .style("fill", line.color || color(line.name))
                .style("opacity", 0)
                .on("mouseover", function (d) {

                    var left = parseInt(d3.select(this).attr("cx"));
                    var top = parseInt(d3.select(this).attr("cy")) - 40;

                    d3.select(this).style("opacity", 0.8);

                    tooltip.style("opacity", .9);

                    tooltip.html(outputDateFormat(d.x) + "<br/>" + d.y)
                        .style("left", (left) + "px")
                        .style("top", (top > 0 ? top : 0) + "px");
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("opacity", 0);

                    tooltip.style("opacity", 0);
                });
        });
        
    };
    
    this.redraw = function(chart) {
        d3.select("div.tooltip").remove();
        chart.svg.selectAll("g.lineDots").remove();
        this.draw(chart);
    };
    
};

function Legend() {
    
    this.draw = function(chart) {
        
        var settings = chart.currentSetting;
        var series = settings.data.series;
        
        var dimension = settings.dimension;
        
        var color = settings.color;
        
        var svg = chart.svg;
        
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 100)
            .attr("transform", "translate(-20,50)");
        
        legend.selectAll("rect")
            .data(series)
            .enter()
            .append("rect")
            .attr("x", dimension.width + 50)
            .attr("y", function (d, i) {
                return i * 20;
            })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d) {
                return d.color || color(d.name);
        });
        
        legend.selectAll("text")
            .data(series)
            .enter()
            .append("text")
            .attr("x", dimension.width + 65)
            .attr("y", function (d, i) {
                return i * 20 + 9;
            })
            .text(function (d) {
                return d.name;
        });
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.legend").remove();
        this.draw(chart);
    };
    
};

function NoData() {
    
    this.draw = function(chart) {

        var width = chart.currentSetting.dimension.width;
        var height = chart.currentSetting.dimension.height;
        
        var svg = chart.svg;
        
        var noData = svg.append("g");

        noData.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "white");

        noData.append("text")
            .text("No Data available")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("font-size", 45)
            .style("text-anchor", "middle");
        
    };
    
};

function AggregationControl() {
    
    this.draw = function (chart) {

        var svg = chart.svg;
        var settings = chart.currentSetting;
        
        var control = svg.append("g")
            .attr("class", "controls aggregationcontrol");

        control.append("circle")
            .attr("r", 5)
            .attr("cx", 100)
            .attr("cy", -20)
            .style("fill", settings.options.aggregate ? "black" : "white")
            .style("stroke", "black")
            .style("stroke-width", 2)
            .on("click", function (d) {
                chart.toggleAggregate();
            });

        control.append("text")
            .attr("x", 110)
            .attr("y", -15)
            .text("Aggregate")
            .on("click", function (d) {
                chart.toggleAggregate();
            });
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.aggregationcontrol").remove();
        this.draw(chart);
    };
};

function BudgetReportControl() {
    
    this.draw = function(chart) {
        
        var svg = chart.svg;
        
        var control = svg.append("g")
            .attr("class", "controls budgetreportcontrol");
    
        control.append("circle")
            .attr("r", 5)
            .attr("cx", 200)
            .attr("cy", -20)
            .style("fill", "white")
            .style("stroke", "black")
            .style("stroke-width", 2)
            .on("click", function (d) {
                chart.nextDataset();
            });

        control.append("text")
            .attr("x", 210)
            .attr("y", -15)
            .text("Budget <> Funding")
            .on("click", function (d) {
                chart.nextDataset();
            });
        
    };
    
    this.redraw = function(chart) {
        chart.svg.selectAll("g.budgetreportcontrol").remove();
        this.draw(chart);
    };
    
};

function ActualPlanSeparator() {
	
	this.draw = function(chart) {
		
		var svg = chart.svg;
				
		var settings = chart.currentSetting;
		
		var category = settings.data.category;
		
		var height = settings.dimension.height;
		
		var xScale = settings.xScale;
		
		var xPos = null;
		
		var today = new Date();
		
		var planStart = new Date(today.getYear() + 1900, today.getMonth(), 1);
		
		var lastElementCategory = category[category.length - 1];
			
		// 2px Bar width
		xPos = xScale(planStart) - 2;
		
		if(planStart <= lastElementCategory) {
			var separator = svg.append("g")
			.attr("class", "ActualPlanSeparator");
	
			separator.append("rect")
				.attr("width", 2)
				.attr("height", height + 20)
				.style("fill", "black")
				.attr("x", xPos);
			
			separator.append("text")
				.text("Actuals")
				.attr("x", xPos - 90)
				.attr("y", height + 40)
				.attr("font-size", 15);
			
			separator.append("text")
				.text("Planned")
				.attr("x", xPos + 30)
				.attr("y", height + 40)
				.attr("font-size", 15);
		}
				
	};
	
	this.redraw = function(chart) {
        chart.svg.selectAll("g.ActualPlanSeparator").remove();
        this.draw(chart);
    };
	
};

function EffortChart(args) {
    
    var chart = new Chart();
        
    chart.addComponent(new XAxis());
    chart.addComponent(new YAxis());
    chart.addComponent(new Grid());
    chart.addComponent(new StackedBar());
    chart.addComponent(new Line());
    chart.addComponent(new Legend());
    chart.addComponent(new AggregationControl());
    
    this.addData = function(args) {
        
        args.options = args.options || {};
        args.options.aggregate = false;
        args.options.stack = true;
        args.options.legend = true;
        args.options.rotateCategory = true;
        args.options.categoryInputFormat = d3.time.format("%Y-%m-%d").parse;
        args.options.categoryOutputFormat = d3.time.format("%b-%y");
        
        var setting = new Settings(args);
        
        chart.addSettings(setting);
        
    };
    
    this.draw = function() {
        
        if(chart.isDataAvailable()) {
            chart.draw();
        } else {
            chart.clearComponents();
            chart.addComponent(new NoData());
            chart.draw();
        }
                
    };
    
};

function BudgetChart(args) {
    
    var chart = new Chart();
        
    chart.addComponent(new XAxis());
    chart.addComponent(new YAxis());
    chart.addComponent(new Grid());
    chart.addComponent(new StackedBar());
    chart.addComponent(new Line());
    chart.addComponent(new Legend());
    chart.addComponent(new AggregationControl());
    chart.addComponent(new BudgetReportControl());
    chart.addComponent(new ActualPlanSeparator());
    
    this.addData = function(args) {
        
        args.options = args.options || {};
        args.options.aggregate = false;
        args.options.stack = true;
        args.options.legend = true;
        args.options.rotateCategory = true;
        args.options.categoryInputFormat = d3.time.format("%Y-%m-%d").parse;
        args.options.categoryOutputFormat = d3.time.format("%b-%y");
        
        var setting = new Settings(args);
        
        chart.addSettings(setting);
        
    };
    
    this.draw = function() {
        
        if(chart.isDataAvailable()) {
            chart.draw();
        } else {
            chart.clearComponents();
            chart.addComponent(new NoData());
            chart.draw();
        }
                
    };
    
};
