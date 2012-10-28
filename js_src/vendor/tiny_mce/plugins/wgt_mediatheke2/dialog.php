<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>{#wgt_mediatheke_dlg.title}</title>
  <script type="text/javascript" src="../../tiny_mce_popup.js"></script>
  <script type="text/javascript" src="../../utils/mctabs.js"></script>
  <script type="text/javascript" src="js/dialog.js"></script>
  <link type="text/css" href="css/wgt_mediatheke.css" rel="stylesheet" />
</head>
<body>

<form onsubmit="WgtMediathekeDialog.insert();return false;" action="#">

  <div class="tabs" role="presentation">
    <ul>
      <li id="images_tab" class="current" aria-controls="images_panel">
        <span>
          <a href="javascript:mcTabs.displayTab('images_tab','images_panel');Media.formToData();" onmousedown="return false;">{#wgt_mediatheke_dlg.images}</a>
        </span>
      </li>
      <li id="video_tab" aria-controls="video_panel">
        <span>
          <a href="javascript:mcTabs.displayTab('video_tab','video_panel');Media.formToData();" onmousedown="return false;">{#wgt_mediatheke_dlg.videos}</a>
        </span>
      </li>
      <li id="documents_tab" aria-controls="documents_panel">
        <span>
          <a href="javascript:mcTabs.displayTab('documents_tab','documents_panel');Media.formToData('source');" onmousedown="return false;">{#wgt_mediatheke_dlg.documents}</a>
        </span>
      </li>
    </ul>
  </div>

  <div class="panel_wrapper" >
  
    <div id="images_panel" class="panel current">
      <fieldset>
        <legend>{#wgt_mediatheke_dlg.images}</legend>

        <div id="page" >

        <div id="container" style="width:650px;" >

          <div id="thumbs" class="navigation">
            <ul class="thumbs noscript">
              <li>
                <a class="thumb" name="leaf" href="http://farm4.static.flickr.com/3261/2538183196_8baf9a8015.jpg" title="Title #0">
                  <img src="http://farm4.static.flickr.com/3261/2538183196_8baf9a8015_s.jpg" alt="Title #0" />
                </a>
                <div class="caption">

                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3261/2538183196_8baf9a8015_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #0</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" name="drop" href="http://farm3.static.flickr.com/2404/2538171134_2f77bc00d9.jpg" title="Title #1">
                  <img src="http://farm3.static.flickr.com/2404/2538171134_2f77bc00d9_s.jpg" alt="Title #1" />
                </a>
                <div class="caption">
                  Any html can be placed here ...
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" name="bigleaf" href="http://farm3.static.flickr.com/2093/2538168854_f75e408156.jpg" title="Title #2">
                  <img src="http://farm3.static.flickr.com/2093/2538168854_f75e408156_s.jpg" alt="Title #2" />
                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm3.static.flickr.com/2093/2538168854_f75e408156_b.jpg">Download Original</a>
                  </div>

                  <div class="image-title">Title #2</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" name="lizard" href="http://farm4.static.flickr.com/3153/2538167690_c812461b7b.jpg" title="Title #3">
                  <img src="http://farm4.static.flickr.com/3153/2538167690_c812461b7b_s.jpg" alt="Title #3" />

                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3153/2538167690_c812461b7b_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #3</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>

                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm4.static.flickr.com/3150/2538167224_0a6075dd18.jpg" title="Title #4">
                  <img src="http://farm4.static.flickr.com/3150/2538167224_0a6075dd18_s.jpg" alt="Title #4" />
                </a>
                <div class="caption">
                  <div class="download">

                    <a href="http://farm4.static.flickr.com/3150/2538167224_0a6075dd18_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #4</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>

                <a class="thumb" href="http://farm4.static.flickr.com/3204/2537348699_bfd38bd9fd.jpg" title="Title #5">
                  <img src="http://farm4.static.flickr.com/3204/2537348699_bfd38bd9fd_s.jpg" alt="Title #5" />
                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3204/2537348699_bfd38bd9fd_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #5</div>

                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm4.static.flickr.com/3124/2538164582_b9d18f9d1b.jpg" title="Title #6">
                  <img src="http://farm4.static.flickr.com/3124/2538164582_b9d18f9d1b_s.jpg" alt="Title #6" />
                </a>
                <div class="caption">

                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3124/2538164582_b9d18f9d1b_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #6</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm4.static.flickr.com/3205/2538164270_4369bbdd23.jpg" title="Title #7">
                  <img src="http://farm4.static.flickr.com/3205/2538164270_4369bbdd23_s.jpg" alt="Title #7" />
                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3205/2538164270_c7d1646ecf_o.jpg">Download Original</a>
                  </div>

                  <div class="image-title">Title #7</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm4.static.flickr.com/3211/2538163540_c2026243d2.jpg" title="Title #8">
                  <img src="http://farm4.static.flickr.com/3211/2538163540_c2026243d2_s.jpg" alt="Title #8" />

                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm4.static.flickr.com/3211/2538163540_c2026243d2_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #8</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>

                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm3.static.flickr.com/2315/2537343449_f933be8036.jpg" title="Title #9">
                  <img src="http://farm3.static.flickr.com/2315/2537343449_f933be8036_s.jpg" alt="Title #9" />
                </a>
                <div class="caption">
                  <div class="download">

                    <a href="http://farm3.static.flickr.com/2315/2537343449_f933be8036_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #9</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>

                <a class="thumb" href="http://farm3.static.flickr.com/2167/2082738157_436d1eb280.jpg" title="Title #10">
                  <img src="http://farm3.static.flickr.com/2167/2082738157_436d1eb280_s.jpg" alt="Title #10" />
                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm3.static.flickr.com/2167/2082738157_436d1eb280_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #10</div>

                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm3.static.flickr.com/2342/2083508720_fa906f685e.jpg" title="Title #11">
                  <img src="http://farm3.static.flickr.com/2342/2083508720_fa906f685e_s.jpg" alt="Title #11" />
                </a>
                <div class="caption">

                  <div class="download">
                    <a href="http://farm3.static.flickr.com/2342/2083508720_fa906f685e_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #11</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm3.static.flickr.com/2132/2082721339_4b06f6abba.jpg" title="Title #12">
                  <img src="http://farm3.static.flickr.com/2132/2082721339_4b06f6abba_s.jpg" alt="Title #12" />
                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm3.static.flickr.com/2132/2082721339_4b06f6abba_b.jpg">Download Original</a>
                  </div>

                  <div class="image-title">Title #12</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm3.static.flickr.com/2139/2083503622_5b17f16a60.jpg" title="Title #13">
                  <img src="http://farm3.static.flickr.com/2139/2083503622_5b17f16a60_s.jpg" alt="Title #13" />

                </a>
                <div class="caption">
                  <div class="download">
                    <a href="http://farm3.static.flickr.com/2139/2083503622_5b17f16a60_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #13</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>

                </div>
              </li>

              <li>
                <a class="thumb" href="http://farm3.static.flickr.com/2041/2083498578_114e117aab.jpg" title="Title #14">
                  <img src="http://farm3.static.flickr.com/2041/2083498578_114e117aab_s.jpg" alt="Title #14" />
                </a>
                <div class="caption">
                  <div class="download">

                    <a href="http://farm3.static.flickr.com/2041/2083498578_114e117aab_b.jpg">Download Original</a>
                  </div>
                  <div class="image-title">Title #14</div>
                  <div class="image-desc">Description</div>
                  <div class="wgt-clear" >&nbsp;</div>
                </div>
              </li>


            </ul>
          </div>

          <!-- Start Advanced Gallery Html Containers -->
          <div id="gallery" class="content">
            <div id="controls" class="controls"></div>
            <div class="slideshow-container">
              <div id="loading" class="loader"></div>
              <div id="slideshow" class="slideshow"></div>
            </div>

            <div id="caption" class="caption-container"></div>
            
            <div class="wgt-clear" >&nbsp;</div>
          </div>
          
          <div class="wgt-clear" >&nbsp;</div>

          </div>
        </div>
        </fieldset>

    </div>

    <div id="video_panel" class="panel">
      <fieldset>
        <legend>{#wgt_mediatheke_dlg.videos}</legend>
      </fieldset>
    </div>

    <div id="documents_panel" class="panel">
      <fieldset>
        <legend>{#wgt_mediatheke_dlg.documents}</legend>
      </fieldset>
    </div>
  </div>
    
  <div class="mceActionPanel">
    <input type="button" id="insert" name="insert" value="{#insert}" onclick="WgtMediathekeDialog.insert();" />
    <input type="button" id="cancel" name="cancel" value="{#cancel}" onclick="tinyMCEPopup.close();" />
  </div>
  
</form>

</body>
</html>
