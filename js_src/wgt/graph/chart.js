Graph = function() {

	/**
	 * Collection for graph data and settings. There is exactly one Settings object for each chart.
	 * Data and Settings can be manipulated until the setup method is called.
	 */
    function Settings(args) {

        args.dimension = args.dimension || {};

        var dimension = {
            outerWidth: (args.dimension.width || window.innerWidth) - 20,
            outerHeight: (args.dimension.height || window.innerHeight) - 20,
            margin: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 80
            }
        };

        var category = args.category || {};

        var series = args.series || {};

        var options = {
            chartType: args.options.chartType || false,
            aggregate: args.options.aggregate || false,
            stack: args.options.stack || false,
            rotateCategory: args.options.rotateCategory || false,
            legend: args.options.legend || false,
            directCosts: args.options.direct || false,
            element: args.options.element || "body",
            categoryInputFormat: args.options.categoryInputFormat || function(d) {
                return d;
            },
            categoryOutputFormat: args.options.categoryOutputFormat || function(d) {
                return d;
            },
            description: args.description || ""
        };

        if (options.rotateCategory) {
            dimension.margin.bottom = 80;
        }

        if (options.legend) {
            dimension.margin.right = 110;
        }

        dimension.width = dimension.outerWidth - dimension.margin.left - dimension.margin.right;
        dimension.height = dimension.outerHeight - dimension.margin.top - dimension.margin.bottom;

        var data = {};

        var xScale = d3.scale.ordinal();
        var yScale = d3.scale.linear();
        var color = args.color;

        function setup() {

            data = new Data(series, category, {
                aggregate: options.aggregate,
                format: options.categoryInputFormat,
                chartType: options.chartType
            });

            xScale.rangeRoundBands([0, dimension.width], .1)
                .domain(data.category);

            yScale.range([dimension.height, 0])
                .domain([data.min, data.max]);

            return {
                xScale: xScale,
                yScale: yScale,
                color: color,
                dimension: dimension,
                options: options,
                data: data
            };

        };

        return {
            setup: setup
        };

    };

    function Data(series, category, settings) {

        var _series = JSON.parse(JSON.stringify(series));
        var _category = category;
        var _settings = settings;
        var isDataAvailable = series.length > 0 && category.length > 0;

        var maxValuesBar = [];
        var maxValuesLine = [];
        var minValues = [];

        function mergeSeriesCategory() {
            _series.map(function(node) {

            	getSeriesMax(node);

                node.series = node.series.map(function(d, i) {
                    return {
                        x: _category[i],
                        y: d
                    };
                });
            });

        };

        function parseCategory(format) {
            _category = _category.map(function(d) {
                return format(d);
            });
        };
        
        function getMax() {
        	var seriesMaxBar = Math.ceil(d3.max(maxValuesBar));
        	
        	var seriesMaxLine = Math.ceil(d3.max(maxValuesLine));
        	
        	var seriesSumBar = Math.ceil(d3.sum(maxValuesBar));
        	
        	if(seriesMaxLine > seriesSumBar) {
        		return seriesMaxLine * 1.05;
        	} else {
        		return seriesSumBar;
        	}
        };
        
        function getMin() {
        	var seriesMin = Math.ceil(d3.min(minValues));
        	
        	return seriesMin < 0 ? seriesMin : 0;
        };

        function getSeriesMax(node) {
            var seriesMax = d3.max(node.series);
            var seriesMin = d3.min(node.series);
            
            if(node.type == "bar") {
            	maxValuesBar.push(seriesMax);
            } else if (node.type == "line") {
            	maxValuesLine.push(seriesMax);
            }
            
            minValues.push(seriesMin);
            
        };

        function aggregateSeries() {
            _series.map(function(node) {

                var aggregatedValue = 0;

                node.series = node.series.map(function(d) {
                    aggregatedValue += d;
                    return d3.round(aggregatedValue, 2);
                });
            });
        };

        if (settings.aggregate) {
            aggregateSeries();
        }

        if (isDataAvailable) {
            parseCategory(_settings.format);

            mergeSeriesCategory();
        }

        return {
            series: _series.filter(function(d) {
                return d.type != "hidden";
            }),
            category: _category,
            //min: Math.ceil(min),
            //max: Math.ceil(max),
            min: getMin(),
            max: getMax(),
            isDataAvailable: isDataAvailable,
            barSeries: _series.filter(function(d) {
                return d.type == "bar";
            }),
            lineSeries: _series.filter(function(d) {
                return d.type == "line";
            })
        };

    };

    function Color() {

        var palette = d3.scale.category10();

        return {
            getColor: palette
        };

    }

    function Chart() {

        var components = [];

        var settings = [];

        var currentSettings = null;

        var settingsCount = 0;

        var settingsIndex = 0;

        var svg = null;

        function addComponent(component) {
            components.push(component);
        };

        function clearComponents() {

            components = [];

        };

        function addSettings(setting) {
            settings.push(setting);

            if (settingsCount == 0) {
                currentSettings = settings[settingsIndex].setup();
            }

            settingsCount++;
        };

        function toggleAggregate() {

            var self = this;
            currentSettings.options.aggregate = !currentSettings.options.aggregate;

            currentSettings = settings[settingsIndex].setup();

            components.forEach(function(d) {
                d.redraw(self);
            });
        };

        function toggleDirectCosts() {

            var self = this;
            if (settingsIndex == 0) {
                settingsIndex = 2;
            } else if (settingsIndex == 1) {
                settingsIndex = 3;
            } else if (settingsIndex == 2) {
                settingsIndex = 0;
            } else if (settingsIndex == 3) {
                settingsIndex = 1;
            }

            currentSettings = settings[settingsIndex].setup();

            currentSettings.options.directCosts = !currentSettings.options.directCosts;

            components.forEach(function(d) {
                d.redraw(self);
            });
        };

        function nextDataset() {
            var self = this;
            settingsIndex = settingsIndex == 0 ? 1 : 0;

            currentSettings = settings[settingsIndex].setup();

            components.forEach(function(d) {
                d.redraw(self);
            });

        };

        function toggleBudgetFunding() {
            var self = this;
            settingsIndex = settingsIndex == 0 ? 1 : 0;

            currentSettings = settings[settingsIndex].setup();

            components.forEach(function(d) {
                d.redraw(self);
            });

        };

        function isDataAvailable() {
            return currentSettings.data.isDataAvailable;
        };

        function draw() {
            var element = currentSettings.options.element;
            var dimension = currentSettings.dimension;

            var self = this;

            svg = d3.select(element)
                .append("svg")
                .attr("class", "chart")
                .attr("width", dimension.outerWidth)
                .attr("height", dimension.outerHeight)
                .append("g")
                .attr("transform", "translate(" + dimension.margin.left + "," + dimension.margin.top + ")");

            components.forEach(function(d) {
                d.draw(self);
            });

        };

        function getSettings() {
            return currentSettings;
        }

        return {
            getSettings: function() {
                return currentSettings;
            },
            getSvg: function() {
                return svg;
            },
            getIndex: function() {
                return settingsIndex;
            },
            addComponent: addComponent,
            clearComponents: clearComponents,
            addSettings: addSettings,
            toggleAggregate: toggleAggregate,
            toggleDirectCosts: toggleDirectCosts,
            nextDataset: nextDataset,
            toggleBudgetFunding: toggleBudgetFunding,
            isDataAvailable: isDataAvailable,
            draw: draw
        };

    };

    function XAxis() {
        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var data = settings.data;
            var scale = settings.xScale;
            var dimension = settings.dimension;
            var format = settings.options.categoryOutputFormat;

            // This is serious magic.
            var translate = data.min < 0 ? dimension.height * (data.max / (data.max - data.min)) : dimension.height;

            var axis = d3.svg.axis()
                .scale(scale)
                .orient("bottom")
                .tickFormat(function(d) {
                    return format(d);
                });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + translate + ")")
                .call(axis);

            if (settings.options.rotateCategory) {
                svg.selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)";
                    });
            }

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.axis.x").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };
    };

    function YAxis() {

        function draw(chart) {
            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var scale = settings.yScale;

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

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.axis.y").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function Grid() {

        var xGrid = function(scale) {
            return d3.svg.axis()
                .scale(scale)
                .orient("bottom")
                .ticks(10);
        };

        var yGrid = function(scale) {
            return d3.svg.axis()
                .scale(scale)
                .orient("left")
                .ticks(10);
        };

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

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

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.grid").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function StackedBar() {

        var maxBarWidth = 30;

        var lastValue = 0;

        var month = [];

        var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) {
                return d.series;
            })
            .out(function(d, y0, y) {

                // Reset if month changes
                if (month.indexOf(d.x) < 0) {
                    month.push(d.x);
                    lastValue = 0;
                }

                // true if ancestor y was negative
                if (lastValue > 0) {
                    d.y0 = y0 + lastValue;
                    d.y = y;

                    // reset
                    lastValue = 0;

                } else {
                    d.y = y;
                    d.y0 = y0;
                }

                // true if current y < 0
                if (y < 0) {
                    lastValue = Math.abs(y);
                }

            });

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

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

            series.map(function(bar, i) {

                bars.selectAll(".bar")
                    .data(bar.series)
                    .enter()
                    .append("rect")
                    .attr("class", bar.name)
                    .attr("x", function(d) {
                        return xScale(d.x) + offset;
                    })
                    .attr("width", barWidth)
                    .attr("y", function(d) {
                        return d.y >= 0 ? yScale(d.y + d.y0) : yScale(0);
                    })
                    .attr("height", function(d) {
                        return d.y > 0 ? dimension.height - yScale(d.y + data.min) : yScale(d.y + data.max);
                    })
                    .style("fill", color.getColor(bar.name))
                    .style("opacity", 0.8);
            });
        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.bars").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function GroupedBar() {

        var groupScale = d3.scale.ordinal();

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var groupScaleDomain = [];
            var entries = [];

            var barSeries = settings.data.barSeries;
            var xScale = settings.xScale;
            var yScale = settings.yScale;
            var color = settings.color;
            var height = settings.dimension.height;

            barSeries.map(function(bar) {

                bar.series.map(function(d) {
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
                .key(function(d) {
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
                .attr("transform", function(d) {
                    return "translate(" + xScale(d.key) + ",0)";
                });

            bars.selectAll("g").selectAll("rect")
                .data(function(d) {
                    return d.values;
                })
                .enter()
                .append("rect")
                .attr("x", function(d) {
                    return groupScale(d.name);
                })
                .attr("width", groupScale.rangeBand())
                .attr("y", function(d) {
                    return yScale(d.y);
                })
                .attr("height", function(d) {
                    return height - yScale(d.y);
                })
                .style("fill", function(d) {
                    return d.color || color(d.name);
                })
                .style("opacity", 0.8);

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.bars").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function Line() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var series = settings.data.lineSeries;

            var xScale = settings.xScale;
            var yScale = settings.yScale;
            var color = settings.color;

            var lineOffset = xScale.rangeBand() / 2;

            var generateLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.x) + lineOffset;
                })
                .y(function(d) {
                    return yScale(d.y);
                });

            var lines = svg.append("g")
                .attr("class", "lines");

            series.map(function(line) {
                lines.append("path")
                    .attr("class", line.name)
                    .attr("d", generateLine(line.series))
                    .style("stroke", color.getColor(line.name))
                    .style("opacity", 0.8);

            });
        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.lines").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function Tooltip() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var xScale = settings.xScale;
            var yScale = settings.yScale;
            var color = settings.color;
            var lineSeries = settings.data.lineSeries;
            var outputDateFormat = settings.options.categoryOutputFormat;

            var width = 80;
            var height = 40;

            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("left", "10px")
                .style("top", "10px")
                .style("width", width + "px")
                .style("height", height + "px");

            var bars = svg.select("g.bars")
                .selectAll("rect");

            bars.on("mouseover", function(d) {

                var element = d3.select(this);

                var left = parseInt(element.attr("x")) + (width / 2);
                var top = parseInt(element.attr("y")) - 40;

                d3.select(this).style("opacity", 1.0);

                tooltip.style("opacity", .9);

                tooltip.html(outputDateFormat(d.x) + "<br/>" + d.y)
                    .style("left", left + "px")
                    .style("top", (top > 0 ? top : 0) + "px");
            });

            bars.on("mouseout", function(d) {
                d3.select(this).style("opacity", .8);
                tooltip.style("opacity", 0);
            });

            var lineOffset = xScale.rangeBand() / 2;

            var lineDots = svg.append("g")
                .attr("class", "lineDots");

            lineSeries.map(function(line) {
                lineDots.selectAll(line.name)
                    .data(line.series)
                    .enter()
                    .append("circle")
                    .attr("r", 10)
                    .attr("cx", function(d) {
                        return xScale(d.x) + lineOffset;
                    })
                    .attr("cy", function(d) {
                        return yScale(d.y);
                    })
                    .style("fill", line.color || color.getColor(line.name))
                    .style("opacity", 0)
                    .on("mouseover", function(d) {

                        var left = parseInt(d3.select(this).attr("cx")) - 15 + (width / 2);
                        var top = parseInt(d3.select(this).attr("cy")) - 40;

                        d3.select(this).style("opacity", 0.8);

                        tooltip.style("opacity", .9);

                        tooltip.html(outputDateFormat(d.x) + "<br/>" + d.y)
                            .style("left", (left) + "px")
                            .style("top", (top > 0 ? top : 0) + "px");
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).style("opacity", 0);

                        tooltip.style("opacity", 0);
                    });
            });

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            d3.select("div.tooltip").remove();
            svg.selectAll("g.lineDots").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function Legend() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var series = settings.data.series;

            var dimension = settings.dimension;

            var color = settings.color;

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
                .attr("y", function(d, i) {
                    return i * 20;
                })
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function(d) {
                    return d.color || color.getColor(d.name);
                });

            legend.selectAll("text")
                .data(series)
                .enter()
                .append("text")
                .attr("x", dimension.width + 65)
                .attr("y", function(d, i) {
                    return i * 20 + 9;
                })
                .text(function(d) {
                    return d.name;
                });

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.legend").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function NoData() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var width = settings.dimension.width;
            var height = settings.dimension.height;

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

        return {
            draw: draw
        };

    };

    function AggregationControl() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var control = svg.append("g")
                .attr("class", "controls aggregationcontrol");

            control.append("circle")
                .attr("r", 5)
                .attr("cx", 100)
                .attr("cy", -20)
                .style("fill", settings.options.aggregate ? "black" : "white")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .on("click", function(d) {
                    chart.toggleAggregate();
                });

            control.append("text")
                .attr("x", 110)
                .attr("y", -15)
                .text("Aggregate")
                .on("click", function(d) {
                    chart.toggleAggregate();
                });

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.aggregationcontrol").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function BudgetReportControl() {

        function draw(chart) {

            var svg = chart.getSvg();

            var index = chart.getIndex();

            var text = "";

            var directCostsLabel = "";
            
            var headline = ["costs / month", "claimable funding / month", "direct costs / month", "claimable direct funding"];

            if (index == 0 || index == 2) {
                text = "Show funding";
            } else {
                text = "Show budget";
            }

            if (index == 2 || index == 3) {
                directCostsLabel = "black";
            } else {
                directCostsLabel = "white";
            }

            var control = svg.append("g")
                .attr("class", "controls budgetreportcontrol");

            control.append("circle")
                .attr("r", 5)
                .attr("cx", 200)
                .attr("cy", -20)
                .style("fill", "white")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .on("click", function(d) {
                    chart.toggleBudgetFunding();
                });

            control.append("text")
                .attr("x", 210)
                .attr("y", -15)
                .text(text)
                .on("click", function(d) {
                    chart.toggleBudgetFunding();
                });

            control.append("circle")
                .attr("r", 5)
                .attr("cx", 320)
                .attr("cy", -20)
                .style("fill", directCostsLabel)
                .style("stroke", "black")
                .style("stroke-width", 2)
                .on("click", function(d) {
                    chart.toggleDirectCosts();
                });

            control.append("text")
                .attr("x", 330)
                .attr("y", -15)
                .text("Show direct costs only")
                .on("click", function(d) {
                    chart.toggleDirectCosts();
                });
            
            var aggregate = chart.getSettings().options.aggregate;
                        
            if(aggregate) {
            	headlineText = "Aggregated " + headline[index];
            } else {
            	headlineText = headline[index][0].toUpperCase() + headline[index].slice(1);
            }
            
            control.append("text")
            .attr("font-size", "30px")
            .attr("x", 100)
            .attr("y", 30)
            .text(headlineText);

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.budgetreportcontrol").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function ActualPlanSeparator() {

        function draw(chart) {

            var svg = chart.getSvg();
            var settings = chart.getSettings();

            var category = settings.data.category;

            var height = settings.dimension.height;

            var xScale = settings.xScale;

            var xPos = null;

            var today = new Date();

            var planStart = new Date(today.getYear() + 1900, today.getMonth(), 1);

            var lastElementCategory = category[category.length - 1];

            // 2px Bar width
            xPos = xScale(planStart) - 2;

            if (planStart <= lastElementCategory) {
                var separator = svg.append("g")
                    .attr("class", "ActualPlanSeparator");

                separator.append("rect")
                    .attr("width", 2)
                    .attr("height", height + 40)
                    .style("fill", "black")
                    .attr("x", xPos);

                separator.append("text")
                    .text("Actuals")
                    .attr("x", xPos - 90)
                    .attr("y", height + 60)
                    .attr("font-size", 15);

                separator.append("text")
                    .text("Planned")
                    .attr("x", xPos + 30)
                    .attr("y", height + 60)
                    .attr("font-size", 15);
            }

        };

        function redraw(chart) {
            var svg = chart.getSvg();

            svg.selectAll("g.ActualPlanSeparator").remove();
            draw(chart);
        };

        return {
            draw: draw,
            redraw: redraw
        };

    };

    function EffortChart(args) {

        var chart = new Chart();
        var color = new Color();

        chart.addComponent(new XAxis());
        chart.addComponent(new YAxis());
        chart.addComponent(new Grid());
        chart.addComponent(new StackedBar());
        chart.addComponent(new Line());
        chart.addComponent(new Legend());
        chart.addComponent(new AggregationControl());

        function addData(data) {

            data.options = data.options || {};
            data.options.chartType = "effort";
            data.options.aggregate = false;
            data.options.stack = true;
            data.options.legend = true;
            data.options.rotateCategory = true;
            data.options.categoryInputFormat = d3.time.format("%Y-%m-%d").parse;
            data.options.categoryOutputFormat = d3.time.format("%b-%y");
            data.color = color;

            var setting = new Settings(data);

            chart.addSettings(setting);

        };

        function draw() {

            if (chart.isDataAvailable()) {
                chart.draw();
            } else {
                chart.clearComponents();
                chart.addComponent(new NoData());
                chart.draw();
            }

        };

        return {
            addData: addData,
            draw: draw
        };

    };

    function BudgetChart(args) {

        var chart = new Chart();
        var color = new Color();

        chart.addComponent(new XAxis());
        chart.addComponent(new YAxis());
        chart.addComponent(new Grid());
        chart.addComponent(new StackedBar());
        chart.addComponent(new Line());
        chart.addComponent(new Legend());
        chart.addComponent(new AggregationControl());
        chart.addComponent(new BudgetReportControl());
        chart.addComponent(new ActualPlanSeparator());

        function addData(data) {

            data.options = data.options || {};
            data.options.chartType = "budget";
            data.options.aggregate = false;
            data.options.stack = true;
            data.options.directCosts = false;
            data.options.legend = true;
            data.options.rotateCategory = true;
            data.options.categoryInputFormat = d3.time.format("%Y-%m-%d").parse;
            data.options.categoryOutputFormat = d3.time.format("%b-%y");
            data.color = color;

            var setting = new Settings(data);

            chart.addSettings(setting);

        };

        function draw() {

            if (chart.isDataAvailable()) {
                chart.draw();
            } else {
                chart.clearComponents();
                chart.addComponent(new NoData());
                chart.draw();
            }

        };

        return {
            addData: addData,
            draw: draw
        };

    };

    return {
        EffortChart: EffortChart,
        BudgetChart: BudgetChart
    };

}();
