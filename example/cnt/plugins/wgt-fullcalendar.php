<h2>WGT Gantt</h2>

<div class="left half"  >


<form id="wgt-form-calendar-example" action="./dump.php?fu=bar" method="POST" ></form>

<div class="wcm wcm_ui_calendar" id="wgt-calendar-example" style="height:500px;" ></div>
<var>
{
  "data":
  [
    {
      "title": "Event1",
      "start": "2011-04-04"
    },
    {
      "title": "Event2",
      "start": "2011-05-05",
      "end": "2011-05-07"
    }
  ]
}
</var>

</div>


<div class="wgt-clear" style="clear:both;height:2px;" ></div>

<h2>Send Data</h2>
<div id="wgt-debug-box" style="width:100%;height:200px;" >
test
</div>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>