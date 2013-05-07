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
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 *   - http://code.google.com/p/jquery-appear/
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
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'action_appear', function( jNode ){
  
  "use strict";
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm action_appear path: ' +jNode.getNodePath('/')  );
  }
  
  jNode.removeClass('wcm_action_appear');
  
  try{
    
    var classNames = jNode.prop("class").split(" ");
    var formId     = null;
    var tableId    = null;
  
    for(var idx in classNames){
      
      if(classNames[idx].toString().indexOf("wgt-form") != -1){
        
        formId = classNames[idx];
        
        if( tableId ){
          break; // break when the table is also allready found
        }
      }
      
      if(classNames[idx].toString().indexOf("wgt_table") != -1){
        
        tableId = classNames[idx];
        
        if( formId ){
          break; // break when the form is also allready found
        }
      }
      
    }
  
    jNode.appear( function(){
      
      jNode.unbind('click.action_appear');
      $S('form#'+formId).data('start',jNode.find('var').text());
      jNode.parent().remove();
      $R.form( 
        formId, 
        '&append=1',{
          async:true,
          append:true
        }
      );
    });
    
    // sollte appear warum auch immer nicht triggern machen wir das ding
    // halt noch klickbar, allerdings müsste oncklick auch appear so oder so
    // getriggert werden
    jNode.bind( 'click.action_appear',function(){
      
      jNode.unbind('click.action_appear');
      $S('form#'+formId).data('start',jNode.find('var').text());
      jNode.parent().remove();
      $R.form( 
        formId, 
        '&append=1',{
          async:true,
          append:true
        }
      );
    });
  
  }
  catch( err ){
    
    $D.errorWindow( err );
    return false;
  }
  

});

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'req_appear', function( jNode ){
  
  "use strict";
  
  if( $C.DEBUG.WCM.ACTION ){
    console.log( 'wcm req_appear path: ' +jNode.getNodePath('/') );
  }
  
  jNode.removeClass( 'wcm_req_appear' );
  
  try{

  
    jNode.appear(function(){
      
      $R.get( jNode.attr('wgt_src'),{async:true}, true );
      jNode.unbind( 'click.action_appear' );

    });
    
    // sollte appear warum auch immer nicht triggern machen wir das ding
    // halt noch klickbar, allerdings müsste oncklick auch appear so oder so
    // getriggert werden
    jNode.bind( 'click.action_appear', function(){
      
      jNode.unbind( 'click.action_appear' );
      $R.get( jNode.attr('wgt_src'),{async:true}, true );
    });
  
  } catch( err ){
    
    $D.errorWindow( err );
    return false;
  }
  

});