<h2>Double List Selector</h2>

<style type="text/css" >

.dbl_list_selector
{
  border:1px solid silver;
  margin: 3px;
}

.dbl_list_selector ul.out,
.dbl_list_selector ul.in
{
  margin:5px;
  border:1px solid silver;
  max-height: 250px;
  overflow:auto;
}


.dbl_list_selector ul.out
{
  float:left;
}

.dbl_list_selector ul.in
{
  float:right;
}

.dbl_list_selector div.menu
{
  float:left;
  text-align: center;
  margin:5px;
  margin-top:10px;
}

.dbl_list_selector div.menu .entry
{
  padding:2px;
  margin-left:38px;
}

.dbl_list_selector ul li
{
  border:1px solid silver;  
  padding:3px;
}

</style>


<html>
  
  <div id="prototype" class="wcm wcm_ui_dbl_list_selector dbl_list_selector bw3 wgt-border" >

  <ul class="out bw1 dbl_list" >
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
  </ul>
  
  <div class="menu bw05" >
    <div class="entry" >
      <button class="wgt-button all_in" >&nbsp;&nbsp;</button>
    </div>
    <div class="entry" >
      <button class="wgt-button seleted_in ui-icon ui-icon-arrowthick-1-e" >&nbsp;&nbsp;</button>
    </div>
    <div class="wgt-clear small" >&nbsp;</div>
    <div class="entry" >
      <button class="wgt-button seleted_out ui-icon ui-icon-arrowthick-1-w" >&nbsp;&nbsp;</button>
    </div>
    <div class="entry" >
      <button class="wgt-button all_out ui-icon ui-icon-arrowthickstop-1-w" >&nbsp;&nbsp;</button>
    </div>
  </div>
  
  <ul class="in bw1 dbl_list" >
    <li>Entry In 1<input name="fu[]" type="hidden" value="11" /></li>
    <li>Entry In 2<input name="fu[]" type="hidden" value="12" /></li>
    <li>Entry In 3<input name="fu[]" type="hidden" value="13" /></li>
    <li>Entry In 4<input name="fu[]" type="hidden" value="14" /></li>
  </ul>
  
  <div class="clear" ></div>
</div>
  
</html>


<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
