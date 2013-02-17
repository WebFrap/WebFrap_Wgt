<h1>Wgt Class</h1>

<p></p>

<label>getClassByPrefix</label>
<?php start_highlight(); ?>

// gibt "class_key" zurück
var cKey1 = $WGT.getClassByPrefix( 'prefix_class_key other_class', 'prefix_', true );

// gibt "prefix_class_key" zurück
var cKey2 = $WGT.getClassByPrefix( 'prefix_class_key other_class', 'prefix_', false );

// gibt null zurück
var cKey3 = $WGT.getClassByPrefix( 'prefix_class_key other_class', 'not_exists' );

<?php display_highlight( 'javascript' ); ?>


<label>robustParseJSON</label>
<?php start_highlight(); ?>

// gibt "class_key" zurück

var jsonString = '['
  + '{"i":"3","v":"Hälfte von 6"},'
  + '{"i":"42","v":"Antwort auf Alles"}'
  + ']';

var jsonData = $WGT.robustParseJSON( jsonString );


<?php display_highlight( 'javascript' ); ?>