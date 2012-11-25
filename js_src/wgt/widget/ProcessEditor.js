/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/* 
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
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S, jsPlumb ) {
  
  "use strict";

  $S.widget( "wgt.process_editor", {
    
    /**
     * Das Graph Element
     */
    container: null,
    
    /**
     * Node Elements
     */ 
    nodes: {},
    
    /**
     * Alle edges
     */ 
    edges: {},
    
    /**
     * Liste mit den reder objekten für die Connectoren / Arrows
     */
    arrows: {},

    /**
     * Standard Options
     */
    options: { 
    },
    
    /**
     * Die ID des aktuell gehighligtheten nodes
     */
    highlightedNode: null,
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        
      $S(this.element).content_map();
      $S(this.element).content_map('injectInstance',this);
      
      console.log( 'Container ID '+this.container.element.attr('id') );
      
      this.initEditor();

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    initEditor: function(){
      
      var el = this.element,
        cont = this.container,
        contId = this.container.element.attr('id'),
        nodes = {},
        edges = {},
        self = this;  
        
      //console.log( "Init Editor" );
      
      // moveable als dragable nodes definieren
      jsPlumb.draggable(jsPlumb.getSelector( "div.node.moveable" ));
      
      // erstellen der render nodes
      this.arrows.forward = jsPlumb.getInstance({
        Endpoint:[ "Blank", {fillStyle:"gray"}],
        PaintStyle:{strokeStyle:"#D2FFD2", lineWidth:0.8}
      });
      
      this.arrows.forward_high = jsPlumb.getInstance({
        Endpoint:[ "Blank", {fillStyle:"gray"}],
        PaintStyle:{strokeStyle:"#008000", lineWidth:0.8}
      });

      this.arrows.back = jsPlumb.getInstance({
        Endpoint:[ "Blank", {fillStyle:"gray"}],
        PaintStyle:{strokeStyle:"#FFD6D6", lineWidth:0.8}
      });
      
      this.arrows.back_high = jsPlumb.getInstance({
        Endpoint:[ "Blank", {fillStyle:"gray"}],
        PaintStyle:{strokeStyle:"#C00000", lineWidth:0.8}
      });
      
      var pos = 0,
        baseLines = 2, 
        indexSize = 3,
        vertBSpace = 110; 
      
      // baseline index
      var bsIndex = {"l1":(cont.cs_x/2)};
      
      for( var idx = 2; idx <= baseLines; ++idx ){
        
        var bsIndTmpKey = idx*2;
        
        var bsIdx1 = (indexSize + 2) - (bsIndTmpKey -1),
            bsIdx2 = (indexSize + 2) - (bsIndTmpKey -2);          
        
        bsIndex['l'+bsIdx1] = Math.round( 0 + (cont.cs_x/(idx+1)) );
        bsIndex['l'+bsIdx2] = Math.round( cont.cs_x - (cont.cs_x/(idx+1)) );
        
        //console.log( "baseline: "+bsIdx1+" "+bsIndex['l'+bsIdx1]+" "+bsIdx2+" "+bsIndex['l'+bsIdx2] );
        
      }
      
      // verarbeiten der Nodes
      var processNodes = el.find('.node');
      
      processNodes.each(function(){

        var node = $S(this),
          offset;

        node.mousedown(function(){
          
          cont.moveBg = false;
        }).mouseup(function(){
          
          cont.moveBg = true;
        });

        if( node.hasClass('pos_auto') ){
          
          var blIndex  = pos%indexSize,
            nodeWidth  = node.width();

          var posNodeX = ( ( bsIndex['l'+(blIndex+1)] - (nodeWidth /2) ) - cont.centerX );
          var posNodeY = ( ( pos*vertBSpace) + cont.cb ) - cont.centerY;
          
          //posNodeX = (nodeWidth/2) - cont.centerX;
          
          //console.log( "Auto node pos "+posNodeX+"x"+posNodeY+" idx: "+blIndex  );
            
          offset = node.offset();
          node.offset({
            top: (offset.top + posNodeY), 
            left: (offset.left + posNodeX) 
          });
          
          //var offset = node.offset();
          //console.log( "Auto node pos "+posNodeX+"x"+posNodeY+" idx: "+blIndex+" Top: "+offset.top+" Left: "+offset.left   );
          
          ++pos;
          
        }
        else{
          
          offset = node.offset();
          node.offset({top: (offset.top - cont.actX), left: (offset.left - cont.actY)});
        }

        nodes[node.attr('id')] = {"j":node,"g":jsPlumb.addEndpoint( node.attr('id') )};

      });
      
      // rendern der Edges
      $S.each( nodes, function( key, node ){

        var cfgData = node.j.find('var');
        var settings = cfgData.is('var')? $WGT.robustParseJSON(cfgData.text()): {};

        // hinzufügen des node klick elements
        node.j
        .mousedown(function(event){
          
          console.log("node mousedown");
          cont.moveBg = false;
          event.stopPropagation();
        })
        .mouseup(function(event){
          
          console.log("node mouseup");
          cont.moveBg = true;
          event.stopPropagation();
        })
        .click(function( event ){
            
          self.highLightEdges(key);
            
          processNodes.removeClass('checked');
          node.j.addClass('checked');
            
          var uForm = $S('#'+contId+'-uform');
          uForm.find('div.node_entry').hide();
          uForm.find('div#'+contId+'-info-'+settings.key).show();
          
          uForm.find('div:first').accordion( "activate",1);

          event.stopPropagation();

          //console.log( settings.label+" "+settings.phase_label );
        });

        edges[key] = {};
          
        $S.each(settings['edges'],function( index, value ){

          var conSet = { 
            source:key, 
            target:contId+'-n-'+value.target,
            overlays:[ 
              "Arrow", 
              [ "Label", {label:value.label, location:0.25, cssClass:"wgt_path_label"} ]
            ]
          };

          var con = null;
          conSet.dir = value.dir;
          conSet.eClick = function( conn ) {

            if( conn.isDetachable() ){
              console.log("clicked on detachable "+contId+'-n-'+value.target);
            }
            else{
              console.log("clicked on non detachable "+contId+'-n-'+value.target);
            }
            jsPlumb.detach( conn );
          };

          if( 'forward' === value.dir ){

            conSet.anchor = 'RightMiddle';
            con = self.arrows.forward.connect( conSet );
            con.bind( "click", conSet.eClick );
            
          }
          else{

            conSet.anchor = 'LeftMiddle';
            con =  self.arrows.back.connect( conSet );
            con.bind( "click", conSet.eClick );
          }
          
          node.g.addConnection( con );
          edges[key][value.target] = {"conSet":conSet,"edge":con} ;

        });
        
        
      
     }); /**/
     
     // nodes speichern
     this.nodes = nodes;
     this.edges = edges;

    },//end buildGrid
    
    /**
     * Methode zum entfernen der Verbindungen zu einem knoten
     * @param nodeId key des nodes dessen connections entfernt werden sollen
     */
    detachNodeEdges: function( nodeId ){
      
      var self = this;

      console.log( "detach node "+nodeId );

      $S.each( this.edges[nodeId], function( key, con ){
        
        console.log( "detach connection "+key+" "+con.sourceId + " to " + con.targetId );
        
        jsPlumb.detach( { source:con.sourceId, target:con.targetId } );
        
        con = self.arrows.forward.connect( con.conSet );
        
        this.edges[nodeId][key] = null;
        
        //jsPlumb.detach(con); 
      }); 
      
      // edges leeren
      //this.edges[nodeId] = {};
      
    },//end detachNodeEdges

    /**
     * Methode zum entfernen der Verbindungen zu einem knoten
     * @param nodeId key des nodes dessen connections entfernt werden sollen
     */
    highLightEdges: function( nodeId ){
      
      var self = this;
      
      if( self.highlightedNode ){
        
        if( self.highlightedNode === nodeId ){
          return;
        }
        
        $S.each( this.edges[self.highlightedNode], function( key, con ){

          jsPlumb.detach( { source:con.edge.sourceId, target:con.edge.targetId } );
          
          con.conSet.overlays[1][1]['cssClass'] = "wgt_path_label";

          con.edge = self.arrows[con.conSet.dir].connect( con.conSet );
          con.edge.bind( 'click', con.conSet.eClick );

          self.edges[self.highlightedNode][key] = con;
          self.nodes[self.highlightedNode].g.addConnection( con.edge );

          //jsPlumb.detach(con); 
        });
        
      }
    
      self.highlightedNode = nodeId;

      $S.each( this.edges[nodeId], function( key, con ){
        console.log( "detach connection "+key+" "+con.edge.sourceId + " to " + con.edge.targetId );
        
        jsPlumb.detach( { source:con.edge.sourceId, target:con.edge.targetId } );
    
        con.conSet.overlays[1][1]['cssClass'] = "wgt_path_label_high";
    
        con.edge = self.arrows[con.conSet.dir+'_high'].connect( con.conSet );
        con.edge.bind( 'click', con.conSet.eClick );

        self.edges[nodeId][key] = con;
        self.nodes[nodeId].g.addConnection( con.edge );
        
        //jsPlumb.detach(con); 
      }); 
      
      // edges leeren
      //this.edges[nodeId] = {};
      
    }//end detachNodeEdges

  });

}( jQuery, jsPlumb ) );

