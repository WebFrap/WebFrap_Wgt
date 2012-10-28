/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'feature_sortable', function( jNode ){
 
    var varData = $S('var#'+jNode.prop('id')+"-sortable");
    var updateFunc = null;

    var props = varData.is('var') 
      ? $WGT.robustParseJSON( varData.text() )
      : {};
      
    if( props.url !== undefined ){
      
      if( props.start !== undefined )
        props.url += "&start="+props.start;
      
      updateFunc = function( event, ui ){
        $R.post( props.url, jNode.find('input.order').serialize() );
      };
    
    }    
    
    // switch workarea
    jNode.sortable({
      update: updateFunc,
      placeholder: 'ui-state-highlight',
      opacity: 0.6,
      delay: 200
    });

    jNode.removeClass('wcm_feature_sortable');
    

});