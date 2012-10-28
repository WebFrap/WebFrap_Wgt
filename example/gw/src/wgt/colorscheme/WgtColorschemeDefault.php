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
 * Default Color Scheme for WebFrap
 * green:       #64b824;
 * grey:        #4D4D4D;
 * bggrey:      #f3f3f3;
 * hell blau:   #39aecf;
 * blau:        #1A6F9A;
 * black:       #ffffff;
 * white:       #000000;
 *
 * @package WebFrap
 * @subpackage WebFrap
 */
class WgtColorschemeDefault
  extends WgtColorscheme
{

  const WBF_BLUE      = '#1A6F9A';

  const WBF_GREEN     = '#64b824';

  const WBF_DARK_GREY = '#4D4D4D';

  const WBF_LIGHT_GREY = '#f3f3f3';

  const WHITE         = '#ffffff';

  const BLACK         = '#000000';

  const IMPORTANT     = '#800000';

  const LIGHT_BLUE    = '#39aecf';

  /**
   * (non-PHPdoc)
   * @see src/wgt/WgtColorscheme#load()
   */
  public function load()
  {

////////////////////////////////////////////////////////////////////////////////
// main colors
////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @var string
     */
    $this->color1 = self::WBF_BLUE;

    /**
     *
     * @var string
     */
    $this->color2 = self::WBF_GREEN;

    /**
     *
     * @var string
     */
    $this->color3 = self::WBF_DARK_GREY;

    /**
     *
     * @var string
     */
    $this->light      = self::WBF_LIGHT_GREY;

    /**
     *
     * @var string
     */
    $this->important  = self::IMPORTANT;


////////////////////////////////////////////////////////////////////////////////
// text colors
////////////////////////////////////////////////////////////////////////////////

    /**
     * default color for all texts, excluding links
     * @var string
     */
    $this->font         = self::BLACK;

    /**
     * default color for all texts, excluding links
     * @var string
     */
    $this->fontLight    = self::WBF_DARK_GREY;

    /**
     * textcolor of all links or link like actions including button text color
     * @var string
     */
    $this->link         = self::BLACK;

    /**
     * link color on hover
     * @var string
     */
    $this->linkHover    = self::WBF_GREEN;

////////////////////////////////////////////////////////////////////////////////
// head
////////////////////////////////////////////////////////////////////////////////

    /**
     * default color for headings
     * @var string
     */
    $this->heading       = self::WBF_GREEN;

////////////////////////////////////////////////////////////////////////////////
// backgrounds
////////////////////////////////////////////////////////////////////////////////

    /**
     * background of the browser background
     * @var string
     */
    $this->bgBody        = self::WHITE;

    /**
     * background of the head box
     * @var string
     */
    $this->bgHead        = self::WBF_BLUE;

    /**
     * background if the bottom box
     * @var string
     */
    $this->bgBottom      = self::WBF_BLUE;

    /**
     * background of the content box
     * @var string
     */
    $this->bgContent     = self::WHITE;

    /**
     * background of the main menu  box
     * @var string
     */
    $this->bgMenu        = self::WHITE;

    /**
     * color of the border if there is one to seperate the elements
     * @var string
     */
    $this->layoutBorder  = self::WBF_BLUE;

////////////////////////////////////////////////////////////////////////////////
// elements
////////////////////////////////////////////////////////////////////////////////

    /**
     * default collor for borders wherever they are
     * @var string
     */
    $this->defBorder      = self::WBF_BLUE;

    /**
     * default collor for borders wherever they are
     * @var string
     */
    $this->lightBorder      = self::WBF_LIGHT_GREY;

////////////////////////////////////////////////////////////////////////////////
// layout
////////////////////////////////////////////////////////////////////////////////

    $this->bgBox          = self::WHITE;

////////////////////////////////////////////////////////////////////////////////
// forms
////////////////////////////////////////////////////////////////////////////////

    /**
     * color for the fieldset border and the element
     * @var string
     */
    $this->fieldset       = self::WBF_BLUE;

    /**
     * font collor for input elements
     * @var string
     */
    $this->input          = self::BLACK;

    /**
     * font color for label elements
     * @var string
     */
    $this->label          = self::BLACK;

    /**
     * bordercolor for input elements
     * @var string
     */
    $this->borderInput    = self::WBF_BLUE;

    /**
     * background for input elements
     * @var string
     */
    $this->bgInput        = self::WHITE;


    /**
     * font collor for readonly input elements
     * @var string
     */
    $this->inputRo        = self::WBF_BLUE;

    /**
     * font color for readonly label elements
     * @var string
     */
    $this->labelRo        = self::BLACK;

    /**
     * bordercolor for readonly input elements
     * @var string
     */
    $this->borderInputRo  = self::WBF_BLUE;

    /**
     * background for readonly input elements
     * @var string
     */
    $this->bgInputRo      = self::WBF_LIGHT_GREY;

////////////////////////////////////////////////////////////////////////////////
// buttons
////////////////////////////////////////////////////////////////////////////////

    /**
     * font color for label elements
     * @var string
     */
    $this->button         = self::WBF_BLUE;

    /**
     * bordercolor for input elements
     * @var string
     */
    $this->borderButton   = self::WBF_BLUE;

    /**
     * background for input elements
     * @var string
     */
    $this->bgButton       = self::WHITE;

    /**
     * font color for label elements
     * @var string
     */
    $this->buttonHover    = self::WBF_GREEN;

    /**
     * bordercolor for input elements
     * @var string
     */
    $this->borderButtonHover  = self::WBF_GREEN;

    /**
     * background for input elements
     * @var string
     */
    $this->bgButtonHover    = self::WHITE;

    /**
     * font color for label elements
     * @var string
     */
    $this->buttonInactiv    = self::WBF_BLUE;

    /**
     * bordercolor for input elements
     * @var string
     */
    $this->borderButtonInactiv  = self::WBF_BLUE;

    /**
     * background for input elements
     * @var string
     */
    $this->bgButtonInactiv   = self::WBF_LIGHT_GREY;

////////////////////////////////////////////////////////////////////////////////
// semantic color
////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @var string
     */
    $this->god       = self::WBF_GREEN;

    /**
     *
     * @var string
     */
    $this->bgGod     = self::LIGHT_BLUE;

    /**
     *
     * @var string
     */
    $this->average   = self::IMPORTANT;

    /**
     *
     * @var string
     */
    $this->bgAverage = self::WBF_LIGHT_GREY;

    /**
     *
     * @var string
     */
    $this->bad       = self::IMPORTANT;

    /**
     *
     * @var string
     */
    $this->bgBad     = self::WBF_LIGHT_GREY;

////////////////////////////////////////////////////////////////////////////////
// message color
////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @var string
     */
    $this->notice    = self::WBF_GREEN;

    /**
     *
     * @var string
     */
    $this->bgNotice  = self::LIGHT_BLUE;

    /**
     *
     * @var string
     */
    $this->warning   = self::IMPORTANT;

    /**
     *
     * @var string
     */
    $this->bgWarning = self::WBF_LIGHT_GREY;

    /**
     *
     * @var string
     */
    $this->error     = self::IMPORTANT;

    /**
     *
     * @var string
     */
    $this->bgError   = self::WBF_LIGHT_GREY;

  }

} // end class WgtColorschemeDefault


