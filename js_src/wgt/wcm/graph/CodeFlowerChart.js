/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */


/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'code_flower_chart', function( jNode ){


  jNode.removeClass('wcm_code_flower_chart');
  window.$B.loadModule('d3');

  var flowerGraph = new CodeFlower( '#'+jNode.attr('id'), jNode.innerWidth(), jNode.innerHeight() );

  var graphData = window.$B.robustParseJSON(jNode.find('var').text());
  jNode.find('var').remove();
  flowerGraph.update(graphData);

  /**/

});

