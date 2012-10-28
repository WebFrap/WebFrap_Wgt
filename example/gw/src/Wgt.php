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
 * Kleine Klasse mit nützlichen Minifunktion zum erstellen von XHTML
 * sowie Container für Metadaten für das WGT PHP Backend
 *
 * @package WebFrap
 * @subpackage WebFrap
 */
class Wgt
{
////////////////////////////////////////////////////////////////////////////////
// Constantes
////////////////////////////////////////////////////////////////////////////////

  /*
  const ACTION_EDIT     = 'edit';

  const ACTION_CREATE   = 'create';

  const ACTION_DELETE   = 'delete';

  const ACTION_READ     = 'read';

  const ACTION_ADD      = 'add';
  */
  
////////////////////////////////////////////////////////////////////////////////
// Controller Element Actions
////////////////////////////////////////////////////////////////////////////////

  /**
   * Dieses Element enthält Daten für eine Paging Aktion
   * @var int
   */
  const ACTION_PAGING     = 1;

  /**
   * Dieses Element führt on click javascript aus.
   * Das HTML Tag ist ein Button
   * @var int
   */
  const ACTION_JS         = 2;

  /**
   * Dieses Element ist eine normale URL, kein ajax request
   * @var int
   */
  const ACTION_URL        = 3;

  /**
   * Dieses Element ist ein normaler Link, der jedoch per Javascript
   * zu einem Ajax Request umgebaut wird.
   *
   * Wenn kein Javascript aktiviert ist wird ein normaler request geschickt
   *    *
   * @var int
   */
  const ACTION_AJAX_GET   = 4;

  /**
   * Dieses Controll Element ist eine Checkbox. Auf dieser Checkbox liegen
   * Standardmäßig keine Events, können jedoch bei bedarf hinzugefügt
   * werden
   *
   * @var int
   */
  const ACTION_CHECKBOX   = 5;

  /**
   * Der Link wird als GET Request onClick auf das Button Element gelegt
   * @var int
   */
  const ACTION_BUTTON_GET = 7;

  /**
   * @var int
   */
  const ACTION_DELETE = 8;

  /**
   * Separator button
   * @var int
   */
  const ACTION_SEP = 9;

  /**
   * Der Button schickt einen POST Request mit einem Databody
   * @var int
   */
  const ACTION_BUTTON_POST = 10;
  
  /**
   * Der Button schickt einen PUT Request mit einem Databody
   * @var int
   */
  const ACTION_BUTTON_PUT = 11;

////////////////////////////////////////////////////////////////////////////////
// Menu Types
////////////////////////////////////////////////////////////////////////////////

  /**
   * de:
   * type des buttons
   * @var int
   */
  const BUTTON_TYPE = 0;

  /**
   * de:
   * label des buttons
   * @var int
   */
  const BUTTON_LABEL = 1;


  /**
   * de:
   * die action, url, js, event oder was auch immer bestimmt was genau
   * der Button später machen soll
   * @var int
   */
  const BUTTON_ACTION = 2;

  /**
   * de:
   * Das Icon des Buttons
   * @var int
   */
  const BUTTON_ICON = 3;

  /**
   * de:
   * Button Properties, also Eigenschaften des Buttons in form von
   * CSS Klassen
   * @var int
   */
  const BUTTON_PROP = 4;

  /**
   * de:
   * I18N Repo der texte auf dem button
   * @var int
   */
  const BUTTON_I18N = 5;

  /**
   * de:
   * der Access Level der nötig ist im den button anzeigen zu lassen
   * @var int
   */
  const BUTTON_ACCESS = 6;
  
  /**
   * Der Maximal level der vorhanden sein darf, um den eintrag an zu zeigen
   * @var int
   */
  const BUTTON_MAX_ACCESS = 7;
  
  /**
   * Array mit den Parametern für einen Databody
   * @var int
   */
  const BUTTON_PARAMS = 8;
  
  /**
   * Array mit den Parametern für einen Databody
   * @var int
   */
  const BUTTON_CONFIRM = 9;
  
  /**
   * Eine annonyme Checkfunction
   * Gibt die Function true zurück wird der Button gerendert
   * sonst nicht
   * @var int
   */
  const BUTTON_CHECK = 10;

////////////////////////////////////////////////////////////////////////////////
// Menu Types
//
// Types von Menu Buttons
////////////////////////////////////////////////////////////////////////////////

  const URL         = 1;

  const ACTION      = 2;

  const AJAX        = 3;

  const WINDOW      = 4;

  const SUB_WINDOW  = 5;

  const MAIN_WINDOW = 6;

  const MAIN_TAB    = 7;

////////////////////////////////////////////////////////////////////////////////
// Classes for WGT Replacements
////////////////////////////////////////////////////////////////////////////////

