<h2>UI Element Table: Sortable</h2>


<div class="wgt-box two_third left" >

  <table class="wgt-table  full" >
  
    <thead>
      <tr>
        <th>Fu</th>
        <th>Bar</th>
      </tr>
    </thead>
  
    <tbody id="the_id" class="wcm wcm_feature_sortable" >
      <tr>
        <td>1<input name="sort[]" class="order" type="hidden" value="1" /></td>
        <td>Name</td>
      </tr>
      <tr>
        <td>2<input name="sort[]" class="order" type="hidden" value="2" /></td>
        <td>Name</td>
      </tr>
      <tr>
        <td>3<input name="sort[]" class="order" type="hidden" value="3" /></td>
        <td>Name</td>
      </tr>
      <tr>
        <td>4<input name="sort[]" class="order" type="hidden" value="4" /></td>
        <td>Name</td>
      </tr>
  
    </tbody>
  </table>
  <var id="the_id-sortable" >{"url" : "dump.php?fu=bar","start":"20"}</var>
  
  <ul class="wcm wcm_feature_sortable" >
    <li>Pos 1</li>
    <li>Pos 2</li>
    <li>Pos 3</li>
    <li>Pos 4</li>
  </ul>

</div>


<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>