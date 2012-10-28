/* Licence see: /LICENCES/wgt/licence.txt */

(function($S){

  /**
   * callback methodes to make this parser more extendable
   */
  $S.fn.miniMenu.builders['divColor'] = function( element, menuBody, targetElement ){
    
    var content = ($S)("<table class='color-menu-ul-scheme-table'>" +
        "<tr>" +
          "<td><a class='color-menu-scheme1' ></a></td>" +
          "<td><a class='color-menu-scheme2' ></a></td>" +
          "<td><a class='color-menu-scheme3' ></a></td>" +
        "</tr>" +
        "<tr>" +
          "<td><a class='color-menu-scheme4' ></a></td>" +
          "<td><a class='color-menu-scheme5' ></a></td>" +
          "<td><a class='color-menu-scheme6' ></a></td>" +
        "</tr>" +
        "<tr>" +
          "<td><a class='color-menu-scheme7' ></a></td>" +
          "<td><a class='color-menu-scheme8' ></a></td>" +
          "<td><a class='color-menu-scheme9' ></a></td>" +
        "</tr>" +
      "</table>");
      
      
      var bla = ($S)('td', content); 
      //alert(bla.length);
      //bla.click(alert('gds'));
      //bla.attr('class', 'jiojio');
      bla.click(element.action);
      
      menuBody.append( content );
    };


})($S);

