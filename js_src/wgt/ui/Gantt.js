/* Licence see: /LICENCES/wgt/licence.txt */
/*
Copyright (c) 2009, Shlomy Gantz BlueBrick Inc. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Shlomy Gantz or BlueBrick Inc. nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY SHLOMY GANTZ/BLUEBRICK INC. ''AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL SHLOMY GANTZ/BLUEBRICK INC. BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* 
* first author: Shlomy Gantz
* refactored & extended: dominik alexander bonsch <dominik.bonsch@webfrap.net>  
* 
* 
*/

/**
* JSGantt component is a UI control that displays gantt charts based by using CSS and HTML 
* @module    jsgantt
* @title    JSGantt
*/
;(function($UI,undefined){
  

  /**
   *
   */
  var WgtGantt = function(){

    /**
     *
     */
    this.fn = WgtGantt.prototype;

    /**
     * the chart class
     */
    this.chartClass = null;
    
    /**
     * the item class
     */
    this.itemClass = null;

    /**
     * the render object
     */
    this.render = null;

    /**
     * calculator object 
     */
    this.calc = null;

    /**
     * list with data loaders for the gantt lib
     */
    var loaders = {};

    /**
     *
     */
    this.addLoader = function( key, loader ){
      loaders[key] = loader;
    };

    /**
     *
     */
    this.newLoader = function(key){
      return new loaders[key];
    };

    /**
     * 
     */
    this.create = function( resource ){
      
      if( typeof resource == 'string' ){
        resource = $S('#'+resource);
      }
      
      var chart = new this.chartClass(resource);

      // bind the chart object to the dom node
      resource.data('objGantt',chart);
      
      return chart;
      
    };

    /**
     * 
     */
    this.get = function( id ){
      
      return $('#'+id).data('objGantt');
      
    };
    
  };
  
  $UI.fn.gantt = new WgtGantt();

})($UI);
