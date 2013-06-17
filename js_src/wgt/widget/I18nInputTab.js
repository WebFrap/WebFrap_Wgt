/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/**
 * WGT Web Gui Toolkit
 * 
 * Copyright (c) 2009 webfrap.net
 * 
 * http://webfrap.net/WGT
 * 
 * @author Dominik Bonsch <db@webfrap.net>
 * 
 * Depends: 
 *   - jQuery 1.7.2
 *   - jQuery UI 1.8 widget factory
 *   - WGT 0.9
 * 
 * License:
 * Dual licensed under the MIT and GPL licenses:
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.gnu.org/licenses/gpl.html
 * 
 * Code Style:
 *   indent: 2 spaces
 *   codelang: english
 *   identStyle: camel case
 * 
 */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
(function( $S ) {

  $S.widget( "wgt.i18n_input_tab", {
    
    /**
     * das map element
     */
    container: null,

    /**
     * Standard Options
     */
    options: { 
      // technische Eigenschaften
      "key" : "i18n-label",
      "inp_prefix" : "label",
      "form_id" : "",
      "tab_id" : ""
    },
 

    /**
     * Setup / Constructor methode des Widgets
     */
    _create: function() {
        

      this.initEvents();
      
      return this;

    },//end _create
    
    /**
     * Die Standardmethode in welcher eine normale Tabelle zum Gridelement
     * umgebaut wird
     */
    initEvents: function(){

      var el = this.element,
        self = this;

      el.find('button.wgta-append').click(function(){

        var langNode = el.find('select.wgte-lang');

        var lang = langNode.val();
        langNode.find('option').removeAttr('selected').first().attr('selected','selected');

        self.addEntry( lang );
      });

    },//end initEvents

    /**
     * Einen neuen Eintrag hinzufügen
     * @param lang string
     * @param value string
     */
    addEntry: function( lang ){
      
      var opts = this.options,
        el = this.element;

      if( el.find( 'fieldset.lang-'+lang ).length ){
        $D.errorWindow( 'Error', 'The Lang '+lang+' allready exists' );
        return;
      }
      
      var tabData = {};
      tabData.text = '<img alt="'+lang+'" src="'+$C.WEB_ICONS+'xsmall/flags/'+lang+'.png" /> '+lang;
      
      tabData.content = '<fieldset id="wgt-fieldset-'+opts.key+'-'+lang+'"  class="wgt-space bw6 lang-'+lang+'" >';
      tabData.content += '<legend>Lang '+lang+'</legend>';
      tabData.content += '<textarea name="'+opts.inp_prefix+'['+lang+']" style="width:740px;" ';
      tabData.content += ' id="wgt-wysiwyg-'+opts.key+'-'+lang+'" ';
      tabData.content += ' class="wcm_ui_wysiwyg medium  asgd-'+opts.form_id+'" ></textarea>';
      tabData.content += '</fieldset>';

      // dem listenelement anhängen
      $UI.tab.add( opts.tab_id, tabData );
       
      $R.callAction( 'ui_wysiwyg', el.find('textarea.wcm_ui_wysiwyg') );
      
    },//end addEntry

    /**
     * Einen neuen Eintrag hinzufügen
     * @param lang string
     * @param value string
     */
    removeEntry: function( lang ){

    }//end addEntry

  });

}( jQuery ) );

