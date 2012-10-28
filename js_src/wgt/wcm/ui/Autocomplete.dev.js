/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_autocomplete', function( jNode ){

  jNode.removeClass("wcm_ui_autocomplete");
  
  // check if this autocomplete field has a predefined type
  var tmp = jNode.next();
  
  jNode.autocomplete({
    source: tmp.prop('href'),
    minLength: 3
  });

  
  return;

  var props = {};
  
  if( tmp.is('var.prop_'+jNode.attr('id') ) )
  {
    props = $WGT(tmp.text()).robustParseJSON();
  }
  
  
  if( props.src )
  {
    jNode.autocomplete({
      source: props.src,
      minLength: props.minLength || 3
    });
    
    return;
  }
    
  if( props.multi )
  {

    function split( val ) {
      return val.split( /,\s*/ );
    }
    
    function extractLast( term ) {
      return split( term ).pop();
    }
  
  
    jNode.autocomplete({
      minLength: 3,
      source: function( request, response ) {
        $S.getJSON( jNode.data( $S('var#'+jNode.attr('id')+'-src') ) , {
             term: extractLast( request.term )
        }, response );
      },
      search: function() {
        // custom minLength
        var term = extractLast( this.value );
        if ( term.length < 2 ) {
          return false;
        }
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
    });

  }

});