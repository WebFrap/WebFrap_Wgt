/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 * 
 * @example
 * <input 
 *  class="wcm wcm_ui_window asgd-form_id" 
 *  id=""
 *  value="" 
 *  title="" />
 * <var>
 * {"title":"Some Title",
 * "list_url":"maintab.php?c=...",
 * "edit_url":"maintab.php?c=...",
 * "flag_add":"1",
 * "flag_delete":"1"}
 * </var>
 * 
 */
$R.addAction( 'ui_window', function( jNode ){
  
  var settings  = jNode.next();
  var nName = jNode.attr('name');
  var nId   = jNode.attr('id');
  
  var displayField = null;
  var trigger      = null;
  
  var defOptions = {
    title:null,               // Der Title für das Display 
    icon:'webfrap/menu.png',  // Das Icon für den Window Trigger
    list_url:'',              // Der Link zum Selection Element
    edit_url:'',              // Der Link zu Entity
    flag_add:1,               // Soll der Add Button angezeigt werden
    flag_delete:1,            // Soll der Löschen Button angezeigt werden
    autocomplete:null         // kein Autocomplete Service angehängt
  };
  
  var options = {};
  if( settings.is('var') ){
    options = $WGT.robustParseJSON( settings.text() );
    options = $S.extend({},defOptions,options);
  }
  
  
  
  jNode.hide();
  
  // Append Butoon Element anhängen
  jNode.after(
    '<button class="wgt-button append" >'
      +'<img class="icon xsmall" src="'+$C.WEB_ICONS+'xsmall/'+options.icon+'" />'
      +'</button>'
  );
  trigger = jNode.next();
  
  
  jNode.after(
    '<input '
      +' name="'+nName.replace( ']', '-tostring]' )+'"'
      +' id="'+nId+'-tostring"'
      +' class="medium wgt-ignore wgt-readonly"'
      + ( options.title ? ' title="'+options.title+'"':'' )
      +' value="'+jNode.attr('title')+'"'
      +' readonly="readonly"'
      +' />'
  );
 
  displayField = jNode.next();
  
  // tooltip hinzufügen, aber nur wenn auch ein title vorhanden ist
  if( options.title ){
    displayField.wgtTip({
      gravity: 'w',
      delayIn: 700, 
      delayOut: 200
    });
  }
  
/*
<input 
  type="hidden" 
  class="asgd-wgt-form-project_plan-edit-114721" 
  value="" 
  id="wgt-input-project_plan_id_customer-114721" 
  name="project_plan[id_customer]" />
  
<input 
  type="text" 
  name="project_plan[id_customer-tostring]" 
  id="wgt-input-project_plan_id_customer-114721-tostring" 
  class="wcm wcm_ui_tip medium asgd-wgt-form-project_plan-edit-114721 wgt-ignore wgt-readonly" 
  title="Insert value for Customer (Project)" 
  value="" 
  readonly="readonly"  />
  
<button class="wgt-button append" >
  <img class="icon xsmall" src="./icons/default/xsmall/webfrap/menu.png" />
</button>
*/
  
  // entfernen der Klasse
  jNode.removeClass('wcm_ui_window');

  trigger.menuSelector({
    stringField : displayField,
    hiddenField : jNode,
    add_link    : "'"+options.list_url+"&closeWindow=true'",
    edit_link   : "'"+nId+"', '"+options.edit_url+"&objid='",
    add         : options.flag_add,
    edit        : 1,
    remove      : options.flag_delete
  });



});
