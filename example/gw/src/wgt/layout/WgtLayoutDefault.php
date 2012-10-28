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
class WgtLayoutDefault
  extends WgtLayout
{
////////////////////////////////////////////////////////////////////////////////
// attributes
////////////////////////////////////////////////////////////////////////////////

  /**
   *
   */
  /**
   *
   */
  public function __construct( $type = null )
  {

    parent::__construct( $type );

    $this->color = new WgtColorschemeDefault();
    $this->load();


  }//end public function __construct */


  /**
   */
  public function load( )
  {

    $this->textSize   = 12;
    $this->pageWidth  = 953;

    $this->pathImage  = View::$webImages;
    $this->pathIcon   = View::$webIcons;

    // all
    $this->all->text->color         = $this->color->font;
    $this->all->text->size          = $this->textSize;
    $this->all->text->sizeUnit      = 'px';
    $this->all->text->family        = 'Verdana';
    $this->all->text->weight        = 'normal';
    $this->all->text->decoration    = 'none';


    // body background
    $this->body->background->color  = $this->color->bgBody;

    // headings
    $this->heading->text->weight         = 'bold';
    $this->heading->text->color          = $this->color->heading;
    $this->heading->text->letterSpacing  = '0.1em';
    $this->heading->text->align          = 'left';

    // link
    $this->link->text->color          = $this->color->link;
    $this->link->border->bottom->css  = '1px solid '.$this->color->link;

    // default
    $this->default->border->css     = '1px solid '.$this->color->defBorder;
    $this->default->text->color     = $this->color->font;

    // emphasize
    $this->emphasize->border->css   = '1px dotted '.$this->color->heading;
    $this->emphasize->text->color   = $this->color->fontLight;

    // important
    $this->important->border->css   = '1px dotted '.$this->color->heading;
    $this->important->text->color   = $this->color->fontLight;

     // activ
    $this->activ->border->bottom->css   = '1px dotted '.$this->color->color2.' !important';
    $this->activ->text->color           = $this->color->color2.' !important';

    // underline
    $this->underline->border->bottom->css   = '1px dotted '.$this->color->color1;
    $this->hborder->border->right->css      = '1px ridge '.$this->color->color1;


    //selected
    //$this->selected->border->css   = '1px dotted '.$this->color->heading;
    $this->selected->text->color   = $this->color->color2;
    $this->selected->text->weight  = 'bold';


    // layout elements
    if( 'center' == $this->type )
    {
      $this->headLogo->background->image  = $this->pathImage.'layout/center/small_banner_2_3.png';
      $this->headLogo->background->color  = $this->color->color2;
      $this->headLogo->size->height       = 60;


      $this->headLogo->text->color        = 'white';
      $this->headLogo->text->weight       = 'bold';

    }

    // layout elements
    if( 'center' == $this->type )
    {
      $this->head->background->image  = $this->pathImage.'layout/center/nav_bg2.jpg';
      $this->head->background->repeat = 'repeat-x';
      $this->head->background->color  = $this->color->color1;
    }
    else
    {
      $this->head->background->color  = $this->color->color1;
    }

    $this->head->text->color        = 'white';

    $this->headLink->text->color         = 'white';
    $this->headLink->text->weight        = 'bold';
    $this->headLink->border->bottom->css = '1px dotted white';

    if( 'center' == $this->type )
      $this->bottom->background->image  = $this->pathImage.'layout/center/bot_bg2.jpg';

    $this->bottom->background->color    = $this->color->color1;
    $this->bottom->background->position = 'bottom';
    $this->bottom->border->color        = $this->color->color1;
    $this->bottom->text->color          = 'white';
    $this->bottom->size->height         = '102';


    $this->bottomLink->text->color         = 'white';
    $this->bottomLink->text->weight        = 'bold';
    $this->bottomLink->border->bottom->css = '1px dotted white';

    // menu
    $this->menuBar->background->color   = $this->color->color1;
    $this->menuBar->text->color         = 'white';


    $this->menuLink->text->color         = 'black';
    $this->menuLinkHover->text->color    = $this->color->color2;
    $this->menuLinkHover->border->bottom->css    = '1px dotted '.$this->color->color2;

    // dropmenu
    $this->dropmenu->size->width = 150;

    // table
    $this->table->background->color   = 'white';

    $this->tableHead->background->color = $this->color->color1;

    $this->tableHeadRow->text->color       = 'white';
    $this->tableHeadRow->text->weight      = 'bold';

    $this->tableFoot->background->color   = $this->color->color1;
    $this->tableFoot->text->color       = 'white';

    $this->tableRow->border->css       = '1px solid '.$this->color->light;
    $this->tableRow->text->color       = $this->color->color1;

    $this->tableRow1->background->color = 'white';
    $this->tableRow2->background->color = $this->color->light;

    // window

    // window variables
    $this->var->windowBorderTop     = 23;
    $this->var->windowBorderBottom  = 25;
    $this->var->windowBorderSide    = 5;
    $this->var->windowActionBar     = 26;
    $this->var->windowButtonBar     = 19;

    // window styles
    $this->windowInactiv->background->color = '#A8B8C7';
    $this->windowLoading->background->color = '#CFDDE8';
    $this->windowContent->background->color = 'white';

    $this->windowHeader->background->color    = '#D1D1D1';
    $this->windowHeader->border->bottom->css  = '1px solid #A8B8C7';

    /*
    $this->windowHeaderCaption->text->size        = 19;
    $this->windowHeaderCaption->text->style       = 'italic';
    $this->windowHeaderCaption->text->weight      = 'bold';
    $this->windowHeaderCaption->text->color       = 'black';
    $this->windowHeaderCaption->text->whiteSpace  = 'nowrap';
    */

    $this->windowTitle->text->size        = 12;
    $this->windowTitle->text->style       = 'italic';
    $this->windowTitle->text->weight      = 'bold';
    $this->windowTitle->text->color       = 'white';
    $this->windowTitle->text->whiteSpace  = 'nowrap';
    $this->windowTitle->padding->bottom      = 4;

    $this->windowStatus->text->size        = 11;
    $this->windowStatus->text->style       = 'italic';
    $this->windowStatus->text->color       = $this->color->color3;
    $this->windowStatus->text->whiteSpace  = 'nowrap';

    $this->windowTabBar->background->color  = '#404040';

    $this->windowTab->text->color           = '#000000';
    $this->windowTab->text->weight          = 'bold';

    $this->windowTabHover->text->decoration = 'underline';
    $this->windowTabActiv->text->color      = 'white';


    $this->windowHeaderContext->text->size        = 17;
    $this->windowHeaderContext->text->weight      = 'bold';
    $this->windowHeaderContext->text->color       = 'black';
    $this->windowHeaderContext->text->whiteSpace  = 'nowrap';

    $this->windowHeaderContextLink = $this->windowHeaderContext;
    $this->windowHeaderContextLink->text->decoration  = 'underline';
    $this->windowHeaderContextLink->text->color       = '#0000ff';


    $this->windowBorderTop->size->height    = $this->var->windowBorderTop;
    $this->windowBorderBottom->size->height = $this->var->windowBorderBottom;
    $this->windowBorderLR->size->width      = $this->var->windowBorderSide;

    $this->windowActionBar->size->height        = $this->var->windowActionBar;
    $this->windowActionBar->border->bottom->css = '1px solid #758EA7 !important';

    // form elements
    $this->button->border->css  = '1px solid '.$this->color->color1;
    $this->button->background->css = 'url('.$this->pathImage.'wgt/button_bg.png) repeat-x top center';


    // message elements //

    // notice
    $this->notice->text->color          = $this->color->notice;
    $this->notice->text->weight         = 'bold';
    $this->notice->border->bottom->css  = '1px dotted '.$this->color->notice;
    $this->notice->background->color    = $this->color->bgNotice;

    // warning
    $this->warning->text->color          = $this->color->warning;
    $this->warning->text->weight         = 'bold';
    $this->warning->border->bottom->css  = '1px dotted '.$this->color->warning;
    $this->warning->background->color    = $this->color->bgWarning;

    // error
    $this->error->text->color          = $this->color->error;
    $this->error->text->weight         = 'bold';
    $this->error->border->bottom->css  = '1px dotted '.$this->color->error;
    $this->error->background->color    = $this->color->bgError;



  }//end public function load */



} // end class WgtLayoutDefault


