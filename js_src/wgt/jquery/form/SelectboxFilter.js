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
(function( $S, undefined ){
  
  "use strict";

  $S.fn.selectboxFilter = function(  ){
    
    var self = $S(this);
    self.rselectbox();

    self.attr( 'wgt_filter', 'true' );
    
    self.bind( 'click.wgt_selectbox_filter', function(){

      var filter = self.find('option:selected').attr( 'filter_key' ),
        filtered = $S('.wgt-filter-select-'+self.attr('id')+'.flag_orig' );
      
      filtered.each( function(){
        
        var slb = $S(this);
        slb.attr( 'wgt_filter', filter );
        
        var tmpId = slb.attr( 'id' );
        var mainId = tmpId.substring( 0, (tmpId.length - 5)  );

        var newFElem = slb.clone();
        $S( '#'+mainId+'-cnt' ).remove();
        newFElem.attr( 'id', mainId );
        newFElem.attr( 'disabled', false );
        newFElem.removeClass( 'flag_orig' );
        newFElem.find( 'option' ).not( 'option.filter_'+filter+',option.no_filter' ).remove();
        newFElem.insertAfter( slb );
        newFElem.show();
        newFElem.rselectbox();
        newFElem.parent().attr( 'id', mainId+'-cnt'  );
        
        // wenn die gefilterte selectbox ein filter ist, denn filter wieder aktivieren
        if( slb.attr( 'wgt_filter' ) ){
          newFElem.selectboxFilter();
          newFElem.click();
        }

      });
      
      self.rselectbox();
      
    });
    
  };

})( window.$S );