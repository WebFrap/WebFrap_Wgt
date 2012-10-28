/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_splitter', function( jNode ){

  jQuery("#splitterContainer").splitter({
    minAsize:200,
    maxAsize:400,
    A:jQuery('#leftPane'),
    B:jQuery('#rightPane'),
    closeableto:0,
    splitVertical:true
  });

  jNode.removeClass('wcm_ui_splitter');
  
});