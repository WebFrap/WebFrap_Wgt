<h2>WGT Dropdown Form</h2>

<style type="text/css" >
div.wgt-process-form
{

}

div.wgt-process-form div.description
{
  width:185px;
  margin:5px;
  float:left;
}

div.wgt-process-form div.action
{
  width:185px;
  margin:5px;
  float:left;
}

div.wgt-process-form div.action button
{
  width:130px;
  text-align:left;
}

div.wgt-process-form div.action ul.actions li
{
  padding:2px;
}


div.wgt-process-form div.comment
{
  width:370px;
  margin:5px;
  float:left;
}

div.wgt-process-form textarea
{
  width:370px;
}

</style>

<div class="wgt-box full" >
    <button class="wcm wcm_ui_dropform" id="wgt-dropform-fubar" >Fuu = bar</button>

    <div class="wgt-dropform-fubar hidden" >

      <div class="wgt-process-form" >
        <div class="wgt-panel title" >
          <h2>Status: Fubar</h2>
        </div>
        <div class="wgt-panel" >
          <button class="wgt-button" ><img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/feedback.png" /> Request Feedback</button>
          <button class="wgt-button" ><img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/history.png" /> Show History</button>
        </div>

        <div class="wgt-clear small" ></div>

        <div class="description" >
          <h3>Description</h3>
          Info Hibn driebn<br />
          Info Hibn driebn<br />
          Info Hibn driebn<br />
          Info Hibn driebn<br />
          Info Hibn driebn<br />
          Info Hibn driebn<br />
        </div>

        <div class="action" >
          <h3>Action</h3>
          <ul class="actions" >
            <li>
              <button class="wgt-button" >
                <img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/accept.png" /> Accept
              </button>
            </li>
            <li>
              <button class="wgt-button" >
                <img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/go_on.png" /> Go On
              </button>
            </li>
            <li>
              <button class="wgt-button" >
                <img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/warn.png" /> Warn
              </button>
            </li>
            <li>
              <button class="wgt-button" >
                <img class="wgt-icon" src="<?php echo $pathIcon ?>xsmall/process/chancel.png" /> Chancel
              </button>
            </li>
          </ul>
          <div class="wgt-clear" ></div>
        </div>

        <div class="comment" >
          <h3>Comment <span class="wgt-required wcm wcm_ui_tip" title="Is Required" >*</span></h3>
          <div>
            <textarea rows="" cols=""class="xlarge medium-height" ></textarea>
          </div>
        </div>

        <div class="wgt-clear" ></div>
      </div>

    </div>

</div>

<div class="wgt-clear small" >fubar</div>


<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>