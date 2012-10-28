<style type="text/css" >


.wgt-grid .order:hover
{
  border: 1px solid #4297D7;
  color: #EAF5F7;
}

</style>

<h2>Grid</h2>


<form method="post" action="dump.php?c=f" id="the-search-form" ></form>
<form method="post" action="dump.php?c=f" id="the-edit-form" ></form>

<div id="wgt_table-wbfsys_role_user" class="wgt-grid" >

<var id="wgt_table-wbfsys_role_user-table-cfg-grid" >{
  "height":"xxlarge",
  "search_form":"the-search-form",
  "search_able":"true",
  "save_form":"the-edit-form",
  "edit_able":"true",
  "allow_insert":"true"
}</var>

<table id="wgt_table-wbfsys_role_user-table" class="wgt-grid wcm wcm_widget_grid hide-head" >

  <thead>
    <tr>
      <th style="width:30px" class="pos"  >Pos</th>
      <th 
        style="width:270px" 
        wgt_sort_name="wbfsys_role_user[name]" 
        wgt_sort="asc" 
        wgt_search="input:wbfsys_role_user[name]"  >Name</th>
      <th style="width:100px" wgt_sort_name="wbfsys_role_user[profile]" >Profile</th>
      <th style="width:70px" >Since</th>
      <th style="width:50px" wgt_search="checkbox:wbfsys_role_user[ina]" >Inactiv</th>
      <th style="width:250px" >Number</th>
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
 <div class="right menu"  >
    <span>found <strong class="wgt-num-entry" >11</strong> Entries</span> </div>
 <div class="menu" style="float:left;" style="width:100px;" > </div> 
</div>

</div>

<script type="text/javascript" >
</script>



<div class="wgt-clear xsmall">&nbsp;</div>




<?php 

function printRow( $id )
{
  
  $pos = $id % 2;
  
  echo <<<CODE
  
    <tr class="{$pos}" id="wgt_table-wbfsys_role_user_row_{$id}" >
      <td valign="top" class="pos" >{$id}</td>
      <td valign="top" class="type_text" >user {$id}</td>
      <td valign="top" class="type_select" >Developer</td>
      <td valign="top" class="type_date" >2011-07-23</td>
      <td valign="top" class="type_check" ><input type="checkbox" name="wbfsys_role_user[inactive]"  id="wgtid_check_{$id}"   disabled="disabled"  /></td>
      <td valign="top" class="type_number" >{$id}</td>
      
    </tr>
CODE;
  
}

?>