  const CLASS_PREFIX    = 'wgt_';

////////////////////////////////////////////////////////////////////////////////
// Else
////////////////////////////////////////////////////////////////////////////////

  const XML_HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";

////////////////////////////////////////////////////////////////////////////////
// Attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @var array
   */
  public static $wgt = array();

  /**
   *
   * @var int
   */
  public static $defListSize = 50;
  
  const LIST_SIZE_CHUNK = 50;

  /**
   *
   * @var int
   */
  public static $maxListSize = 500;

////////////////////////////////////////////////////////////////////////////////
// Tags and Items
////////////////////////////////////////////////////////////////////////////////

  /**
   * create a selectbox
   *
   * @param string $name
   * @param boolean $checked
   * @param array $attributes
   * @param boolean $ro
   * @return unknown
   */
  public static function checkbox( $name , $checked , $attributes = array() , $ro = false )
  {

    $checked = ( $checked && $checked != 'f' )   ? ' checked="checked" ':'';
    $ro =  $ro ? ' disabled="disabled" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgtid_check_'.uniqid();

    $attr = self::asmAttributes($attributes);

    return '<input type="checkbox" name="'.$name.'" '.$checked.' '.$attr.' '.$ro.' />';

  }//end public static function checkbox */

  /**
   * create a selectbox
   *
   * @param string $name
   * @param array $attributes
   * @param boolean $ro
   * @return unknown
   */
  public static function file( $name , $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' disabled="disabled" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgtid_check_'.uniqid();

    $attr = self::asmAttributes($attributes);

    return '<input type="file" name="'.$name.'" '.$attr.' '.$ro.' />';

  }//end public static function file */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function input( $name , $value = '',  $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgtid_input_'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="text" name="'.$name.'" value="'.$value.'" '.$attr.' '.$ro.' />';

  }//end public static function input */

  /**
   * 
   * /
  public static function inputBox( $name , $value, $label , $subName = null )
  {

    if($subName)
      $inpName = $subName."[$name]";

    $html = <<<CODE

<div id="wgt_box_{$name}">
  <label for="wgt-input-{$name}" class="wgt-label">{$label}</label>
  <div class="wgt-input" >
    <input type="text" value="{$value}" class="medium" id="wgt-input-{$name}" name="{$inpName}" />
  </div>
</div>

CODE;

    return $html;

  }//end public static function inputBox */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function password( $name , $value = '',  $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgtid_input_'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="password" name="'.$name.'" value="'.$value.'" '.$attr.' '.$ro.' />';

  }//end public static function password */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function inputImage( $name , $src, $value = '',  $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgtid_input_'.uniqid();

    $src = WEB_ICONS.'icons/default/xsmall/'.$src;

    $attr = self::asmAttributes( $attributes );

    return '<span '.$attr.' ><img src="'.$src.'" name="'.$name.'" '.$ro.' />'.$value.'</span>';

  }//end public static function inputImage */

  /**
   * Enter description here...
   *
   * @param string $value
   * @param array $attributes
   * @param boolean $ro
   * @return string
   */
  public static function submit( $value , $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt_submit_'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="submit" class="wgt-button submit" value="'.$value.'" '.$attr.' '.$ro.' />';

  }//end public static function submit */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function button( $value , $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt_submit_'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<button class="wgt-button" '.$attr.' '.$ro.' >'.$value.'</button>';

  }//end public static function button */


  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function fakeButton( $value , $href , $attributes = array() )
  {

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt-button_'.uniqid();

    if( isset( $attributes['class'] )  )
      $attributes['class'] .= ' wgt-button';
    else
      $attributes['class'] = 'wgt-button';

    $attr = self::asmAttributes( $attributes );

    return '<a href="'.$href.'" '.$attr.'  >'.$value.'</a>';

  }//end public static function button */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function reset( $value , $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt_submit_'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="reset" class="wgt-button submit" value="'.$value.'" '.$attr.' '.$ro.' />';

  }//end public static function reset */

  /**
   * create an input field
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function hidden( $name , $value = '',  $attributes = array()  )
  {

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt-input-'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="hidden"  name="'.$name.'" value="'.$value.'" '.$attr.' />';

  }//end public static function hidden */

  /**
   * create a textarea
   *
   * @param string $name
   * @param string $value
   * @param array $attributes
   * @return string
   */
  public static function textarea( $name , $value = '',  $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt-input-'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<textarea type="text" name="'.$name.'" '.$attr.' '.$ro.' />'.$value.'</textarea>';

  }//end public static function textarea */



  /**
   *
   * @author Celine Bonsch
   * @param $name
   * @param $size
   * @param $alt
   */
  public static function icon( $name, $size, $attributes = array() )
  {
    if($attributes)
    {
      if( is_array($attributes) )
      {
        $attr = self::asmAttributes( $attributes );
      }
      else
      {
        $attr = ' alt="'.$attributes.'" ';
      }
    }
    else
    {
      $attr = '';
    }

    $src  = WEB_ICONS.'default/'.$size.'/'.$name;
    $html = '<img src="'.$src.'" '.$attr.' class="icon '.$size.'" />';

    return $html;

  }//end public static function icon */

  /**
   * @param string $src
   * @param array $attributes
   */
  public static function image( $src , $attributes = array() , $tempPath = false )
  {
    if( !isset($attributes['alt']) )
    {
      $attributes['alt'] = 'nondescriped image';
    }

    if( $attributes )
    {
      $attr = self::asmAttributes( $attributes );
    }
    else
    {
      $attr = '';
    }

    if( $tempPath )
      $src = WEB_THEME.'images/'.$src;

    $html = '<img src="'.$src.'" '.$attr.' />'.NL;

    return $html;
  }//end public static function image */

  /**
   * @param string $src
   * @param array $attributes
   */
  public static function imageSrc( $src  )
  {
    return  WEB_THEME.'images/'.$src;
  }//end public static function imageSrc */

  /**
   *
   * @param $id
   * @param $path
   * @param $thumb
   * @param $attributes
   * @return unknown_type
   */
  public static function idImage( $id, $path, $thumb = true, $attributes = array() )
  {

    $idPath = SParserString::getCachePath($id);

    if( $thumb )
      $thumb = '/thumb';

    else
      $thumb = '/picture';

    $src = $path.$thumb.$idPath.$id.'.jpg';

    if(!file_exists($src))
    {
      $src = WEB_THEME.'images/wgt/not_available.png';
      $attributes['alt'] = 'This is just a placeholder, cause there is no original pic';
    }

    if(!isset($attributes['alt']))
      $attributes['alt'] = 'nondescriped image';

    if($attributes)
    {
      $attr = self::asmAttributes( $attributes );
    }
    else
    {
      $attr = '';
    }

    return '<img src="'.$src.'" '.$attr.' />'.NL;

  }//end public static function idImage */

  /**
   *
   * @param $name
   * @param $value
   * @param $attributes
   * @param $ro
   * @return unknown_type
   */
  public static function date( $name , $value = '',  $attributes = array() , $ro = false )
  {

    $ro =  $ro ? ' readonly="readonly" ':'';

    if( $ro )
      $onclick = '';
    else
      $onclick = 'onclick="$S(this).datePicker()"';

    // add the date validator for datepicker
    if( !isset($attributes['class']) )
      $attributes['class'] = 'medium valid_date';
    else
      $attributes['class'] += ' valid_date';

    if(! isset( $attributes['id'] )  )
      $attributes['id'] = 'wgt-input-'.uniqid();

    $attr = self::asmAttributes( $attributes );

    return '<input type="text" name="'.$name.'" value="'.$value.'" '.$attr.' '.$ro.' />';

  }//end public static function date */

  /**
   * surround with script tags
   *
   * @param string $html
   */
  public static function jsTag($html)
  {
    return '<script type="text/javascript" >'.NL.$html.'</script>'.NL;
  }//end public static function jsTag */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function cssTag($html)
  {
    return '<style type="text/css" >'.NL.$html.'</style>'.NL;
  }//end public static function cssTag */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function urlTag($url , $text = null, $attribues = array() ,  $target = null )
  {
    $target = $target?'target="'.$target.'"':'';

    if( is_string($attribues) )
      $attribues = $attribues?'class="'.$attribues.'"':'';
    else
      $attribues = $attribues?self::asmAttributes($attribues):'';

    if( trim($url) == '' )
    {
      return '';
    }
    else
    {

      if(is_null($text))
        $text = $url;

      return '<a '.$target.' '.$attribues.' href="'.$url.'">'.$text.'</a>'.NL;
    }

  }//end public static function urlTag */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function mailTag( $url , $text = null )
  {
    if( trim($url) == '' )
    {
      return '';
    }
    else
    {

      if(is_null($text))
        $text = trim($url);

      return '<a href="mailto:'.trim($url).'">'.$text.'</a>'.NL;
    }
  }//end public static function mailTag */

  /**
   * Enter description here...
   *
   * @param string $data
   * @return string
   */
  public static function cdata( $data )
  {
    return '<![CDATA['.$data.']]>';
  }//end public static function cdata */

  /**
   * Enter description here...
   *
   * @param string $data
   * @return string
   */
  public static function tag( $data , $tagName )
  {
    return '<'.$tagName.'>'.$data.'</'.$tagName.'>';
  }//end public static function tag */

  /**
   * Enter description here...
   *
   * @param string $data
   * @return string
   */
  public static function labeldElement( $label , $content )
  {
    return '<div class="wgt_box">
      <label class="wgt-label" >'.$label.'</label>
      <div class="wgt-input" >'.$content.'</div>
      </div>';
    
    /*
    if( $attributes )
      $this->attributes = array_merge($this->attributes,$attributes);

    // ist immer ein text attribute
    $this->attributes['type']= 'text';

    $id = $this->getId();

    $required = $this->required?'<span class="wgt-required" >*</span>':'';

    $html = '<div class="wgt_box input" id="wgt-box-'.$id.'" >
      <label class="wgt-label" for="'.$id.'" >'.$this->label.' '.$required.'</label>
      <div class="wgt-input '.$this->width.'" >'.$this->element().'</div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>'.NL;

    return $html; 
     */
    
  }//end public static function labeldElement */

  /**
   * Enter description here...
   *
   * @param string $data
   * @return string
   */
  public static function inputBox( $id, $label, $input, $attributes = array() )
  {
    
    if( 'input' != $input[0] )
    {
      
      $stackAttr = array();
      
      $input[2]['id'] = $id;

      foreach( $input[2] as $key => $value )
      {
        $stackAttr[] = "{$key}=\"{$value}\"";
      }
      
      $codeAttr = implode( ' ', $stackAttr );
      
      $content = '<'.$input[0]." '.$codeAttr.' >".$input[1]."</>";
    }
    else 
    {
      $stackAttr = array();

      $input[1]['id'] = $id;
      
      foreach( $input[1] as $key => $value )
      {
        $stackAttr[] = "{$key}=\"{$value}\"";
      }
      
      $codeAttr = implode( ' ', $stackAttr );
      
      $content = '<input '.$codeAttr.' />';
    }

    return '<div class="wgt_box" id="wgt-box-'.$id.'" >
        <label class="wgt-label"  >'.$label.'</label>
        <div class="wgt-input" >'.$content.'</div>
        <div class="wgt-clear tiny" >&nbsp;</div>
      </div>';
    
    /*
    if( $attributes )
      $this->attributes = array_merge($this->attributes,$attributes);

    // ist immer ein text attribute
    $this->attributes['type']= 'text';

    $id = $this->getId();

    $required = $this->required?'<span class="wgt-required" >*</span>':'';

    $html = '<div class="wgt_box input" id="wgt-box-'.$id.'" >
      <label class="wgt-label" for="'.$id.'" >'.$this->label.' '.$required.'</label>
      <div class="wgt-input '.$this->width.'" >'.$this->element().'</div>
      <div class="wgt-clear tiny" >&nbsp;</div>
    </div>'.NL;

    return $html; 
     */
    
  }//end public static function labeldElement */
 

  /**
   * @param string $string
   */
  public static function clean( $string )
  {
    return htmlspecialchars(stripslashes($string),ENT_QUOTES,'UTF-8');
  }//end public static function clean */

  /**
   * @param string $string
   */
  public static function out( $string )
  {
    echo nl2br(htmlspecialchars(stripslashes($string),ENT_QUOTES,'UTF-8'));
  }//end public static function out */

  /**
   * @param string $url
   */
  public static function renderUrl( $url )
  {
    
    $start = mb_substr( $url, 0, 2 );
    
    if( $start === '\\\\' )
      return 'file://///'.str_replace('\\\\', '\\', substr( $url, 4 ));
    else
      return $url;
      
  }//end public static function renderUrl */
  
////////////////////////////////////////////////////////////////////////////////
// Tag Attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function checked( $cond , $status )
  {
    return $cond == $status ? 'checked="checked"':'';
  }//end public static function checked  */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function isHidden( $cond , $status )
  {
    return $cond == $status ? '':' hidden ';
  }//end public static function isHidden  */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function isDisabled( $cond )
  {
    return $cond ? ' disabled="disabled" ':'';
  }//end public static function isDisabled  */

  /**
   * surround with style tags
   *
   * @param string $html
   */
  public static function isChecked( $cond )
  {
    return $cond ? ' checked="checked" ':'';
  }//end public static function isChecked  */

////////////////////////////////////////////////////////////////////////////////
// protected inner logic
////////////////////////////////////////////////////////////////////////////////

  /**
   * assemble the attributes
   * @return String
   */
  protected static function asmAttributes( $attributes )
  {
    $html = '';

    foreach( $attributes as $key => $value )
      $html .= $key.'="'.$value.'" ';

    return $html;

  }// end protected function asmAttributes  */


}//end class Wgt

