/* Licence see: /LICENCES/wgt/licence.txt */


(function( $S, $R ){

  function load( settings, root, container) {
    $R.get( settings.url+'&node='+root );
    
    $S('.wgt-treenode').each(function(){
      var treeNode = $S(this);
      treeNode.removeClass('wgt-treenode');
      //$S(container).treeview({add: treeNode});
    });
  }
  
  var proxied = $S.fn.treeview;
  $S.fn.treeview = function( settings ){
    
    if( !settings.url ){
      return proxied.apply( this, arguments );
    }
 
    var container = this;
       
    if( !container.children().size() )
      load( settings, 0, container );
       
    var userToggle = settings.toggle;
       
    return proxied.call( this, $S.extend({}, settings, {
      collapsed: true,
      toggle   : function() {
                 
        var $this = $S(this);
                 
        if( $this.hasClass( "loadable" ) && !$this.hasClass( "flagLoaded" ) ){
          $this.addClass( "flagLoaded" );
          load( settings, this.id, container );
        }
                 
        if( userToggle ){
          userToggle.apply( this, arguments );
        }
      }
    }));
  };

})($S,$R);

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tree', function( jNode ){

  var settings = {};
  try{
    
    var cfgData = jNode.find('var#'+jNode.attr('id')+'-cfg-tree');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
      
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }

  jNode.treeview( settings ).removeClass('wcm_ui_tree');
  
  jNode.find('li.load_children').appear(function(){
    //alert("naf "+settings.url);
    $R.get( settings.url+'&node='+$S(this).attr('wgt_node_key') );
  });

});

