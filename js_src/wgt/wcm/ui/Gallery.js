/* Licence see: /LICENCES/wgt/licence.txt */


/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_gallery', function( jNode ){
  
  // laden der wysiwyg konfiguration
  try{
    
    var cfgData = jNode.next();
    var settings = cfgData.is('var#'+jNode.attr('id')+'-cfg-wysiwyg')
      ? $WGT.robustParseJSON(cfgData.text())
      : {};
  }
  catch(err){
    
    $D.errorWindow( 'UI Error', err.description );
  }
  
  jNode.removeClass('wcm_ui_gallery');
  
  if( !jNode.is('wgt-gallery') ) 
    jNode.addClass( 'wgt-gallery' );
  
  // We only want these styles applied when javascript is enabled
  //$('div.navigation').css({'width' : '300px', 'float' : 'left'});
  //$('div.content').css('display', 'block');

  var galleryId = jNode.attr('id');
  
  // Initially set opacity on thumbs and add
  // additional styling for hover effect on thumbs
  var onMouseOutOpacity = 0.67;
  $S('#'+galleryId+'-thumbs ul.thumbs li').opacityrollover({
     mouseOutOpacity:   onMouseOutOpacity,
     mouseOverOpacity:  1.0,
     fadeSpeed:         'fast',
     exemptionSelector: '.selected'
  });

  // Enable toggling of the caption
  var captionOpacity = 0.7;
  $S('button#'+galleryId+'-caption_toggle').click(function(e) {
     var link = $S(this);
     
     var isOff = link.hasClass('off');
     var removeClass = isOff ? 'off' : 'on';
     var addClass = isOff ? 'on' : 'off';
     var linkText = isOff ? 'Hide Caption' : 'Show Caption';
     captionOpacity = isOff ? 0.7 : 0.0;

     link.removeClass(removeClass).addClass(addClass).text(linkText).attr('title', linkText);
     $S('#'+galleryId+'-caption span.image-caption').fadeTo(1000, captionOpacity);
     
     e.preventDefault();
  });
  
  // Initialize Advanced Galleriffic Gallery
  var gallery = $S('#'+galleryId+'-thumbs').galleriffic({
     delay:                     2500,
     numThumbs:                 9,
     preloadAhead:              10,
     enableTopPager:            true,
     enableBottomPager:         true,
     maxPagesToShow:            7,
     imageContainerSel:         '#'+galleryId+'-slideshow',
     controlsContainerSel:      '#'+galleryId+'-controls',
     captionContainerSel:       '#'+galleryId+'-caption',
     loadingContainerSel:       '#'+galleryId+'-loading',
     renderSSControls:          true,
     renderNavControls:         true,
     playLinkText:              'Play Slideshow',
     pauseLinkText:             'Pause Slideshow',
     prevLinkText:              '&lsaquo; Previous Photo',
     nextLinkText:              'Next Photo &rsaquo;',
     nextPageLinkText:          'Next &rsaquo;',
     prevPageLinkText:          '&lsaquo; Prev',
     enableHistory:             false,
     autoStart:                 false,
     syncTransitions:           true,
     defaultTransitionDuration: 900,
     onSlideChange:             function(prevIndex, nextIndex) {
       
      // 'this' refers to the gallery, which is an extension of $('#thumbs')
      this.find('ul.thumbs').children()
        .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
        .eq(nextIndex).fadeTo('fast', 1.0);
     },
     onTransitionOut:           function(slide, caption, isSync, callback) {
       
        slide.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0, callback);
        caption.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0);
     },
     onTransitionIn:            function(slide, caption, isSync) {
       
        var duration = this.getDefaultTransitionDuration(isSync);
        slide.fadeTo(duration, 1.0);
          
          // Position the caption at the bottom of the image and set its opacity
        var slideImage = slide.find('img');
        caption.width(slideImage.width())
         .css({
          'bottom' : Math.floor((slide.height() - slideImage.outerHeight()) / 2),
          'left' : Math.floor((slide.width() - slideImage.width()) / 2) + slideImage.outerWidth() - slideImage.width()
         })
         .fadeTo(duration, captionOpacity);
     },
     onPageTransitionOut:       function(callback) {
       
        this.fadeTo('fast', 0.0, callback);
     },
     onPageTransitionIn:        function() {
       
        this.fadeTo('fast', 1.0);
     },
     onImageAdded:              function(imageData, $li) {
       
        $li.opacityrollover({
         mouseOutOpacity:   onMouseOutOpacity,
         mouseOverOpacity:  1.0,
         fadeSpeed:         'fast',
         exemptionSelector: '.selected'
        });
     }
       
  });

});

