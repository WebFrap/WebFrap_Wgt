/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Marko Andrijasevic
 */
$R.addAction( 'ui_treetable', function( jNode ){
  
  // check if the action class exists
  if( !jNode.is( '.wgt_table' ) )
    jNode.addClass( 'wgt_table' );
  
  var settings = {};
  
  try
  {
    settings = jNode.next().is('var.wgt-settings')
    ? $WGT.robustParseJSON(jNode.next().text())
    : {};
  }
  catch(err)
  {
    $D.errorWindow( 'UI Error', err.description );
  }
  
  settings.className = 'wgt-table';
  
  // standard ist nicht expandable
  if( undefined === settings.expandable )
    settings.expandable = false;
  
  settings.treeColumn = 1;
  
  jNode.treeTable(settings);
  jNode.removeClass('wcm_ui_treetable');
  
  
  // Drag & Drop Example Code follows
  jNode.find( '.file, .folder' ).draggable({
    helper: "clone",
    opacity: .75,
    refreshPositions: true, // Performance?
    revert: "invalid",
    revertDuration: 300,
    scroll: true
  });
  
  jNode.find( ".folder" ).each(function() {
    $S($S(this).parents("tr")[0]).droppable({
      accept: ".file, .folder",
      drop: function(e, ui) { 
        $S($S(ui.draggable).parents("tr")[0]).appendBranchTo(this);
      },
      hoverClass: "accept",
      over: function(e, ui) {
        if(this.id != $S(ui.draggable.parents("tr")[0]).id && !$S(this).is(".expanded")) {
          $S(this).expand();
        }
      }
    });
  });
  
  /*
  // Make visible that a row is clicked
  jNode.find( "tbody tr").mousedown(function() {
    jNode.find("tr.selected").removeClass("selected"); // Deselect currently selected rows
    $S(this).addClass("selected");
  });
  
  // Make sure row is selected when span is clicked
  jNode.find( "tbody tr span").mousedown(function() {
    $S($S(this).parents("tr")[0]).trigger("mousedown");
  });
  */

  
});
