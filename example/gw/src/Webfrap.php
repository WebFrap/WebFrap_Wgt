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


// define needed constantes
if(!defined('WBF_DB_KEY'))
  define('WBF_DB_KEY','rowid');

if(!defined('DEBUG'))
  define('DEBUG',false);

if(!defined('WBF_NO_LOGIN'))
  define('WBF_NO_LOGIN',false);

if(!defined('WBF_NO_ACL'))
  define('WBF_NO_ACL',false);


/**
 * Die Hautptklasse für WebFrap
 *
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 */
class Webfrap
{
////////////////////////////////////////////////////////////////////////////////
// attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   * singleton instance
   * @var LibFlowAbstract
   */
  protected static    $instance     = null;

  /**
   *
   * @var array
   */
  public static       $loadAble     = array();

  /**
   * Include Path
   * @var array
   */
  protected static    $includePath  = array();

  /**
   * Autoload methods
   * @var array
   */
  protected static    $autoload     = array
  (
    'Webfrap::autoload' => true
  );

  /**
   * alle projektpfade durch die die standard Autoload Itterieren muss
   * @var array
   */
  public static       $autoloadPath   = array();

  /**
   * Klassenindex für die Schnelle Autoload Methode
   * @var array
   */
  public static       $classIndex     = array();

  /**
   * Template Index to save all requested templates per request
   * @var array
   */
  public static       $tplIndex       = array();

  /**
   * where there any changes in the classindex in the autoload?
   * if true the system writes the new index in the cache
   * @var boolean
   */
  public static       $indexChanged   = false;


  /**
   * the key for fetching the autoload class index
   * @var string
   */
  public static       $indexKey       = null;

  /**
   * path to the index cache for the autoload method
   * @var string
   */
  public static       $indexCache     = 'cache/autoload/';

  /**
   * nicht persistente sequence für die script laufzeit
   * @var int
   */
  public static       $sequence       = 0;

  /**
   * Classes that should be initialized
   * @var array
   */
  public static       $initClasses    = array();

  /**
   * Number of PHP Errors from the own error handler
   * @var int
   */
  public static       $numPhpErrors      = 0;

  /**
   * the first php error as string
   * @var string
   */
  public static       $firstError      = null;

////////////////////////////////////////////////////////////////////////////////
// constantes
////////////////////////////////////////////////////////////////////////////////

  /**
   * Enter description here...
   *
   */
  const MAX_PACKAGE_LEVEL = 5 ;

////////////////////////////////////////////////////////////////////////////////
// protect construct and clone
////////////////////////////////////////////////////////////////////////////////


 /**
  * Der Standart Konstruktor
  * @return void
  */
  protected function __construct( )
  {
  } // end protected function __construct */

  /**
   * Klonen per 'clone' von außen verbieten
   */
  protected function __clone()
  {
  }//end protected function __clone */

////////////////////////////////////////////////////////////////////////////////
// fake singleton
////////////////////////////////////////////////////////////////////////////////

  /** getInstance zum implementieren von Singelton
   *
   * @return LibFlowApachemod
   */
  public static function getInstance( )
  {
    if( is_null(self::$instance) )
      self::init();

    return self::$instance;
  } // end public static function getInstance */

  /**
   * set the flow controller for webfrap
   * @param string $key
   */
  public static function setEnvironment($key)
  {
    define('WBF_CONTROLLER',$key);
    define('WBF_REQUEST_ADAPTER',$key);
  }//end public static function setEnvironment */

  /**
   * create a single instance for the workflow controller
   *
   * @return void
   * @throws ClassNotFound_Exception
   */
  protected static function createInstance( )
  {

    if( defined('WBF_CONTROLLER') )
      $flowController = 'LibFlow'.ucfirst(WBF_CONTROLLER);
    else
      $flowController = 'LibFlowApachemod';

    self::$instance = new $flowController();

  } // end protected static function createInstance */

////////////////////////////////////////////////////////////////////////////////
// Include Path
////////////////////////////////////////////////////////////////////////////////


