<?php
/*******************************************************************************
*
* @author      : Dominik Bonsch <dominik.bonsch@webfrap.net>
* @date        :
* @copyright   : Webfrap Developer Network <contact@webfrap.net>
* @project     : Webfrap Web Frame Application
* @projectUrl  : http://webfrap.net
*
* @licence     : BSD License see: LICENCE/BSD Licence.txt
* 
* @version: @package_version@  Revision: @package_revision@
*
* Changes:
*
*******************************************************************************/

define( 'TPL_START', '<?php echo' );
define( 'TPL_END',   '?>'  );
define( 'NL',   "\n"  );

define( 'WEB_ICONS',   '../icons/'  );
define( 'WEB_THEME',   '../themes/default/'  );


$theme  = isset($_GET['theme'])?$_GET['theme']:'default';
$css    = isset($_GET['css'])?$_GET['css']:'default';
$js     = isset($_GET['js'])?$_GET['js']:'default';

$file   = isset($_GET['page'])
  ? str_replace( '.','/',$_GET['page'] )
  : 'the_index';

$pathIcon = '../icons/default/';

include "functions.php";

include "gw/src/Wgt.php";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>WGT Example</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="content-Script-Type" content="text/javascript" />
<meta http-equiv="content-Style-Type" content="text/css" />
<meta http-equiv="content-language" content="de" />
<link type="text/css" href="./gw/css.php?list=default" rel="stylesheet" />
<link type="text/css" href="./gw/theme.php?list=default" rel="stylesheet" />
<script type="text/javascript" src="./gw/js.php?list=default" ></script>
<script type="text/javascript" src="../js_src/vendor/tiny_mce/jquery.tinymce.js" ></script>
<script type="text/javascript" src="../js_src/vendor/tiny_mce/tiny_mce.js" ></script>

</head>
<body>

  <div class="wgt-panel title" >
    <h2><a href="display.php" >WGT Dokumentation</a></h2>
  </div>
<?php

if( file_exists('./'.$file.'.php') )
  include './'.$file.'.php';
else
  include './not_exists.php';

