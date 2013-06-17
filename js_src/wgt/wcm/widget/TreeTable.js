/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   codelang: english
 *   identStyle: camel case
 * 
 */

/**
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 */
$R.addAction( 'widget_treetable', function( jNode ){
  
  if( $C.DEBUG.WCM.WIDGET )
    console.log( 'wcm widget_tag_cloud path: ' +jNode.getNodePath('/')  );
  
  // check if the action class exists
  if( !jNode.is( '.wgt_table' ) )
    jNode.addClass( 'wgt_table' );

  // laden der wysiwyg konfiguration
  try{
    
    var cfgData = jNode.find( 'var#'+jNode.attr('id')+'-cfg-treetable' );
    var settings = cfgData.is( 'var' )
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }
  
  settings.className = 'wgt-table';
  
  jNode.treetable( settings );
  jNode.removeClass( 'wcm_widget_treetable' );
  
  /*
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
  */
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