  /**
   * set the php include path for the script
   *
   * @param string $includePath
   */
  public static function setIncludePath( $includePath )
  {
    if(!isset(self::$includePath[$includePath]))
    {
      set_include_path( get_include_path().P_S.$includePath );
      self::$includePath[$includePath] = true;
    }
  }//end public static function setIncludePath */

  /**
   * add a new path to the include path
   *
   * @param string $includePath
   */
  public static function addIncludePath( $includePath )
  {
    if(!isset(self::$includePath[$includePath]))
    {
      set_include_path( get_include_path().P_S.$includePath );
      self::$includePath[$includePath] = true;
    }
  }//end public static function addIncludePath */

////////////////////////////////////////////////////////////////////////////////
// Classloading
////////////////////////////////////////////////////////////////////////////////

    /**
   * Enter description here...
   *
   * @param string $path
   */
  public static function addAutoloadPath( $path )
  {
    self::$autoloadPath[] = $path;
  }//end public static function addAutoloadPath */

  /**
   * wrapper for class exists
   * cause class exists always throws an exception if the class not exists
   * @param string $classname
   * @return boolean
   */
  public static function classLoadable( $classname )
  {

    if(!isset(self::$loadAble[$classname]))
    {
      try
      {
        $back = class_exists($classname);
        self::$loadAble[$classname] = $back;
        return $back;
      }
      catch( ClassNotFound_Exception $e )
      {
        self::$loadAble[$classname] = false;
        return false;
      }
    }
    else
    {
      return self::$loadAble[$classname];
    }

  }//end function classLoadable */

  /**
   * wrapper for class exists
   * cause class exists always throws an exception if the class not exists
   * @param string $classname
   * @return boolean
   */
  public static function classExists( $classname )
  {

    if(!isset(self::$loadAble[$classname]))
    {
      try
      {
        $back = class_exists($classname);
        self::$loadAble[$classname] = $back;
        return $back;
      }
      catch( ClassNotFound_Exception $e )
      {
        self::$loadAble[$classname] = false;
        return false;
      }
    }
    else
    {
      return self::$loadAble[$classname];
    }

  }//end function classLoadable */


  /**
   *
   * @param $classname
   * @return unknown_type
   */
  public static function loadable( $classname )
  {
    try
    {
      if ( class_exists($classname,true) || interface_exists($classname,true) )
        return true;
      else
        return false;
    }
    catch( ClassNotFound_Exception $e )
    {
      return false;
    }

  }//end function loadable */

  /**
   * Enter description here...
   *
   * @param string $includePath
   */
  public static function addAutoload( $autoload )
  {
    if(!isset(self::$autoload[$autoload]))
    {
      spl_autoload_register($autoload);
      self::$autoload[$autoload] = true;
    }
  }//end public static function addAutoload */

  /**
   *
   * @return unknown_type
   */
  public static function loadClassIndex(  $key = 'default'  )
  {

    $key = strtolower( $key );

    self::$indexChanged = false;
    self::$indexKey     = $key;

    $keyPath  = str_replace( '.' , '/' , $key  );
    $path     = PATH_GW.self::$indexCache.$keyPath.'/'.$key.'.php';

    if(file_exists( $path ))
      include $path;

  }//end public static function loadClassIndex */

