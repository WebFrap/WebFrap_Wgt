<div id="wgt-ui-editor" class="wgt-ui-editor" >
  
  <div class="wgt-panel" >
    <h2 class="left" >UI Editor <span id="w-w" >  </span> / <span id="w-h" ></span> </h2>
  </div>
  
  <div id="wgt-ui-editor_tools" class="wgt-tools" >
    <?php include "tpl/tools.tpl" ?>
  </div>
  
  <div id="wgt-ui-editor_workspace" class="wgt-workspace" >
    workspace
  </div>
  
  <div id="wgt-ui-editor_data" class="wgt-data" >
    data
  </div>

  
</div>


<style type="text/css" >
  
div.wgt-ui-editor
{
  position:relative;
  width: 100%;
  height:650px;
  clear: both;
}

div.wgt-ui-editor div.wgt-tools
{
  position:absolute;
  float: left;
  width: 250px;
  height:100%;
  border-right:1px solid black;
  border-bottom:1px solid black;
}

div.wgt-ui-editor div.wgt-workspace
{
  position:absolute;
  left:251px;
  float: left;
  width: 500px;
  height:100%;
  border-bottom:1px solid silver;
  background-color: grey;
}

div.wgt-ui-editor div.wgt-data
{
  float: right;
  width: 250px;
  height:100%;
  border-left:1px solid black;
  border-bottom:1px solid black;
}
  
</style>

<script type="text/javascript" >

$S(document).ready(function() {
  
  var uiEditor = $S('#wgt-ui-editor');
  var tools = $S('#wgt-ui-editor_tools');
  var workspace = $S('#wgt-ui-editor_workspace');
  var data = $S('#wgt-ui-editor_data');
  
  var wW = $S('body').innerWidth();
  var wH = $S('body').height()-20;
  
  $S('#w-w').text(wW);
  $S('#w-h').text(wH);
  
  uiEditor.css( 'width', wW+'px' );
  uiEditor.css( 'height', wH+'px' );
  
  tools.css( 'height', (wH -25 )+'px' );
  workspace.css( 'height', (wH -25 )+'px' );
  workspace.css( 'width', (wW -500 )+'px' );
  data.css( 'height', (wH -25 )+'px' );
  
});

$S(window).resize(function() {
  
  var uiEditor = $S('#wgt-ui-editor');
  var tools = $S('#wgt-ui-editor_tools');
  var workspace = $S('#wgt-ui-editor_workspace');
  var data = $S('#wgt-ui-editor_data');
  
  var wW = $S('body').innerWidth();
  var wH = $S('body').height()-20;
  
  $S('#w-w').text(wW);
  $S('#w-h').text(wH);
  
  uiEditor.css( 'width', wW+'px' );
  uiEditor.css( 'height', wH+'px' );
  
  tools.css( 'height', (wH -25 )+'px' );
  workspace.css( 'height', (wH -25 )+'px' );
  workspace.css( 'width', (wW -500 )+'px' );
  data.css( 'height', (wH -25 )+'px' );
  
});

</script>