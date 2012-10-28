<h2>UI Element: Table Selectbox</h2>


<form id="the_master_form" ></form>

<div class="full" >

<table id="wgt-table-the_table"  class="wgt-table" style="width:500px;border:1px solid silver;" >
  <tbody>
    <tr>
      <td>1</td>
      <td>Pos</td>
      <td><select 
        id="wgt-select-the_table-1" 
        name="some_name[2][fuu]" 
        data_source="select_src-data-1"
        class="wcm wcm_widget_selectbox asgd-the_master_form"
          >
          <option value="3" >Hälfte von 6</option>
        </select>
          
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>Pos</td>
      <td><select 
        id="wgt-select-the_table-2" 
        name="some_name[3][fuu]" 
        data_source="select_src-data-1" 
        class="wcm wcm_widget_selectbox asgd-the_master_form"
          >
          <option value="3" >Hälfte von 6</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>Pos</td>
      <td><select 
        id="wgt-select-the_table-3" 
        name="some_name[3][fuu]" 
        data_source="select_src-data-1" 
        class="wcm wcm_widget_selectbox asgd-the_master_form"
          >
          <option value="42" >Antwort auf Alles</option>
        </select>
      </td>
    </tr>
  </tbody>
</table>
<var id="select_src-data-1" >
[
  {"i":"3","v":"Hälfte von 6"},
  {"i":"42","v":"Antwort auf Alles"},
  {"i":"5","v":"Noch was"}
]
</var>

</div>


<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>