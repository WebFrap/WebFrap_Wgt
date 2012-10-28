
<?php /*
<style type="text/css" >

h1 {font-size:18px;float:left;}

h2 {font-size:15px;}

div.wgt-tag_cloud
{
  width:400px;
  height:auto;
  margin:auto;
  padding:5px;
  margin-top:5px;
  border:1px solid #ccc;
  border-radius:5px 5px 0px 0px;
  background-color:#eee;
}

div.wgt-tag_cloud div.control
{
  border-bottom:1px solid #ddd;
  padding:10px;
  height:35px;
}

div.wgt-tag_cloud div.control h2
{
  width:310px;
  float:left;
  margin:0px;
  padding:0px;
}

div.wgt-tag_cloud div.content
{
  height:180px;
  padding:3px;
  padding-top:6px;  
  padding-bottom:6px;  
  overflow: auto;
}

div.wgt-tag_cloud div.content span.tag
{
  line-height:20px;
  display: block;
  float: left;
  padding-right:11px;
  padding-left:12px;
  margin-top:5px;
  margin-bottom:5px;
  border-right:1px solid #ddd;
}


div.wgt-tag_cloud div.content span:hover
{
  /*font-size:14px;* /
  padding-right:11px;
  padding-left:12px;
  background-color: #ddd;
  cursor: default;
}

div.wgt-tag_cloud div.content button 
{
  padding:0 !important;
  margin:0 !important;
  width:65px;
  height:35px;
  position:absolute;
  display:inherit;
  margin-top:-50px !important;
  margin-left: -5px !important;
  z-index:99999px;
  border:none;
  background: transparent url('../icons/default/xsmall/control/delete_hover.png') no-repeat center top !important;
}

div.wgt-tag_cloud div.content button img
{
  display:none;
}

div.wgt-tag_cloud div.control div.search
{
  position:relative;
  padding-bottom:25px;
}

</style>
*/?>


<div class="wgt-content_box wgt-tag_cloud wcm wcm_widget_tag_cloud" style="margin-left:50px;margin-top:50px;" >
  <div class="head" >
    <table border="0" cellspacing="0" cellpadding="0" width="100%">
      <tr>
        <td width="190px;"><h2>Tags</h2></td>
        <td width="190px;">
          <div class="search"  >
            <input class="wgt-overlay c_input_add embed medium wgt-ignore" />
            <button id="trigger" class="wgt-button append wgt-overlay embed" >
              <img src="../icons/default/xsmall/control/add.png" alt="Add" class="icon xsmall" />
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <div class="content" >
    <span class="tag" wgt_eid="1" wgt_tid="1" >Test</span>
    <span class="tag" wgt_eid="2" wgt_tid="2" >Another Test</span>
    <span class="tag" wgt_eid="3" wgt_tid="3" >Test33</span>
    <span class="tag" wgt_eid="4" wgt_tid="4" >Bar</span>
    <span class="tag" wgt_eid="5" wgt_tid="5" >Foo?</span>
  </div>
</div>



<script type="text/javascript" >
</script>

<div class="wgt-clear xsmall">&nbsp;</div>



<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>

