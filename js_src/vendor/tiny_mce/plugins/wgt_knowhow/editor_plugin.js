/**
 * editor_plugin_src.js
 *
 * Copyright 2009, S-DB.de
 * Released under LGPL License.
 *
 */

(function( tinymce ) {
  
  // Load plugin specific language pack
  tinymce.PluginManager.requireLangPack( 'wgt_knowhow' );

  tinymce.create( 'tinymce.plugins.WgtKnowHowNodePlugin', {
     
    /**
     * Initializes the plugin, this will be executed after the plugin has been created.
     * This call is done before the editor instance has finished it's initialization so use the onInit event
     * of the editor instance to intercept that event.
     *
     * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
     * @param {string} url Absolute URL to where the plugin is located.
     */
    init : function(ed, url) {

      // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
      ed.addCommand('mceWgtKnowHowNode', function() {
        $R.get('modal.php?c=Webfrap.KnowhowNode.openDialog');
      });

      // Register example button
      ed.addButton('wgt_knowhow', {
        title : 'wgt_knowhow.desc',
        cmd : 'mceWgtKnowHowNode',
        image : url + '/img/knowhow.png'
      });

      // Add a node change handler, selects the button in the UI when a image is selected
      ed.onNodeChange.add(function(ed, cm, n) {
        cm.setActive('wgt_knowhow', n.nodeName == 'IMG');

        if( n.nodeName == 'IMG' ){

          var activeNode = $S(n);

          if( !activeNode.attr('wgt_touched') ){
            activeNode.dblclick(function(){

              var mediaThek = $S('#'+tinymce.activeEditor.id).attr('wgt_mediathek');
              var mediaKey = $S('#'+tinymce.activeEditor.id).attr('wgt_mediakey');

              //alert(tinymce.activeEditor.settings.hans);
              var imgDialog = $S('#'+mediaThek+'-image-dialog');
              imgDialog.find(':input').val('');

              var inpKey = '#wgt-box-input-mediathek-'+mediaKey+'-image_';

              imgDialog.find( inpKey+'src' ).val( activeNode.attr('src') );
              imgDialog.find( inpKey+'title' ).val( activeNode.attr('title') );
              imgDialog.find( inpKey+'alt' ).val( activeNode.attr('alt') );
              imgDialog.find( inpKey+'style' ).val( activeNode.attr('style') );
              imgDialog.find( inpKey+'class' ).val( activeNode.attr('class') );
              imgDialog.find( inpKey+'id' ).val( activeNode.attr('id') );

              imgDialog.dialog({
                height: 450,
                width: 400,
                buttons:{
                  "Update" : function(){

                    activeNode.attr('src',imgDialog.find( inpKey+'src' ).val());
                    activeNode.attr('title',imgDialog.find( inpKey+'title' ).val());
                    activeNode.attr('alt',imgDialog.find( inpKey+'alt' ).val());
                    activeNode.attr('style',imgDialog.find( inpKey+'style' ).val());
                    activeNode.attr('class',imgDialog.find( inpKey+'class' ).val());
                    activeNode.attr('id',imgDialog.find( inpKey+'id' ).val());


                    $S( this ).dialog( "close" );
                  }
                }
              });
            }).attr('wgt_touched','true');
          }
        }

      });
    },

    /**
     * Creates control instances based in the incomming name. This method is normally not
     * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
     * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
     * method can be used to create those.
     *
     * @param {String} n Name of the control to create.
     * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
     * @return {tinymce.ui.Control} New control instance or null if no control was created.
     */
    createControl : function(n, cm) {
      return null;
    },

    /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @return {Object} Name/value array containing information about the plugin.
     */
    getInfo : function() {
      return {
        longname : 'WGT Know How Node',
        author : 'Dominik Bonsch',
        authorurl : 'http://webfrapt.net',
        infourl : 'http://webfrapt.net/webfrap',
        version : "1.0"
      };
    }
    
  });

  // Register plugin
  tinymce.PluginManager.add('wgt_knowhow', tinymce.plugins.WgtKnowHowNodePlugin);
  
})( tinymce );