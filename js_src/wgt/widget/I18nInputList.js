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

  $S.widget( "wgt.i18n_input_list", {
    
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
      "form_id" : ""
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

        var valNode = el.find('input.wgte-text');
        var langNode = el.find('select.wgte-lang');

        var value = valNode.val();
        valNode.val('');

        var lang = langNode.val();
        langNode.find('option').removeAttr('selected').first().attr('selected','selected');

        self.addEntry( lang, value );
      });

      el.find('button.wgta-drop').click(function(){
        self.removeEntry( $S(this).attr('wgt_lang') );
      }).removeClass('wgta-drop');
      
    },//end initEvents

    /**
     * Einen neuen Eintrag hinzufügen
     * @param lang string
     * @param value string
     */
    addEntry: function( lang, value ){
      
      var listEl = this.element.find('.wgte-list'),
        opts = this.options,
        self = this;

      if( listEl.find( 'li.lang-'+lang ).length ){
        $D.errorWindow( 'Error', 'The Lang '+lang+' allready exists' );
        return;
      }

      // entry zusammen bauen
      var entryCode = '<li class="lang-'+lang+'" >';
      entryCode += '<div id="wgt_box_'+opts.key+'-'+lang+'" >';
      entryCode += '<label class="wgt-label" for="wgt-input-'+opts.key+'-'+lang+'">';
      entryCode += 'Lang ';
      entryCode += '<img class=" xsmall" src="'+$C.WEB_ICONS+'xsmall/flags/'+lang+'.png">';
      entryCode += '</label>';
      entryCode += '<div style="width:200px;" class="wgt-input medium">';
      entryCode += '<input type="text" value="'+value+'" id="wgt-input-'+opts.key+'-'+lang+'" ';
      entryCode += ' class="medium lang-'+lang+' asgd-'+opts.form_id+'" name="'+opts.inp_prefix+'['+lang+']" />';
      entryCode += '<button class="wgt-button wgta-drop" wgt_lang="'+lang+'" >';
      entryCode += '<img class="icon xsmall" alt="Delete" src="'+$C.WEB_ICONS+'xsmall/control/delete.png">';
      entryCode += '</button>';
      entryCode += '</div>';
      entryCode += '<div class="wgt-clear tiny"></div>';
      entryCode += '</div>';
      entryCode += '</div>';
      entryCode += '</li>';

      // dem listenelement anhängen
      listEl.append( entryCode );

      listEl.find('button.wgta-drop').click(function(){
        self.removeEntry( lang );
      }).removeClass('wgta-drop');


    },//end addEntry

    /**
     * Einen neuen Eintrag hinzufügen
     * @param lang string
     * @param value string
     */
    removeEntry: function( lang ){

      this.element.find('ul.wgte-list li.lang-'+lang).remove();

    }//end addEntry

  });

}( jQuery ) );

