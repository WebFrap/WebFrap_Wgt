/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_dashboard', function( jNode ){

  jNode.removeClass("wcm_ui_dashboard");

  var dashboard = jNode.dashboard({
    
    // layout class is used to make it possible to switch layouts
    layoutClass: 'layout',
    
    // feed for the widgets which are on the dashboard when opened
    // url: "jsonfeed/mywidgets.json"
    json_data: 
    {
      url: "json.php?c=Webfrap.Dashboard.widgetList&objid="+jNode.attr('id')
    },
    
    // json feed; the widgets whcih you can add to your dashboard
    // "jsonfeed/widgetcategories.json"
    addWidgetSettings: 
    {
      widgetDirectoryUrl: "json.php?c=Webfrap.Dashboard.widgetCategory&objid="+jNode.attr('id')
    },

    // Definition of the layout
    // When using the layoutClass, it is possible to change layout using only another class. In this case
    // you don't need the html property in the layout
    layouts:
    [
      { 
        title: "Layout1",
        id: "layout1",
        image: $C.imagePath+"/dashboard/layout1.png",
        html: '<div class="layout layout-a"><div class="column first column-first"></div></div>',
        classname: 'layout-a'
      },
      { 
        title: "Layout2",
        id: "layout2",
        image: $C.imagePath+"/layouts/layout2.png",
        html: '<div class="layout layout-aa"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
        classname: 'layout-aa'
      },
      { 
        title: "Layout3",
        id: "layout3",
        image: $C.imagePath+"/layouts/layout3.png",
        html: '<div class="layout layout-ba"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
        classname: 'layout-ba'
      },
      { 
        title: "Layout4",
        id: "layout4",
        image: $C.imagePath+"/layouts/layout4.png",
        html: '<div class="layout layout-ab"><div class="column first column-first"></div><div class="column second column-second"></div></div>',
        classname: 'layout-ab'
      },
      { 
        title: "Layout5",
        id: "layout5",
        image: $C.imagePath+"/layouts/layout5.png",
        html: '<div class="layout layout-aaa"><div class="column first column-first"></div><div class="column second column-second"></div><div class="column third column-third"></div></div>',
        classname: 'layout-aaa'
      }
    ]

  }); // end dashboard call
  
  // binding for a widgets is added to the dashboard
  dashboard.element.live( 'dashboardAddWidget', function(e, obj)
  {
    var widget = obj.widget;

    dashboard.addWidget({
      "id":widget.id,
      "title":widget.title,
      "url":widget.url,
      "metadata":widget.metadata
      }, 
      dashboard.element.find('.column:first')
    );
  });

  // the init builds the dashboard. This makes it possible to first unbind events before the dashboars is built.
  dashboard.init();

});