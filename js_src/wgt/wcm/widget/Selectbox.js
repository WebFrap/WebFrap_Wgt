/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */
/*
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
 * @author Dominik Bonsch <dominik.bonsch@webfrap.net>
 */
(function( $G, $S ) {

  "use strict";

  /**
   * Einfaches selectbox item
   */
  $S.widget( "wgt.rselectbox", {

    // These options will be used as defaults
    options: {
      decorate: true,
      icon: 'icon-angle-down',
      icon_alt: 'Open',
      type: 'simple',
      "width": 'medium',
      data: [],
      data_source: null
    },

    elemId:null,

    rNode:null,

    asgdForm:null,

    _create: function() {

      var self = this,
        opts = this.options;
      
      this.elemId    = this.element.attr('id');
      this.rNode     = this.element.get(0);

      this.asgdForm  = $G.$B.getClassByPrefix( 'asgd-', this.element.prop('class'), true );

      // soll die selectbox hübsch dekoriert werden?
      if( typeof this.options.decorate !== 'undefined' && true === this.options.decorate ){
        this.decorate();
      }


      if( this.options.data_source ){

        this.element.bind( 'click.wgt_selectbox', function(){

          if( !self.element.attr('loaded') ){

            var active = self.element.find('option:first').attr('value');

            var formData = $S('#'+self.asgdForm).data(self.options.data_source);

            if( !formData ){

              var sourceData = self.loadData( self.options.data_source );

              formData = '';

              for( var key =0; key < sourceData.length; key++ ) {
                formData += '<option value="'+sourceData[key].i+'" >'+sourceData[key].v+'</option>';
              }

              $S('#'+self.asgdForm).data(self.options.data_source,formData);

            }

            self.element.html( formData );
            self.setActive( active );

            self.element.attr('loaded',true);
          }

        });
      }

    },

    decorate: function() {

      var self = this,
        opts = this.options,
        el = this.element;

      var img = '<i class="icon-angle-down" ></i>';
      var codeAfter = '<input class="wgt-overlay embed '+opts['width']+' wgt-ignore" ';
        codeAfter += ' value="'+( undefined !== this.rNode.options[this.rNode.selectedIndex] ? this.rNode.options[this.rNode.selectedIndex].innerHTML : '');
        codeAfter +=  '" type="text" name="display-'+el.attr('name')+'" id="display-'+this.elemId+'" />';
        codeAfter +=  '<button id="trigger-'+this.elemId+'" class="wgt-button append wgt-overlay embed '+opts['width']+'" >';
        codeAfter +=  img +'</button>';

      el.wrap( '<div style="position:relative;" class="inline" />' )
        .after( codeAfter )
        .addClass( 'wgt-behind' );

      var slctWidth = el.next().outerWidth() + el.next().next().outerWidth();
      el.css( "width", slctWidth );

      el.bind( 'click.wgt_selectbox',  function(){

        if( undefined !== self.rNode.options[self.rNode.selectedIndex] ){
          $S( 'input#display-'+self.elemId).val( self.rNode.options[self.rNode.selectedIndex].innerHTML );
        }else{
          $S( 'input#display-'+self.elemId).val( '' );
        }
      });

      el.bind( 'keyup.wgt_selectbox', function( event ){
        if( event.which === $G.key.RETURN ){
          $S( 'input#display-'+self.elemId).val( self.rNode.options[self.rNode.selectedIndex].innerHTML );
        }
      });

    },

    loadData: function( sourceId ) {

      var tmp = $S( '#'+sourceId );

      return tmp.is('var') ? $G.$B.robustParseJSON(tmp.text()) : [];

    },

    setActive: function( id ) {

      if( !id ){
        console.warn( 'Selectbox: set active without id' );
        return;
      }

      this.element.find('option').attr('selected',null);

      this.element.find('option[value="'+id+'"]:first').attr('selected', 'selected');
    },

    destroy: function() {

      $S.Widget.prototype.destroy.call( this );
    }

  });

  /**
   * @author dominik alexander bonsch <db@webfrap.net>
   */
  $G.$R.addAction( 'widget_selectbox', function( jNode ){


    var tmp = jNode.next();

    var tmpProps = tmp.is( 'var' ) ? $G.$WGT.robustParseJSON( tmp.text() ) : {};

    var dSource = jNode.attr( 'data_source' );
    if( dSource ){
      tmpProps.data_source = dSource;
    }

    jNode.removeClass( "wcm_widget_selectbox" );
    jNode.rselectbox( tmpProps );

  });


})( window, $S );




