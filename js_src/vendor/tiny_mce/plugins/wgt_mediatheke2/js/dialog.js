tinyMCEPopup.requireLangPack();

var WgtMediathekeDialog = {
    
  options : {
    
  },
    
  init : function() {

    var tmp;
    
    var WEB_GW = (tmp = new RegExp('(?:^|; )' + encodeURIComponent('WEB_GW') + '=([^;]*)').exec(document.cookie)) 
    ? decodeURIComponent(tmp[1]) : null;

    //var f = document.forms[0];
    
    var headNode = document.getElementsByTagName('head')[0];
    
    var nodeLayout = document.createElement('link');
    nodeLayout.setAttribute('type', 'text/css');
    nodeLayout.setAttribute('rel', 'stylesheet');
    nodeLayout.setAttribute('href', WEB_GW+'/css.php?list=default' );
    headNode.appendChild( nodeLayout );
    
    var nodeTheme = document.createElement('link');
    nodeTheme.setAttribute('type', 'text/css');
    nodeTheme.setAttribute('rel', 'stylesheet');
    nodeTheme.setAttribute('href', WEB_GW+'/theme.php?list=default' );
    headNode.appendChild( nodeTheme );

    var nodeJs = document.createElement('script');
    nodeJs.setAttribute('type', 'text/javascript');
    nodeJs.setAttribute('src', WEB_GW+'/js.php?list=default' );
    headNode.appendChild( nodeJs );
      
    var timeout = 100;
    
    var renderGallery = function(){
      
      if( undefined == window.$S ){
        
        // 10 sekunden müssen reichen
        if( 0 === timeout )
          return;
        
        --timeout;
        
        setTimeout( renderGallery, 100);
        
      }

      // We only want these styles applied when javascript is enabled
      window.$S('div.navigation').css({'width' : '300px', 'float' : 'left'});
      window.$S('div.content').css('display', 'block');

      // Initially set opacity on thumbs and add
      // additional styling for hover effect on thumbs
      var onMouseOutOpacity = 0.67;
      window.$S('#thumbs ul.thumbs li').opacityrollover({
        mouseOutOpacity:   onMouseOutOpacity,
        mouseOverOpacity:  1.0,
        fadeSpeed:         'fast',
        exemptionSelector: '.selected'
      });

      // Initialize Advanced Galleriffic Gallery
      var gallery = window.$S('#thumbs').galleriffic({
        delay:                     3000,
        numThumbs:                 9,
        preloadAhead:              10,
        enableTopPager:            true,
        enableBottomPager:         true,
        maxPagesToShow:            7,
        imageContainerSel:         '#slideshow',
        controlsContainerSel:      '#controls',
        captionContainerSel:       '#caption',
        loadingContainerSel:       '#loading',
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
        onPageTransitionOut:       function(callback) {
          this.fadeTo('fast', 0.0, callback);
        },
        onPageTransitionIn:        function() {
          this.fadeTo('fast', 1.0);
        }
      });
    };
    
    setTimeout( renderGallery, 100);
    
    // Get the selected contents as text and place it in the input
    //f.someval.value = tinyMCEPopup.editor.selection.getContent({format : 'text'});
    //f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');

  },

  insert : function() {
    // Insert the contents from the input into the document
    //tinyMCEPopup.editor.execCommand('mceInsertContent', false, document.forms[0].someval.value);
    tinyMCEPopup.close();
  }
};

tinyMCEPopup.onInit.add(WgtMediathekeDialog.init, WgtMediathekeDialog);
