$R.addAction('project_effort_chart', function(jNode)
{

    jNode.removeClass('wcm_project_effort_chart');

    window.$B.loadModule('d3');

    var data = window.$B.robustParseJSON(jNode.find('var').text());

    jNode.find('var').remove();

    var d = data.data;

    var idChart = jNode.attr("id");

    var parent = document.getElementById(idChart).parentNode.parentNode;

    var innerWidth = parent.clientWidth;
    var innerHeight = parent.clientHeight - 25;

    d.options = {
            element : "#" + idChart
            };
    
    d.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    d.description = "Effort [PM]";

    var g = new EffortChart();
    
    g.addData(d);
    
    g.draw();

});