  /**
   *
   * @return unknown_type
   */
  public static function saveClassIndex(   )
  {

    if( !self::$indexChanged )
      return;

    // append class index
    $index = '<?php
  Webfrap::$classIndex = array
  ('.NL;

    foreach( self::$classIndex as $class => $path )
      $index .= "    '$class' => '$path',".NL;

    $index .= NL.');'.NL.NL;

    // append template index
    $index .= '
  Webfrap::$tplIndex = array
  ('.NL;

    foreach( self::$tplIndex as $key => $path )
      $index .= "    '$key' => '$path',".NL;

    $index .= NL.');'.NL.NL;


    $keyPath = str_replace( '.' , '/' , self::$indexKey  );
    $path = PATH_GW.self::$indexCache.$keyPath.'/';

    $file = $path.self::$indexKey.'.php';

    if( !is_dir( $path )  )
      if( !SFilesystem::createFolder($path) )
        return;

    file_put_contents( $file , $index );

  }//end public static function saveClassIndex */

  /**
   * Die Autoload Methode versucht anhand des Namens der Klassen den Pfad
   * zu erraten in dem sich die Datei befindet
   *
   * Dies Methode ist relativ Langsam und sollte nur beim Entwickeln genutzt
   * werden, Produktivsystemen geht das extrem auf die Performance
   *
   *
   * @param string $classname Name der Klasse
   */
  public static function pathAutoload( $classname )
  {

      $length = strlen($classname);
      $requireMe = null;

      foreach( Webfrap::$autoloadPath as $path )
      {

        $parts = array();
        $start = 0;
        $end = 1;
        $package = '';

        if( file_exists( $path.$classname.'.php' ) )
        {
          include $path.$classname.'.php' ;
          return;
        }
        else
        {
          // 3 Stufen Packages
          $level = 0;
          for( $pos = 1 ; $pos < $length  ; ++$pos )
          {

            if(ctype_upper($classname[$pos]) )
            {
              $package  .= strtolower( str_replace( '_','', substr( $classname, $start, $end  ) ) ).'/' ;
              $start    += $end;
              $end      = 0;
              ++$level;

              $file = realpath($path.$package.$classname.'.php');
              if( file_exists( $file ) )
              {
                self::$classIndex[$classname] = $file;
                self::$indexChanged           = true;
                include $file;
                return;
              }


              if( $level == self::MAX_PACKAGE_LEVEL )
                break;
            }
            ++$end;
          }
        }//end if( file_exists( $path.$classname.'.php' ) )

      }//end foreach( Webfrap::$autoloadPath as $path )

  } //function public static function pathAutoload */

  /**
   * Diese Autoload Methode geht über einen Index
   * Ist sehr schnell muss allerdings befüllt werden
   *
   * @param string $classname Name der Klasse
   */
  public static function indexAutoload( $classname )
  {

    if(isset(Webfrap::$classIndex[$classname]))
      include Webfrap::$classIndex[$classname];

  } //function public static function indexAutoload */

  /**
   * Fallback Autoload Methode wenn die klasse nicht gefunden wird
   * @throws ClassNotFound_Exception
   *
   * @param string $classname
   */
  public static function notfoundAutoload( $classname )
  {

    $filename = PATH_GW.'tmp/cnf/'.uniqid().'.tmp';
    $errorText = "Class $classname not Found!";

    $toEval = "
    <?php

    // delete at require
    unlink( '$filename' );

    // throw at require
    throw new ClassNotFound_Exception( '$errorText' );

    /*
    class $classname
    {
      public function __construct()
        // throw everytime somebody wants to create an object from this
      {
        throw new ClassNotFound_Exception( '$errorText' );
      }

    }
    */
    ?>";

    file_put_contents( $filename , $toEval );
    include $filename;

  } //function public static function notfoundAutoload */

////////////////////////////////////////////////////////////////////////////////
// Error Handler
////////////////////////////////////////////////////////////////////////////////

  /**
   * Webfrap Own Error Handler
   *
   * @param int $errno
   * @param string $errstr
   * @param string $errfile
   * @param string $errline
   * @param string $errDump
   */
  public static function errorHandler($errno,$errstr,$errfile,$errline,$errDump)
  {

    $errorType = array
    (
      E_ERROR            => 'ERROR',
      E_WARNING          => 'WARNING',
      E_PARSE            => 'PARSING_ERROR',
      E_NOTICE           => 'NOTICE',
      E_CORE_ERROR       => 'CORE_ERROR',
      E_CORE_WARNING     => 'CORE_WARNING',
      E_COMPILE_ERROR    => 'COMPILE_ERROR',
      E_COMPILE_WARNING  => 'COMPILE_WARNING',
      E_USER_ERROR       => 'USER_ERROR',
      E_USER_WARNING     => 'USER_WARNING',
      E_USER_NOTICE      => 'USER_NOTICE',
      E_STRICT           => 'STRICT',
      4096               => 'UNKNOWN ERROR'
    );

    $L[] = microtime(true);
    $L[] = $errorType[$errno];
    $L[] = $errfile;
    $L[] = $errline;
    $L[] = $errstr.': '.(string)$errDump;

    $_SESSION['PHPLOG'][] = $L;

  }//end public static function errorHandler */


  /**
   * Webfrap Own Error Handler
   *
   * @param int $errno
   * @param string $errstr
   * @param string $errfile
   * @param string $errline
   * @param string $errDump
   */
  public static function debugErrorHandler($errno,$errstr,$errfile,$errline,$errDump)
  {

    // jaja die Hälfte der Konstanten ist überflüssig da sie hier nie
    // erreicht werden können.
    // Ist nur der Vollständigkeithalber
    $errorType = array
    (
      // Fatale Laufzeit-Fehler. Dies zeigt Fehler an, die nicht behoben werden können.
      // Beispielsweise Probleme bei der Speicherzuweisung.
      // Die Ausführung des Skripts wird abgebrochen.
      E_ERROR            => 'ERROR',

      // Warnungen (keine fatalen Fehler) zur Laufzeit des Skripts.
      // Das Skript wird nicht abgebrochen.
      E_WARNING          => 'WARNING',

      // Parser-Fehler während der Übersetzung.
      // Parser-Fehler können nur vom Parser erzeugt werden.
      E_PARSE            => 'PARSING ERROR',

      // Benachrichtigungen während der Laufzeit. Sie zeigen an, dass im Skript
      // irgend etwas gefunden wurde, was einen Fehler verursachen könnte.
      // Es ist aber genauso möglich, dass Benachrichtigungen im ordnungsgemäßen
      // Ablauf eines Skripts ausgegeben werden.
      E_NOTICE           => 'NOTICE',

      // Fatale Fehler, die beim Starten von PHP auftreten.
      // Diese sind ähnlich wie E_ERROR, nur dass diese Fehlermeldungen vom PHP-Kern erzeugt werden
      E_CORE_ERROR       => 'CORE ERROR',

      // Warnungen (keine fatalen Fehler), die beim Starten von PHP auftreten.
      // Diese sind ähnlich wie E_WARNING, nur dass diese Warnungen vom PHP-Kern erzeugt werden.
      E_CORE_WARNING     => 'CORE WARNING',

      // Fatale Fehler zur Übersetzungszeit. Diese sind ähnlich wie E_ERROR,
      // nur dass diese Fehlermeldungen von der Zend Scripting Engine erzeugt werden.
      E_COMPILE_ERROR    => 'COMPILE ERROR',

      // Warnungen zur Übersetzungszeit. Diese sind ähnlich wie E_WARNING,
      // nur dass diese Warnungen von der Zend Scripting Engine erzeugt werden.
      E_COMPILE_WARNING  => 'COMPILE WARNING',

      // Benutzerdefinierte Fehlermeldungen. Diese sind ähnlich wie E_ERROR, nur
      // dass diese Fehlermeldungen im PHP-Code mit trigger_error() erzeugt werden.
      E_USER_ERROR       => 'USER ERROR',

      // Benutzerdefinierte Warnungen. Diese sind ähnlich wie E_WARNING, nur dass
      // diese Warnungen im PHP-Code mit trigger_error() erzeugt werden.
      E_USER_WARNING     => 'USER WARNING',

      // Benutzerdefinierte Benachrichtigung. Diese sind ähnlich wie E_NOTICE,
      // nur dass diese Benachrichtigungen im PHP-Code mit trigger_error() erzeugt werden.
      E_USER_NOTICE      => 'USER NOTICE',

      // Benachrichtigungen des Laufzeitsystems. Damit erhalten Sie von PHP Vorschläge
      // für Änderungen des Programmcodes, die eine bestmögliche Interoperabilität und
      // zukünftige Kompatibilität Ihres Codes gewährleisten.
      E_STRICT           => 'STRICT',

      // Abfangbarer fataler Fehler. Dies bedeutet das ein potentiell gefährlicher
      // Fehler aufgetreten ist, die Engine aber nicht in einem instabilen Zustand hinterlassen hat.
      // Wird der Fehler nicht durch eine benutzerdefinierte Fehlerbehandlungsroutine abgefangen
      // (siehe auch set_error_handler()) so wird die Anwendung wie bei einem E_ERROR Fehler abgebrochen.
      E_RECOVERABLE_ERROR   => 'RECOVERABLE ERROR',

      // Notices zur Laufzeit des Programms. Aktivieren Sie diese Einstellung,
      // um Warnungen über Codebestandteile zu erhalten, die in zukünftigen
      // PHP-Versionen nicht mehr funktionieren werden.
      E_DEPRECATED          => 'DEPRECATED',

      // Benutzererzeugte Warnmeldung. Diese entspricht E_DEPRECATED mit der Ausnahme,
      // dass sie im PHP-Code durch die Verwendung der Funktion trigger_error() generiert wurde.
      E_USER_DEPRECATED     => 'USER DEPRECATED',
    );


    $time = microtime(true);

    $logString = '<div>';
    $logString .= '<p>'.$errorType[$errno].': '.$errstr.'</p>';
    $logString .= '<p>File: '.$errfile.'  Line:'.$errline.'</p>';


    ob_start();
    var_dump($errDump);
    $errDumpDump = ob_get_contents();
    ob_end_clean();
    $logString .= '<p>'.$errDumpDump.'</p>';

    $backTrace = debug_backtrace();

    $logString .= '</div>';



    if( !file_exists(PATH_GW.'log') )
    {
      if(!class_exists('SFilesystem'))
        include PATH_FW.'src/s/SFilesystem.php';

      SFilesystem::mkdir(PATH_GW.'log');
    }

    if(defined('WGT_ERROR_LOG'))
      $logFile = WGT_ERROR_LOG;
    else
      $logFile = 'log.html';

    SFiles::write( PATH_GW.'log/'.$logFile, $logString , 'a');

    // write the first error, easier for debugging cause of the huge amount of data
    // per error
    if( !self::$numPhpErrors )
    {
      SFiles::write( PATH_GW.'log/'.'first_'.$logFile, $logString , 'w' );
    }

    // increase the error number
    ++self::$numPhpErrors;

    return true;

  }//end public static function debugErrorHandler */


////////////////////////////////////////////////////////////////////////////////
// Bootstrap
////////////////////////////////////////////////////////////////////////////////

  /**
   * Das Basissystem soweit initialisieren
   * @return LibFlowApache
   */
  public static function initLight()
  {

    Conf::init();

    if( $timezone = Session::status('activ.timezone') )
      date_default_timezone_set( $timezone );
    else
      date_default_timezone_set( 'Etc/UCT' );

  }//end public static function initLight */


  /**
   * Das Basissystem soweit initialisieren
   * @return LibFlowApachemod
   */
  public static function init()
  {

    Conf::init();

    $conf = Conf::getInstance();

    foreach( $conf->initClasses as $class )
      $class::init(); // php > 5.3

    // if no controller is defined the framework FLow Handler does not start
    // and you can implement your own Flow/MVC Whatever Logicacl ApplicationFlow
    if( defined('WBF_CONTROLLER') )
    {
      $flowController = 'LibFlow'.ucfirst(WBF_CONTROLLER);
      self::$instance = new $flowController();

      if( 'Cli' == WBF_CONTROLLER )
      {
        self::$instance->init();

        $conf = Conf::getActive();

        if( $timezone = $conf->getStatus('activ.timezone') )
          date_default_timezone_set( $timezone );
        else
          date_default_timezone_set( 'Etc/UCT' );

        return self::$instance;

      }

    }

    $session = Session::getActive();

    if( $session->wakeup )
    {
      self::$instance->wakeup();

      if(Webfrap::loadable('WbfsysRoleUser_Entity'))
      {
        // try to login user, if user has an annonymous session
        $user = User::getActive();
        if( 1 == $user->getId() || !$user->getId() )
          $user->singleSignOn();
      }

    }
    else
    {

      self::$instance->init();

      if(Webfrap::loadable('WbfsysRoleUser_Entity'))
      {
        // try to sign on session start
        $user = User::getActive();
        $user->singleSignOn();
      }

    }


    ///TODO fetch timezone from os ( check if that works in win / mac )
    // set a timezone
    if( $timezone = Session::status('activ.timezone') )
      date_default_timezone_set( $timezone );
    else
      date_default_timezone_set( 'Etc/UCT' );

    return self::$instance;

  }//end public static function init */


  /**
   *
   * @param boolean $srcOnly
   */
  public static function announceIncludePaths( $path, $subPath = false, $srcOnly = false )
  {

    ///TODO find a solution how to add a hirachie

    if( is_dir( PATH_GW.'conf/include/'.$path )  )
    {
      $dModules = opendir( PATH_GW.'conf/include/'.$path );

      if ($dModules)
      {
         while( $mod = readdir($dModules) )
         {
            if($mod[0] == '.')
              continue;

            if( $subPath )
            {
              $mod = str_replace('.', '/', $mod);
            }

            syslog(LOG_WARNING, PATH_ROOT.$mod.'/module/');

            Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/src/';
            Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/module/';

            if(!$srcOnly)
            {
              View::$searchPathTemplate[] = PATH_ROOT.$mod.'/templates/default/';
              I18n::$i18nPath[] = PATH_ROOT.$mod.'/i18n/';
              Conf::$confPath[] = PATH_ROOT.$mod.'/conf/';
            }

         }

         // close the directory
         closedir($dModules);
      }
    }

  }//end public static function announceIncludePaths

  /**
   *
   * @param boolean $srcOnly
   */
  public static function loadModulePath(  $srcOnly = false )
  {

    ///TODO find a solution how to add a hirachie

    if( is_dir( PATH_GW.'conf/include/module' )  )
    {
      $dModules = opendir( PATH_GW.'conf/include/module' );

      if ($dModules)
      {
         while( $mod = readdir($dModules) )
         {
            if($mod[0] == '.')
              continue;

            Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/src/';
            Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/module/';

            if(!$srcOnly)
            {
              View::$searchPathTemplate[] = PATH_ROOT.$mod.'/templates/default/';
              I18n::$i18nPath[] = PATH_ROOT.$mod.'/i18n/';
              Conf::$confPath[] = PATH_ROOT.$mod.'/conf/';
            }

         }

         // close the directory
         closedir($dModules);
      }
    }

  }//end public static function loadModulePath


  /**
   *
   * Enter description here ...
   * @param boolean $srcOnly
   */
  public static function loadGmodPath(  $srcOnly = false )
  {

    ///TODO find a solution how to add a hirachie

    if( is_dir( PATH_GW.'conf/include/gmod' )  )
      $dModules = opendir( PATH_GW.'conf/include/gmod' );
    else
      return;

    if ($dModules)
    {
       while( $mod = readdir($dModules) )
       {
          if($mod[0] == '.')
            continue;

          Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/src/';
          Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/sandbox/src/';
          Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/module/';
          Webfrap::$autoloadPath[] = PATH_ROOT.$mod.'/sandbox/module/';

          if(!$srcOnly)
          {
            View::$searchPathTemplate[] = PATH_ROOT.$mod.'/templates/default/';
            View::$searchPathTemplate[] = PATH_ROOT.$mod.'/sandbox/templates/default/';

            I18n::$i18nPath[] = PATH_ROOT.$mod.'/i18n/';
            I18n::$i18nPath[] = PATH_ROOT.$mod.'/sandbox/i18n/';

            Conf::$confPath[] = PATH_ROOT.$mod.'/conf/';
            Conf::$confPath[] = PATH_ROOT.$mod.'/sandbox/conf/';
          }

       }

       // close the directory
       closedir($dModules);
    }

  }//end public static function loadGmodPath



  /**
   *
   * @param boolean $srcOnly
   */
  public static function getIncludePaths(  $key )
  {

    ///TODO find a solution how to add a hirachie
    $includePaths = array();

    if( is_dir( PATH_GW.'conf/include/'.$key )  )
    {
      $dModules = opendir( PATH_GW.'conf/include/'.$key );

      if ($dModules)
      {
         while( $mod = readdir($dModules) )
         {
            if($mod[0] == '.')
              continue;

            $includePaths[] = trim($mod);

         }

         // close the directory
         closedir($dModules);
      }
    }

    return $includePaths;

  }//end public static function loadModulePath


////////////////////////////////////////////////////////////////////////////////
// Informationen zu dem Systemstatus
////////////////////////////////////////////////////////////////////////////////

  /**
   * Enter description here...
   *
   * @return int
   */
  public static function activLang()
  {
    return self::$instance->getActivLang();
  }//end public static function activLang */

  /**
   * Das aktive Modul erfragen
   * @return Mod
   */
  public static function activMod()
  {
    return self::$instance->getActivMod();
  }//end public static function activMod */


  /**
   * Die Aktive Extension erfragen
   * @return Mex
   */
  public static function activController()
  {
    return self::$instance->getActivMod()->getActivController();
  }//end public static function activMex */


  /**
   * Enter description here...
   *
   * @param unknown_type $file
   * @param unknown_type $line
   * @param unknown_type $lastMessage
   */
  public static function panikShutdown($file, $line,  $lastMessage)
  {
    self::$instance->getActivMod()->panikShutdown($file, $line,  $lastMessage);
  }//end public static function panikShutdown */

  /**
   * Enter description here...
   *
   */
  public static function redirectToLogin()
  {
    self::$instance->redirectToLogin();
  }//end public static function redirectToLogin */

  /**
   * using a wrapper so you can write your own unique method
   *
   * @return string
   */
  public static function uniqid()
  {
    return uniqid(mt_rand(), true);
  }//end public static function uniqid */

  /**
   */
  public static function uuid($prefix = '')
  {

    $tmp = md5(uniqid(mt_rand(), true));

    return $prefix .substr($tmp,0,8).'-'.substr($tmp,8,4).'-'.substr($tmp,12,4)
      .'-'.substr($tmp,16,4).'-'.substr($tmp,20,12);

  }//end public static function uuid */

  /**
   * eine neue id aus der sequence erfragen
   *
   * @return int
   */
  public static function tmpid()
  {
    // fängt halt bei 1 an
    ++ self::$sequence;
    return 'tmp_'.self::$sequence;
  }//end public static function uniqid */

/*//////////////////////////////////////////////////////////////////////////////
// some content loaders, for content that can be in diffrent locations
//////////////////////////////////////////////////////////////////////////////*/

  /**
   * request a template path for a secific key
   */
  public static function templatePath(  $file , $type )
  {

    $key = $type.'/'.$file;

    if( isset( self::$tplIndex[$key] ) )
    {
      return self::$tplIndex[$key];
    }

    $tPath = View::$templatePath.'/'.$key.'.tpl';

    // Zuerst den Standard Pfad checken
    if( file_exists($tPath) )
    {
      // use realpath, its faster
      $tPath = realpath($tPath);

      self::$tplIndex[$key] = $tPath;
      self::$indexChanged   = true;

      return $tPath;
    }

    foreach( View::$searchPathTemplate as $path  )
    {

      $tmpPath = $path.'/'.$type.'/'.$file.'.tpl';

      if( file_exists( $tmpPath ) )
      {

        // use the realpath
        $tmpPath = realpath($tmpPath);

        self::$tplIndex[$key] = $tmpPath;
        self::$indexChanged   = true;

        return $tmpPath;
      }

    }

    return null;

  }//end public static function templatePath */


}//end class Webfrap


