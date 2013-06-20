/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_slider', function( jNode ){


  
});


$R.addAction( 'ui_slider_percent', function( jNode ){

  var grid = null,
    valField = null;
    slValue = parseInt(jNode.text());
    
  jNode.html('');
  
  if (jNode.attr('wgt_bind')) {
    grid = $S('#'+jNode.attr('wgt_bind'));
  }
  if (jNode.attr('wgt_bind')) {
    valField = $S('#'+jNode.attr('wgt_bind'));
  }
  
  jNode.slider({
    value: slValue,
    min: 0,
    max: 100,
    step: 10,
    slide: function( event, ui ) {
      if(grid){
        grid.grid('writeSavedata',jNode.parent().attr('name'),ui.value);
      } else if (valField) {
        valField.val( ui.value );
      }
      
      jNode.find('a.ui-slider-handle').text(ui.value);
      
    }
  });
  
  jNode.find('a.ui-slider-handle').text(slValue);

  jNode.removeClass('ui_slider_percent');
  
});

  