<h2>Mediatheke</h2>

<style type="text/css" >
  html,body {width:100%;height:100%;margin:0;padding:0;}

body {font-family:Arial;font-size:12px;color:#111;}

h1 {font-size:18px;}

ul li {display:inline-block;float:left;}

.mediathek-wrapper {
    width:56%;
    height:auto;
    margin:auto;
    padding:5px;
    margin-top:5px;
    border:1px solid #ccc;
    border-radius:5px 5px 0px 0px;
    background-color:#eee;
}

.mediathek-wrapper .navigation {
    border-bottom:1px solid #ddd;
    padding:10px;
}

.mediathek-wrapper .navigation ul {
    float:right;
}


.mediathek-wrapper .subnavigation {
    border-top:1px solid #fff;
    border-bottom:1px solid #ddd;
    padding:10px;
}

.tabletitle {background-color:#550000;color:#fff;}
.tabletitle td {padding:5px;}

.tablecontent {font-size:13px;}
.tablecontent td {padding:5px;}
.tablecontent td:hover {background-color:#ccc;cursor:move;}

div.subnavigation div.search
{
  position:relative;
  padding-bottom:25px;
}

div.maincontent
{
  padding-bottom:15px;
  border-bottom:1px solid #ddd;
}

div.wgt-gallery 
{
  padding-top:15px;
  border-top:1px solid #fff !important;
}

div.wgt-galleryfooter
{
  padding-top:15px;
  padding-bottom:0px;
  height:35px;
  border-top:1px solid #fff !important;
}

div.wgt-gallery .wgt-endline
{
  height:15px;
  border-bottom:1px solid #ddd;
}


div.wgt-galleryfooter input
{
  height:25px;
}

div.wgt-gallerymenu
{
  position:absolute;
  margin-top:342px;
  margin-left:0px;
  width:320px;
  padding-top:15px;
  border-top:1px solid #fff;
}

div.wgt-gallerymenu ul
{
  float:right;
  padding-right:41px;
}

div.wgt-gallery div.content
{
  margin-left:7%;
}

.mediathek-wrapper .subnavigation {
    border-bottom: 1px solid #DDDDDD;
    border-top: 1px solid #FFFFFF;
    padding: 10px;
}

</style>


<div class="mediathek-wrapper">
    
    <div class="navigation">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td><h1>Mediathek</h1></td>
            </tr>
            <tr>    
                <td><h2 style="float:left">Album:</h2>
                <select name="selection">
                    <option value="Mediathek 1" class="whoo">Mediathek 1</option>
                    <option value="Mediathek 2" class="whoo">Mediathek 2</option>
                    <option value="Mediathek 3"  class="whoo" selected="selected">Mediathek 3</option>
                    <option value="Mediathek 4" class="whoo">Mediathek 4</option>
                    <option value="Mediathek 5" class="whoo">Mediathek 5</option>
                </select>
                </td>
                <td>
                    <ul>
                        <li><button class="wgt-button splitted">Bilder</button></li>
                        <li><button class="wgt-button splitted">Videos</button></li>
                        <li><button class="wgt-button splitted">Dokumente</button></li>
                    </ul>
                </td>
            </tr>
        </table>
    </div>
    
    <div class="subnavigation">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td width="80%"><h2>Bilder</h2></td>
                <td width="20%">
                  <div class="search">
          <input class="wgt-overlay c_input_add embed medium wgt-ignore" />
          <button id="trigger" class="wgt-button append wgt-overlay embed" >
              <img src="../icons/default/xsmall/control/add.png" alt="Add" class="icon xsmall" />
          </button>
          </div>
                </td>
            </tr>
        </table>
    </div>
    
    <div class="maincontent">
        <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tr class="tabletitle">
                <td>Pos</td>
                <td>Bild</td>
                <td>Beschreibung</td>
                <td>Dateiformat</td>
                <td>Größe</td>
                <td>Autor</td>
                <td>Navigation</td>
            </tr>
            <tr class="tablecontent">
                <td>1</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
            </tr>
            <tr class="tablecontent">
                <td>2</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
                <td>Table Cell</td>
            </tr>
        </table>
    </div>
    


<div id="wgt-gallery-example"  class="wcm wcm_ui_gallery wgt-gallery large" >
    
    
     <h2 style="padding-left:12px">Gallery</h2>  
   
    
    <div id="wgt-gallery-example-thumbs" class="navigation">
      <ul class="thumbs">
      
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
          </div>
        </li>
  
        <li>
          <a class="thumb" name="drop" href="http://farm3.static.flickr.com/2404/2538171134_2f77bc00d9.jpg" title="Title #1">
            <img src="http://farm3.static.flickr.com/2404/2538171134_2f77bc00d9_s.jpg" alt="Title #1" />
          </a>
          <div class="caption">
            Any html can be placed here ...
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
          </div>
        </li>
  
        <li>
  
          <a class="thumb" href="http://farm3.static.flickr.com/2149/2082705341_afcdda0663.jpg" title="Title #15">
            <img src="http://farm3.static.flickr.com/2149/2082705341_afcdda0663_s.jpg" alt="Title #15" />
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm3.static.flickr.com/2149/2082705341_afcdda0663_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #15</div>
  
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm3.static.flickr.com/2014/2083478274_26775114dc.jpg" title="Title #16">
            <img src="http://farm3.static.flickr.com/2014/2083478274_26775114dc_s.jpg" alt="Title #16" />
          </a>
          <div class="caption">
  
            <div class="download">
              <a href="http://farm3.static.flickr.com/2014/2083478274_26775114dc_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #16</div>
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm3.static.flickr.com/2194/2083464534_122e849241.jpg" title="Title #17">
            <img src="http://farm3.static.flickr.com/2194/2083464534_122e849241_s.jpg" alt="Title #17" />
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm3.static.flickr.com/2194/2083464534_122e849241_b.jpg">Download Original</a>
            </div>
  
            <div class="image-title">Title #17</div>
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm4.static.flickr.com/3127/2538173236_b704e7622e.jpg" title="Title #18">
            <img src="http://farm4.static.flickr.com/3127/2538173236_b704e7622e_s.jpg" alt="Title #18" />
  
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm4.static.flickr.com/3127/2538173236_b704e7622e_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #18</div>
            <div class="image-desc">Description</div>
  
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm3.static.flickr.com/2375/2538172432_3343a47341.jpg" title="Title #19">
            <img src="http://farm3.static.flickr.com/2375/2538172432_3343a47341_s.jpg" alt="Title #19" />
          </a>
          <div class="caption">
            <div class="download">
  
              <a href="http://farm3.static.flickr.com/2375/2538172432_3343a47341_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #19</div>
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
  
          <a class="thumb" href="http://farm3.static.flickr.com/2353/2083476642_d00372b96f.jpg" title="Title #20">
            <img src="http://farm3.static.flickr.com/2353/2083476642_d00372b96f_s.jpg" alt="Title #20" />
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm3.static.flickr.com/2353/2083476642_d00372b96f_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #20</div>
  
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm3.static.flickr.com/2201/1502907190_7b4a2a0e34.jpg" title="Title #21">
            <img src="http://farm3.static.flickr.com/2201/1502907190_7b4a2a0e34_s.jpg" alt="Title #21" />
          </a>
          <div class="caption">
  
            <div class="download">
              <a href="http://farm3.static.flickr.com/2201/1502907190_7b4a2a0e34_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #21</div>
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm2.static.flickr.com/1116/1380178473_fc640e097a.jpg" title="Title #22">
            <img src="http://farm2.static.flickr.com/1116/1380178473_fc640e097a_s.jpg" alt="Title #22" />
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm2.static.flickr.com/1116/1380178473_fc640e097a_b.jpg">Download Original</a>
            </div>
  
            <div class="image-title">Title #22</div>
            <div class="image-desc">Description</div>
          </div>
        </li>
  
        <li>
          <a class="thumb" href="http://farm2.static.flickr.com/1260/930424599_e75865c0d6.jpg" title="Title #23">
            <img src="http://farm2.static.flickr.com/1260/930424599_e75865c0d6_s.jpg" alt="Title #23" />
  
          </a>
          <div class="caption">
            <div class="download">
              <a href="http://farm2.static.flickr.com/1260/930424599_e75865c0d6_b.jpg">Download Original</a>
            </div>
            <div class="image-title">Title #23</div>
            <div class="image-desc">Description</div>
  
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Start Advanced Gallery Html Containers -->
    <div id="wgt-gallery-example-container" class="content" >
      <div id="wgt-gallery-example-controls" class="controls"></div>
      <div class="slideshow-container">
        <div id="wgt-gallery-example-loading" class="loader"></div>
        <div id="wgt-gallery-example-slideshow" class="slideshow"></div>
      </div>
  
      <div id="wgt-gallery-example-caption" class="caption-container"></div>
    </div>
    
    <div class="wgt-gallerymenu" >
      
      <div>
        <?php echo Wgt::inputBox
        ( 
          'some-id-1', 
          '<h2>&ensp;Title:</h2>',
          array( 
            'input', 
            array(
              'class' => 'medium',
              'name' => 'fubar',
              'value' => 'the value',
            )) 
        ); ?>
      </div>
      
      <ul>
        <li><button class="wgt-button" >Use</button></li>
        <li><button class="wgt-button" >Delete</button></li>
      </ul>
    </div>
    
    <div class="wgt-clear">&nbsp;</div>
    <div class="wgt-endline">&nbsp;</div>
    <div class="wgt-galleryfooter" >
      <label style="padding-left:12px">Add Image:</label>
      <input type="file" class="medium" />
  
      <div  class="right" >
        <button  id="wgt-gallery-example-caption_toggle" class="on wgt-button" title="Hide Caption">Hide Caption</button>
      </div>
    </div>
</div>
  
  
</div>

<?php /*
    <script type="text/javascript">
      jQuery(document).ready(function($) {
        
        // We only want these styles applied when javascript is enabled
        $('div.navigation').css({'width' : '300px', 'float' : 'left'});
        $('div.content').css('display', 'block');

        // Initially set opacity on thumbs and add
        // additional styling for hover effect on thumbs
        var onMouseOutOpacity = 0.67;
        $('#thumbs ul.thumbs li').opacityrollover({
          mouseOutOpacity:   onMouseOutOpacity,
          mouseOverOpacity:  1.0,
          fadeSpeed:         'fast',
          exemptionSelector: '.selected'
        });
        
        // Initialize Advanced Galleriffic Gallery
        var gallery = $('#thumbs').galleriffic({
          delay:                     2500,
          numThumbs:                 15,
          preloadAhead:              10,
          enableTopPager:            true,
          enableBottomPager:         true,
          maxPagesToShow:            7,
          imageContainerSel:         '#slideshow',
          controlsContainerSel:      '#controls',
          captionContainerSel:       '#caption',
          loadingContainerSel:       '#loading',
          renderSSControls:          true,
          renderNavControls:         true,
          playLinkText:              'Play Slideshow',
          pauseLinkText:             'Pause Slideshow',
          prevLinkText:              '&lsaquo; Previous Photo',
          nextLinkText:              'Next Photo &rsaquo;',
          nextPageLinkText:          'Next &rsaquo;',
          prevPageLinkText:          '&lsaquo; Prev',
          enableHistory:             false,
          autoStart:                 false,
          syncTransitions:           true,
          defaultTransitionDuration: 900,
          onSlideChange:             function(prevIndex, nextIndex) {
            // 'this' refers to the gallery, which is an extension of $('#thumbs')
            this.find('ul.thumbs').children()
              .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
              .eq(nextIndex).fadeTo('fast', 1.0);
          },
          onPageTransitionOut:       function(callback) {
            this.fadeTo('fast', 0.0, callback);
          },
          onPageTransitionIn:        function() {
            this.fadeTo('fast', 1.0);
          }
        });
      });
    </script>
*/?>


<script type="text/javascript"  >

  //$S = $;
  $S(function() {
    var pressed = false;
    var start = undefined;
    var startX, startWidth;
    
    $S(".tablecontent td").mousedown(function(e) {
        start = $S(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $S(this).width();
        $S(start).addClass("resizing");
    });
    
    $S(document).mousemove(function(e) {
        if(pressed) {
            $S(start).width(startWidth+(e.pageX-startX));
        }
    });
    
    $S(document).mouseup(function() {
        if(pressed) {
            $S(start).removeClass("resizing");
            pressed = false;
        }
    });
});  
</script>


<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
