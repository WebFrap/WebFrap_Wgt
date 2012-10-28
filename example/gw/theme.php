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

header("Content-type: text/css");

include './conf/path.simple.php';


if( isset( $_GET['l'] ) )
{
  $tmp      = explode('.',$_GET['l']);

  $type     = $tmp[0];
  $id       = $tmp[1];

  if( !ctype_alnum($type) )
    $type = 'list';

  if( !ctype_alnum($id) )
    $id = 'default';

}
else
{
  $type     = 'list';
  $id       = 'default';
}

$icons  = WEB_ICONS.'icons/default/';
$images = WEB_THEME.'themes/default/images/';
$imagePath = WEB_THEME.'themes/default/images/';

include "./conf/include/theme/{$id}.{$type}.php";
