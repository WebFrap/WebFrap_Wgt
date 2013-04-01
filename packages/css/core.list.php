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

  PATH_WGT.'layout/wgt/font_awesome/font-awesome.css',

  // wgt css framework
  PATH_WGT.'layout/wgt/wgt/wgt.core.css',
  PATH_WGT.'layout/wgt/wgt/wgt.boxes.css',
  PATH_WGT.'layout/wgt/wgt/wgt.blocklist.css',
  PATH_WGT.'layout/wgt/wgt/wgt.dropform.css',
  PATH_WGT.'layout/wgt/wgt/wgt.footer.css',
  PATH_WGT.'layout/wgt/wgt/wgt.controls.css',
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
  PATH_WGT.'layout/wgt/wgt/wgt.tree.css',
  PATH_WGT.'layout/wgt/wgt/wgt.text.css',
  PATH_WGT.'layout/wgt/wgt/wgt.search.css',
  PATH_WGT.'layout/wgt/wgt/wgt.elements.css',

  // layouts
  PATH_WGT.'layout/wgt/wgt/layout/wgt.layout.grid.css',
  PATH_WGT.'layout/wgt/wgt/layout/wgt.layout.list.css',
  PATH_WGT.'layout/wgt/wgt/layout/wgt.layout.block.css',

  // wgt ui classes
  PATH_WGT.'layout/wgt/wgt/wgt.ui.css',
  PATH_WGT.'layout/wgt/wgt/wgt.ui.message-pipe.css',
  PATH_WGT.'layout/wgt/wgt/wgt.ui.tip.css',

  PATH_WGT.'layout/wgt/wgt/editor/wgt.editor.core.css',

  // selectboxes
  PATH_WGT.'layout/wgt/wgt/select/wgt.select.priority.css',
  PATH_WGT.'layout/wgt/wgt/lists/wgt.lists.access.css',

  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.core.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.accordion.css',
  PATH_WGT.'layout/wgt/jquery_ui/jquery.ui.datepicker.css',

  // wgt widgets
  PATH_WGT.'layout/wgt/wgt/widget/wgt.widget.dropbox.css',

  // jquery plugins
  PATH_WGT.'layout/wgt/jquery/jquery.colorpicker.css',
  PATH_WGT.'layout/wgt/jquery/jquery.fullcalendar.css',
  PATH_WGT.'layout/wgt/jquery/jquery.toaster.css',
  PATH_WGT.'layout/wgt/jquery/jquery.dynatree.css',
  PATH_WGT.'layout/wgt/jquery/jquery.tooltip.css',
  PATH_WGT.'layout/wgt/jquery/jquery.treeTable.css',
  PATH_WGT.'layout/wgt/jquery/jquery.modal.css',
  PATH_WGT.'layout/wgt/jquery/jquery.star_rating.css',
  PATH_WGT.'layout/wgt/jquery/jquery.mega_menu.css',
  PATH_WGT.'layout/wgt/jquery/jquery.ui.datetimepicker.css',
  PATH_WGT.'layout/wgt/jquery/jquery.multiselect.css',
  PATH_WGT.'layout/wgt/wgt/status/wgt.status.core.css',
  

);

foreach($files as $file)
{
  include $file;
  echo NL;
}
