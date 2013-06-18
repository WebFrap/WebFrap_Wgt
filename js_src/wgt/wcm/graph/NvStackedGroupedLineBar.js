/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'nv_stacked_grouped_line_bar', function( jNode ){
  
  jNode.removeClass('wcm_nv_stacked_grouped_line_bar');

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
  
  //########################################
  
  nv.addGraph(function() {
      
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      var dateFormat = d3.time.format("%b-%y");

      //var data = [{"key":"Actual","values":[{x:"2010-06-01",y:1.66},{x:"2010-07-01",y:3.32},{x:"2010-08-01",y:4.29},{x:"2010-09-01",y:5.75},{x:"2010-10-01",y:7.83},{x:"2010-11-01",y:10.8},{x:"2010-12-01",y:14.15},{x:"2011-01-01",y:17.4},{x:"2011-02-01",y:20.18},{x:"2011-03-01",y:25.56},{x:"2011-04-01",y:29.83},{x:"2011-05-01",y:34.32},{x:"2011-06-01",y:36.89},{x:"2011-07-01",y:40.4},{x:"2011-08-01",y:44.29},{x:"2011-09-01",y:48.38},{x:"2011-10-01",y:51.51},{x:"2011-11-01",y:55.15},{x:"2011-12-01",y:59.34},{x:"2012-01-01",y:64.66},{x:"2012-02-01",y:70.23},{x:"2012-03-01",y:75.24},{x:"2012-04-01",y:79.05},{x:"2012-05-01",y:83.91},{x:"2012-06-01",y:88.5},{x:"2012-07-01",y:93.95},{x:"2012-08-01",y:100.68},{x:"2012-09-01",y:106.2},{x:"2012-10-01",y:112.65},{x:"2012-11-01",y:117.04},{x:"2012-12-01",y:119.74},{x:"2013-01-01",y:126.7},{x:"2013-02-01",y:132.21},{x:"2013-03-01",y:138.13},{x:"2013-04-01",y:144.26},{x:"2013-05-01",y:144.26},{x:"2013-06-01",y:144.26},{x:"2013-07-01",y:144.26},{x:"2013-08-01",y:144.26}]},{"key":"Plan","values":[{x:"2010-06-01",y:0},{x:"2010-07-01",y:0},{x:"2010-08-01",y:0},{x:"2010-09-01",y:0},{x:"2010-10-01",y:0},{x:"2010-11-01",y:0},{x:"2010-12-01",y:0},{x:"2011-01-01",y:0},{x:"2011-02-01",y:0},{x:"2011-03-01",y:0},{x:"2011-04-01",y:0},{x:"2011-05-01",y:0},{x:"2011-06-01",y:0},{x:"2011-07-01",y:0},{x:"2011-08-01",y:0},{x:"2011-09-01",y:0},{x:"2011-10-01",y:0},{x:"2011-11-01",y:0},{x:"2011-12-01",y:0},{x:"2012-01-01",y:0},{x:"2012-02-01",y:0},{x:"2012-03-01",y:0},{x:"2012-04-01",y:0},{x:"2012-05-01",y:0},{x:"2012-06-01",y:0},{x:"2012-07-01",y:0},{x:"2012-08-01",y:0},{x:"2012-09-01",y:0},{x:"2012-10-01",y:0},{x:"2012-11-01",y:0},{x:"2012-12-01",y:0},{x:"2013-01-01",y:0},{x:"2013-02-01",y:0},{x:"2013-03-01",y:0},{x:"2013-04-01",y:0},{x:"2013-05-01",y:0},{x:"2013-06-01",y:5},{x:"2013-07-01",y:10},{x:"2013-08-01",y:13.97}]},{"key":"Demand","values":[{x:"2010-06-01",y:4.1},{x:"2010-07-01",y:8.2},{x:"2010-08-01",y:12.3},{x:"2010-09-01",y:16.4},{x:"2010-10-01",y:20.5},{x:"2010-11-01",y:24.6},{x:"2010-12-01",y:28.7},{x:"2011-01-01",y:32.8},{x:"2011-02-01",y:36.9},{x:"2011-03-01",y:41},{x:"2011-04-01",y:45.1},{x:"2011-05-01",y:49.2},{x:"2011-06-01",y:53.3},{x:"2011-07-01",y:57.4},{x:"2011-08-01",y:61.5},{x:"2011-09-01",y:65.6},{x:"2011-10-01",y:69.7},{x:"2011-11-01",y:73.8},{x:"2011-12-01",y:77.9},{x:"2012-01-01",y:82},{x:"2012-02-01",y:86.1},{x:"2012-03-01",y:90.2},{x:"2012-04-01",y:94.3},{x:"2012-05-01",y:98.4},{x:"2012-06-01",y:102.5},{x:"2012-07-01",y:106.6},{x:"2012-08-01",y:110.7},{x:"2012-09-01",y:114.8},{x:"2012-10-01",y:118.9},{x:"2012-11-01",y:123},{x:"2012-12-01",y:127.1},{x:"2013-01-01",y:131.2},{x:"2013-02-01",y:135.3},{x:"2013-03-01",y:139.4},{x:"2013-04-01",y:143.5},{x:"2013-05-01",y:147.6},{x:"2013-06-01",y:151.7},{x:"2013-07-01",y:155.8},{x:"2013-08-01",y:159.9}]}];

      var graphData = data.data;
      
      graphData[0].bar = true;
      graphData[1].bar = true;
      
      var testParse = d3.time.format("%Y-%m-%d").parse;
      var testFormat = d3.time.format("%b %y");

      var dateFormat = d3.time.format("%Y-%m-%d");

      graphData.map( function(nodes) {
          nodes.values.map( function(d) {
              d.x = dateFormat.parse(d.x);
          } );
      } );
            
      var chart = nv.models.stackedGrouped_lineBar()
          .margin({top: 30, right: 60, bottom: 50, left: 80})
          .x(function(d,i) { return i })
          .y(function(d) { return d.y });
                
      chart.xAxis
      .tickFormat(function(d) {
          var localDate = graphData[0].values[d].x
          return testFormat(localDate);
       } )
       .rotateLabels(-45);;

      chart.yAxis
          .tickFormat(d3.format(',.1f'))
          .axisLabel('Effort in person days');
      
      chart.bars.stacked(true);

      d3.select('#'+jNode.attr('id')+' svg')
          .datum(graphData)
          .transition()
          .duration(500)
          .call(chart);
      
      //nv.utils.windowResize(chart.update);

      //chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

      return chart;
  });

  
  // ########################################

  /*
  nv.addGraph(function() { 
    var chart = nv.models.lineChart();
    
    chart.xAxis
       .axisLabel(data.x.label)
       .tickFormat(d3.format(data.x.format));
     
    chart.yAxis
       .axisLabel(data.y.label)
       .tickFormat(d3.format(data.y.format));
    
    d3.select('#'+jNode.attr('id')+' svg')
      .datum(data.data)
      .transition().duration(500)
      .call(chart);
    
    nv.utils.windowResize(function() { d3.select('#'+jNode.attr('id')+' svg').call(chart) });
    
    return chart;
  });
  */
 
});
