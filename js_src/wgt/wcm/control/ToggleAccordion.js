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
 * 
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * 
 * WCM zum ein oder ausblenden von Accordion tabs abhängig 
 * 
 */
$R.addAction( 'toggle_accordion', function( jNode ){
  

  var showNot = jNode.attr('wgt_not') === '!'?true:false, // invert the visibility
    trgtSrc = jNode.attr('wgt_acc'),
    accKey  = jNode.attr('wgt_acc_key');

  
  // hide & show action
  var triggerA = function(){
    
    console.log('toggle_accordion '+trgtSrc+' '+accKey);
    
    var evTNode = $S(trgtSrc);

    if( jNode.is(':checked') ){
      
      if( showNot ){
        if( evTNode.is('[wgt_hidden="true"]') ){
          evTNode.accordion('showAcc',accKey);
        }else{
          evTNode.accordion('hideAcc',accKey);
        }
      }
      else{
  
        if( evTNode.is('[wgt_hidden="true"]') ){
          evTNode.accordion('hideAcc',accKey);
        }else{
          evTNode.accordion('showAcc',accKey);
        }

      }
        
    } else{

      if( showNot ){

        if( evTNode.is('[wgt_hidden="true"]') ){
          evTNode.accordion('hideAcc',accKey);
        }else{
          evTNode.accordion('showAcc',accKey);
        }
      } else {
        
        if( evTNode.is('[wgt_hidden="true"]') ){
          evTNode.accordion('showAcc',accKey);
        }else{
          evTNode.accordion('hideAcc',accKey);
        }
      }
    }
    
  };
  
  // initial check
  
  $R.oneTimePostAjax(triggerA);
  
  // toggle vissibility on change of the state
  jNode.bind( 'change', triggerA );
    
  jNode.removeClass( "wcm_toggle_accordion" );

});