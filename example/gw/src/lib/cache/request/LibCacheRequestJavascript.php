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
 * @package WebFrap
 * @subpackage WebFrap
 */
class LibCacheRequestJavascript
  extends LibCacheRequest
{
////////////////////////////////////////////////////////////////////////////////
// Attribute
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @var string
   */
  protected $folder = 'cache/javascript/';

  /**
   *
   * @var string
   */
  protected $contentType = 'text/javascript';

////////////////////////////////////////////////////////////////////////////////
// Methode
////////////////////////////////////////////////////////////////////////////////

  /**
   * @param string $list
   */
  public function publishFile( $file )
  {

    $map = array();
    include PATH_GW.'/conf/include/javascript/files.map.php';

    if( !isset( $map[$file] )  )
    {
      header('HTTP/1.0 404 Not Found');
      return;
    }

    $code = file_get_contents( $map[$file] );

    if( !DEBUG && Webfrap::classLoadable('LibVendorJsmin') )
    {
      $minifier = LibVendorJsmin::getInstance();
      $code = $minifier->minify( $code );
    }


    $codeEtag = md5($code);

    if( !file_exists( PATH_GW.$this->folder.'/file/' ) )
      SFilesystem::createFolder( PATH_GW.$this->folder.'/file/' );

    file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.plain' ,  $code );
    file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.plain.md5' ,  $codeEtag );

    $encode = function_exists('gzencode') ? !DEBUG : false;

    if( $encode )
    {

      $encoded = gzencode( $code );
      $encodedEtag = md5( $encoded );

      file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.gz' ,  $encoded );
      file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.gz.md5' ,  $encodedEtag );

    }

    if( isset($_SERVER['HTTP_ACCEPT_ENCODING'])
      && strstr ($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') )
    {
      // Tell the browser the content is compressed with gzip
      header ("Content-Encoding: gzip");
      $out = $encoded;
      $etag = $encodedEtag;
    }
    else
    {
      $out = $code;
      $etag = $codeEtag;
    }

    header('content-type: text/javascript');
    header('ETag: '.$etag );
    header('Content-Length: '.strlen( $out ));
    header('Expires: Thu, 13 Nov 2179 00:00:00 GMT' );
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0' );

    echo $out;

  }//end public function publishFile */

  /**
   * @param string $list
   */
  public function publishList( $list )
  {

    $files  = array();
    $jsconf = null;

    $code = '';

    ob_start();
    include PATH_GW.'/js_conf/conf.js';
    $code = ob_get_contents();
    ob_end_clean();

    include PATH_GW.'/conf/include/javascript/'.$list.'.list.php';

    foreach( $files as $file )
      $code .= file_get_contents( $file ).NL;

    if(!DEBUG && Webfrap::classLoadable('LibVendorJsmin') )
    {
      $minifier = LibVendorJsmin::getInstance();
      $code = $minifier->minify( $code );
    }

    $codeEtag = md5($code);

    if( !file_exists( PATH_GW.$this->folder.'/list/' ) )
      SFilesystem::createFolder( PATH_GW.$this->folder.'/list/'  );

    file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.plain' ,  $code );
    file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.plain.md5' ,  $codeEtag );

    $encode = function_exists('gzencode') ? true : false;

    if( $encode )
    {
      $encoded = gzencode( $code );
      $encodedEtag = md5( $encoded );

      file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.gz' ,  $encoded );
      file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.gz.md5' ,  $encodedEtag );
    }

    if
    (
      isset($_SERVER['HTTP_ACCEPT_ENCODING'])
        && strstr ($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')
        && !DEBUG
    )
    {
      // Tell the browser the content is compressed with gzip
      header ("Content-Encoding: gzip");
      $out = $encoded;
      $etag = $encodedEtag;
    }
    else
    {
      $out = $code;
      $etag = $codeEtag;
    }

    header('content-type: text/javascript');
    header('ETag: '.$etag );
    header('Content-Length: '.strlen( $out ));
    header('Expires: Thu, 13 Nov 2179 00:00:00 GMT' );
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0' );

    echo $out;

  }//end public function publishList */

} // end class LibCacheRequestJavascript
