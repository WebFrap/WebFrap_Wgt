<h2>Shop Frontend Startseite Multiteaser</h2>

<style type="text/css" >

.teaserbox { width:722px; height:auto; border:1px solid silver; padding:1px }
.teaserbox ul { width:722px; height:35px}
.teaserbox ul li { float:left;padding-top:8px; }
.teaserbox ul li a { border-right:2px solid #444; color:#666; padding: 0px 12px 0px 12px; }
.teaserbox ul li a.last { border:none; }
.teaserbox ul li a:hover { color:silver; }
.teaserbox .start { float:right;margin-top:6px; }

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

</style>

<div class="teaserbox">  
  <span>
    <img width="722" height="191" alt="Ultrabook™ ultraschnell" title="" src="../example/cnt/prototype/img/ultrabooks.jpg">
  </span>
  <ul>
    <li><a href="#">Das neue MacBook Pro</a></li>
    <li><a href="#">Windows 8 Upgrade</a></li>
    <li><a href="#">Samsung Galaxy S3</a></li>
    <li><a class="last" href="#">Ultrabook&trade; ultraschnell</a></li>
    <button class="start orange btnskin" type="submit">
      <i class="icon-upload icon-white"></i>
    </button>
  </ul>
</div>


<script type="text/javascript">

</script>


<!-- Show Code -->

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
