<h2>Graph: Process Graph</h2>

<style type="text/css" >

div.wgt-editor_container
{
  width:750px;
  height:750px;
  position:relative;
  border:1px solid silver;
  background-color:#F7F7F7; 
  overflow:hidden;
}

div.wgt-graph_body
{
  width:10000px;
  height:10000px;
  margin-top:-4625px;
  margin-left:-4625px;  
  position:relative;
  border:1px solid silver;
  background-color:#F7F7F7; 
  overflow:hidden;
}

div.wgt-editor_container .node
{
  width:120px;
  height:30px;
  position:absolute;
  border:1px solid silver;
  background-color:#A0A0A0; 
  color:white;
  white-space:nowrap;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  overflow:hidden;
  text-align:center;
}

div.wgt-editor_container .node label
{
  vertical-align:middle;
}

  

</style>

<div  id="graph" class="wgt-editor_container" >
  <div class="wgt-graph_body"   >
    <div 
      id="container0" 
      class="node moveable" 
      wgt-connect="container1"
      style="top:20px;left:315px;" >
        <var>[{"target":"container1","dir":"forward"},{"target":"container2","dir":"forward"}]</var>
        <label>Start</label>
    </div>
    <div 
      id="container1" 
      class="node moveable"
      style="top:80px;left:98px;" >
      <label>Whatever</label>
        <var>[{"target":"container2","dir":"back"}]</var>
    </div>
    <div 
      id="container2" 
      class="node"
      style="top:140px;left:532px;" >
        <var>[{"target":"container0","dir":"back"},{"target":"container4","dir":"forward"}]</var>
        <label>End</label>
    </div>
    <div 
      id="container3" 
      class="node"
      style="top:200px;left:70px;" >
        <var>[{"target":"container0","dir":"back"}]</var>
        <label>Narf</label>
    </div>
    <div 
      id="container4" 
      class="node moveable"
      style="top:260px;left:480px;" >
        <var>[{"target":"container0","dir":"back"}]</var>
        <label>Narf</label>
    </div>
  
  </div>
</div>

<input type="text" id="cord" /><br />
<input type="text" id="cord" /><br />
<input type="reset" onclick="do_reset();"; />


<script type="text/javascript">
  jsPlumb.setRenderMode(jsPlumb.SVG);
  jsPlumb.Defaults.Connector = [ "Bezier", { curviness:40 } ];
  jsPlumb.Defaults.DragOptions = { cursor: "pointer", zIndex:2000 };
  jsPlumb.Defaults.PaintStyle = { strokeStyle:"gray", lineWidth:2 };
  jsPlumb.Defaults.Endpoint = [ "Blank", { fillStyle:"gray" } ];
  jsPlumb.Defaults.EndpointStyle = { fillStyle:"gray" };
  jsPlumb.Defaults.HoverPaintStyle = {strokeStyle:"#ec9f2e" };
  jsPlumb.Defaults.EndpointHoverStyle = {fillStyle:"#ec9f2e" };      
  jsPlumb.Defaults.Anchors =  [ "BottomCenter", "TopCenter" ];

  var arrowForward = jsPlumb.getInstance({
    Endpoint:[ "Blank", { fillStyle:"gray" }],
    PaintStyle:{ strokeStyle:"#008000", lineWidth:2 }
  });

  var arrowBack = jsPlumb.getInstance({
    Endpoint:[ "Blank", { fillStyle:"gray" }],
    PaintStyle:{ strokeStyle:"#C00000", lineWidth:2 }
  });


  var graph = $S('#graph');
  var nodes = {};
  var moveBg = true;

  graph.find('.node').each(function(){

    var node = $S(this);

    node.mousedown(function(){
      moveBg=false;
    }).mouseup(function(){
      moveBg=true;
    });
      
    var offset = node.offset();
    node.offset({ top: offset.top+4625, left: offset.left+4625 });
    nodes[node.attr('id')] = {"j":node,"g":jsPlumb.addEndpoint(node.attr('id'))};
    
  });

  $S.each( nodes, function( key, node ){

    var cfgData = node['j'].find('var');
    settings = cfgData.is('var')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
    
    $S.each(settings,function( index,value ){

      var conSet = { 
         source:key, 
        target:value.target,
        overlays:[ 
          "Arrow", 
          [ "Label", { label:"foo", location:0.25 } ]
        ]
      };

      if( 'forward' == value.dir ){
        
        conSet.anchor = 'RightMiddle';
        arrowForward.connect(conSet);
      }
      else{
        conSet.anchor = 'LeftMiddle';
        arrowBack.connect(conSet);
      }
      
      
    });
    
  });

  /*
  var e0 = jsPlumb.addEndpoint("container0"),
  e1 = jsPlumb.addEndpoint("container1");
  */
  
  //jsPlumb.connect({ source:e1, target:e0 });

  jsPlumb.draggable(jsPlumb.getSelector("div.node.moveable"));


  var actX = -4625;
  var actY = -4625;

  var startX = 0;
  var startY = 0;


  var moveEvent = function( e ){

    if( !moveBg )
      return;
      
    graph.css( 'marginLeft', actX - ( startX - e.pageX ) );
    graph.css( 'marginTop', actY - ( startY - e.pageY ) );

    $S('#cord').val( (actX - ( startX - e.pageX ))+" x "+(actY - ( startY - e.pageY )) )  ;
      
  };

  graph.mousedown( function( e ){

    //actX = graph.css('marginLeft');
    //actY = graph.css('marginTop');

    if( !moveBg )
      return;

    startX = e.pageX;
    startY = e.pageY;

    $S('#cord_start').val( startX+" x "+startY )  ;

    graph.bind( 'mousemove.bscroll', moveEvent );
    
  }).mouseup( function( e ){

    if( !moveBg )
      return;
    
    actX = actX - ( startX - e.pageX );
    actY = actY - ( startY - e.pageY );

    $S('#cord').val( actX+" x "+actY )  ;
    
    graph.unbind( 'mousemove.bscroll' );
  });

  function do_reset(){

    actX = -4625;
    actY = -4625;
  
    graph.css( 'marginLeft', -4625 );
    graph.css( 'marginTop', -4625 );
  };
  
</script>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>