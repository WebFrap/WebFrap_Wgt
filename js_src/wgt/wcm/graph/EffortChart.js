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

    d.options = {};
    d.options.grid = true;
    d.options.stack = true;
    d.options.legend = true;
    d.options.aggregate = true;
    d.options.rotateCategory = true;
    d.options.element = "#" + idChart;
    d.options.seriesInputFormat = d3.time.format("%Y-%m-%d").parse;
    d.options.seriesOutputFormat = d3.time.format("%b-%y");
    d.description = "Effort [PM]";

    console.log(d);

    var g = new Chart(
    {
        width : innerWidth,
        height : innerHeight,
        margin :
        {
            top : 40,
            right : 150,
            bottom : 90,
            left : 40
        }
    });
    g.setData(d);
    g.render();

});
