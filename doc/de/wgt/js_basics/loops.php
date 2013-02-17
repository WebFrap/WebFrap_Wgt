<h1>Schleifen</h1>

<p>Übersicht JS Schleifen</p>

<label>For Schleifen</label>
<?php start_highlight(); ?>

// auch wenn in anderen beispielen hier gerne "i" steht, Variablen haben immer
// mindestens 3 Zeichen als Bezeichner, siehe Konventionen

// der index muss immer mit var als lokale variable deklariert werden!
// sonst besteht die gefahr, dass beim verschachteln von schleifen mit gleichen
// index key plötzlich der index der äuseren schleife von der innerem mit incrementiert
// wird

for( var idx=1; idx<42; idx++ ){

  if( !some_check( idx ) ){
    // mit break kann die Schleife abgebrochen werden
    break;
  }
  
  if( !another_check( idx ) ){
    // mit continue kann der rest des codes übersprungen werden
    continue;
  }
  
  some_action( idx );
  
}
<?php display_highlight( 'javascript' ); ?>


<label>While und Do While</label>
<?php start_highlight(); ?>

// while: bedingung wird vor der ausführen ausgewertet
var idx=1;
while( idx <= 42 ){

  some_action();
  ++idx;
}

// do while: bedingung wird nach dem ausführen ausgewertet =>
// selbst wenn die bedingung immer false ist wird die schleife mindestens
// einmal ausgeführt
var idx2=1;
do{

  some_action();
  ++idx2;
}
while( idx2 > 42 ); // in diesem beispiel immer falsch

<?php display_highlight( 'javascript' ); ?>

<label>Sinnvoller Einsatz von while</label>
<?php start_highlight(); ?>

// solange die action klappt weitermachen
var idx=1;
while( some_action(idx) ){

  ++idx;
}

// mache etwas, und dann schau ob du es nochmal machen kannst...
// in schleifen muss nicht zwangsläufig mit laufnummern gearbeitet werden
// wie hier zu sehen ist
do{

  some_action();
}
while( some_check() );
<?php display_highlight( 'javascript' ); ?>




