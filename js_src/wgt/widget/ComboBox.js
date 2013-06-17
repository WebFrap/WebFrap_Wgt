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
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
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
 * Take from the jquery ui examples
 */
(function( $S ){
  
  "use strict";

  $S.widget( "ui.combobox",{
    
    _create : function(){

      var input, 
        self = this, 
        select = this.element.hide(), 
        selected = select.children(":selected"), 
        value = selected.val() ? selected.text() : "", 
        wrapper = this.wrapper = $S("<span>").addClass("wgt-combobox").insertAfter(select);

      input = $S("<input class=\"medium\" >").appendTo(wrapper)
        .val(value).addClass( "wgt-combobox-input")
        .autocomplete({
          delay : 0,
          minLength : 0,
          source : function( request, response ){

            var matcher = new RegExp($S.ui.autocomplete.escapeRegex(request.term), "i");
            
            response( select.children("option").map(
              function(){
  
                var text = $S(this).text();
                if( this.value  && (!request.term || matcher.test(text)) )
                  return {
                    label : text.replace(new RegExp(
                        "(?![^&;]+;)(?!<[^<>]*)("
                            + $S.ui.autocomplete
                                .escapeRegex(request.term)
                            + ")(?![^<>]*>)(?![^&;]+;)", "gi"),
                        "<strong>$1</strong>"),
                    value : text,
                    option : this
                  };
              })
            );
          },
          select : function( event, ui ){

            ui.item.option.selected = true;
            self._trigger("selected", event, {
              item : ui.item.option
            });
            
          },
          change : function( event, ui ){

            if(!ui.item) {
              
              var matcher = new RegExp("^"
                  + $S.ui.autocomplete.escapeRegex($S(this).val())
                  + "$", "i"), valid = false;
              
              select.children("option").each(function(){

                if($S(this).text().match(matcher)) {
                  this.selected = valid = true;
                  return false;
                }
                
              });
              
            if(!valid) {
              // remove invalid value, as it didn't match anything
              $S(this).val("");
              select.val("");
              input.data("autocomplete").term = "";
              return false;
            }
            
          }
        }
          
      }).addClass("ui-widget ui-widget-content ui-corner-left");

      input.data("autocomplete")._renderItem = function( ul, item ){

        return $S("<li></li>").data("item.autocomplete", item).append(
            "<a>" + item.label + "</a>").appendTo(ul);
      };

      $S("<button class=\"wgt-button append wgt-combobox-toggle\" ><span class=\"ui-icon ui-icon-triangle-1-s\" ></span></button>").attr("tabIndex", -1).attr("title", "Show All Items")
      .appendTo(wrapper)
      .click(function(){
  
        // close if already visible
        if(input.autocomplete("widget").is(":visible")) {
          input.autocomplete("close");
          return;
        }

        // work around a bug (likely same cause as #5265)
        $S(this).blur();

        // pass empty string as value to search for, displaying all
        // results
        input.autocomplete("search", "");
        input.focus();
      });
      
    },
  
    destroy : function(){
  
      this.wrapper.remove();
      this.element.show();
      $S.Widget.prototype.destroy.call(this);
    }
            
  });
  
})(jQuery);
