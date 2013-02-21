/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_highlight', function( jNode ){

  jNode.removeClass("wcm_ui_highlight");

  jNode
    .mouseover( function(){
      
      var theClass = jNode.prop('class');
      var cKey = $WGT.getClassByPrefix( theClass, 'node-', false );
      
      if( cKey ){
        jNode.parent().find('.'+cKey).addClass('wgt-hover'); 
      }
      else{
        jNode.addClass('wgt-hover'); 
      }
    })
    .mouseout(function(){
      
      var theClass = jNode.prop('class');
      var cKey = $WGT.getClassByPrefix( theClass, 'node-', false  );
      
      if( cKey ){
        jNode.parent().find('.'+cKey).removeClass('wgt-hover'); 
      }
      else{
        jNode.removeClass('wgt-hover'); 
      }
      
    });

});


/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_highlight2', function( jNode ){

  jNode.removeClass("wcm_ui_highlight2");

  jNode
    .mouseover( function(){

      var theClass = jNode.prop('class');
      var cKey = $WGT.getClassByPrefix( theClass, 'node-', false );

      if( cKey ){
        jNode.parent().find('.'+cKey).addClass('wgt-hover2');
      }
      else{
        jNode.addClass('wgt-hover2');
      }
    })
    .mouseout(function(){

      var theClass = jNode.prop('class');
      var cKey = $WGT.getClassByPrefix( theClass, 'node-', false  );

      if( cKey ){
        jNode.parent().find('.'+cKey).removeClass('wgt-hover2');
      }
      else{
        jNode.removeClass('wgt-hover2');
      }

    });

});