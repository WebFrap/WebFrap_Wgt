<h3>Tabs</h3>

<div class="wgt-content_box inline wgt-space">
	<div class="head" style="padding:0px;" >
    <div id="tab-box-head" class="wcm wcm_ui_tab_head wgt-tab-head al" style="border:0px;" wgt_body="tab-box-content"  >
      <div class="tab_head left"  >
        <a wgt_key="fooo" class="tab wgt-corner-top" >fooo qwwqeqwe qweqwe</a>
        <a wgt_key="bar" class="tab wgt-corner-top"  >bar</a>
        <a wgt_key="narf" class="tab wgt-corner-top"  >narf</a>
        <a wgt_key="olum" class="tab wgt-corner-top" >olum</a>
      </div>
      <div class="tab_overflow right" >
        <button 
            id="tab-box-overflow-cntrl"
            wgt_drop_box="tab-box-overflow-cruddropbox"
            class="wgt-button" ><span class="ui-icon ui-icon-triangle-1-s" >&nbsp;</span></button>
      </div>
  
      <div class="wgt-dropdownbox" id="tab-box-overflow-cruddropbox" >
        <ul id="tab-box-overflow-menu"  >
          <li><a>Fuu</a></li>
        </ul>
        <var id="tab-box-overflow-cntrl-cfg-dropmenu"  >{"triggerEvent":"mouseover","closeOnLeave":"true","align":"right"}</var>
      </div>
  
    </div>
  </div>
  <div class="content">
    <div id="tab-box-content" class="wgt-content-box" style="background-color:white;"  >
      <div class="container" style="height:100%;" wgt_key="fooo" id="tab-box-content-fooo" >
        FOOOOOO
      </div>
      <div class="container" wgt_key="bar" id="tab-box-content-bar" >
        BAR
      </div>
      <div class="container" wgt_key="narf" id="tab-box-content-narf" >
        NARF
      </div>
      <div class="container" wgt_key="olum" id="tab-box-content-olum" >
        Olum
      </div>
    </div>
    <div class="wgt-clear xxsmall" ></div>
  </div>
</div>



<div style="position:absolute;margin-left:100px;margin-top:500px;" >
  <button onclick="$S('#tab-box-head').tabHead('addTab',{key:'zonk',label:'zonk',content:'ZORT'});" >Add Tab</button><br />
  <button onclick="$S('#tab-box-head').tabHead('removeTab','zonk');" >Remove Tab zonk</button><br />
  
  
  <button onclick="$S('#tab-box-head').tabHead('hideTab','fooo');" >Hide Tab fooo</button><br />
  <button onclick="$S('#tab-box-head').tabHead('showTab','fooo');" >Show Tab fooo</button><br />
</div>


<style type="text/css" >



div.wgt-content-box
{
  border:1px solid silver;
  height:auto;
}

div.wgt-content-box div.container
{
  display:none;
}

</style>

