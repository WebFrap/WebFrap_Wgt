<?php 
header("Content-Type:  text/xml; charset=utf-8");
echo '<?xml version="1.0" encoding="UTF-8" ?>';

$pathIcon = '../icons/default/';

?>
<wgt>
  <gui>
    <head>
    </head>
    <messages>
      <message>OK</message>
    </messages>
    
    <body>
    
<window  resizable="resizable"   movable="movable"  id="wgt_window_selection_enterprise_company"   >
      <dimensions width="950" height="650" min-width="300" min-height="200" />
      <title>Selection Firma</title>
      
      <status>Selection Firma</status>
      <buttons><button type="menu" ><![CDATA[<ul class="wcm wcm_ui_dropmenu wgt-dropmenu" id="wgt_window_selection_enterprise_company_dropmenu" >
  <li class="wgt-root" >
    <button class="wcm wcm_ui_button" ><img src="<?php echo $pathIcon ?>xsmall/control/menu.png"  alt="Menu"  class="icon xsmall" /> Menu</button>
    <ul style="margin-top:-10px;" >
      <li class="current" >
        <p><img src="<?php echo $pathIcon ?>xsmall/control/support.png"  alt="Support"  class="icon xsmall" /> Support</p>
        <ul>
          <li><a 
            class="wcm wcm_req_ajax" 
            href="modal.php?c=Webfrap.Docu.show&amp;key=enterprise_company-selection" ><img src="<?php echo $pathIcon ?>xsmall/control/help.png"  alt="Help"  class="icon xsmall" /> Help</a></li>
          <li><a 
            class="wcm wcm_req_ajax" 
            href="modal.php?c=Wbfsys.Issue.create&amp;context=selection&mask=enterprise_company" ><img src="<?php echo $pathIcon ?>xsmall/control/bug.png"  alt="Bug"  class="icon xsmall" /> Bug</a></li>
          <li><a 
            class="wcm wcm_req_ajax" 
            href="modal.php?c=Wbfsys.Faq.create&amp;context=selection&mask=enterprise_company" ><img src="<?php echo $pathIcon ?>xsmall/control/faq.png"  alt="Faq"  class="icon xsmall" /> Faq</a></li>
        </ul>
      </li>
      <li>
        <p class="wgtac_close" ><img src="<?php echo $pathIcon ?>xsmall/control/close.png"  alt="Close"  class="icon xsmall" /> Close</p>
      </li>
    </ul>
  </li>
  <li class="wgt-root" >
    <button class="wcm wcm_ui_button wgtac_new" ><img src="<?php echo $pathIcon ?>xsmall/control/add.png"  alt="Create"  class="icon xsmall" /> Neu</button>
    <ul style="margin-top:-10px;" ></ul>
  </li>

</ul>]]></button></buttons>
      
      
      <content><![CDATA[<div class="window_body" >

    <form
    method="get"
    accept-charset="utf-8"
    class="wcm wcm_req_ajax"
    id="wgt-form-selection-enterprise_company-search"
    action="index.php?c=Enterprise.Company.filter&amp;publish=selection&input=project_plan_id_company-21130&amp;suffix=21130&a_root=mgmt-enterprise_company&a_key=mgmt-enterprise_company&a_level=1&a_node=mgmt-enterprise_company" >

    <div id="wgt-search-selection-enterprise_company-advanced"  style="display:none" >

      <div id="wgt_tab-selection-enterprise_company-search" class="wcm wcm_ui_tab"  >
        <div id="wgt_tab-selection-enterprise_company-search-head" class="wgt_tab_head" >
          <div class="inner left" style="width:200px" >
            <h2>Extended Search</h2>
          </div>
        </div>

        <div class="wgt_tab_body" >

          <div
          class="wgt_tab wgt_tab-selection-enterprise_company-search"
          id="wgt_tab-enterprise_company-search-default"
          title="Default" >
           <div class="left half" >
          <div class="wgt_box input" id="wgt-box-wgt-input-search_enterprise_company_shortname-search" >
      <label class="wgt-label" for="wgt-input-search_enterprise_company_shortname-search" >Kürzel </label>
      <div class="wgt-input medium" ><input name="search_enterprise_company[shortname]" id="wgt-input-search_enterprise_company_shortname-search" class="wcm wcm_ui_tip medium wcm_req_search wgt-no-save" title="Search for Shortname (Company)" maxlength="" value="" type="text"  /></div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
          <div class="wgt_box input" id="wgt-box-wgt-input-search_core_person_lastname-search" >
      <label class="wgt-label" for="wgt-input-search_core_person_lastname-search" >Lastname </label>
      <div class="wgt-input medium" ><input name="search_core_person[lastname]" id="wgt-input-search_core_person_lastname-search" class="wcm wcm_ui_tip medium wcm_req_search wgt-no-save" title="Search for Lastname (Person)" maxlength="" value="" type="text"  /></div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
          <div class="wgt_box input" id="wgt-box-wgt-input-search_core_person_firstname-search" >
      <label class="wgt-label" for="wgt-input-search_core_person_firstname-search" >Firstname </label>
      <div class="wgt-input medium" ><input name="search_core_person[firstname]" id="wgt-input-search_core_person_firstname-search" class="wcm wcm_ui_tip medium wcm_req_search wgt-no-save" title="Search for Firstname (Person)" maxlength="" value="" type="text"  /></div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
        </div>
        <div class="inline half" >
                                                </div>

          <div class="wgt-clear xxsmall">&nbsp;</div>
        </div>
        <div
          class="wgt_tab wgt_tab-selection-enterprise_company-search"
          id="wgt_tab-enterprise_company-search-contact"
          title="Contact Data" >
           <div class="left half" >
                            </div>
        <div class="inline half" >
                            </div>

          <div class="wgt-clear xxsmall">&nbsp;</div>
        </div>


          <div
            class="wgt_tab wgt_tab-selection-enterprise_company-search"
            id="wgt_tab-selection-enterprise_company-search-meta"
            title="Meta" >

            <div class="left half" >
              <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_role_create-search" >
        <label class="wgt-label" for="wgt-input-search_enterprise_company_m_role_create-search" >Ersteller </label>
        <div class="wgt-input medium" >
          <input type="hidden" class="" value="" id="wgt-input-search_enterprise_company_m_role_create-search" name="search_enterprise_company[m_role_create]" />
          <input type="text" name="search_enterprise_company[m_role_create-tostring]" id="wgt-input-search_enterprise_company_m_role_create-search-tostring" class="wcm wcm_req_search medium wgt-no-save  wgt-ignore wgt-readonly" title="Ersteller" type="hidden" value="" readonly="readonly"  />
          <button class="wgt-button append" ><img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/webfrap/menu.png" /></button>
        </div>
        <div class="wgt-clear tiny" >&nbsp;</div>
      </div>
                  <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_time_created_before-search" >
      
      <label class="wgt-label" for="wgt-input-search_enterprise_company_m_time_created_before-search" >Erstellt Vor </label>
      
      <div class="wgt-input small" ><input name="search_enterprise_company[m_time_created_before]" id="wgt-input-search_enterprise_company_m_time_created_before-search" class="wcm wcm_req_search small wgt-no-save wcm wcm_ui_date" title="Geändert Vor" type="text"  />        <var>{"button":"wgt-input-search_enterprise_company_m_time_created_before-search-ap-button"}</var>
        <button id="wgt-input-search_enterprise_company_m_time_created_before-search-ap-button" class="wgt-button append" >
          <img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/control/calendar.png" />
        </button>
    </div>
      
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
                  <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_time_created_after-search" >
      
      <label class="wgt-label" for="wgt-input-search_enterprise_company_m_time_created_after-search" >Erstellt Nach </label>
      
      <div class="wgt-input small" ><input name="search_enterprise_company[m_time_created_after]" id="wgt-input-search_enterprise_company_m_time_created_after-search" class="wcm wcm_req_search small wgt-no-save wcm wcm_ui_date" title="Erstellt Nach" type="text"  />       <var>{"button":"wgt-input-search_enterprise_company_m_time_created_after-search-ap-button"}</var>
        <button id="wgt-input-search_enterprise_company_m_time_created_after-search-ap-button" class="wgt-button append" >
          <img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/control/calendar.png" />
        </button>
    </div>
      
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
              <div class="box_border" >&nbsp;</div>
            </div>

            <div class="inline half" >
              <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_role_change-search" >
        <label class="wgt-label" for="wgt-input-search_enterprise_company_m_role_change-search" >Letzer Bearbeiter </label>
        <div class="wgt-input medium" >
          <input type="hidden" class="" value="" id="wgt-input-search_enterprise_company_m_role_change-search" name="search_enterprise_company[m_role_change]" />
          <input type="text" name="search_enterprise_company[m_role_change-tostring]" id="wgt-input-search_enterprise_company_m_role_change-search-tostring" class="wcm wcm_req_search medium wgt-no-save  wgt-ignore wgt-readonly" title="Letzer Bearbeiter" type="hidden" value="" readonly="readonly"  />
          <button class="wgt-button append" ><img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/webfrap/menu.png" /></button>
        </div>
        <div class="wgt-clear tiny" >&nbsp;</div>
      </div>
                  <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_time_changed_before-search" >
      
      <label class="wgt-label" for="wgt-input-search_enterprise_company_m_time_changed_before-search" >Geändert Vor </label>
      
      <div class="wgt-input small" ><input name="search_enterprise_company[m_time_changed_before]" id="wgt-input-search_enterprise_company_m_time_changed_before-search" class="wcm wcm_req_search small wgt-no-save wcm wcm_ui_date" title="Geändert Vor" type="text"  />        <var>{"button":"wgt-input-search_enterprise_company_m_time_changed_before-search-ap-button"}</var>
        <button id="wgt-input-search_enterprise_company_m_time_changed_before-search-ap-button" class="wgt-button append" >
          <img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/control/calendar.png" />
        </button>
    </div>
      
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
                  <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_m_time_changed_after-search" >
      
      <label class="wgt-label" for="wgt-input-search_enterprise_company_m_time_changed_after-search" >Geändert Nach </label>
      
      <div class="wgt-input small" ><input name="search_enterprise_company[m_time_changed_after]" id="wgt-input-search_enterprise_company_m_time_changed_after-search" class="wcm wcm_req_search small wgt-no-save wcm wcm_ui_date" title="Geändert Nach" type="text"  />       <var>{"button":"wgt-input-search_enterprise_company_m_time_changed_after-search-ap-button"}</var>
        <button id="wgt-input-search_enterprise_company_m_time_changed_after-search-ap-button" class="wgt-button append" >
          <img class="icon xsmall" src="<?php echo $pathIcon ?>xsmall/control/calendar.png" />
        </button>
    </div>
      
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
            </div>

            <div class="left half" >&nbsp;</div>

            <div class="inline half" >
              <div class="wgt_box input" id="wgt-box-wgt-input-search_enterprise_company_m_uuid-search" >
      <label class="wgt-label" for="wgt-input-search_enterprise_company_m_uuid-search" >UUID </label>
      <div class="wgt-input medium" ><input name="search_enterprise_company[m_uuid]" id="wgt-input-search_enterprise_company_m_uuid-search" class="wcm wcm_req_search medium wgt-no-save" title="UUID" type="text"  /></div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
                  <div class="wgt-box input" id="wgt-box-wgt-input-search_enterprise_company_rowid-search" >
      
      <label class="wgt-label" for="wgt-input-search_enterprise_company_rowid-search" >IDI </label>
      
      <div class="wgt-input medium" ><input name="search_enterprise_company[rowid]" id="wgt-input-search_enterprise_company_rowid-search" class="valid_required medium wgt-no-save" title="IDI" type="text"  /></div>
      
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>
            </div>

          </div>

        </div>

      </div>

      <div class="wgt-clear xxsmall">&nbsp;</div>

    </div>

  </form>



    <p class="wgt-box info" >
      To assign a Company press the connect button on the right side in the table.
    </p>

    <div id="wgt_selection-enterprise_company" class="wgt-grid" >
<var id="wgt_selection-enterprise_company-selection-cfg-grid" >{
        "height":"xxlarge",
        "search_form":"wgt-form-selection-enterprise_company-search"
      }</var><div class="wgt-panel" >     
      
      <div class="right" >
        <strong>Search</strong>
        <input 
          type="text" 
          name="free_search" 
          id="wgt-search-selection-enterprise_company" 
          class="large wcm wcm_req_search wgt-no-save fparam-wgt-form-selection-enterprise_company-search" />
  
        <button 
          onclick="$R.form('wgt-form-selection-enterprise_company-search',null,{search:true});return false;" 
          title="Search"
          class="wgt-button inline wcm wcm_ui_tip" >
          <img src="<?php echo $pathIcon ?>xsmall/control/search.png" alt="Search"  class="icon xsmall" />
        </button>
      <button
        onclick="$S('#wgt-search-selection-enterprise_company-advanced').toggle();$UI.resetForm('wgt-form-selection-enterprise_company-search');return false;"
        class="wgt-button inline wcm wcm_ui_tip"
        title="Extend Search"
        >
        <img src="<?php echo $pathIcon ?>xsmall/control/show_advanced.png" alt="Search Advanced"  class="icon xsmall" />
      </button>

        <button 
          onclick="$S('table#wgt_selection-enterprise_company-selection').grid('cleanFilter');$UI.resetForm('wgt-form-selection-enterprise_company-search');$R.form('wgt-form-selection-enterprise_company-search');return false;" 
          title="Reset" 
          class="wgt-button right wcm wcm_ui_tip" >
          <img src="<?php echo $pathIcon ?>xsmall/control/reset.png" alt="Reset"  class="icon xsmall" />
        </button>
      </div>
  </div><table id="wgt_selection-enterprise_company-table" class="wgt-grid wcm wcm_widget_grid hide-head" >
<thead>
<tr>
<th style="width:30px;" class="pos" >Pos.</th>
<th style="width:200px" >Kürzel</th>
<th style="width:200px" >Firstname</th>
<th style="width:200px" >Lastname</th>
<th style="width:35px;">Nav.</th>
</tr>
</thead>
<tbody>
<tr class="wcm row1 wcm_control_context_menu wcm_ui_highlight node-30619"  wgt_context_menu="wgt_selection-enterprise_company-cmenu"  wgt_eid="30619"  id="wgt_selection-enterprise_company_row_30619" >
<td valign="top" class="pos" name="slct[30619]" style="text-align:right;" >1</td>
<td valign="top" >fubar</td>
<td valign="top" ><a class="wcm wcm_req_mtab" href="maintab.php?c=Enterprise.Company.edit&amp;objid=30619&amp;target_id=wgt_selection-enterprise_company" ></a></td>
<td valign="top" ><a class="wcm wcm_req_mtab" href="maintab.php?c=Enterprise.Company.edit&amp;objid=30619&amp;target_id=wgt_selection-enterprise_company" ></a></td>
<td valign="top" style="text-align:center;" class="wcm wcm_ui_buttonset" ><button onclick="$S('input#wgt-input-project_plan_id_company-21130').data('assign')(30619);return false;" class="" title="connect" ><img src="<?php echo $pathIcon ?>xsmall/webfrap/connect.png"  alt="connect"  class="icon xsmall" /></button></td>
</tr>
</tbody>
</table> <div class="wgt-panel wgt-border-top" >  <div class="right menu"  ><span>found <strong class="wgt-num-entry" >1</strong> Entries</span>  </div>  <div class="menu"  style="text-align:center;margin:0px auto;" ><span class="wgt_char_filter" ><a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="c=?" > ? </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=A" > A </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=B" > B </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=C" > C </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=D" > D </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=E" > E </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=F" > F </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=G" > G </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=H" > H </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=I" > I </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=J" > J </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=K" > K </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=L" > L </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=M" > M </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=N" > N </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=O" > O </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=P" > P </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=Q" > Q </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=R" > R </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=S" > S </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=T" > T </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=U" > U </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=V" > V </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=W" > W </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=X" > X </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=Y" > Y </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=Z" > Z </a> | <a class="wcm wcm_req_page wgt-form-selection-enterprise_company-search" href="b=" > <img src="<?php echo $pathIcon ?>xsmall/control/cancel.png"  alt="clear"  class="icon xsmall" /> </a></span>  </div></div>
</div>
<ul id="wgt_selection-enterprise_company-cmenu" class="wgt_context_menu" style="display:none;" >
<li><img src="<?php echo $pathIcon ?>xsmall/webfrap/connect.png"  alt="connect"  class="icon xsmall" /><a href="#connect">connect</a></li>
</ul><script type="text/javascript" >
</script>

  <div class="wgt-clear small">&nbsp;</div>

</div>

<div class="wgt-clear xsmall">&nbsp;</div>

<script type="text/javascript">
  </script>
]]></content>
      <script><![CDATA[

    self.getObject().find(".wgtac_search").click(function()
    {
      $R.form('wgt-form-selection-enterprise_company-search', null, {search:true});
    });

    self.getObject().find(".wgtac_new").click(function()
    {
      $R.get('modal.php?c=Enterprise.Company.create');
    });

    $S('input#wgt-input-project_plan_id_company-21130').data('assign',function( objid ){
      $S('input#wgt-input-project_plan_id_company-21130').val(objid);
      $R.get( 'ajax.php?c=Enterprise.Company.data&amp;suffix=21130&input=project_plan_id_company-21130&amp;objid='+objid );
      $W('wgt_window_selection_enterprise_company').close();
    });
   if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_enterprise_company_m_role_create-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_enterprise_company_m_role_create-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_enterprise_company_m_role_create'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=enterprise_company_m_role_create&closeWindow=true'",
      edit_link   : "'wgt-input-search_enterprise_company_m_role_create', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 }    if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_enterprise_company_m_role_change-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_enterprise_company_m_role_change-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_enterprise_company_m_role_change'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=enterprise_company_m_role_change&closeWindow=true'",
      edit_link   : "'wgt-input-search_enterprise_company_m_role_change', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 }    if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_core_person_m_role_create-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_core_person_m_role_create-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_core_person_m_role_create'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=core_person_m_role_create&closeWindow=true'",
      edit_link   : "'wgt-input-search_core_person_m_role_create', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 }    if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_core_person_m_role_change-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_core_person_m_role_change-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_core_person_m_role_change'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=core_person_m_role_change&closeWindow=true'",
      edit_link   : "'wgt-input-search_core_person_m_role_change', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 }    if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_core_address_m_role_create-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_core_address_m_role_create-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_core_address_m_role_create'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=core_address_m_role_create&closeWindow=true'",
      edit_link   : "'wgt-input-search_core_address_m_role_create', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 }    if( undefined !== self && typeof self.getObject == 'function' ){
    self.getObject().find('input#wgt-input-search_core_address_m_role_change-tostring').parent().find('button').menuSelector({
      stringField : self.getObject().find('input#wgt-input-search_core_address_m_role_change-tostring'),
      hiddenField : self.getObject().find('input#wgt-input-search_core_address_m_role_change'),
      add_link    : "'modal.php?c=Wbfsys.RoleUser.selection&amp;target=core_address_m_role_change&closeWindow=true'",
      edit_link   : "'wgt-input-search_core_address_m_role_change', 'modal.php?c=Wbfsys.RoleUser.edit&amp;objid='",
      add         : 1,
      edit        : 1,
      remove      : 1
    });
 } ]]></script>

    </window>
    
      <htmlArea selector="div#wgt-debug-box" action="html"><![CDATA[
      <pre><?php
      var_dump( isset($_GET)?$_GET:null );
      ?></pre>
      <pre><?php
      var_dump( isset($_POST)?$_POST:null );
      ?></pre>
      ]]></htmlArea>
    </body>
  </gui>
  <code></code>
  <data></data>
</wgt>