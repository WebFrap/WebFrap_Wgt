$R.addAction('project_effort_chart', function(jNode)
{
	
    jNode.removeClass('wcm_project_effort_chart');

    window.$B.loadModule('d3');

    var data = window.$B.robustParseJSON(jNode.find('var').text());

    jNode.find('var').remove();
    
    var effortData = data.data;

    var idChart = jNode.attr("id");
    
    var element = document.getElementById(idChart).parentNode;

    var parent = element.parentNode.parentNode.parentNode.parentNode;
    
    var innerWidth = parent.clientWidth - 20;
    var innerHeight = parent.clientHeight - 80;

    effortData.options = {
            element : "#" + element.id
            };
    
    effortData.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    effortData.description = "Effort [PM]";

    var effortChart = Graph.EffortChart;;
    
    effortChart.addData(effortData);
    
    effortChart.draw();

});
