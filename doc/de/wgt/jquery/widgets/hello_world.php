<h1>Das Hello World Widget</h1>

<p>Wir schreiben alle Widgets in den wgt Namespace.</p>

<label>Hell World</label>
<?php start_highlight(); ?>
/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <dominik.bonsch@webfrap.net>
 */
(function( $S ) {

  $S.widget( "wgt.hello_world", {
      
    /**
    * Der einfache Text als Variable
    */
    text: 'hello world',
      
    /**
     * Standard Options
     */
    options: { 
      tag: 'p'
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        
        // das aktuelle element mit "hello world" ersetzen
        // tag ist konfigurierbar
        this.element.replace( '<'+this.options.tag+'>'+this.text+'</'+this.options.tag+'>'  );

    }//end _create

  });

}( jQuery ) );
<?php display_highlight( 'javascript' ); ?>


<label>Einbinden</label>
<?php start_highlight(); ?>

<div id="replace-me" >boring</div>
<div id="replace-me2" >content</div>

<script type="application/javascript" >
// einfaches aufrufen des Widgets
$S('#replace-me').hello_world();

// überschreiben der Default options
$S('#replace-me2').hello_world({'tag':'span'});
</script>

<?php display_highlight( 'javascript' ); ?>