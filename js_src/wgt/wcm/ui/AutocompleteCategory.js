/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_cat_autocomplete', function( jNode ){

  jNode.removeClass("wcm_ui_cat_autocomplete");

  
//making new category "catcomplete" widget
  jQuery.widget( "ui.catcomplete", jQuery.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
        var self = this,
            currentCategory = "";
        jQuery.each( items, function( index, item ) {
            if ( item.category != currentCategory ) {
                ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                currentCategory = item.category;
            }
            self._renderItem( ul, item );
        });
    },
    _renderItem: function(ul, item) {
      var re = new RegExp(
          "(?![^&;]+;)(?!<[^<>]*)(" +
          this.term +
          ")(?![^<>]*>)(?![^&;]+;)", "gi"
        );

      var t = item.label.replace( re, "<span style='color:blue; font-weight: bold;'>$1</span>" ); 
      return (jQuery)( "<li></li>" )
          .data( "item.autocomplete", item )
          .append( "<a>" + t + "</a>" )
          .appendTo( ul );
      }
  });
  
  jNode.catcomplete({
    delay: 0,
    minLength: 0
  })
  .addClass('ui_cat_autocomplete');
  
  
});
  
  
  /*

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

*/