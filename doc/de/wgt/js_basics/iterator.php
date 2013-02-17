
<h1>Iterator</h1>

<p>Hier könnte ihre Dokumentation stehen... Wenn sie endlich jemand schreiben würde...</p>

<h3>Javascript nativ</h3>

<p>Schneller als jQuery</p>

<label>Iterieren über Arrays, nativ</label>
<?php start_highlight(); ?>
var data = [1,2,3,4];

for( var key=0; key < data.length; key++ ) {
  alert( data[key] );
}
<?php display_highlight( 'javascript' ); ?>


<label>Iterieren über Objekte, nativ</label>
<?php start_highlight(); ?>
var data = {val1:1,val2:2};

for( var key in data ) {
  alert( data[data] );
}
<?php display_highlight( 'javascript' ); ?>

<h3>Verwendung von jQuery</h3>

<p>langsamer als nativ</p>

<label>jQuery Way</label>
<?php start_highlight(); ?>
var dataAr = [1,2,3,4];
var dataObj = {val1:1,val2:2};

$S.each( dataAr, function( index, value ){
});

$S.each( dataObj, function( key, value ){
});

<?php display_highlight( 'javascript' ); ?>
