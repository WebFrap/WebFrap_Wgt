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
  * Das Ausgabemodul für die Seite
 * @package WebFrap
 * @subpackage WebFrap
  */
class View
{
////////////////////////////////////////////////////////////////////////////////
// Konstantes
////////////////////////////////////////////////////////////////////////////////

  /**
   * doctype html4 Strict
   */
  const HTML4_STRICT    = 0;

  /**
   * doctype html4 transitional
   */
  const HTML4_TRANS       = 1;

  /**
   * doctype html4 frames
   */
  const HTML4_FRAME       = 2;

  /**
   * doctype xml1 strict
   */
  const XML1_STRICT       = 3;

  /**
   * doctype xml1 transitional
   */
  const XML1_TRANS        = 4;

  /**
   * doctype xml1 frames
   */
  const XML1_FRAME        = 5;

  /**
   * doctype xml1.1 frames
   */
  const XML1_1_STRICT     = 6;

  /**
   * @param string
   */
  const AJAX        = 'ajax';

  /**
   * @param string
   */
  const JSON        = 'json';

  /**
   * @param string
   */
  const HTML        = 'html';

  /**
   * @param string
   */
  const FRONTEND    = 'frontend';

  /**
   * @param string
   */
  const AREA        = 'area';

  /**
   * @param string
   */
  const WINDOW      = 'window';

  /**
   * @param string
   */
  const SUBWINDOW   = 'window';

  /**
   * @param string
   */
  const MAINTAB     = 'maintab';

  /**
   * @param string
   */
  const MAINWINDOW  = 'mainwindow';

  /**
   * @param string
   */
  const DOCUMENT    = 'document';

  /**
   * @param string
   */
  const CLI         = 'cli';

  /**
   * the default text content type
   * @var string
   */
  const CONTENT_TYPE_TEXT = 'text/html';

////////////////////////////////////////////////////////////////////////////////
// Attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   * sollen Informationen zum manipulieren des Menüs mitgeschickt werden
   *
   * @var boolean
   */
  public static $sendMenu = false;

  /**
   * soll die komplette Seite geschickt werden
   *
   * @var boolean
   */
  public static $sendIndex = false;

  /**
   * soll der ajax Body gesendet werden
   *
   * @var boolean
   */
  public static $sendBody = true;

  /**
   * name des aktiven themes
   *
   * @var string
   */
  public static $theme = null;

  /**
   * name des aktiven themes
   *
   * @var string
   */
  public static $iconTheme = null;

  /**
   * der pfad zum aktuellen theme
   *
   * @var string
   */
  public static $themePath = null;

  /**
   * the web theme path for the browser / client
   * @var string
   */
  public static $themeWeb = null;

  /**
   * the web theme path for the browser / client
   * @var string
   */
  public static $iconsWeb = null;

  /**
   *
   * Enter description here ...
   * @var unknown_type
   */
  public static $webTheme     = null;

  /**
   *
   * Enter description here ...
   * @var unknown_type
   */
  public static $webIcons     = null;

  /**
   *
   * Enter description here ...
   * @var unknown_type
   */
  public static $webImages    = null;

  /**
   * der typ der zu erstellenden template klasse
   *
   * @var boolean
   */
  public static $templatePath = array();

  /**
   * should headers be blocked?
   *
   * @var boolean
   */
  public static $blockHeader = false;

  /**
   * der typ der zu erstellenden template klasse
   *
   * @var boolean
   */
  public static $type = null;

  /**
   * der typ der zu erstellenden template klasse
   *
   * @var boolean
   */
  public static $searchPathTemplate = array();

  /**
   * der typ der zu erstellenden template klasse
   *
   * @var array
   */
  public static $searchPathIndex = array();

////////////////////////////////////////////////////////////////////////////////
// Instance
////////////////////////////////////////////////////////////////////////////////

  /**
   * ein Template Objekt der aktiven Template Klasse
   * @var LibTemplate
   */
  private static $instance = null;

////////////////////////////////////////////////////////////////////////////////
// Magic and Magicsimulation
////////////////////////////////////////////////////////////////////////////////

  /**
   * Enter description here...
   *
   */
  public static function init( )
  {

    $conf               = Conf::get('view');
    
    $webTheme = Session::status('web.theme');
    $webIcons = Session::status('web.icons');

    $webTheme  = $webTheme
      ?:WEB_ROOT.'WebFrap_Wgt/themes/default/';
      
    $webIcons  = $webIcons
      ?:WEB_ROOT.'WebFrap_Wgt/icons/default/';

    self::$theme        = 'default';
    self::$templatePath = PATH_GW.'templates/default/';

    self::$themePath    = Session::status('path.theme');

    self::$themeWeb     = $webTheme;
    self::$iconsWeb     = $webIcons;

    self::$webTheme     = $webTheme;
    self::$webIcons     = $webIcons;
    self::$webImages    = $webTheme.'images/';


  } //end public function init */

  /**
   * Enter description here...
   *
   */
  public static function rebase( $type )
  {

    $conf               = Conf::get('view');

    self::$theme        = 'default';
    self::$templatePath = PATH_GW.'templates/default/';

    self::$themePath    = Session::status('path.theme');

    self::$themeWeb     = Session::status('web.theme');
    self::$iconsWeb     = Session::status('web.icons');

    self::$webTheme     = Session::status('web.theme');
    self::$webIcons     = Session::status('web.icons');
    self::$webImages    = Session::status('web.theme').'images/';

  } //end public function init */

  /**
   * clean closedown of the view
   *
   */
  public static function shutdown( )
  {

  } //end public static function shutdown */

  /**
   * request the activ engine instance
   * @return LibTemplateAjax
   * @deprecated use self::engine instead
   */
  public static function getInstance( )
  {

  }//end public function getInstance */







}//end class View

