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


////////////////////////////////////////////////////////////////////////////////
// Data for Configuration
////////////////////////////////////////////////////////////////////////////////

/*
 * Standard System Statis
 */
$this->status->content
(array
(

  'sys.name'        => 'WebFrap',
  'sys.version'     => '0.6',
  'sys.generator'   => 'WebFrap 0.6',
  'sys.admin.name'  => 'admin of the day',
  'sys.admin.mail'  => 'admin@webfrap.net',
  'sys.licence'     => 'BSD',
  'sys.copyright'   => 'S-DB Softwareentwicklung Dominik Bonsch',

  'gateway.name'      => 'StyleDemo',
  'gateway.version'   => '0.6',
  'gateway.licence'   => 'BSD',

  'default.country'   => 'de',
  'default.language'  => 'en',
  'default.timezone'  => 'Europe/Berlin',
  'default.encoding'  => 'utf-8',
  'default.theme'     => 'default',
  'default.layout'    => 'full',

  'activ.country'     => 'de',
  'activ.language'    => 'de',
  'activ.timezone'    => 'Europe/Berlin',
  'activ.encoding'    => 'utf-8',
  'activ.theme'       => 'default',

  'path.theme'        => PATH_ROOT.'WebFrap_Wgt/themes/default/' ,
  'path.icons'        => PATH_ROOT.'WebFrap_Wgt/icons/default/' ,

  'web.theme'         => WEB_ROOT.'WebFrap_Wgt/themes/default/' ,
  'web.icons'         => WEB_ROOT.'WebFrap_Wgt/icons/default/' ,

  'enable.firephp'    => false,
  //'enable.debugpwd'   => 'hanswurst', // CHANGE ME if enabled

));//end public $status = array

/*
 * classes that have to be initializes first bevor the system can run
 */
$this->initClasses = array
(
  'Cache'     ,  // the caching system
  'I18n'      ,  // the i18n text provider
  'View'      ,  // the i18n text provider
);//end initClasses


/*
 * Kofiguration für die Datenbank Verbindung
 */
$this->modules['db'] = array
(
  'activ'       => 'default',
  'connection'  => array
  (
    'default' => array
    (
      'class'     => 'PostgresqlPersistent',
      'dbhost'    => 'localhost',
      'dbport'    => '5432',
      //'dbname'    => 'webfrap_de',
      'dbname'    => 'stab_gw_portal',
      'dbuser'    => 'stab_gw_portal',
      'dbpwd'     => 'stab_gw_portal',
      'dbschema'  => 'stab',
      'quote'     => 'single'
    ),
    'admin' => array
    (
      'class'     => 'Postgresql',
      'dbhost'    => 'localhost',
      'dbport'    => '5432',
      //'dbname'    => 'webfrap_de',
      'dbname'    => 'stab_gw_portal',
      'dbuser'    => 'stab_gw_portal',
      'dbpwd'     => 'stab_gw_portal',
      'dbschema'  => 'public',
      'quote'     => 'single'
    ),
  )
);//end $this->modules['DBCON'] = array

/*
 * Kofiguration für die View
 */
$this->modules['view'] = array
(
  'charset'     => 'utf-8',
  'doctype'     => 4,
  'contenttype' => 'text/html',
  'systemplate' => 'default',
  'theme'       => 'default',
  'enable_gzip' => false,

  'index.login' => 'full/annon',
  'head.login'  => 'default',

  'index.annon' => 'full/annon',
  'head.annon'  => 'default',

  'index.user'  => 'full/annon',
  'head.user'   => 'default',

);//end $this->modules['VIEW'] = array

/*
 * Kofiguration für die View
 */
$this->modules['i18n'] = array
(
  'type'      => 'Php',
  'lang_path' => 'default',
  'lang'      => 'de',
  'de'        => array
  (
    'short'           => 'de',
    'dateSeperator'   => '.',
    'dateFormat'      => 'd.m.Y',
    'timeFormat'      => 'H:i:s',
    'timeSteperator'  => ':',
    'timeStampFormat' => 'd.m.Y H:i:s',
    'numberMil'       => '.',
    'numberDec'       => ',',
  ),
  'en'        => array
  (
    'short'           => 'en',
    'dateSeperator'   => '-',
    'dateFormat'      => 'Y-m-d',
    'timeFormat'      => 'H:i:s',
    'timeSteperator'  => ':',
    'timeStampFormat' => 'Y-m-d H:i:s',
    'numberMil'       => ',',
    'numberDec'       => '.',
  ),
);//end $this->modules['i18n'] = array

/*
 * Kofiguration für die View
 */
$this->modules['cache'] = array
(
  1 => array
  (
    'class'     => 'File',
    'folder'    => PATH_GW.'cache/',
    'expire'    => 120
  ),
);//end $this->modules['cache'] = array

/*
 *
 */
$this->modules['session'] = array
(
  'type'    => 'Php',
  //'path'  => PATH_GW.'tmp/session/',
  'name'    => 'STAB_PORTAL'
);//end $this->modules['cache'] = array

/*
 *
 */
$this->modules['wgt'] = array
(
  'replace_superglobals'  => false,
  'menu_size'             => 3,
);//end $this->modules['cache'] = array

/*
 *
 */
$this->modules['log'] = array
(
  'activ'     => array
  (
    'FILE',
    //'SESSION',
    //'AJAXCONSOLE',
    //'FIREPHP'
  ),
  'appender' => array
  (
    'FILE' => array
    (
      'class'     => 'File',
      'level'     => '+WARN',
      'singel'    => true ,
      'logfolder' => 'log/',
      'logfile'   => 'webfrap.log',
      'logroll'   => false ,
      'logrotate' => 10,
      'maxsize'   => 10000,
      'compress'  => 'bz2',
    ),
    'DATABASE' => array
    (
      'class'     => 'Database',
      'level'     => 'USER',
      'logtable'  => 'syslog',
    ),
    'SESSION' => array
    (
      'class'     => 'Session',
      'level'     => 'DEBUG-USER,-CONFIG,+SECURITY',
    ),
    'AJAXCONSOLE' => array
    (
      'class'     => 'Ajaxconsole',
      'level'     => 'DEBUG-USER,-CONFIG,+SECURITY',
    ),
  ),

);//end $this->modules['log'] = array


