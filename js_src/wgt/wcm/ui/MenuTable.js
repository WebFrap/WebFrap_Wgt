/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'menu_table', function( jNode ){

  var head      = jNode.parentX('th');
  var menuWidth = head.width();

  if( 170 < menuWidth ){
    menuWidth = 170;
  }
  else if( 190 > menuWidth ){
    menuWidth = 190;
  }

  var tabCol = $UI.tableCol(head);
  var menuItems = [];
  /*
  menuItems.push({
    type      : 'activInput',
    minChars  : 3,
    filter    : function( userInput ){ tabCol.filter(userInput); },
    reset     : function(){ tabCol.reset(); }
  });
  */
  ///TODO add i from search form to make order persistent
  menuItems.push({
    type      : 'sortbox',
    url       : 'index.php',
    colId     : 'fubar',
    direction : null
  });

  // check if there are any json data in a data container
  if(head.find("span.wgt_data_container").is("span")){
    // add seperator
    menuItems.push({type:'sep'});
    var elements = $WGT.robustParseJSON(head.find("span.wgt_data_container").text());
    menuItems.push({
      type      : 'cheklist',
      mode      : 'serialize',
      name      : 'hans_wurst',
      elements  : elements
    });

  }

  jNode.miniMenu({
    button      : 'close',
    overlayStyle:{width:menuWidth+'px'},
    menuItems   : menuItems
  });

  jNode.removeClass('wcm_menu_table');
  
});