?>
  
  <div id="window_container" style="position:absolute;left:0;top:0;width:1px;height:1px;z-index:12;"></div>
  <div id="wgt_progress_bar" style="display:none;position:absolute;left:50%;top:400px;" >
    <?php echo Wgt::image('wgt/loader.gif',array('alt'=>'progress'),true); ?>
  </div>

  <div class="box_template wgt-editlayer" contenteditable="true" id="wgt-edit-field-text" ></div>
  <div class="box_template wgt-editlayer" contenteditable="true" id="wgt-edit-field-number" ></div>
  <div class="box_template wgt-editlayer" contenteditable="true" id="wgt-edit-field-select" ></div>
  <div class="box_template wgt-editlayer" contenteditable="true" id="wgt-edit-field-check" ></div>
  <div class="box_template wgt-editlayer" contenteditable="true" id="wgt-edit-field-date" ><input type="text" class="wcm wcm_ui_date" style="border:0px;width:100%;margin:0px;padding:0px;" /></div>
  
  <div id="wgt_template_container" style="display:none;" class="meta" >
  
    <div id="wgtTemplateDialog" >
      <div title="{$title}" >
        <p>{$message}</p>
      </div>
    </div>
  
    <div id="dialogTemplate" class="template window ui-corner-all" >
      <div class="content"></div>
      <div class="wgt-container-buttons"><button class="standard template"></button></div>
      <button class="close" title="Close Window">X</button>
      <div class="wgt-window-layer inactive"></div>
    </div>
  
    <div id="wgt_template_tab_container"  >
      <div class="wgt-container-controls">
        <div class="wgt-container-buttons"></div>
        <div class="tab_outer_container">
          <img class="tab_left" src="<?php echo WEB_THEME?>images/wgt/tab_back.png" />
          <div class="tab_scroll" >
            <div class="tab_container" >&nbsp;</div>
          </div>
          <img class="tab_right" src="<?php echo WEB_THEME?>images/wgt/tab_forward.png" />
        </div>
      </div>
    </div>
  
    <div id="wgt_template_tab_head" >
      <span class="tab ui-corner-top" >
        <span class="label" ><a></a></span>
      </span>
    </div>
  
    <!--
    <div id="wgt_template_tab_head" >
      <span class="tab" >
        <span>&nbsp;</span>
        <span class="label" ><a></a></span>
      </span>
    </div>
    -->
  
    <div id="wgtidFileUpload" class="meta" >
      <iframe id="wgtidFrameUpload" name="fileUpload" ></iframe>
    </div>
  <!--
    <img src="<?php echo WEB_THEME ?>images/wgt/clipboard.png" class="meta" id="clipboardIcon"/>
  -->
  
  <script type="text/html" id="categorytemplate">
  <li id="<?php echo TPL_START  ?> id <?php echo TPL_END ?>" class="selectcategory"><button><?php echo TPL_START  ?> title <?php echo TPL_END ?> (<?php echo TPL_START  ?> amount <?php echo TPL_END ?>)</button></li>
  </script>
  
  
  <script type="text/html" id="widgettemplate">
  <div class="ui-widget ui-corner-all ui-widget-content widget" id="<?php echo TPL_START  ?> id <?php echo TPL_END ?>" title="<?php echo TPL_START  ?> title <?php echo TPL_END ?>">
    <div class="ui-widget-header ui-corner-all widgetheader">
      <span class="widgettitle"><?php echo TPL_START  ?> title <?php echo TPL_END ?></span>
      <span class="right icons hidden">
        <span class="ui-icon ui-icon-newwin widgetopenfullscreen"></span>
        <span class="ui-icon ui-icon-arrowthickstop-1-s menutrigger"></span>
        <span class="hiddenmenu">
          <ul style="top: 13px;" class="hidden controls ui-widget-header">
            <li class="widgetClose">
              <span class="ui-icon ui-icon-minus"></span>
              <a class="minimization" href="#">Minimize</a>
            </li>
            <li class="widgetOpen">
              <span class="ui-icon ui-icon-extlink"></span>
              <a class="minimization" href="#">Maximize</a>
            </li>
            <li class="widgetDelete">
              <span class="ui-icon ui-icon-close"></span>
              <a class="delete" href="#">Delete</a>
            </li>
            <!-- This could be implemented -->
            <!--
            <li class="widgetEdit">
              <span class="ui-icon ui-icon-tag"></span>
              <a class="no_target" href="#">Edit</a>
            </li>
            -->
            <li class="widgetRefresh">
              <span class="ui-icon ui-icon-arrowrefresh-1-w"></span>
              <a class="no_target" href="#">Refresh</a>
            </li>
          </ul>
        </span>
      </span>
    </div>
    <div class="widgetcontent">
    </div>
  </div>
  </script>
  
  <script type="text/html" id="selectlayouttemplate">
  <li class="layoutchoice" id="<?php echo TPL_START  ?> id <?php echo TPL_END ?>" style="background-image: url('<?php echo TPL_START  ?> image <?php echo TPL_END ?>')"></li>
  </script>
  
  <script type="text/html" id="addwidgettemplate">

  <li class="widgetitem">
    <img src="<?php echo TPL_START  ?> image <?php echo TPL_END ?>" alt="" height="60" width="120">
    <div class="add-button">
        <input class="macro-button-add addwidget" id="addwidget<?php echo TPL_START  ?> id <?php echo TPL_END ?>" value="Add it Now" type="button"><br>
        <input class="macro-hidden-uri" value="<?php echo TPL_START  ?> url <?php echo TPL_END ?>" type="hidden">
    </div>
    <!-- // .add-button -->
    <h3><a href=""><?php echo TPL_START  ?> title <?php echo TPL_END ?></a></h3>

    <p>By <?php echo TPL_START  ?> creator <?php echo TPL_END ?></p>
    <p><?php echo TPL_START  ?> description <?php echo TPL_END ?></p>
  </li>

  </script>
  
  <div class="dialog" id="addwidgetdialog" title="Widget Directory">
    <ul class="categories">
    </ul>
  
    <div class="panel-body">
      <ol id="category-all" class="widgets">
      </ol>
    </div>
  </div>
  
  
  <div class="dialog" id="editLayout" title="Edit layout">
    <div class="panel-body" id="layout-dialog">
        <p><strong>Choose dashboard layout</strong></p>
        <ul class="layoutselection">
        </ul>
    </div>
  </div>
  
  
  </div>
  
  <div id="wgt_data_container" class="meta" ></div>
  <div id="wgt_tmp_container" class="meta" ></div>

</body>
</html>
