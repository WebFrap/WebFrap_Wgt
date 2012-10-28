/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tooltip', function( jNode ){

  jNode.tooltip({
    track: true,
    delay: 0,
    showURL: false,
    showBody: " - ",
    extraClass: "boxed",
    fixPNG: true,
    opacity: 0.2,
    left: -120
  }).removeClass("wcm_ui_tooltip");

});