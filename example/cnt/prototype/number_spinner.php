<h2>number Spinner</h2>

<style type="text/css" >

.style {
    width: 83px;
}

.spinner {
    border: 1px solid #A4BED4;
    font-size: 12px;
    width:88px;
    height:30px;
}

.spinner-text {
  width:65px;position:absolute;height:24px;
}

.spinner-arrow {
  width:15px; height:30px; float:right;
}  

.spinner-arrow-up {
  width:15px;
  height:15px;
  background: url('../example/cnt/prototype/img/arrows.jpg') no-repeat center top;
}

.spinner-arrow-down {
  width:15px;
  height:15px;
  background: url('../example/cnt/prototype/img/arrows.jpg') no-repeat center bottom;
}

.spinner-arrow li:hover {
  background: url('../example/cnt/prototype/img/arrows.jpg') no-repeat center center;
}

</style>


<html>
  
<div class="spinner">
  <input class="spinner-text validatebox-text" type="text">
  <ul class="spinner-arrow">
    <li class="spinner-arrow-up"></li>
    <li class="spinner-arrow-down"></li>
  </ul>
</div>

</html>

<script type="text/javascript">

</script>


<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
