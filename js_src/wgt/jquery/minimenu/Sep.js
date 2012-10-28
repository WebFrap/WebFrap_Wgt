/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['sep'] = function( element, menuBody, targetElement ){
   
    var content = '<hr />';
    menuBody.append( content );
    
  };


})($S);
