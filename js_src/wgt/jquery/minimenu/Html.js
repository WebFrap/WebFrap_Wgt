/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author Dominik Bonsch
 * @quality good
 */
(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['html'] = function( element, menuBody, targetElement ){

    var content = element.content;
    menuBody.append( content );
  };


})($S);
