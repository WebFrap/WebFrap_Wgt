var Chart = function (args) {

    var margin = args.margin || {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    var width = (args.width || 1000) - margin.left - margin.right;
    var height = (args.height || 500) - margin.top - margin.bottom;

    var chart = null;

    var dataset = [];
    var currentDataset = 0;

    var category = null;
    var rawSeries = null;
    var series = null;
    var description = null;
    var options = null;
    var element = null;

    var xScale = d3.scale.ordinal();
    var yScale = d3.scale.linear();
    var color = null;

    var xAxis = d3.svg.axis();
    var yAxis = d3.svg.axis();

    var seriesMax = 0;

    var maxBarWidth = 30;

    var barSeries = null;
    var lineSeries = null;

    /**
     * Copy the original series and setup our global svg element.
     */
    var setup = function () {

        series = JSON.parse(JSON.stringify(rawSeries));

        chart = d3.select(element)
            .append("svg")
            .attr("class", "chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };

    /**
     * Parse all category elements with the appropriate format. The format is defined externally.
     */
    var parseCategory = function (format) {

        category = category.map(function (d) {

            return format(d);

        });

    };

    /**
     * Aggregate all series elements and write them back.
     */
    var aggregateSeries = function () {

        series.map(function (node) {

            var aggregatedValue = 0;

            node.series = node.series.map(function (d) {
                aggregatedValue += d;
                return d3.round(aggregatedValue, 2);

            });

        });

    };

    /**
     * Get the maximum value of a given array and write it to seriesMax if it's the global maximum.
     */
    var getSeriesMax = function (series) {

        var max = d3.max(series);

        if (max > seriesMax) {
            seriesMax = Math.ceil(max);
        };

    };

    /**
     * Merge series and category data together to match the standard d3 format.
     */
    var mergeSeriesCategory = function () {

        series.map(function (node) {

            getSeriesMax(node.series);

            node.series = node.series.map(function (d, i) {

                return {
                    x: category[i],
                    y: d
                };

            });

        });

    };

    /**
     * Split our merged series into data for bars and data for lines.
     */
    var splitSeries = function () {

        barSeries = series.filter(function (d) {
            return d.type == "bar";
        });
        lineSeries = series.filter(function (d) {
            return d.type == "line";
        });

    };

    /**
     * Setup both, x and y scale for the given dimensions and domains.
     */
    var setupScales = function () {

        xScale.rangeRoundBands([0, width], .1)
            .domain(category);

        yScale.range([height, 0])
            .domain([0, seriesMax]);
        
        color = series.length > 10 ? d3.scale.category20() : d3.scale.category10();

    };

    /**
     * Setup both, x and y axis for the given scales.
     */
    var setupAxis = function () {

        xAxis.scale(xScale)
            .orient("bottom");

        yAxis.scale(yScale)
            .orient("left");

    };

    /**
     * Add an optional tickformat to our x axis. The format is defined externally.
     */
    var addTickFormat = function (format) {

        xAxis.tickFormat(function (d) {
            return format(d);
        });

    };

    /**
     * Draw the x axis into our global svg element and rotate the labels if needed.
     */
    var drawAxisX = function (rotateCategory) {

        var axis = chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        if (rotateCategory) {
            axis.selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function (d) {
                    return "rotate(-65)";
                });
        }

    };

    /**
     * Draw the x axis into our global svg element and add a custom description if needed. The
     * description can be defined externally.
     */
    var drawAxisY = function (description) {

        var axis = chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        if (description) {
            axis.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(description);
        };

    };

    /**
     * Draw the elemts according to the given, external options. If it's a redraw, some steps can
     * be skipped.
     */
    var draw = function (redraw) {

        if (redraw) {
            resetChart();
        }

        setup();

        if (options.aggregate) {
            aggregateSeries();
        }

        if (options.seriesInputFormat && !redraw) {

            parseCategory(options.seriesInputFormat);

        }

        mergeSeriesCategory();

        setupScales();

        setupAxis();

        if (options.seriesOutputFormat) {

            addTickFormat(options.seriesOutputFormat);

        }

        drawAxisX(options.rotateCategory);
        drawAxisY(description.y);

        if (options.grid) {
            drawGrid();
        }

        splitSeries();

        if (options.stack) {
            drawBarStacked();
        }

        if (options.group) {
            drawBarGrouped();
        }

        drawLine();

        if (options.tooltip) {
            drawTooltip();
        }

        if (options.legend) {
            drawLegend();
        }

        if (options.controls) {
            drawControlAggregate();
        }

    };

    /**
     * Draw all bars with the d3.stack layout.
     */
    var drawBarStacked = function () {

        var stack = d3.layout.stack()
            .offset("zero")
            .values(function (d) {
                return d.series;
            });

        stack(barSeries);

        var bars = chart.append("g")
            .attr("class", "bars");

        var scaledBarWidth = xScale.rangeBand();

        var barWidth = scaledBarWidth > maxBarWidth ? maxBarWidth : scaledBarWidth;

        var offset = scaledBarWidth > maxBarWidth ? ((scaledBarWidth - maxBarWidth) / 2) : 0;

        barSeries.map(function (bar, i) {

            bars.selectAll(bar.name)
                .data(bar.series)
                .enter()
                .append("rect")
                .attr("class", bar.name)
                .attr("x", function (d) {
                    return xScale(d.x) + offset;
                })
                .attr("width", barWidth)
                .attr("y", function (d) {
                    return yScale(d.y + d.y0);
                })
                .attr("height", function (d) {
                    return height - yScale(d.y);
                })
                .style("fill", bar.color || color(bar.name))
                .style("opacity", 0.8);
        });

    };

    var drawBarGrouped = function () {

        var groupScaleDomain = [];
        var entries = [];

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

        groupedBarData = d3.nest()
            .key(function (d) {
                return d.x;
            })
            .entries(entries);

        groupScale = d3.scale.ordinal();

        groupScale.domain(groupScaleDomain)
            .rangeRoundBands([0, xScale.rangeBand()]);

        var bars = chart.selectAll(".bar")
            .data(groupedBarData)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
                return "translate(" + xScale(d.key) + ",0)";
            });

        bars.selectAll("rect")
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

    var drawGrid = function () {

        function xGrid() {
            return d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(10);
        };

        function yGrid() {
            return d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(10);
        };

        chart.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(xGrid()
                .tickSize(-height, 0, 0)
                .tickFormat("")
        );

        chart.append("g")
            .attr("class", "grid")
            .call(yGrid()
                .tickSize(-width, 0, 0)
                .tickFormat("")
        );

    };

    /**
     * Remove all chart and tooltip elements and reset the maximum for our series.
     */
    var resetChart = function () {

        d3.select("svg.chart").remove();
        d3.select("div.tooltip").remove();

        seriesMax = 0;

    };

    var drawLine = function () {

        var lineOffset = xScale.rangeBand() / 2;

        var generateLine = d3.svg.line()
            .x(function (d) {
                return xScale(d.x) + lineOffset;
            })
            .y(function (d) {
                return yScale(d.y);
            });

        var lines = chart.append("g").attr("class", "lines");

        lineSeries.map(function (line) {
            lines.append("path")
                .attr("class", line.name)
                .attr("d", generateLine(line.series))
                .style("stroke", line.color || color(line.name))
                .style("opacity", 0.8);
        });

    };

    var drawControlAggregate = function () {

        var control = chart.append("g")
            .attr("class", "controls");

        control.append("circle")
            .attr("r", 5)
            .attr("cx", 100)
            .attr("cy", -20)
            .style("fill", options.aggregate ? "black" : "white")
            .style("stroke", "black")
            .style("stroke-width", 2)
            .on("click", function (d) {
                toggleAggregate();
            });

        control.append("text")
            .attr("x", 110)
            .attr("y", -15)
            .text("Aggregate")
            .on("click", function (d) {
                toggleAggregate();
            });

    };

    var drawLegend = function () {

        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 100)
            .attr("transform", "translate(-20,50)");

        legend.selectAll("rect")
            .data(series)
            .enter()
            .append("rect")
            .attr("x", width + 50)
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
            .attr("x", width + 65)
            .attr("y", function (d, i) {
                return i * 20 + 9;
            })
            .text(function (d) {
                return d.name;
            });

    };

    var drawNoData = function () {

        var w = width + margin.left + margin.right;
        var h = height + margin.top + margin.bottom;
        
        var noData = d3.select(element)
            .append("svg")
            .attr("class", "chart")
            .attr("width", w)
            .attr("height", h)
            .append("g");

        noData.append("rect")
            .attr("width", w)
            .attr("height", h)
            .style("stroke", "red")
            .style("fill", "white");

        noData.append("text")
            .text("No Data available")
            .attr("x", w / 2)
            .attr("y", h / 2)
            .attr("font-size", 45)
            .style("text-anchor", "middle");

    };

    var drawTooltip = function () {

        var outputDateFormat = options.seriesOutputFormat;

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var bars = chart.selectAll("rect");

        bars.on("mouseover", function (d) {

            var left = parseInt(d3.select(this).attr("x"));
            var top = parseInt(d3.select(this).attr("y")) - 40;

            d3.select(this).style("opacity", 1.0);

            tooltip.style("opacity", .9);

            tooltip.html(outputDateFormat(d.x) + "<br/>" + d.y)
                .style("left", (left) + "px")
                .style("top", (top > 0 ? top : 0) + "px");

        });

        bars.on("mouseout", function (d) {

            d3.select(this).style("opacity", .8);
            tooltip.style("opacity", 0);

        });

        var lineOffset = xScale.rangeBand() / 2;

        var lineDots = chart.append("g")
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

    var toggleAggregate = function () {

        if (options.aggregate) {
            options.aggregate = false;
            draw(true);
        } else {
            options.aggregate = true;
            draw(true);
        }

    };

    this.setData = function (data) {
        element = data.options.element || "body";

        category = data.category;
        rawSeries = data.series;
        description = data.description;
        options = data.options;
    };

    this.addData = function (data) {
        dataset.push(data);

        if (dataset.length == 1) {
            this.setData(dataset[currentDataset]);
        }

    };

    this.nextDataset = function () {
        this.setData(dataset[currentDataset++]);
    };

    this.render = function () {
        if (category && category.length > 0 && rawSeries && rawSeries.length > 0 && options) {
            draw();
        } else {
            drawNoData();
        }
    };

    this.stack = function () {

        if (options.group) {
            options.stack = true;
            options.group = false;
            draw(true);
        }

    };

    this.group = function () {

        if (options.stack) {
            options.stack = false;
            options.group = true;
            draw(true);
        }

    };

};