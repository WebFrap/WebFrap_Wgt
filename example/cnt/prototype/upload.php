<h2>FileUpload</h2>

<style type="text/css" >

/* colors */
.green { border:1px solid #51A351; background: #62C462 url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top; }
.blue { border:1px solid #000088; background: #0000aa url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top; }
.yellow { border:1px solid #888800; background: #aaaa00 url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top; }
.red { border:1px solid #EE5F5B; background: #BD362F url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top; }

/* skin */
.btnskin { margin:0 3px 0px 3px;padding: 3px 8px 4px 8px; border-radius: 5px; color: white; text-shadow: 0 1px 1px #222; }
.btnskin:hover { cursor:pointer; background-image:none; text-shadow: 0 1px 1px #444; }

/* icons */
.icon-trash { background-position: -456px 0; }
.icon-ban-circle { background-position: -216px -96px; }
.icon-upload { background-position: -144px -24px; }
.icon-plus { background-position: -408px -96px; }
.icon-white {
  display: inline-block;
    height: 14px;
    line-height: 14px;
    vertical-align: text-top;
    width: 14px;
  background-image: url('../example/cnt/prototype/img/halflings_white.png');
}

</style>

<html>
<form id="fileupload" method="POST" style="margin-top:100px;">
  <div class="row fileupload-buttonbar">
    <div class="span7">
      <span class="fileinput-button green btnskin">
        <i class="icon-plus icon-white"></i>
        <span>Add files...</span>
        <input style="display:none" type="file" multiple="" name="files[]">
      </span>
      <button class="start blue btnskin" type="submit">
        <i class="icon-upload icon-white"></i>
        <span>Start upload</span>
      </button>
      <button class="cancel yellow btnskin" type="reset">
        <i class="icon-ban-circle icon-white"></i>
        <span>Cancel upload</span>
      </button>
      <button class="delete red btnskin" type="button">
        <i class="icon-trash icon-white"></i>
        <span>Delete</span>
      </button>
      <input class="toggle" type="checkbox">
    </div>
    <div class="span5 fileupload-progress fade">
      <div class="progress progress-success progress-striped active" aria-valuemax="100" aria-valuemin="0" role="progressbar">
        <div class="bar" style="width:0%;"></div>
      </div>
      <div class="progress-extended">&nbsp;</div>
    </div>
  </div>
  <div class="fileupload-loading"></div>
  <br>
  <table class="table-striped" role="presentation">
    <tbody class="files" data-target="#modal-gallery" data-toggle="modal-gallery"></tbody>
  </table>
</form>

</html>


<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>

