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

$files = array(
  PATH_WGT.'wgt/browser/normalize.css',

  // layout
  PATH_WGT.'layout/wgt/layout/backend/layout.css',

  // layout
  PATH_THEME.'themes/default/theme.css',
  PATH_THEME.'themes/default/icons.css',
  PATH_THEME.'themes/default/status.css',
);


foreach($files as $file)
{
  include $file;
  echo NL;
}
