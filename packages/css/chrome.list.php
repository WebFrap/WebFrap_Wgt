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
  PATH_WGT.'layout/wgt/browser/chrome.css',

);

foreach( $files as $file )
{
  include $file;
  echo NL;
}



