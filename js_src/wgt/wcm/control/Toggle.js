/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/* 
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
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * 
 * WCM zum ein oder ausblenden von Elementen in abhängigkeit vom Checkstatus
 * einer Selectbox
 * 
 */
$R.addAction( 'control_toggle', function( jNode ){
  
  var showNot = jNode.attr('wgt_not') === '!'?true:false, // invert the visibility
    trgtSrc = jNode.attr('wgt_target'); // any valid jquery selector
  
  // hide & show action
  var triggerA = function(){
    
    var evTNode = $S(trgtSrc);
    
    if( jNode.is(':checked') ){
      
      if( showNot ){
        evTNode.hide();
      }
      else{
        evTNode.show();
      }
        
    }
    else{
      
      if( !showNot ){
        evTNode.show();
      }
      else{
        evTNode.hide();
      }
    }
    
  };
  
  // initial check
  triggerA();
  
  // toggle vissibility on change of the state
  jNode.bind( 'change', triggerA );
    
  jNode.removeClass( "control_toggle" );

});