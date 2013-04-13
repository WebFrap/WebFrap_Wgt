# Request $R

Das Request Objekt

In WGT gibt es nochmal einen zusätzlichen Request Layer der sich um das Automatisch
Handling von Steueranweisungen vom Server kümmert.

So ist es möglich in einem Request viele teils unzusammenhängende Updates
in den Browser zu puschen ohne, dass der Browser diese expliziet behandeln muss.

## $R.get

<?php start_highlight(); ?>
<_..._>
</_..._>
<?php display_highlight('js'); ?>


## $R.put

Senden eines HTTP PUT Requests an den Server.
Leider keine Fileuploads möglich im Moment

### interface

<?php start_highlight(); ?>
/**
 * Einen PUT Request über das Ajax Interface absetzen
 *
 * @param requestUrl string, die URl
 * @param requestData {}, der DataBody das PUT requests
 * @param params {}, zusätzliche Parameter / Events
 */
this.put = function(requestUrl, requestData, params) {
…
};
<?php display_highlight('javascript'); ?>

## $R.post

Senden eines HTTP POST Requests an den Server.

### interface

<?php start_highlight(); ?>
/**
 * Einen POST Request über das Ajax Interface absetzen
 *
 * @param requestUrl string, die URl
 * @param requestData {}, der DataBody das POST requests
 * @param params {}, zusätzliche Parameter / Events
 */
this.post = function(requestUrl, requestData, params) {
…
};
<?php display_highlight('javascript'); ?>



## $R.del

Senden eines HTTP DELETE Requests an den Server

### interface

<?php start_highlight(); ?>
/**
 * Einen DELETE Request über das Ajax Interface absetzen
 * @param  requestUrl
 * @param  params
 * @return Json
 */
this.del = function(requestUrl, params  ) {
…
};
<?php display_highlight('javascript'); ?>

Parameter für Params:

- confirm: string, eine Confirm Message. Wenn vorhanden wird vor dem ausführen des
Delete Request ein Confirm Window geöffnet.

<?php start_highlight(); ?>
$R.del('ajax.php?c=Some.Thing.toDelete&objid=32');
<?php display_highlight('javascript'); ?>

## $R.form

Abschicken eines Formulars


## Events & Parameter

Allgemeine Parameter:

- callback: Function, Callback der nach dem Request ausgeführt wird. Egal ob erfolgreich
oder Fehlgeschlagen
- error: Function, Callback function die ausgeführt wird wenn der Server einen Fehler
zurückmeldet
- success: Function, Callback function die ausgeführt wird wenn der Server einen Fehler
zurückmeldet
