<h2>UI Element: Upload</h2>

<div class="container">

  <form id="fileupload" action="upload.php" method="POST" enctype="multipart/form-data">
  
      <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
      <div class="row fileupload-buttonbar">
          <div class="span7">
              <!-- The fileinput-button span is used to style the file input field as button -->
              <span class="btn btn-success fileinput-button">
                  <i class="icon-plus icon-white"></i>
                  <span>Add files...</span>
                  <input type="file" name="files[]" multiple="multiple" >
              </span>
              <button type="submit" class="btn btn-primary start">
                  <i class="icon-upload icon-white"></i>
                  <span>Start upload</span>
              </button>
              <button type="reset" class="btn btn-warning cancel">
                  <i class="icon-ban-circle icon-white"></i>
                  <span>Cancel upload</span>
              </button>
              <button type="button" class="btn btn-danger delete">
                  <i class="icon-trash icon-white"></i>
                  <span>Delete</span>
              </button>
              <input type="checkbox" class="toggle">
          </div>
          <div class="span5">
              <!-- The global progress bar -->
              <div class="progress progress-success progress-striped active fade">
                  <div class="bar" style="width:0%;"></div>
              </div>
          </div>
      </div>
      <!-- The loading indicator is shown during image processing -->
      <div class="fileupload-loading"></div>

  </form>

</div>

<script type="text/javascript" >

//Initialize the jQuery File Upload widget:
$('#fileupload').fileupload();

</script>


<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>