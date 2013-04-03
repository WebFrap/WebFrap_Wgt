/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_multiselect', function( jNode ){

  jNode.removeClass("wcm_ui_multiselect");
  
  var settings = {};

  var cfgData = $S('var#'+jNode.attr('id')+'-cfg-mslct');
  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {};

  jNode.multiselect(settings);

});

$R.addAction( 'ui_multiselect_search', function( jNode ){

  jNode.removeClass("wcm_ui_multiselect_search");
  var formId = jNode.getActionClass('fparam',true,'-'),
    settings = {},
    cfgData = $S('var#'+jNode.attr('id')+'-cfg-mslct');
  
  settings = cfgData.is('var')
    ? $WGT.robustParseJSON(cfgData.text())
    : {
      'buttonWidth':"96%",
      close: function(){
        $R.form( formId, null, {success:function(){ jNode.focus(); }} );
      }
    };

  jNode.multiselect(settings);

});