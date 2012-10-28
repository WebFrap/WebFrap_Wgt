<h2>WGT Gantt</h2>

<div class="left half"  >


<form id="wgt-form-gantt-example" action="./dump.php?fu=bar" method="POST" ></form>

<div class="wcm wcm_ui_gantt" id="wgt-gantt-example" style="height:500px;" >
</div>
<var>
[
  {
    "id": "task_1",
    "name": "Feature 1",
    "series": [
      { 
        "name": "Planned", 
        "start": [2010,00,01], 
        "name_start": "fu[12][start]", 
        "end": [2010,00,03], 
        "name_end": "fu[12][end]"
      },
      { 
        "name": "Actual", 
        "start": [2010,00,02], 
        "name_start": "fu[12][p_start]", 
        "end": [2010,00,05],  
        "name_end": "fu[12][p_end]",
        "color": "#f0f0f0",
        "fubar" : "fubar2" 
      }
    ]
  },
  {
    "id": "task_2",
    "name": "Feature 2",
    "series": [
      { "name": "Planned", "start": [2010,10,01], "end": [2010,10,03], "fubar" : "fubar3" },
      { "name": "Actual", "start": [2010,10,02], "end": [2010,10,05], "color": "#f0f0f0", "fubar" : "fubar4" }
    ]
  }
]
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