  
$R.addAction( 'ui_combo_autocomplete', function( jNode ){

  jNode.removeClass("wcm_ui_combo_autocomplete");
  

jQuery.widget( "ui.combocomplete", jQuery.ui.catcomplete, {
  _create: function() {
    //var oldFn1 = jQuery.ui.autocomplete.prototype._create;
    var oldFn  = jQuery.ui.autocomplete.prototype._create.apply(this, arguments);
    var self   = this,
        input = (jQuery)(this.element),
        button;
       
    input 
      .val( "")
      .addClass( "ui-widget ui-widget-content ui-corner-left" );

    button = (jQuery)( "<button><a class='ui-icon ui-icon-triangle-1-s'></a></button>" )
    .attr( "title", "Show All Items" )
    .insertAfter( input )
    .addClass( "autocomplete-button ui-widget-content ui-corner-right" )
    .click(function(event) {
      // close if already visible
      if (  input.combocomplete( "widget" ).is( ":visible" ) ) {
          input.combocomplete( "close" );
          }
      else{
      // pass empty string as value to search for, displaying all results
        input.combocomplete( "search", "" );
        input.focus();
      }
      event.preventDefault();
    });
    
/*
    button = (jQuery)( "<button type='button'></button>" )
      .attr( "tabIndex", -1 )
      .attr( "title", "Show All Items" )
      .insertAfter( input )
      .button({
        icons: {
          primary: "ui-icon-triangle-1-s"
        },
        text: false
      })
      .removeClass( "ui-corner-all ui-button-icon-only" )
      .addClass( "autocomplete-button ui-corner-right ui-button-icon " )
      .click(function(event) {
        // close if already visible
        if (  input.combocomplete( "widget" ).is( ":visible" ) ) {
            input.combocomplete( "close" );
            }
        else{
        // pass empty string as value to search for, displaying all results
          input.combocomplete( "search", "" );
          input.focus();
        }
        //event.preventDefault();
      });
*/
  },
  enable: function(){
    //alert('enable');
    (jQuery)(this.element).attr('disabled', false)
                          .removeClass('ui-state-disabled');
    (jQuery)(this.element).next()
                          .attr('disabled', false)
                          .removeClass('ui-state-disabled');
    jQuery.ui.autocomplete.prototype.enable.apply(this, arguments);
  },
  disable: function() {
    //alert('disable');
    jQuery.ui.autocomplete.prototype.disable.apply(this, arguments);
    (jQuery)(this.element).next()
                          .attr('disabled', true)
                          .addClass('ui-state-disabled');
    (jQuery)(this.element).attr('disabled', true)
                          .addClass('ui-state-disabled');
    
    
  }
  
});
          
   jNode .combocomplete({
     delay: 0,
     minLength: 0
   })
         .addClass('ui_combo_autocomplete');
   
});