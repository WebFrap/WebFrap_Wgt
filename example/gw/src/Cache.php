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
 * class Cache
 * @package WebFrap
 * @subpackage WebFrap
 */
class Cache
{

  /**
   * an hour is average long
   * @var int
   */
  const SHORT   = 600;

  /**
   * an hour is average long
   * @var int
   */
  const MEDIUM  = 3600;

  /**
   * a week is long
   * @var int
   */
  const LONG    = 604800;

  /**
   * @var int
   */
  const MINUTE  = 60;

  /**
   * @var int
   */
  const HOUR    = 3600;

  /**
   * @var int
   */
  const DAY     = 86400;

  /**
   * @var int
   */
  const WEEK    = 604800;

  /**
   * @var int
   */
  const MONTH   = 2592000;

  /**
   * @var int
   */
  const YEAR    = 31536000;

  /**
   * @var int
   */
  const INFINITIY = 'inf';


////////////////////////////////////////////////////////////////////////////////
// Attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @var Cache
   */
  protected static $instance = null;


  /**
   *
   * @var LibCacheAdapter
   */
  protected $level1 = null;

  /**
   *
   * @var LibCacheAdapter
   */
  protected $level2 = null;

////////////////////////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   */
  public function __construct( $conf = null )
  {

    if(!$conf)
      $conf = Conf::get('cache');

    if( isset($conf[1]) )
    {
      $class = 'LibCache'.ucfirst($conf[1]['class']);

      if( !Webfrap::loadable( $class ))
      {
        throw new WebfrapFlow_Exception( 'Wrong Configuration' );
      }
      $this->level1 = new $class($conf[1]);
    }

    if( isset($conf[2]) )
    {
      $class = 'LibCache'.ucfirst($conf[2]['class']);

      if( !Webfrap::loadable( $class ))
      {
        throw new WebfrapFlow_Exception( 'Wrong Configuration' );
      }

      $this->level1 = new $class($conf[2]);
    }

  }//end public function __construct()

////////////////////////////////////////////////////////////////////////////////
// static Logic
////////////////////////////////////////////////////////////////////////////////

  /**
   * @return cache
   */
  public static function getInstance()
  {
    self::$instance ? self::$instance : self::createInstance();
    return self::$instance;
  }

  public static function createInstance()
  {
    self::$instance = new Cache();
  }

  /**
   * initialize The Caching System
   *
   * @return void
   */
  public static function init( )
  {

    self::$instance = new Cache();

  }// end public static function init( )

  /**
   * initialize The Caching System
   *
   * @return void
   */
  public static function shutdown( )
  {

  }//end public static function shutdown( )

////////////////////////////////////////////////////////////////////////////////
// getter and setter
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @return LibCacheAdapter
   */
  public function getLevel1()
  {
    return $this->level1;
  }

  /**
   *
   * @return LibCacheAdapter
   */
  public function getLevel2()
  {
    return $this->level2;
  }

////////////////////////////////////////////////////////////////////////////////
// Cache Methodes
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @param $key
   * @return mixed
   */
  public function get( $key )
  {

    if( $this->level1 )
    {
      $cached = $this->level1->get($key);

      if( is_null($cached && $this->level2 )  )
      {
        return $this->level2->get($key);
      }

      return $cached;
    }

    return null;

  }//end public function get( $key )

  /**
   *
   * @param $key
   * @param $data
   * @return unknown_type
   */
  public function add( $key , $data )
  {
    if( $this->level1 )
    {
      $this->level1->add( $key , $data );
    }
    if( $this->level2 )
    {
      $this->level2->add( $key , $data );
    }
  }//end public function add( $key , $data )

  /**
   *
   * @param $key
   * @return unknown_type
   */
  public function exists( $key )
  {
    if( $this->level1 )
    {
      $cached = $this->level1->exists($key);
      if( !$cached && $this->level2 )
      {
        return $this->level2->exists($key);
      }
      return $cached;
    }
  }//end public function exists( $key )

  /**
   *
   * @param $key
   * @return unknown_type
   */
  public function remove( $key )
  {
    if( $this->level1 )
    {
      $this->level1->remove( $key );
    }
    if( $this->level2 )
    {
      $this->level2->remove( $key );
    }
  }//end public function remove( $key )


} // end class Cache


