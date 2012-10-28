<?php 

?>

<h2>Drop Down Menu</h2>


<div class="wgt-panel head"  >
  <ul class="wcm wcm_ui_dropmenu wgt-dropmenu" id="wgt_tab-listing_project_plan_dropmenu" >
    <li class="wgt-root" >
      <button class="wcm wcm_ui_button" ><img src="<?php echo $pathIcon ?>xsmall/control/menu.png"  alt="Menu"  class="icon xsmall" /> Menü</button>
      <ul style="margin-top:-10px;" >

        <li>
          <p><img src="<?php echo $pathIcon ?>xsmall/control/masks.png"  alt="Masks"  class="icon xsmall" /> Masks</p>
          <ul>
            <li><p class="wgtac_mask_project_idea" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Ideen</p></li>
            <li><p class="wgtac_mask_project_mask_type_software" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Software Project</p></li>
            <li><p class="wgtac_mask_project_project_mask_archive" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Archive</p></li>
            <li><p class="wgtac_mask_project_project_mask_customer" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Kunden Projekte</p></li>
            <li><p class="wgtac_mask_project_project_mask_finance" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Finanzierung</p></li>
            <li><p class="wgtac_mask_project_project_mask_infrastructure" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Infrastruktur</p></li>
            <li><p class="wgtac_mask_project_project_mask_my_projects" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> My Projects</p></li>
            <li><p class="wgtac_mask_project_project_mask_planning" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Planung</p></li>
            <li><p class="wgtac_mask_project_simple" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Simple</p></li>
            <li><p class="wgtac_mask_project_viewer" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt Viewer</p></li>
            <li><p class="wgtac_mask_project_project" ><img src="<?php echo $pathIcon ?>xsmall/control/mask.png"  alt="Mask"  class="icon xsmall" /> Projekt</p></li>
          </ul>
        </li>
  
        <li>
          <p><img src="<?php echo $pathIcon ?>xsmall/control/maintenance.png"  alt="Maintenance"  class="icon xsmall" /> Wartung</p>
          <ul>
            <li>
              <a class="wcm wcm_req_ajax" href="modal.php?c=Project.Project_Maintenance.protocolEntity" ><img src="<?php echo $pathIcon ?>xsmall/control/protocol.png"  alt="Protocol"  class="icon xsmall" /> Protokoll</a>
            </li>
            <li>
              <a class="wcm wcm_req_ajax" href="modal.php?c=Project.Project_Maintenance.statsEntity" ><img src="<?php echo $pathIcon ?>xsmall/control/stats.png"  alt="Stats"  class="icon xsmall" /> Statistik</a>
            </li>
          </ul>
        </li>
  
        <li><p><img src="<?php echo $pathIcon ?>xsmall/control/rights.png"  alt="Rights"  class="icon xsmall" /> ACLs</p>
          <ul>
            <li>
              <a class="wcm wcm_req_ajax" href="maintab.php?c=Project.Project_Acl.listing" ><img src="<?php echo $pathIcon ?>xsmall/relation/management.png"  alt="Management"  class="icon xsmall" /> ACLs Entity</a>
            </li>
          </ul>
        </li>
  
        <li>
          <p><img src="<?php echo $pathIcon ?>xsmall/control/support.png"  alt="Support"  class="icon xsmall" /> Support</p>
          <ul>
            <li><a class="wcm wcm_req_ajax" href="modal.php?c=Webfrap.Docu.open&amp;key=project_plan-table" ><img src="<?php echo $pathIcon ?>xsmall/control/help.png"  alt="Help"  class="icon xsmall" /> Help</a></li>
            <li><a class="wcm wcm_req_ajax" href="modal.php?c=Wbfsys.Issue.create&amp;context=table" ><img src="<?php echo $pathIcon ?>xsmall/control/bug.png"  alt="Bug"  class="icon xsmall" /> Bug</a></li>
          </ul>
        </li>
    
        <li>
          <p class="wgtac_close" ><img src="<?php echo $pathIcon ?>xsmall/control/close.png"  alt="Close"  class="icon xsmall" /> Schliesen</p>
        </li>
      </ul>
    </li>
  
    <li class="wgt-root" >
      <button class="wcm wcm_ui_button" ><img src="<?php echo $pathIcon ?>xsmall/control/listings.png"  alt="List Type"  class="icon xsmall" /> List Type</button>
      <ul style="margin-top:-10px;" >
        <li><p class="wgtac_view_table" ><img src="<?php echo $pathIcon ?>xsmall/control/mask_table.png"  alt="Table"  class="icon xsmall" /> Table</p></li>
      </ul>
    </li>
  
    <li class="wgt-root" >
      <button 
        class="wcm wcm_ui_tip wgt-button wgtac_new"
        title="Create a new Project Planning"  ><img src="<?php echo $pathIcon ?>xsmall/control/new.png"  alt="Create"  class="icon xsmall" /></button>
      <ul style="margin-top:-10px;" ></ul>
    </li>

  </ul>
</div>