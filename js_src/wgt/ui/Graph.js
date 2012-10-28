/* Licence see: /LICENCES/wgt/licence.txt */


(function($UI){
  
  // set a bunch of flags for graphs
  var ua = navigator.userAgent,
  crap = ua.match(/iPhone/i) || ua.match(/iPad/i),
  typeOfCanvas = typeof HTMLCanvasElement,
  nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
  textSupport = nativeCanvasSupport 
    && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  
  $UI.fn.graph = {
      labelType: (!nativeCanvasSupport || (textSupport && !crap))? 'Native' : 'HTML',
      useGradients: nativeCanvasSupport,
      nativeTextSupport: (!nativeCanvasSupport || (textSupport && !crap)),
      animate: !(crap || !nativeCanvasSupport)
  };//end $UI.fn.graph


})($UI);