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
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   code lang: english
 *   naming style: camel case
 * 
 */

/**
 * @author dominik bonsch <db@webfrap.net>
 * @param jNode the jQuery Object of the target node
 */
$R.addAction( 'ui_autocomplete', function( jNode ){

  // remove the wcm action class
  jNode.removeClass( "wcm_ui_autocomplete" );
  
  // check if this autocomplete field has a predefined type
  var cache    = {},
    props    = {},
    tmp      = jNode.next();
  
  var tmpProps = tmp.is('var') 
    ? $WGT.robustParseJSON(tmp.text())
    : {};
  
  // default lenght
  props.minLength = tmpProps.minLength || 3;
  
  // default source
  props.source = function( request, response ){
    var term = request.term;
    
    if ( term in cache ){
      response( cache[ term ] );
      return;
    }

    $R.get( 
      tmpProps.url+request.term, { 
        async:true, 
        success:function( rqt, data ){
          cache[term] = data;
          response( data );
    }});

    
  };
  
  // wenn clear gesetzt ist wird das input feld on close geleert
  if( tmpProps.clear ) {
    // onclose das inputfeld leeren
    props.close = function( event, ui ){
      jNode.val('');
    };
  }

  if( tmpProps.type && 'entity' == tmpProps.type ) {
	  
    props.select = function( event, ui ){

      if( ui.item ) {
        
        // remove -tostring from the end
        var strId = jNode.attr('id');
        var dataInp = $S('#'+strId.substr(0,(strId.length-9)));
        dataInp.val(ui.item.id);
        
        // if we have a formid send the form on select
        if( tmpProps.formid ) {
          
          $R.form( tmpProps.formid );
          
        }
        else if( tmpProps.send_to ) {
          
          var dataBody = '';
          
          if( tmpProps.fields ){
            dataBody += $S(tmpProps.fields).serialize();
          }
          
          $R.post( tmpProps.send_to, dataBody );
        }
          
      }
    };
    
  }
  else if( tmpProps.type && 'ajax' == tmpProps.type ){
    
    props.select = function( event, ui ) {
      if( ui.item && ui.item.url ) {
        $R.get( ui.item.url );
      }
    };
    
    jNode.click( function(){ jNode.val(''); } );
    
    /*
    // onclose das inputfeld leeren
    props.close = function( event, ui ) 
    {
      jNode.val('');
    };
    */
  }
  else if( tmpProps.type && 'data' == tmpProps.type ) {
    
    if( !tmpProps.formid ) {
      $D.error('Sorry, the programmer forgot to give an address for the autocomplete service. This is a bug. Please report to the author of tool.');
      return;
    }
    
    props.select = function( event, ui ){
      // prüfen ob bei der angegebenen addresse per data
      // über den service key eine funktion hinterlegt ist
      var service = $S('#'+tmpProps.formid).data(tmpProps.serviceKey||'connect');
      
      if( !service ){
        $D.error('Did not find a service provider for the given autocomplete service address. This is normally a bug. Please report to the developer of this tool.');
        return;
      }
      
      service( ui.item.id );
    };
    
    // onclose das inputfeld leeren
    props.close = function( event, ui ){
      jNode.val('');
    };
  }
  else if( tmpProps.type && 'callback' == tmpProps.type ) {
    
    // in clallback wird das ui element einfach einem definierten callback übergeben
    // wenn keine callback übergeben wurde wird nach wgt_autocomplete in data gesucht
    if( !tmpProps.callback )
      tmpProps.callback = 'wgt_autocomplete';

    props.select = function( event, ui ) {
      jNode.data( tmpProps.callback )( event, ui );
    };
    
  }
  

  jNode.autocomplete(props);

});