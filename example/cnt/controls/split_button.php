<h2>Split Button</h2>


<div id="hans-wurst" class="wcm wcm_control_split_button" style="position:relative;"  >
  <button class="wgt-button splitted"  >Search</button><button id="hans-wurst-split" class="wgt-button append" ><span class="ui-icon ui-icon-triangle-1-s" style="height:10px;" > </span></button>
  <ul id="hans-wurst-menu" class="wgt-dropdown template" >
    <li><input type="checkbox" /> 1 Hans</li>
    <li><input type="checkbox" /> 2 Hans</li>
    <li><input type="checkbox" /> 3 Hans</li>
    <li><input type="checkbox" /> 4 Hans</li>
  </ul>
</div>


<div id="hans1-wurst" class="wcm wcm_control_split_button" style="position:absolute;right:20px;top:200px;"  >
  <button class="wgt-button splitted"  >Search2</button><button id="hans1-wurst-split" class="wgt-button append" ><span class="ui-icon ui-icon-triangle-1-s" style="height:10px;" > </span></button>
  <ul id="hans1-wurst-menu" class="wgt-dropdown template" >
    <li><input type="checkbox" /> 11 Hans</li>
    <li><input type="checkbox" /> 12 Hans</li>
    <li><input type="checkbox" /> 13 Hans</li>
    <li><input type="checkbox" /> 14 Hans</li>
  </ul>
</div>

<div id="hans2-wurst" class="wcm wcm_control_split_button"  style="position:absolute;right:300px;top:400px;"  >
  <button class="wgt-button splitted"  >Search3</button><button id="hans2-wurst-split" class="wgt-button append" ><span class="ui-icon ui-icon-triangle-1-s" style="height:10px;" > </span></button>
  <div id="hans2-wurst-menu" class="template" >
    <ul class="wgt-split-drop" >
      <li><button class="wgt-button" >Test 1</button></li>
      <li><button class="wgt-button" >Test 2</button></li>
      <li><button class="wgt-button" >Test 3</button></li>
      <li><button class="wgt-button" >Test 4</button></li>
    </ul>
  </div>
  <var id="hans2-wurst-cfg"  >{"split_button":{"triggerEvent":"mouseover","closeOnLeave":"true"}}</var>
</div>

<style type="text/css" >

ul.wgt-split-drop
{
  padding:3px;
}

ul.wgt-split-drop .wgt-button
{
  width:99%;
  margin-bottom:1px;
}

.miniMenuCloseButton
{
  padding:7px 4px 5px 4px ;
}

ul.wgt-dropdown li
{
  padding:2px;
  border: 1px solid silver;
}

</style>