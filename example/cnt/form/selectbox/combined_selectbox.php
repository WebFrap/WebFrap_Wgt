<h2>UI Element: Combined Selectboxes</h2>

<div class="left bw3" >

<select 
	id="fuu" 
	class="wcm wcm_ui_selectbox_filter" >

  <option filter_key="" > </option>
  <option filter_key="faa" >fuu</option>
  <option filter_key="bar" >bar</option>
  <option filter_key="gnmpf" >gnmpf</option>

</select>

</div>

<div class="inline bw3" >

<select 
  id="bar" 
  class="wcm wcm_ui_selectbox_filter wcm_ui_selectbox_filtered wgt-filter-select-fuu" 
  wgt_filter="filter_faa"  >
	
	<option filter_key="" > </option>
  <option class="filter_faa" filter_key="fuu1" >fuu 1</option>
  <option class="filter_faa" filter_key="fuu2" >fuu 2</option>
  <option class="filter_bar" filter_key="bar1" >bar 1</option>
  <option class="filter_bar" filter_key="bar2"  >bar 2</option>
  <option class="filter_gnmpf" filter_key="gnmpf1" >gnmpf 1</option>
  <option class="filter_gnmpf" filter_key="gnmpf2" >gnmpf 2</option>

</select>

</div>


<div class="inline bw3" >

<select 
  id="fubar" 
  class="wcm wcm_ui_selectbox_filtered wgt-filter-select-bar" 
  wgt_filter="filter_bar1"  >

	<option> </option>
  <option class="filter_fuu1" >fuu 1.1</option>
  <option class="filter_fuu1" >fuu 1.2</option>
  <option class="filter_fuu2" >fuu 2.1</option>
  <option class="filter_fuu2" >fuu 2.2</option>
  <option class="filter_bar1" >bar 1.1</option>
  <option class="filter_bar1" >bar 1.2</option>
  <option class="filter_bar2" >bar 2.1</option>
  <option class="filter_bar2" >bar 2.2</option>
  <option class="filter_gnmpf1" >gnmpf 1.1</option>
  <option class="filter_gnmpf1" >gnmpf 1.2</option>
  <option class="filter_gnmpf2" >gnmpf 2.1</option>
  <option class="filter_gnmpf2" >gnmpf 2.2</option>

</select>

</div>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>