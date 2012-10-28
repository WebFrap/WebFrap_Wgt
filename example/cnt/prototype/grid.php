<style type="text/css" >


.wgt-grid .order:hover
{
  background: url("../../themes/default/images/ui/ui-bg_gloss-wave_75_2191c0_500x100.png") repeat-x scroll 50% 50% #2191C0;
  border: 1px solid #4297D7;
  color: #EAF5F7;
}

</style>

<h2>Grid</h2>


<form method="post" action="dump.php?c=f" id="the-search-form" />

<div id="wgt_table-wbfsys_role_user" class="wgt-grid" >

<var id="wgt_table-wbfsys_role_user-table-cfg-grid" >{"height":"xxlarge"
,"search_form":"the-search-form"
,"search_able":"true"}</var>

<table id="wgt_table-wbfsys_role_user-table" class="wgt-grid wcm wcm_widget_grid hide-head" >

  <thead>
    <tr>
      <th 
        style="width:270px" 
        wgt_sort_name="wbfsys_role_user[name]" 
        wgt_sort="asc" 
        wgt_search="input:wbfsys_role_user[name]"  >Name</th>
      <th style="width:100px" wgt_sort_name="wbfsys_role_user[profile]" >Profile</th>
      <th style="width:70px" >Since</th>
      <th style="width:50px" wgt_search="checkbox:wbfsys_role_user[ina]" >Inactiv</th>
      <th style="width:250px" >Contact</th>
      <th style="width:125px;">Nav.</th>
    </tr>
  </thead>
  
  <tbody>
  
  <?php 
  
  for( $pos = 0; $pos < 50; ++$pos )
    printRow( $pos );
  
  ?>

</tbody>
</table>

<div class="wgt-panel wgt-border-top" >
 <div class="right menu"  ><span>found <strong class="wgt-num-entry" >11</strong> Entries</span> </div> 
 <div class="menu" style="float:left;" style="width:100px;" > </div> 
 <div class="menu"  style="text-align:center;margin:0px auto;" >
 <span class="wgt_char_filter" >
 <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="c=?" > ? </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=A" > A </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=B" > B </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=C" > C </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=D" > D </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=E" > E </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=F" > F </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=G" > G </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=H" > H </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=I" > I </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=J" > J </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=K" > K </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=L" > L </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=M" > M </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=N" > N </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=O" > O </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=P" > P </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=Q" > Q </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=R" > R </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=S" > S </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=T" > T </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=U" > U </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=V" > V </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=W" > W </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=X" > X </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=Y" > Y </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=Z" > Z </a> | <a class="wcm wcm_req_page wgt-form-table-wbfsys_role_user-search" href="b=" > <img src="../icons/default/xsmall/control/cancel.png"  alt="clear"  class="icon xsmall" /> </a></span> </div></div>
</div>


<script type="text/javascript" >
</script>

<div class="wgt-clear xsmall">&nbsp;</div>


<div class="full" ><button id="fold_body" >Fold Body</button></div>

<script type="text/javascript">

$S('#fold_body').click(function(){

  //alert( 'length '+$S('#wgt_table-wbfsys_role_user-table').length );
  //$S('#wgt_table-wbfsys_role_user-table').data('grid').toggle();
  $S('#wgt_table-wbfsys_role_user-table').grid('toggle');
  
  return false;
  
});


</script>

<?php 

function printRow( $id )
{
  
  $pos = $id % 2;
  
  echo <<<CODE
  
    <tr class="{$pos}" id="wgt_table-wbfsys_role_user_row_{$id}" >
      <td valign="top" >
        <a class="wcm wcm_req_mtab" href="maintab.php?c=Wbfsys.RoleUser.edit&amp;objid={$id}" >user {$id}</a><br />
        <a class="wcm wcm_req_mtab" href="maintab.php?c=Wbfsys.RoleUser.edit&amp;objid={$id}" >lastname {$id}</a><span>, </span>
        <a class="wcm wcm_req_mtab" href="maintab.php?c=Wbfsys.RoleUser.edit&amp;objid={$id}" >firstname {$id}</a>
      </td>
      <td valign="top" ><a class="wcm wcm_req_mtab" href="maintab.php?c=Wbfsys.RoleUser.edit&amp;objid={$id}" >Developer</a></td>
      <td valign="top" >25.02.2011</td>
      <td valign="top" ><input type="checkbox" name="wbfsys_role_user[inactive]"  id="wgtid_check_{$id}"   disabled="disabled"  /></td>
      <td valign="top" >
        <ul></ul>
      </td>
      <td 
        valign="top" 
        style="text-align:center;" 
        class="wcm wcm_ui_buttonset" >
        <button  
          onclick="\$R.get('maintab.php?c=Wbfsys.RoleUser.edit&amp;target_mask=WbfsysRoleUser&amp;ltype=table&amp;objid={$id}');return false;"  
          class="wcm wcm_ui_tip"  
          title="Systembenutzer editieren" >
          <img src="../icons/default/xsmall/control/edit.png"  alt="Edit"  class="icon xsmall" />
        </button><button  
          onclick="\$R.del('index.php?c=Wbfsys.RoleUser.delete&amp;target_mask=WbfsysRoleUser&amp;ltype=table&amp;objid={$id}',{confirm:'Please confirm to delete this entry.'});return false;"  
          class="wcm wcm_ui_tip"  
          title="Löschen" >
          <img src="../icons/default/xsmall/control/delete.png"  alt="Delete"  class="icon xsmall" />
        </button><button  
          onclick="\$R.get('maintab.php?c=Wbfsys.RoleUser_Acl_Dset.listing&amp;objid={$id}');return false;"  
          class="wcm wcm_ui_tip"  
          title="Rechte" >
          <img src="../icons/default/xsmall/control/rights.png"  alt="Rights"  class="icon xsmall" />
        </button>
      </td>
    </tr>
CODE;
  
}

?>

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>

