/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
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