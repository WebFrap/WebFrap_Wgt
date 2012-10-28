<h2>Shop Frontend Startseite Tabbox</h2>

<style type="text/css" >

.tabbox { width:722px; height:auto; border:1px solid silver; padding:1px; background-color:#fff; }
.tabbox .tabmenu ul { width:100%; height:auto }
.tabbox .tabmenu ul li { float:left; width:25%; }
.tabbox .tabmenu ul li a {
  display:inline-block;
  width:100%;
  line-height:35px;
  border:1px solid silver; background: #666 url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top;
}
.tabbox .tabmenu ul li a.active {  border-bottom:1px solid #fff; background:none; }
.tabbox .tabmenu ul li a:hover { background-image:none; }
.tabbox .tabmenu ul li a span {  display:block; width:100%; text-align:center;}

.tabbox .tabcontent ul { width:100%; height:300px;padding:30px; }
.tabbox .tabcontent ul li { width:220px; float:left; }
.tabbox .tabcontent ul li img { margin-top:30px; margin-bottom:15px; }
.tabbox .tabcontent ul li span { width:200px; display:block; }

/* colors */
.orange { border:1px solid #ff6600; background: #ff8800 url('../example/cnt/prototype/img/btngrad_bg.png') repeat-x center top; }

/* skin */
.btnskin { margin:0 3px 0px 3px;padding: 1px 3px 1px 3px; border-radius: 5px; color: white; text-shadow: 0 1px 1px #222; }
.btnskin:hover { cursor:pointer; background-image:none; text-shadow: 0 1px 1px #444; }

/* icons */
.icon-upload { background-position: -144px -24px; }
.icon-white {
  display: inline-block;
    height: 14px;
    line-height: 14px;
    vertical-align: text-top;
    width: 14px;
  background-image: url('../example/cnt/prototype/img/halflings_white.png');
}

/* position */
.left { float:left; margin-left:-15px; margin-top:150px; }
.right { float:right; margin-right:-15px; margin-top:150px; }

</style>

<div class="tabbox">
  <div class="tabmenu">
    <ul>
      <li><a class="active" href="#"><span>button</span></a></li>
      <li><a href="#"><span>button</span></a></li>
      <li><a href="#"><span>button</span></a></li>
      <li><a href="#"><span>button</span></a></li>
    </ul>
    <button class="left orange btnskin" type="#">
      <i class="icon-upload icon-white"></i>
    </button>
    <button class="right orange btnskin" type="#">
      <i class="icon-upload icon-white"></i>
    </button>
  </div>
  <div class="tabcontent">
    <ul>
      <li>
        <img src="../example/cnt/prototype/img/120.JPG" widt="120px" height="120px" />
        <span>Dieses Bild ist genauso scheiße wie elemente aus der Luft zu bauen!</span>
      </li>
      <li>
        <img src="../example/cnt/prototype/img/120.JPG" widt="120px" height="120px" />
        <span>Dieses Bild ist genauso scheiße wie elemente aus der Luft zu bauen!</span>
      </li>
      <li>
        <img src="../example/cnt/prototype/img/120.JPG" widt="120px" height="120px" />
        <span>Dieses Bild ist genauso scheiße wie elemente aus der Luft zu bauen!</span>
      </li>
    </ul>
  </div>
</div>


<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
