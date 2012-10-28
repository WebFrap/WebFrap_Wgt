/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_gantt', function( jNode ){

  jNode.removeClass('wcm_ui_gantt');
  
  var dataBody = jNode.next();
  
  var tmpId = jNode.attr('id');
  tmpId = tmpId.substring( 4, tmpId.length );
  
  var formObj = $S('#wgt-form-'+tmpId); ;
  
  if( !dataBody.is('var') )
  {
    alert('found no body');
    return;
  }
  
  dataBody = $S.parseJSON( dataBody.text() );

  for ( numEntry in dataBody )
  {
    for ( numSeries in dataBody[numEntry]['series'] )
    {
      var tmpStart  = dataBody[numEntry]['series'][numSeries]['start'];
      var tmpEnd    = dataBody[numEntry]['series'][numSeries]['end'];
      
      dataBody[numEntry]['series'][numSeries]['start'] = new Date( tmpStart[0],tmpStart[1],tmpStart[2] );
      dataBody[numEntry]['series'][numSeries]['end'] = new Date( tmpEnd[0],tmpEnd[1],tmpEnd[2] );
    }
  }

  
  jNode.ganttView({ 
    data: dataBody,
    slideWidth: 900,
    behavior: 
    {
      onClick: function (data) 
      { 
        var msg = "You clicked on an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
        alert(msg);
      },
      onResize: function (data) 
      {
    	  
    	var dataPack = {};
    	dataPack[data.name_start] = data.start.toString("yyyy-mm-dd");
    	dataPack[data.name_end] = data.end.toString("yyyy-mm-dd");
    	
    	$R.post( formObj.attr('action'), dataPack );
    	  
      },
      onDrag: function (data) 
      { 
      	var dataPack = {};
    	dataPack[data.name_start] = data.start.toString("yyyy-mm-dd");
    	dataPack[data.name_end] = data.end.toString("yyyy-mm-dd");
    	
    	$R.post( formObj.attr('action'), dataPack );
      }
    }
  });


});