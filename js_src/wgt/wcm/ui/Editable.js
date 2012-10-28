/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_editable', function( jNode ){

  jNode.html('<textarea name="'+jNode.attr('name')+'" class="full_edit" >'+jNode.html()+'</textarea>');
  jNode.removeClass('wcm_ui_editable');
});