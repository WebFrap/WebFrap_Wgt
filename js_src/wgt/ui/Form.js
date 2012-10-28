/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * Erweiterung für UI 
 * Im moment ist die einzige Funktionalität das zurücksetzen der Form
 */ 
(function($UI){

  /**
   * 
   */
  var WgtForm = function(){	
  
    /**
     * 
     */
    this.fn =  WgtForm.prototype;
      
    /**
     * @param fId
     */
    this.reset = function( fId ){
      
      $S('#'+fId).get(0).reset();
    };

  }//end class WgtForm 
  
  
  $UI.fn.form = new WgtForm();


})($UI);