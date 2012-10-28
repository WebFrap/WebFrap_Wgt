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

$jsconf = PATH_GW.'js_conf/conf.js';

$files = array
(
  // extend javascript
  PATH_WGT.'js_src/ext/ext.js.js',

  PATH_WGT.'js_src/vendor/jquery/jquery.js',
  //PATH_WGT.'js_src/vendor/jquerypp/jquerypp.js',
  PATH_WGT.'js_src/ext/ext.jquery.js',

  PATH_WGT.'js_src/Wgt.js',

  // add i18n data
  PATH_WGT.'js_src/wgt/I18n.js',
  PATH_WGT.'js_src/i18n/i18n.de.js',

  // add thirdparty jquery plugins
  PATH_WGT.'js_src/vendor/jquery.sizes/jquery.sizes.js',
  PATH_WGT.'js_src/vendor/jquery.toaster/jquery.toaster.js',
  PATH_WGT.'js_src/vendor/jquery.monthpicker/jquery.monthpicker.js',
  //PATH_WGT.'js_src/vendor/jquery.treetable/jquery.treeTable.js',
  PATH_WGT.'js_src/vendor/jquery.appear/jquery.appear.js',
  PATH_WGT.'js_src/vendor/jquery.fullcalendar/jquery.fullcalendar.js',
  PATH_WGT.'js_src/vendor/jquery.jsplumb/jquery.jsPlumb.js',
  PATH_WGT.'js_src/vendor/jquery.mousewheel/jquery.mousewheel.js',
  PATH_WGT.'js_src/vendor/jquery.modal/jquery.modal.js',
  PATH_WGT.'js_src/vendor/jquery.star_rating/jquery.star_rating.js',
  PATH_WGT.'js_src/vendor/jquery.colorpicker/jquery.colorpicker.js',
  PATH_WGT.'js_src/vendor/jquery.loginslider/jquery.loginslider.js',
  
  // context menu
  PATH_WGT.'js_src/vendor/jquery.context_menu/jquery.context_menu.js',
  
  // context menu
  PATH_WGT.'js_src/vendor/jquery.hoverIntent/jquery.hoverIntent.js',
  PATH_WGT.'js_src/vendor/jquery.mega_menu/jquery.mega_menu.js',
  PATH_WGT.'js_src/vendor/jquery.vert_mega_menu/jquery.vert_mega_menu.js',
  
  // upload plugin
  //PATH_WGT.'js_src/vendor/jquery.upload/jquery.iframe-transport.js',
  //PATH_WGT.'js_src/vendor/jquery.upload/jquery.fileupload.js',
  
  
  // gallerific related plugins
  PATH_WGT.'js_src/vendor/jquery.history/jquery.history.js',
  PATH_WGT.'js_src/vendor/jquery.opacityrollover/jquery.opacityrollover.js',
  PATH_WGT.'js_src/vendor/jquery.galleriffic/jquery.galleriffic.js',
  
  // wysiwyg
  //PATH_WGT.'js_src/vendor/tiny_mce/jquery.tinymce.js',

  // add jquery ui components
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.core.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.widget.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.mouse.js',

  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.draggable.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.droppable.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.resizable.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.position.js',

  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.selectable.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.sortable.js',

  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.button.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.dialog.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.progressbar.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.datepicker.js',

  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.accordion.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.autocomplete.js',
  PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.slider.js',
  //PATH_WGT.'js_src/vendor/jquery.ui/jquery.ui.menu.js',

  // add wgt jquery plugins
  PATH_WGT.'js_src/wgt/jquery/Menuselector.js',
  PATH_WGT.'js_src/wgt/jquery/Ajaxfileupload.js',  
  PATH_WGT.'js_src/wgt/jquery/form/SelectboxFilter.js',  
  PATH_WGT.'js_src/wgt/jquery/form/SelectboxFiltered.js',  

  // post plugins 
  PATH_WGT.'js_src/vendor/jquery.timepicker/jquery.timepicker.js',
  PATH_WGT.'js_src/vendor/jquery.dynatree/jquery.dynatree.js',
  PATH_WGT.'js_src/vendor/jquery.ui.datetimepicker/jquery.ui.datetimepicker.js',

  // add wgt core
  PATH_WGT.'js_src/wgt/jquery/ui/WgtTip.js',
    
  // add wgt widget
  PATH_WGT.'js_src/wgt/widget/TreeTable.js',
  PATH_WGT.'js_src/wgt/widget/Grid.js',
  PATH_WGT.'js_src/wgt/widget/ContentMap.js',
  PATH_WGT.'js_src/wgt/widget/ProcessEditor.js',
  PATH_WGT.'js_src/wgt/widget/TagCloud.js',
  PATH_WGT.'js_src/wgt/widget/ContentContainer.js',
  PATH_WGT.'js_src/wgt/widget/Dropmenu.js',
  PATH_WGT.'js_src/wgt/widget/TabHead.js',
  PATH_WGT.'js_src/wgt/widget/WindowSelection.js',
  PATH_WGT.'js_src/wgt/widget/ComboBox.js',
  PATH_WGT.'js_src/wgt/widget/DblListSelector.js',


  // add wgt core
  PATH_WGT.'js_src/wgt/Request.js',

  PATH_WGT.'js_src/wgt/request/Handler.js',
  PATH_WGT.'js_src/wgt/request/handler/HandlerTab.js',
  PATH_WGT.'js_src/wgt/request/handler/HandlerArea.js',
  PATH_WGT.'js_src/wgt/request/handler/HandlerModal.js',
  
  // wcm actions
  PATH_WGT.'js_src/wgt/wcm/action/Ajax.js',
  PATH_WGT.'js_src/wgt/wcm/action/Conf.js',
  PATH_WGT.'js_src/wgt/wcm/action/Del.js',
  PATH_WGT.'js_src/wgt/wcm/action/Mainwin.js',
  PATH_WGT.'js_src/wgt/wcm/action/PageSize.js',
  PATH_WGT.'js_src/wgt/wcm/action/Page.js',
  PATH_WGT.'js_src/wgt/wcm/action/Mtab.js',
  PATH_WGT.'js_src/wgt/wcm/action/Win.js',
  PATH_WGT.'js_src/wgt/wcm/action/Search.js',
  PATH_WGT.'js_src/wgt/wcm/action/Appear.js',
  
  // controls
  PATH_WGT.'js_src/wgt/wcm/control/ContextMenu.js',
  PATH_WGT.'js_src/wgt/wcm/control/Buttonset.js',
  PATH_WGT.'js_src/wgt/wcm/control/Button.js',
  PATH_WGT.'js_src/wgt/wcm/control/Confirm.js',
  PATH_WGT.'js_src/wgt/wcm/control/CheckButton.js',
  PATH_WGT.'js_src/wgt/wcm/control/Minidrop.js',
  PATH_WGT.'js_src/wgt/wcm/control/SplitButton.js',
  PATH_WGT.'js_src/wgt/wcm/control/Dropmenu.js',
  PATH_WGT.'js_src/wgt/wcm/control/WindowSelection.js',
  
  
  // wcm ui
  PATH_WGT.'js_src/wgt/wcm/ui/Autocomplete.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Accordion.js',
  PATH_WGT.'js_src/wgt/wcm/ui/AccordionTab.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Button.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Buttonset.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Calendar.js',
  PATH_WGT.'js_src/wgt/wcm/ui/ColorCode.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Console.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Combobox.js',
  PATH_WGT.'js_src/wgt/wcm/ui/DblListSelector.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Date.js',
  PATH_WGT.'js_src/wgt/wcm/ui/DateTimepicker.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Dialog.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Footer.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Gallery.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Grid.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Highlight.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Info.js',
  PATH_WGT.'js_src/wgt/wcm/ui/LinkInfo.js',
  PATH_WGT.'js_src/wgt/wcm/ui/MenuTable.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Month.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Progress.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Tab.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Table.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Modal.js',
  //PATH_WGT.'js_src/wgt/wcm/ui/TreeTable.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Tree.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Tooltip.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Timepicker.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Tip.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Dropform.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Processform.js',
  PATH_WGT.'js_src/wgt/wcm/ui/SelectboxFilter.js',
  PATH_WGT.'js_src/wgt/wcm/ui/DblListSelector.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Wysiwyg.js',
  PATH_WGT.'js_src/wgt/wcm/ui/Window.js',
  PATH_WGT.'js_src/wgt/wcm/ui/StarRating.js',
  PATH_WGT.'js_src/wgt/wcm/ui/ColorPicker.js',
  PATH_WGT.'js_src/wgt/wcm/ui/MegaMenu.js',
  PATH_WGT.'js_src/wgt/wcm/ui/VertMegaMenu.js',
    
  //widget
  PATH_WGT.'js_src/wgt/wcm/widget/TreeTable.js',
  PATH_WGT.'js_src/wgt/wcm/widget/Selectbox.js',
  PATH_WGT.'js_src/wgt/wcm/widget/Grid.js',
  PATH_WGT.'js_src/wgt/wcm/widget/ProcessEditor.js',
  PATH_WGT.'js_src/wgt/wcm/widget/TagCloud.js',
  PATH_WGT.'js_src/wgt/wcm/widget/Contextmenu.js',

  // features
  PATH_WGT.'js_src/wgt/wcm/feature/Sortable.js',
  PATH_WGT.'js_src/wgt/wcm/feature/Moveable.js',

  // charts
  PATH_WGT.'js_src/wgt/wcm/chart/Area.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Pie.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Hbar.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Bar.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Rgraph.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Hypertree.js',
  PATH_WGT.'js_src/wgt/wcm/chart/Spacetree.js',
  PATH_WGT.'js_src/wgt/wcm/chart/ForceDirected.js',

  PATH_WGT.'js_src/wgt/Desktop.js',
  PATH_WGT.'js_src/wgt/desktop/Message.js',
  PATH_WGT.'js_src/wgt/desktop/Workarea.js',

  // add ui
  PATH_WGT.'js_src/wgt/Ui.js',
  //PATH_WGT.'js_src/wgt/ui/ActivInput.js',
  //PATH_WGT.'js_src/wgt/ui/Table.js',
  PATH_WGT.'js_src/wgt/ui/Tab.js',
  PATH_WGT.'js_src/wgt/ui/Form.js',
  PATH_WGT.'js_src/wgt/ui/Graph.js',
  PATH_WGT.'js_src/wgt/ui/Footer.js',
  PATH_WGT.'js_src/wgt/ui/Calendar.js',
  
  // mini Menu
  PATH_WGT.'js_src/wgt/jquery/MiniMenu.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/ActivInput.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Callback.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Checklist.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/ColorPicker.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Dom.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/DivColor.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Html.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/ListItem.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Reload.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Sep.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Sortbox.js',
  PATH_WGT.'js_src/wgt/jquery/minimenu/Url.js',


  // vendor libraries
  //PATH_WGT.'js_src/vendor/jit/jit.js',
  //PATH_WGT.'js_src/vendor/excanvas/excanvas.js',

  // add init components
  PATH_WGT.'js_src/wgt/wgt/init/Request.js',
  PATH_WGT.'js_src/wgt/wgt/init/Windowtabs.js',

);

