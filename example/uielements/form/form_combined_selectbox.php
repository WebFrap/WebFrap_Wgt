<h2>UI Element: Combined Selectboxes</h2>

<select id="fuu" class="wcm wcm_ui_selectbox_filter" >

  <option filter_key="faa" >fuu</option>
  <option filter_key="bar" >bar</option>
  <option filter_key="gnmpf" >gnmpf</option>

</select>

<select 
  id="bar" 
  class="wcm wcm_ui_selectbox_filtered wgt-filter-select-fuu" 
  wgt_filter="filter_faa"  >

  <option class="filter_faa" >fuu 1</option>
  <option class="filter_faa" >fuu 2</option>
  <option class="filter_bar" >bar 1</option>
  <option class="filter_bar" >bar 2</option>
  <option class="filter_gnmpf" >gnmpf 1</option>
  <option class="filter_gnmpf" >gnmpf 2</option>

</select>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>