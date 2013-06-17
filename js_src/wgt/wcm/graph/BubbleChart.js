/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * http://webfrap.net/WGT
 *
 * @author Dominik Bonsch <db@webfrap.net>
 */
$R.addAction( 'bubble_chart', function( jNode ){
  

  jNode.removeClass('wcm_bubble_chart');
  window.$B.loadModule('d3');

  //Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];

    var recurse = function(name, node) {
      if (node.children){ 
        node.children.forEach(function(child) { 
          recurse(node.name, child); 
        });
      }
      else{
        classes.push({packageName: name, className: node.name, value: node.size});
      }
    }

    recurse(null, root);
    return {children: classes};
  };
  
  var w = jNode.innerWidth(),
    h = jNode.innerHeight();
  
  var diameter = (h>w?w:h),
    format = d3.format(",d"),
    color = d3.scale.category20c();

  var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select('#'+jNode.attr('id')).append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var data = window.$B.robustParseJSON(jNode.find('var').text());
  jNode.find('var').remove();

  var node = svg.selectAll(".node")
    .data(bubble.nodes(classes(data))
    .filter(function(d) { return !d.children; }))
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
    .text(function(d) { return d.className + ": " + format(d.value); });
  
  node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d) { return color(d.packageName); });
  
  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.className.substring(0, d.r / 3); });
  
  d3.select(self.frameElement).style("height", diameter + "px");

});
