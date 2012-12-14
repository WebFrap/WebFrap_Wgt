/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_tip', function( jNode ){

  var infoPos = jNode.attr('wgt_tt_align');

  if( infoPos ){
    
    jNode.wgtTip({
      gravity: infoPos,
      delayIn: 700, 
      delayOut: 200
    }).removeClass("wcm_ui_tip");
    
  }
  if( jNode.is('button') || jNode.is('p') || jNode.is('a')  ){

    jNode.wgtTip({
      gravity: 's',
      delayIn: 700, 
      delayOut: 200
    }).removeClass("wcm_ui_tip");
  }
  else{

    jNode.wgtTip({
      gravity: 'w',
      delayIn: 700, 
      delayOut: 200
    }).removeClass("wcm_ui_tip");
  }
    
});

$R.addAction( 'ui_tip-top', function( jNode ){

  jNode.wgtTip({
    gravity: 's',
    delayIn: 700, 
    delayOut: 200
  }).removeClass("wcm_ui_tip-top");
    
});

$R.addAction( 'ui_tip-left', function( jNode ){

  jNode.wgtTip({
    gravity: 'e',
    delayIn: 700, 
    delayOut: 200
  }).removeClass("wcm_ui_tip-left");
    
});

$R.addAction( 'ui_tip-right', function( jNode ){

  jNode.wgtTip({
    gravity: 'w',
    delayIn: 700, 
    delayOut: 200
  }).removeClass("wcm_ui_tip-left");
    
});

$R.addAction( 'ui_tip-l', function( jNode ){

  jNode.wgtTip({
    delayIn: 700, 
    delayOut: 200
  }).removeClass("wcm_ui_tip-l");
    
});



// noch vorhandene tips nach ajax requests entfernen
$R.addAfterAjaxRequest( function(){

  $S('.wgt-tip').remove();
    
});
