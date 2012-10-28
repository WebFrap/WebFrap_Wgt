/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_table', function( jNode ){

  jNode.removeClass("wcm_ui_table");

  jNode.find('tbody>tr')
    .mouseover( function(){
     $S(this).addClass('wgt-hover'); 
    })
    .mouseout(function(){
      $S(this).removeClass('wgt-hover'); 
    });

  
});