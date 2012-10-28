<h2>DropDownMenü</h2>

<style type="text/css" >
  html, body { padding:0; margin:0; width:100%; height:100%; }

body { font-family:Arial; font-size:14px; }

a { text-decoration:none; text-transform:uppercase; }

#dropdownbox {
    width:200px;
    height:auto;
    background-color:#eee;
    border:1px solid #ccc;
}

#dropdownbox .deeplink {
    background: transparent url('http://www.silberschwingen.de/signaturen/blackarrow.gif') no-repeat right center;
}

#dropdownbox ul {
    border-top:1px solid #ddd;
    margin-left:30px;
    border-left:1px solid #ddd;
    padding-top:3px;
    padding-bottom:3px;
}

#dropdownbox ul li a img {
    position:absolute;
    margin-left:-30px;
    
}

#dropdownbox ul li a {
    display:block;
    padding:4px;
    padding-left:6px;
    color:#222;
}

#dropdownbox ul li a:hover {
    background-color:#ee9;
    border:1px solid #ddf;
    margin-left:-29px;
    margin-right:2px;
    padding:3px;
    padding-left:30px;
    text-indent:4px;
    border-radius:4px;
}

#dropdownbox ul li a span {
  position:absolute;
  width:180px;
  margin-left:140px;
  margin-top:-20px;
    display:none;
}

#dropdownbox ul li a span ul {
  background-color:#eee;
    border:1px solid #ccc;
    padding-left:30px;
}

#dropdownbox ul li a span ul li {
  padding:4px;
    padding-left:6px;
    color:#222;
    border-left:1px solid #ddd;
}

#dropdownbox ul li a span ul li:hover {
    background-color:#ee9;
    cursor:pointer;
    margin-left:-30px;
    padding-left:36px;
} 

#dropdownbox ul li a:hover span{
    display:block;
}
</style>

<div id="dropdownbox">
    <ul class="firstrow">
        <li><a href="#">
            <img src="http://www.silberschwingen.de/wp-content/themes/sswp/bildmaterial/blackwing.png"
                 width="18"
                 height="18"/>
                 Linktest
            </a>
        </li>
        <li><a href="#">
            <img src="http://www.silberschwingen.de/wp-content/themes/sswp/bildmaterial/whitewing.png"
                 width="18"
                 height="18"/>
                 Linktest
            </a>
        </li>
    </ul>
    <ul class="secondrow">
        <li><a href="#">Linktest</a></li>
        <li><a href="#">Linktest</a></li>
        <li><a class="deeplink" href="#">Linktest<span><ul><li>linknumber1</li><li><img src="http://www.silberschwingen.de/wp-content/themes/sswp/bildmaterial/blackwing.png"
                 width="18"
                 height="18"/>linknumber2</li><li>linknumber3</li></ul></span></a></li>
        <li><a href="#">Linktest</a></li>
    </ul>
    <ul class="thirddrow">
        <li><a href="#">Linktest</a></li>
        <li><a href="#">Linktest</a></li>
        <li><a href="#">Linktest</a></li>
    </ul>
</div>

<div class="wgt-box full wgt-scroll-y heigh-large" style="margin-top:200px;" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>
