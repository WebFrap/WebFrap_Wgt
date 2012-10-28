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
/*
set_error_handler('Webfrap::errorHandler');
session_set_save_handler
(
  'SysSession::open',
  'SysSession::close',
  'SysSession::read',
  'SysSession::write',
  'SysSession::destroy',
  'SysSession::gc'
);
*/

/**
 *
 * @package WebFrap
 * @subpackage WebFrap
 */
class Session
{
////////////////////////////////////////////////////////////////////////////////
// Attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   * @var LibSessionPhp
   */
  public static $session   = null;

  /**
   * Enter description here...
   *
   * @var string
   */
  protected static $sessionId   = null;

  /**
   * Enter description here...
   *
   * @var string
   */
  protected static $sessionSavePath = null;

  /**
   *
   * @var string
   */
  protected static $sessionType = null;

  /**
   *
   * @var string
   */
  protected static $name = null;

////////////////////////////////////////////////////////////////////////////////
// Magic Functions
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   */
  private function __construct()
  {
  }//end private function __construct */

  /**
   *
   */
  private function __clone()
  {
  }//end private function __clone */

  /**
   *
   */
  public function __destruct()
  {
    self::$session->close();
  }//end private function __construct */

  /**
   * Enter description here...
   *
   * @return LibSessionPhp
   * @deprecated
   */
  public static function getInstance()
  {

    if( is_null( self::$session ) )
      throw new WebfrapFlow_Exception('Session not yet started!');

    return self::$session;

  }//end public static function getInstance */


  /**
   * get the active session object
   * @return LibSessionPhp
   */
  public static function getActive()
  {

    if( is_null( self::$session ) )
      throw new WebfrapFlow_Exception('Session not yet started!');

    return self::$session;

  }//end public static function getActive */

  /**
   *
   * @return void
   */
  public static function init()
  {

    $conf = Conf::get('session');

    self::$sessionType      = isset($conf['type'])?$conf['type']:'Php';
    self::$name             = isset($conf['name'])?$conf['name']:'WEBFRAP_SID';
    self::$sessionSavePath  = isset($conf['path'])?$conf['path']:null;

    self::start();


    // Session muss vorhanden sein
    if( ! isset( $_SESSION['WBF_STATUS'] ) )
    {
      $conf = Conf::getInstance();
      $conf->status['serveros']   = php_uname('s');
      $conf->status['serverarch'] = php_uname('m');
      $conf->status['lang']       = Conf::get('i18n','lang' );

      if(!isset( $conf->status['def_lang'] ))
        $conf->status['def_lang'] = Conf::get('i18n','lang' );

      $_SESSION['WBF_STATUS'] = $conf->status;
    }
    else
    {
      self::$session->wakeup = true;
    }

    if( isset($_SESSION['DEBUG_MODE'])  )
    {
      Log::getInstance()->enableDebugging();
    }
    elseif( isset($_GET['enable_debug']) )
    {

      $conf = Conf::getInstance();
      if( isset($conf->status['enable_debugpwd']) &&  $conf->status['enable_debugpwd'] == $_GET['enable_debug'] )
      {
        $_SESSION['DEBUG_MODE'] = true;
        Log::getInstance()->enableDebugging();
      }
    }

  }//end public static function init */

////////////////////////////////////////////////////////////////////////////////
// Getter and Setter Methodes
////////////////////////////////////////////////////////////////////////////////

  /**
   * Enter description here...
   *
   * @param string $name
   */
  public static function setName( $name  )
  {
    self::$name = $name;
  }//end public function setName */

  /**
   * Enter description here...
   *
   * @return string
   */
  public static function getName()
  {
    return self::$name;
  }//end public function getName */

  /**
   * Enter description here...
   *
   * @param string / array $key
   * @param string[optional] $value
   * @return void
   */
  public static function setStatus( $key , $value = null )
  {
    if( is_array( $key ) )
      $_SESSION['WBF_STATUS'] = array_merge( $_SESSION['WBF_STATUS'] , $key );

    else
      $_SESSION['WBF_STATUS'][$key] = $value;

  }//end public static function setStatus */

  /**
   * Enter description here...
   *
   * @param string $key
   * @param string[optional] $value
   * @return void
   */
  public static function status( $key = null )
  {
    if( !$key && isset($_SESSION['WBF_STATUS']) )
      return $_SESSION['WBF_STATUS'];

    elseif( isset($_SESSION['WBF_STATUS'][$key]) )
      return $_SESSION['WBF_STATUS'][$key];

    else
      return null;

  }//end public static function getStatus */

  /**
   * Enter description here...
   *
   * @param string $sessionId
   */
  public static function setSessionId( $sessionId )
  {
    self::$sessionId = $sessionId;
  }//end public function setSessionId */

  /**
   * Enter description here...
   *
   * @return string
   */
  public static function getSessionId()
  {
    return self::$sessionId;
  }//end public function getSessionId */

  /**
   * Enter description here...
   *
   * @param string $savePath
   */
  public static function setSessionSavePath( $savePath )
  {
    self::$sessionSavePath = $savePath;
  }//end public function setSessionSavePath */

  /**
   * Enter description here...
   *
   * @return string
   */
  public static function getSessionSavePath()
  {
    return self::$sessionSavePath;

  }//end public function getSessionSavePath */

  /**
   * Enter description here...
   *
   * @param string $sessionType
   */
  public static function setSessionType( $sessionType )
  {
    self::$sessionType = $sessionType;
  }//end public function setSessionType */

  /**
   * Enter description here...
   *
   * @return string
   */
  public static function getSessionType()
  {
    return self::$sessionType;

  }//end public function getSessionType */

////////////////////////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////////////////////////

  /**
   * start a new session
   *
   */
  public static function start()
  {

    $className = 'LibSession'.self::$sessionType;
    self::$session = new $className();

    Debug::console('start session '.$className);

    self::$session->start
    (
      self::$name ,
      self::$sessionId ,
      self::$sessionSavePath
    );

  }//end public static function start */

  /**
   * write the session to storage and close it
   *
   */
  public static function close()
  {

    if( is_null(self::$session) )
    {
      return;
    }

    self::$session->close();

  }//end public function close */

  /**
   * destroy the session
   *
   */
  public static function destroy()
  {
    if( is_null(self::$session) )
    {
      return;
    }

    self::$session->destroy();

  }//end public function destroy */

  /**
   * Alle Debugdaten aus der Session entfernen
   * @return void
   */
  public static function cleanLogs()
  {
    // Leeren der PHP Logfiles in der Session
    $_SESSION['SCREENLOG']     = array();
    $_SESSION['PHPLOG']        = array();
    $_SESSION['TRACES']        = array();
    $_SESSION['DUMPS']         = array();
    $_SESSION['BUFFERD_OUT']   = '';
  }//end public static function cleanLogs */


}//end class Session

