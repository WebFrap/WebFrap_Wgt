/* Licence see: /LICENCES/wgt/licence.txt */


(function($UI){

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  $UI.fn.activInput = function( inputId, toFilter , params ){

    var input = null;

    if( typeof inputId == 'object' )
      input = inputId;
    else
      input = $S(inputId);

    if( input.is("input") )
    {
      
      return new WgtUiActivInput(input, toFilter , params);
    }
    else
    {
     return null;
    }

  };//end WgtUi.prototype.activInput

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  function WgtUiActivInput( input, toFilter , params )
  {

    var inputObj    = input;
    var filterObj   = toFilter;

    // bind key events
    // handle special keys here
    inputObj.keydown(function(ev){
      
      switch(ev.which){
        
        // escape clears menu
        case key.ESC: {
          toFilter.resetFilter();
          
          return false;
        }
      }
      return true;
    });

    /*
    inputObj.keypress(function(ev)
    {
      // ev.which doesn't work here - it always returns 0
      switch(ev.keyCode)
      {
        case RETURN:
        case ESC:
          return false;

        // up changes highlight
        case ARRUP:
          changeHighlight(ev.keyCode);
          return false;

        // down changes highlight or open new menu
        case ARRDOWN:
          if(!suggestions_menu)
            getSuggestions(getUserInput());
          else
            changeHighlight(ev.keyCode);
          return false;
       }
       return true;
    });
    */

    // handle normal characters here
    inputObj.keyup(function(ev){
      
        switch(ev.which){
          
          case key.RETURN:{
            if(!window.$B.undef(toFilter.close))
              toFilter.close();
            break;
          }
          case key.ESC:
          case key.ARRLEFT:
          case key.ARRRIGHT:
          case key.ARRUP:
          case key.ARRDOWN:
            return false;
          default:
            toFilter.filter( getUserInput() );
        }
        return true;
    });

    // get user input
    function getUserInput(){
      
      var val = inputObj.val();

      /*
      if(options.multi)
      {
        var pos   = getCaretPosition(me_this);
        var start = pos.start;

        for(;start  >0 && val.charAt(start-1) != ',';start--){}
        var end = pos.start;

        for(;end<val.length && val.charAt(end) != ',';end++){}
        var val = val.substr(start,end-start);
      }
      */

      return ltrim(val);
    }

  }//end function WgtUiActivInput

})($UI);