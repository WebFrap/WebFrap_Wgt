<?php 

$elements[] = <<<CATRIDGE

<htmlArea selector="button#{$_GET['input']}" action="after" ><![CDATA[
<div class="{$_GET['input']} hidden" >
  <div class="wgt-process-form" >
    
    <div class="wgt-panel title" >
      <h2>Status: Fubar</h2>
    </div>
    
    <div class="wgt-panel" >
      <button class="wgt-button" ><img class="wgt-icon" src="{$pathIcon}xsmall/process/feedback.png" /> Request Feedback</button>
      <button class="wgt-button" ><img class="wgt-icon" src="{$pathIcon}xsmall/process/history.png" /> Show History</button>
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
            <img class="wgt-icon" src="{$pathIcon}xsmall/process/accept.png" /> Accept
          </button>
        </li>
        <li>
          <button class="wgt-button" >
            <img class="wgt-icon" src="{$pathIcon}xsmall/process/go_on.png" /> Go On
          </button>
        </li>
        <li>
          <button class="wgt-button" >
            <img class="wgt-icon" src="{$pathIcon}xsmall/process/warn.png" /> Warn
          </button>
        </li>
        <li>
          <button class="wgt-button" >
            <img class="wgt-icon" src="{$pathIcon}xsmall/process/chancel.png" /> Chancel
            </button>
        </li>
      </ul>
      <div class="wgt-clear" ></div>
    </div>
  
    <div class="comment" >
      <h3>Comment <span class="wgt-required wcm wcm_ui_tip" title="Is Required" >*</span></h3>
      <div>
        <textarea rows="" cols=""class="xlarge large-height" ></textarea>
      </div>
    </div>
  
    <div class="wgt-clear" ></div>
  </div>
</div>
]]></htmlArea>

CATRIDGE;


/*
$elements[] = <<<CATRIDGE

<htmlArea selector="" action="alert" ><![CDATA[
fubar
]]></htmlArea>

CATRIDGE;
*/
