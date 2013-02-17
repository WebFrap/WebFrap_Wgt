
<h1>Globale Events</h1>

<p>In einigen Fällen ist es nötig Events auf Document zu legen.
z.B wenn ein Element geschlossen werden soll, sobald der User irgendwo anders
als auf das Element klickt.<br />
In disem Fall ist es valide ein Globales Event zu verwenden. Nicht valide
ist es, jedoch die 100erte und tausende Globale Events sinnlos lauschen zu lassen, obwohl
aktuell kein Element aktiv ist, welches von irgendeiner globalen Aktion betroffen wäre.
</p>

<p>
Events können mit jQuery einen Namespace bekommen.
Dieser Namespace ist zu werden um globale Events gezielt zu setzen und 
wenn nichtmehr benötigt wieder zu entfernen
</p>

<label>Beispiel</label>
<?php start_highlight(); ?>

(function( $S ) {

  $S.widget( "wgt.demo_events", {


    /**
     *
     */
    active: function(){
      
      $S(document).bind( 'mouseup.demo_events', function(){
        // ok now we are active and the global event is required
      });
      
    },//end active */
    
    /**
     *
     */
    deactivate: function(){
      
      // ok fine, don't call us, we call you!
      $S(document).unbind( 'mouseup.demo_events' );
    
    }//end deactivate */

  });
  
}( jQuery ) );

<?php display_highlight( 'javascript' ); ?>