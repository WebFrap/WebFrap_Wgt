$R.addAction('project_budget_chart', function(jNode)
{

    window.$B.loadModule('d3');

    var data = window.$B.robustParseJSON(jNode.find('var').text());

    jNode.find('var').remove();
    
    var budget = data.data.budget;
    var funding = data.data.funding;
    var directBudget = data.data.directBudget;
    var directFunding = data.data.directFunding;
    
    var idChart = jNode.attr("id");
    
    var element = document.getElementById(idChart).parentNode;

    var parent = element.parentNode.parentNode.parentNode.parentNode;
    
    var innerWidth = parent.clientWidth - 20;
    var innerHeight = parent.clientHeight - 80;

    budget.options = {
            element : "#" + element.id
            };
    
    budget.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    funding.options = {
            element : "#" + element.id
            };
    
    funding.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    directBudget.options = {
            element : "#" + element.id
            };
    
    directBudget.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    directFunding.options = {
            element : "#" + element.id
            };
    
    directFunding.dimension = {
            width : innerWidth,
            height : innerHeight
    }
    
    var budgetChart = Graph.BudgetChart;
    
    budgetChart.addData(budget);
    budgetChart.addData(funding);
    budgetChart.addData(directBudget);
    budgetChart.addData(directFunding);
    
    budgetChart.draw();

});
