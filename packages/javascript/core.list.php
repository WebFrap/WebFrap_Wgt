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

$files = array(
  // extend javascript
  PATH_WGT.'js_src/ext/ext.js.js',

  PATH_WGT.'js_src/vendor/jquery/jquery.js',
  PATH_WGT.'js_src/ext/ext.jquery.js',
  PATH_WGT.'js_src/vendor/moment.js/moment.js',

  PATH_WGT.'js_src/Wgt.js',
  PATH_WGT.'js_src/wgt/Debug.js',
    
  // add i18n data
  PATH_WGT.'js_src/wgt/I18n.js',

);

