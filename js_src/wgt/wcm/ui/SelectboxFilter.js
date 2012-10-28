/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_selectbox_filter', function( jNode ){

  jNode.removeClass( "wcm_ui_selectbox_filter" );
  jNode.selectboxFilter();

});


/**
 * @author dominik bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_selectbox_filtered', function( jNode ){

  jNode.removeClass( "wcm_ui_selectbox_filtered" );
  jNode.selectboxFiltered();

});