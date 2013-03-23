/* Licence see: /LICENCES/wgt/licence.txt */

;(function($S, undefined){
  
  $S.fn.reverse = Array.reverse;

  /**
  * get on single Parent with a given selector als match
  */
  $S.fn.parentX = function( selector ){
  
    var node = $S(this).parent();
    var level = 0;
  
    while(level <100){
      ++level;
      if(node.is(selector)){
          return node;
      }
      else if( node.is('body') || node.is('html') ){
        return null;
      }
      else{
        node = node.parent();
        if(!node)
          return null;
      }
    }
    
    return null;
    
  };
  
  /**
   * get all classes of an element as array
   */
  $S.fn.classes = function( ){
    
    var nodeC = this.get(0).className;
    
    if( typeof nodeC !== 'string' ){
      console.error( "Requestes class from classless node "+$S(this.get(0)).getNodePath( '/' ) );
      return [];
    }
   
    return nodeC.split(" ");
  };

  
  /**
   * Den Pfad eines Nodes verfolgen
   */
  $S.fn.getNodePath = function( joinBy, depth ){
    
    if( !joinBy ){
      joinBy = ' ';
    }
    
    if( !depth ){
      depth = 3;
    }
    
    var pos = 0;
    
    var rightArrowParents = [];
    
    var entry = this.get(0).tagName.toLowerCase();
    if ( this.prop('id') ) {
        entry += "#" + this.prop('id');
    }
    rightArrowParents.push(entry);
    
    $S(this.get(0)).parents().not('html').each(function() {
        
        if( pos > depth ){
          return;
        }
      
        entry = this.tagName.toLowerCase();
        if ( $S(this).prop('id') ) {
            entry += "#" + $S(this).prop('id');
        }
        rightArrowParents.push(entry);
        
        ++pos;
    });
    rightArrowParents.reverse();
    
    var currentDate = new Date()
   
    return rightArrowParents.join(joinBy)+' '+currentDate.getMinutes()+'.'+currentDate.getSeconds()+'.'+currentDate.getMilliseconds();
  };
  
  /**
   * add Height
   */
  $S.fn.addHeight = function( height ){
     $S(this).height( ($S(this).height()+height)+'px' );
    return $S;
  };
  
  /**
   * add Height
   */
  $S.fn.subHeight = function( height ){
     $S(this).height( ($S(this).height()-height)+'px' );
    return $S;
  };

  /**
   * Disable the textselection
   */
  $S.fn.disableTextSelect = function( ){

    // Disable text selection
    if( $S.browser.mozilla ) {
      $S(this).each( function() { 
        $S(this).css({ 'MozUserSelect' : 'none' });
      });
    } else if( $S.browser.msie ) {
      $S(this).each( function() { 
        $S(this).bind('selectstart.disableTextSelect', function() {
          return false;
        });
      });
    } else {
      $S(this).each(function() { 
        $S(this).bind('mousedown.disableTextSelect', function() {
          return false;
        });
      });
    }
    
    return $S;
  };

  /**
   * Summe von Werten aus Inputfeldern berechnen
   */
  $S.fn.calcSum = function(  ){
   
    var sum = 0;
    var elements = $S(this);
    
    if( !elements.length ){
      return 0;
    }
    
    elements.removeClass('state-warn');
    
    elements.each( function(){
      
      if( isNaN(sum) ){
        return;
      }
      
      var $node = $S(this);
      var value = $node.val();

      if( '' === value ){
        value = 0;
      }
      
      if( isNaN(value) ){
        $node.addClass('state-warn');
        return;
      }
      
      sum += 100000*parseFloat(value);
      
      return;
      
    });
    
    return sum/100000;
  };
  
  /**
   * Durchschnittswert von Inputfeldern berechnen
   */
  $S.fn.calcAvg = function(  ){
   
    var sum = 0;
    
    var elements = $S(this);
    
    if( !elements.length ){
      return 0;
    }
    
    elements.each( function(){
      
      if( isNaN(sum) ){
        return;
      }
      
      var $node = $S(this);
      var value = $node.val();

      if( '' == value ){
        value = 0;
      }
      
      if( isNaN(value) ){
        $node.addClass('state-warn');
        return '(not a number)';
      }
      
      sum += 100000 * parseFloat(value);
      
      return;
      
    });
    
    //console.log( 'SUM '+sum );
    
    if( isNaN(sum) ){
      return sum;
    }
    
    return ( (sum / elements.length ) / 100000 ).toFixed(2);
  };
  
  /**
   * get all classes of an element as array
   */
  $S.fn.niceValue = function( value ){

    var slctElem = $S(this);
    slctElem.val(value);

    var slctNode = slctElem.get(0);
    var niceElem = $S('input#display-'+slctElem.prop('id'));
   
    niceElem.val(slctNode.options[slctNode.selectedIndex].innerHTML);

  };
  
 /**
  * get on single Parent with a given selector als match
  */
  $S.fn.iconToggle = function( contrl ){
     
    var _$ = $S(this);
   
    if(_$.is(':visible')){
      
      $S(contrl).find('img').attr('src',$C.iconClosed).attr('alt','closed');
      _$.toggle();
      
    }
    else{
      
      $S(contrl).find('img').attr('src',$C.iconOpened).attr('alt','opened');
      _$.toggle();
      
    }
  };
   
 /**
  * get first class with a given prefix
  * @param start
  * @param cut
  */
  $S.fn.getActionClass = function( start, cut, sep ){
    
    if(undefined ==cut){
      cut = true;
    }
    
    if( undefined == sep ){
      sep = '_'; 
    }

    var _$        = $S(this);
    var cString   = ''+_$.prop('class');

    var classParts  = cString.split(' ');
    var tmpLenght   = classParts.length;
    
    // append _
    start += sep;
    
    var pLength     = start.length;

    for (var index = 0; index < tmpLenght; ++index){

      var tmp = classParts[index];
      if( start === tmp.substring(0,pLength) ) {
        if(cut){
          return tmp.substring(pLength,tmp.length);
        }
        else{
          return tmp;
        }
      }
    }
    
    // found no class
    return null;

  };
   
})(jQuery);


