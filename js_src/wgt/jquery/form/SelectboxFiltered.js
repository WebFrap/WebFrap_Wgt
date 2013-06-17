/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   codelang: english
 *   identStyle: camel case
 * 
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 */
;(function($S,undefined){

  "use strict";
  
  $S.fn.selectboxFiltered = function(  ){
    
    var self = $S(this);
    var origId = self.attr('id');
    
    var filterBoxId = $WGT.getClassByPrefix( self.prop('class'),  'wgt-filter-select-', true );

    var newEle = self.clone();
    
    self.attr( 'id', origId+'-orig' );
    self.attr( 'disabled', true );
    self.addClass( 'flag_orig' );
    self.hide();
    newEle.insertAfter( self );

    newEle.bind( 'mouseenter.selectbox_filtered', function(){
      //console.log('click #'+filterBoxId);
      newEle.unbind('mouseenter.selectbox_filtered');
      $S('#'+filterBoxId).click();
    });

    newEle.rselectbox();
    newEle.parent().attr( 'id', origId+'-cnt'  );

  };
    
})($S);