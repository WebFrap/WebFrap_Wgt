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
class LibCacheRequestTheme
  extends LibCacheRequest
{
////////////////////////////////////////////////////////////////////////////////
// Attribute
////////////////////////////////////////////////////////////////////////////////

  /**
   * the folder where to cache the assembled css files
   * @var string
   */
  protected $folder = 'cache/theme/';

  /**
   * the content type for the header
   * @var string
   */
  protected $contentType = 'text/css';

////////////////////////////////////////////////////////////////////////////////
// Methode
////////////////////////////////////////////////////////////////////////////////



  /**
   * @param string $list
   */
  public function publishFile( $file )
  {

    $map = array();
    include PATH_GW.'/conf/include/theme/files.map.php';

    if( !isset( $map[$file] )  )
    {
      header('HTTP/1.0 404 Not Found');
      return;
    }

    ob_start();

    include $map[$file];

    $variables = array();

    if( file_exists( PATH_GW.'conf/conf.style.default.php' ) )
      include PATH_GW.'conf/conf.style.default.php';

    $tmpVar = array();
    foreach( $variables as $key => $val  )
      $tmpVar['@{'.$key.'}'] = $val;

    $code = ob_get_contents();
    $code = str_replace( array_keys($tmpVar), array_values($tmpVar),  $code   );
    ob_end_clean();

    $codeEtag = md5($code);

    if( !file_exists( PATH_GW.$this->folder.'/file/' ) )
      SFilesystem::createFolder( PATH_GW.$this->folder.'/file/' );

    file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.plain' ,  $code );
    file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.plain.md5' ,  $codeEtag );

    $encode = function_exists('gzencode') ? !DEBUG : false;


    if( $encode )
    {

      $encoded      = gzencode( $code );
      $encodedEtag  = md5( $encoded );

      file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.gz' ,  $encoded );
      file_put_contents( PATH_GW.$this->folder.'/file/'.$file.'.gz.md5' ,  $encodedEtag );

    }

    if
    (
      isset($_SERVER['HTTP_ACCEPT_ENCODING'])
        && strstr ($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')
        && DEBUG
    )
    {
      // Tell the browser the content is compressed with gzip
      header ("Content-Encoding: gzip");
      $out  = $encoded;
      $etag = $encodedEtag;
    }
    else
    {
      $out = $code;
      $etag = $codeEtag;
    }

    header('content-type: '. $this->contentType );
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

    $theme        = Session::status('activ.theme');
    $layoutType   = Session::status('default.layout');

    if( trim($theme) == '' )
      $theme = 'default';
    
    /*
    $layoutClass  = 'WgtLayout'.ucfirst($theme);
         
    if(WebFrap::classLoadable( $layoutClass ))
    {
      $layout = new $layoutClass( $layoutType );
    }
    else if( WebFrap::classLoadable( 'WgtLayoutDefault' ) )
    {
      echo '/* WARNING FAILED TO LOAD THE THEME: '.$layoutClass.' Fallback to Default * /'.NL;
      $layout = new WgtLayoutDefault( $layoutType );
    }
    else
    { 
      echo '/* WARNING FAILED TO LOAD THE THEME: '.$layoutClass.'* /'.NL;
      //return;
    }
    */

    ob_start();

    include PATH_GW.'conf/include/theme/'.$list.'.list.php';

    $code = ob_get_contents();
    //$code = str_replace( array_keys($tmpVar) , array_values($tmpVar),  $code   );
    ob_end_clean();

    //$code = JSMin::minify( $code );

    $codeEtag = md5($code);

    if( !file_exists( PATH_GW.$this->folder.'/list/' ) )
      SFilesystem::createFolder( PATH_GW.$this->folder.'/list/'  );

    file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.plain' ,  $code );
    file_put_contents( PATH_GW.$this->folder.'/list/'.$list.'.plain.md5' ,  $codeEtag );

    $encode = function_exists('gzencode') ? !DEBUG : false;

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
        && $encode
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

    header('content-type: '. $this->contentType  );
    header('ETag: '.$etag );
    header('Content-Length: '.strlen( $out ));
    header('Expires: Thu, 13 Nov 2179 00:00:00 GMT' );
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0' );

    echo $out;

  }//end public function publishList */

} // end class LibCacheRequestCss
