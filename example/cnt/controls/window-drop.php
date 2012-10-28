<h2>Dropdown Menu</h2>


<div id="wgt-box-wgt-input-example" class="wgt-box input">
  <label for="wgt-input-example" class="wgt-label">Parent </label>
  <div class="wgt-input medium">
    <input type="hidden" name="example[attr]" id="wgt-input-example" value="22"  >
    <input 
      type="text" 
      value="Nice" 
      class="medium wgt-ignore ui-autocomplete-input"
      id="wgt-input-example-tostring" 
      name="example[attr-tostring]"  >
    <button 
      class="wcm wcm_control_selection wgt-button append"
      id="wgt-box-wgt-input-example-control"
      wgt_drop_box="wgt-box-wgt-input-example-control-drop" ><img src="../icons/default/xsmall/webfrap/menu.png" class="icon xsmall" /></button>
    <var id="wgt-box-wgt-input-example-control-cfg-selection" >{
     "element":"wgt-input-example",
     "add":"modal.php?some=selection",
     "change":"modal.php?some=selection",
     "open":"modal.php?some=selection"
    }</var>
  </div>
  <div class="wgt-clear tiny">&nbsp;</div>
</div>

<div class="wgt-dropdownbox"  id="wgt-box-wgt-input-example-control-drop" >
  <ul>
    <li class="add" ><a><img src="../icons/default/xsmall/control/add.png" class="icon xsmall" /> Add</a></li>
    <li class="change" ><a><img src="../icons/default/xsmall/control/search.png" class="icon xsmall" /> Change</a></li>
    <li class="open" ><a><img src="../icons/default/xsmall/control/edit.png" class="icon xsmall" /> Open</a></li>
    <li class="unset" ><a><img src="../icons/default/xsmall/control/delete.png" class="icon xsmall" /> Unset</a></li>
  </ul>
</div>




