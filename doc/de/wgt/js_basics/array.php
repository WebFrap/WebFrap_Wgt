<h1>Array</h1>

<p>Der Javascript Array</p>

<label>Erstellen des Arrays</label>
<?php start_highlight(); ?>

// wir derwenden immer die kurznotation
var someArray = [];

// und sparen uns die hier demonstrierte lange Variante
var toVerboseCreatedArray = new Array();

// mit Werten
var anotherArray = [ 1, 2, 45, 'fubar' ];
<?php display_highlight( 'javascript' ); ?>


<label>Anzahl Einträge (length)</label>
<?php start_highlight(); ?>
// Die Anzahl der Array Elemente kann einfach über das 
// length Attribute ausgelesen werden
// analog zu php count()
alert( [ 1, 22, 4 ].length );
<?php display_highlight( 'javascript' ); ?>

<label>Array erweitern (push)</label>
<?php start_highlight(); ?>
var arr = [ 1, 22, 4 ];
// Einträge werden per push am Ende angehängt
// analog zu php $array[] = 42;
arr.push(42);
<?php display_highlight( 'javascript' ); ?>

<label>2 Arrays mischen (concat)</label>
<?php start_highlight(); ?>

var arr1 = [ 1, 2, 3 ];
var arr2 = [ 1, 22, 4 ];

// analog zu php array_merge
var arrMerged = arr1.concat( arr2 );

// zusätzlichen Eintrag an arr1 anhängen
// arrMerged bleibed unverändert
arr1.push(66);

// arrMerged enthält nun: 1, 2, 3, 1, 22, 4
// doppelte Werte werden nicht entfernt
alert( arrMerged.join( " " ) );
<?php display_highlight( 'javascript' ); ?>



