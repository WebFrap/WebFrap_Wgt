$R.addAction('project_budget_chart', function(jNode)
{

    window.$B.loadModule('d3');

    var data = window.$B.robustParseJSON(jNode.find('var').text());

    jNode.find('var').remove();

    var budgetData = data.budget;
    
    var fundingData = data.funding;
    
    var idChart = jNode.attr("id");
    
    var element = document.getElementById(idChart).parentNode;

    var parent = element.parentNode.parentNode.parentNode.parentNode;
    
    var innerWidth = parent.clientWidth - 20;
    var innerHeight = parent.clientHeight - 80;

    budgetData.options = {
            element : "#" + element.id
            };
    
    budgetData.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    fundingData.options = {
            element : "#" + element.id
            };
    
    fundingData.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    var budgetChart = new BudgetChart();
    
    budgetChart.addData(budgetData);
    budgetChart.addData(fundingData);
    
    budgetChart.draw();

});
