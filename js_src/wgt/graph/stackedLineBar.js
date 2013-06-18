nv.models.stackedLineBar = function() {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

    var margin = {
        top : 30,
        right : 20,
        bottom : 50,
        left : 60
    };
    var color = d3.scale.category20().range();
    var width = 900;
    var height = 500;
    var showLegend = true;
    var tooltips = true;
    var tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' + '<p>' + y + ' at ' + x + '</p>'
    };
    var x;
    var y; // can be accessed via chart.lines.[x/y]Scale()
    var state = {};
    var defaultState = null;

  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x = d3.scale.linear();
  
  var yScale = d3.scale.linear();

  var lines = nv.models.line()
      .yScale(yScale);

  var bars = nv.models.multiBar()
      .stacked(false)
      .yScale(yScale);

  var stack = nv.models.stackedArea()
      .yScale(yScale);

  var xAxis = nv.models.axis()
      .scale(x)
      .orient('bottom')
      .tickPadding(5);
      
  var yAxis = nv.models.axis()
      .scale(yScale)
      .orient('left');

  var legend = nv.models.legend()
      .height(30);
  
  var dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState');

  var showTooltip = function(e, offsetElement) {
      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
          top = e.pos[1] + ( offsetElement.offsetTop || 0),
          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
          y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
          content = tooltip(e.series.key, x, y, e, chart);

      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
    };

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      var datalines = data.filter(function(d) {return !d.disabled && d.type == 'line'});
      
      var databars = data.filter(function(d) {return !d.disabled && d.type == 'bar'});
      
      var datastack = data.filter(function(d) {return !d.disabled && d.type == 'area'});

      var series = data.filter(function(d) {return !d.disabled})
            .map(function(d) {
              return d.values.map(function(d,i) {
                return { x: d.x, y: d.y };
              });
            });


      x.domain(d3.extent(d3.merge(series), function(d) { return d.x } ))
          .range([0, availableWidth]);

      var wrap = container.selectAll('g.wrap.multiChart')
          .data([data]);
      var gEnter = wrap.enter()
          .append('g')
          .attr('class', 'wrap nvd3 multiChart')
          .append('g');

      gEnter.append('g')
          .attr('class', 'x axis');
      
      gEnter.append('g')
          .attr('class', 'y axis');
      
      gEnter.append('g')
          .attr('class', 'linesWrap');
      
      gEnter.append('g')
          .attr('class', 'barsWrap');
      
      gEnter.append('g')
          .attr('class', 'stackWrap');
      
      gEnter.append('g')
          .attr('class', 'legendWrap');

      var g = wrap.select('g');

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.legendWrap')
            .datum(data.map(function(series) { 
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey;
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }


      lines
        .width(availableWidth)
        .height(availableHeight)
        .interpolate("monotone")
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].type == 'line'}));

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].type == 'bar'}));

      stack
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].type == 'area'}));

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      var linesWrap = g.select('.linesWrap')
          .datum(datalines);
      
      var barsWrap = g.select('.barsWrap')
          .datum(databars);
      
      var stackWrap = g.select('.stackWrap')
          .datum(datastack);

      var extraValue = datastack.length ? datastack.map(function(a){return a.values}).reduce(function(a,b){
        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
      }).concat([{x:0, y:0}]) : [];

      yScale .domain(d3.extent(d3.merge(series).concat(extraValue), function(d) { return d.y } ))
              .range([0, availableHeight]);

      lines.yDomain(yScale.domain());
      
      bars.yDomain(yScale.domain());
      
      stack.yDomain(yScale.domain());

      if(datastack.length){d3.transition(stackWrap).call(stack);}

      if(databars.length){d3.transition(barsWrap).call(bars);}

      if(datalines.length){d3.transition(linesWrap).call(lines);}

      xAxis
          .ticks( availableWidth / 100 )
          .tickSize(-availableHeight, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + availableHeight + ')');
      
      d3.transition(g.select('.x.axis'))
          .call(xAxis);

      yAxis
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.y.axis'))
          .call(yAxis);

      legend.dispatch.on('legendClick', function(d,i) { 
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.map(function(d) {
            d.disabled = false;
            wrap.selectAll('.series').classed('disabled', false);
            return d;
          });
        }
        
        state.disabled = data.map(function(d) { return !!d.disabled });
        dispatch.stateChange(state);
        
        selection.transition().call(chart);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

    });

    chart.update = function() { chart(selection) };
    chart.container = this;

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  stack.dispatch.on('tooltipShow', function(e) {
    //disable tooltips when value ~= 0
    //// TODO: consider removing points from voronoi that have 0 value instead of this hack
    if (!Math.round(stack.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
      setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
      return false;
    }

    e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
    dispatch.tooltipShow(e);
  });

  stack.dispatch.on('tooltipHide', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });



  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.lines = lines;
  chart.bars = bars;
  chart.stack = stack;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    legend.color(_);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  return chart;
};

