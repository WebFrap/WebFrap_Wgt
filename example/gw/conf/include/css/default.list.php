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

echo '@charset "utf-8";'.NL;

$files = array
(

  // wgt css framework
  PATH_WGT.'layout/wgt/wgt/wgt.core.css',
  PATH_WGT.'layout/wgt/wgt/wgt.boxes.css',
  PATH_WGT.'layout/wgt/wgt/wgt.blocklist.css',
  PATH_WGT.'layout/wgt/wgt/wgt.dropform.css',
  PATH_WGT.'layout/wgt/wgt/wgt.footer.css',
  PATH_WGT.'layout/wgt/wgt/wgt.form.css',
  PATH_WGT.'layout/wgt/wgt/wgt.grid.css',
  PATH_WGT.'layout/wgt/wgt/wgt.list.css',
  PATH_WGT.'layout/wgt/wgt/wgt.menu.css',
  PATH_WGT.'layout/wgt/wgt/wgt.menuselector.css',
  PATH_WGT.'layout/wgt/wgt/wgt.panel.css',
  PATH_WGT.'layout/wgt/wgt/wgt.process_form.css',
  PATH_WGT.'layout/wgt/wgt/wgt.tab.css',
  PATH_WGT.'layout/wgt/wgt/wgt.tab_head.css',
  PATH_WGT.'layout/wgt/wgt/wgt.table.css',
  PATH_WGT.'layout/wgt/wgt/wgt.text.css',
  PATH_WGT.'layout/wgt/wgt/wgt.tree.css',
  PATH_WGT.'layout/wgt/wgt/wgt.window.css',
  PATH_WGT.'layout/wgt/wgt/wgt.icons.css',
  //PATH_WGT.'layout/wgt/wgt/wgt.dropform.css',

  
  PATH_WGT.'layout/wgt/wgt/editor/wgt.editor.core.css',
  

  // wgt ui plugins
  PATH_WGT.'layout/wgt/wgt/wgt.ui.tip.css',
  PATH_WGT.'layout/wgt/wgt/wgt.menuselector.css',
  PATH_WGT.'layout/wgt/wgt/wgt.ui.dbl_list_selector.css',
  
  // wgt widgets
  PATH_WGT.'layout/wgt/wgt/widget/wgt.widget.dropbox.css',

  // wgt ui classes
  PATH_WGT.'layout/wgt/wgt/wgt.ui.css',
  PATH_WGT.'layout/wgt/wgt/wgt.ui.tip.css',

  // jquery ui classes
  PATH_WGT.'layout/wgt/jquery.ui/jquery.ui.slider.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.core.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.accordion.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.button.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.progressbar.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.selectable.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.dialog.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.resizable.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.slider.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.tabs.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.datepicker.css',
  //PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.menu.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.autocomplete.css',

  // jquery plugins
  PATH_WGT.'layout/wgt/jquery/jquery.dynatree.css',
  PATH_WGT.'layout/wgt/jquery/jquery.ganttView.css',
  PATH_WGT.'layout/wgt/jquery/jquery.fullcalendar.css',
  PATH_WGT.'layout/wgt/jquery/jquery.galleriffic.css',
  PATH_WGT.'layout/wgt/jquery/jquery.context_menu.css',
  PATH_WGT.'layout/wgt/jquery/jquery.modal.css',
  PATH_WGT.'layout/wgt/jquery/jquery.star_rating.css',
  PATH_WGT.'layout/wgt/jquery/jquery.colorpicker.css',
  PATH_WGT.'layout/wgt/jquery/jquery.mega_menu.css',
  PATH_WGT.'layout/wgt/jquery/jquery.vert_mega_menu.css',
  PATH_WGT.'layout/wgt/jquery/jquery.ui.datetimepicker.css',
  
  //PATH_WGT.'layout/wgt/jquery/jquery.loginslider.css',

);

if( DEBUG )
  $files[] = PATH_WGT.'layout/wgt/wgt/wgt.developer.css';

foreach( $files as $file )
{
  include $file;
  echo NL;
}