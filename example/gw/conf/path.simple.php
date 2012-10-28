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

$serverAddress = (isset($_SERVER['HTTPS']) && 'on' == $_SERVER['HTTPS']) ?'https://' :'http://';
$serverAddress .= $_SERVER['SERVER_NAME'];

if( isset( $_SERVER['HTTPS'] ) && 'on' == $_SERVER['HTTPS'] )
{
  if( $_SERVER['SERVER_PORT'] != '443' )
  {
    $serverAddress .= ':'.$_SERVER['SERVER_PORT'];
  }
}
else 
{
  if( $_SERVER['SERVER_PORT'] != '80' )
  {
    $serverAddress .= ':'.$_SERVER['SERVER_PORT'];
  }
}

if( '/' != $serverAddress[(strlen($serverAddress)-1)] )
  $serverAddress .= '/';

if( !defined('SERVER_ADDR') )
  define( 'SERVER_ADDR'     , $serverAddress );

$serverAddress .= mb_substr( $_SERVER['REQUEST_URI'] , 0 , strrpos($_SERVER['REQUEST_URI'],'/')+1 );
  
$length = strlen($serverAddress);

if( '/' != $serverAddress[($length-1)] )
  $serverAddress .= '/';
  
if( !defined('WEB_GW') )
  define( 'WEB_GW'     , $serverAddress );

////////////////////////////////////////////////////////////////////////////////
// Code Pfade
////////////////////////////////////////////////////////////////////////////////

/**
 * ROOT Path of the Gateway
 * @var
 */
if( !defined('PATH_GW') )
  define( 'PATH_GW'     , './' );

/**
 * path for tmp files
 * @var string
 */
define( 'PATH_TMP'     , PATH_GW.'tmp/' );

/**
 * ROOT Path for all Modules, Libs and Gateways
 * @var
 */
define( 'PATH_ROOT'     , '../../../' );

/**
 * Root Path of the WebFrap Framework
 * @var
 */
define( 'PATH_FW'       , './' );

/**
 * Path for all files
 * @var
 */
define( 'PATH_FILES'    , PATH_GW );

/**
 * Source Path to the style
 * @var
 */
define( 'PATH_THEME'    , PATH_ROOT.'WebFrap_Theme_Default/'  );

/**
 * Source Path to the style
 * @var
 */
define( 'PATH_ICONS'    , PATH_ROOT.'WebFrap_Icons_Default/'  );

/**
 * Source path to the webfrap wgt
 * @var
 */
define( 'PATH_WGT'      , '../../' );

////////////////////////////////////////////////////////////////////////////////
// Web Pfade
////////////////////////////////////////////////////////////////////////////////

/**
 * Root for The WebBrowser, all static files should be placed relativ to this
 * Constant
 * @var
 */
define( 'WEB_ROOT'      , WEB_GW.'../../' );

/**
 * Root for The WebBrowser, all static files should be placed relativ to this
 * Constant
 * @var
 */
define( 'WEB_FILES'     , WEB_GW );

/**
 * Root from the activ Style Project
 * @var
 */
define( 'WEB_THEME' , WEB_ROOT );

/**
 * Root from the activ Style Project
 * @var
 */
define( 'WEB_ICONS' , WEB_ROOT  );

/**
 * ROOT path for the WebFrap Famework
 * @var
 */
define( 'WEB_WGT'   , WEB_GW.'../'  );


////////////////////////////////////////////////////////////////////////////////
// constants
////////////////////////////////////////////////////////////////////////////////


/**
 * @var
 */
define( 'NL' , "\n" );

/**
 * @var
 */
define( 'TEMP_SEP' , "~#&~" );

/**
 * @var
 */
define( 'P_S' , PATH_SEPARATOR );

/**
 * @var
 */
define( 'D_S' , '/' );


////////////////////////////////////////////////////////////////////////////////
// Developer constantes, NEVER USE IN PRODUCTION SYSTEMS!!! NEVER EVER!!!
////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @var boolean
 */
define( 'DEBUG' ,  true  );

/**
 *
 * @var boolean
 */
define( 'DEBUG_CONSOLE' ,  false  );


