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

/**
 *  Basisklasse für Handgeschriebene Custom Module
 *
 * @package WebFrap
 * @subpackage wgt
 * @since 0.9.2
 */
class WgtMaintabCustom extends WgtMaintab
{

  /**
   * @var string
   */
  public $overflowY = 'auto';

  /**
   * add a drop menu to the create window
   *
   * @param TFlag $params the named parameter object that was created in
   *   the controller
   * {
   *   string formId: the id of the form;
   * }
   */
  public function addMenu($params)
  {
  
    $i18n         = $this->getI18n();
  
    $iconMenu     = '<i class="icon-reorder" ></i>';
    $iconClose    = '<i class="icon-close" ></i>';
    $iconBookmark = '<i class="icon-bookmark" ></i>';
  
    $menu          = $this->newMenu($this->id.'_dropmenu');
  
    $this->addActions($params);
  
    $menu->content = <<<HTML
  
<div class="inline" >
  <button
    class="wcm wcm_control_dropmenu wgt-button"
    id="{$this->id}_dropmenu-control"
    wgt_drop_box="{$this->id}_dropmenu"  >{$iconMenu} {$this->i18n->l('Menu','wbf.label')}</button>
</div>
  
<div class="wgt-dropdownbox" id="{$this->id}_dropmenu" >
  <ul>
    <li>
      <a class="wgtac_bookmark" >{$iconBookmark} {$this->i18n->l('Bookmark', 'wbf.label')}</a>
    </li>
  </ul>
  <ul>
    <li>
      <a class="wgtac_close" >{$iconClose} {$this->i18n->l('Close','wbf.label')}</a>
    </li>
  </ul>
</div>
  
HTML;
  
  }//end public function addMenu */
  
  /**
   * this method is for adding the buttons in a create window
   * per default there is only one button added: save with the action
   * to save the window onclick
   *
   * @param TFlag $params the named parameter object that was created in
   *   the controller
   * {
   *   string formId: the id of the form;
   * }
   */
  public function addActions($params)
  {
  
    // add the button action for save in the window
    // the code will be binded direct on a window object and is removed
    // on close
    // all buttons with the class save will call that action
    $code = <<<BUTTONJS
  
    // close tab
    self.getObject().find(".wgtac_close").click(function() {
      \$S('#{$this->id}_dropmenu-control').dropdown('remove');
      self.close();
    });
  
  
BUTTONJS;
  
    $this->addJsCode($code);
  
  }//end public function addActions */
  
} // end class WgtMaintabCustom

