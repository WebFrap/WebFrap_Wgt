/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

/* Data structure
{
 "xl":"",
 "yl":"",
 "values":"key,value
<5,2704659\n
5-13,4499890\n
14-17,2159981\n
18-24,3853788\n
25-44,14106543\n
45-64,8819342\n
≥65,612463\n"
}
 */

/*
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'code_flower_chart', function( jNode ){
  
  jNode.removeClass('wcm_code_flower_chart');

  window.$B.loadModule('d3');

  var flowerGraph = new CodeFlower("#visualization", 300, 200);

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  flowerGraph.update(graphData);
  

});
