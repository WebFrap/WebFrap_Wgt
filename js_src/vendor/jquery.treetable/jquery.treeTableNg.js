/*
 * jQuery treeTable Plugin 2.3.0
 * http://ludo.cubicphuse.nl/jquery-plugins/treeTable/
 *
 * Copyright 2010, Ludo van den Boom
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
;(function($,undefined) {
  
  // Helps to make options available to all functions
  // TODO: This gives problems when there are both expandable and non-expandable
  // trees on a page. The options shouldn't be global to all these instances!
  var options;
  
  var defaultPaddingLeft;
  
  var methods = {

    
    /**
     * the init method / constructor
     */
    init : function(opts) {
      
     
      
      options = $.extend({}, $.fn.treeTable.defaults, opts);
        
      return this.each(function() {

        $(this).addClass(options.className).find("tbody tr").each(function() {
          
          // Initialize root nodes only if possible
          if(!options.expandable || $(this)[0].className.search(options.childPrefix) == -1) {
            // To optimize performance of indentation, I retrieve the padding-left
            // value of the first root node. This way I only have to call +css+ 
            // once.
            if (isNaN(defaultPaddingLeft)) {
              defaultPaddingLeft = parseInt($($(this).children("td")[options.treeColumn]).css('padding-left'), 10);
            }
                
            initialize($(this));
          } 
          else if( options.initialState == "collapsed" ) {
            
            this.style.display = "none"; // Performance! $(this).hide() is slow...
          }
        });
      });
      
    },
    
    /**
     * collapse
     */
    collapse : function() {
      
      $(this).addClass("collapsed");
      
      childrenOf($(this)).each(function() {
        
        if( !$(this).hasClass("collapsed") ) {
          $(this)._tt('collapse');
        }
        
        this.style.display = "none"; // Performance! $(this).hide() is slow...
      });
      
      return this;
    },
    
    /**
     * expand
     */
    expand : function() {
      
      alert('in expand');
      
      $(this).removeClass("collapsed").addClass("expanded");
      
      childrenOf($(this)).each(function() {
        initialize($(this));
        
        if($(this).is(".expanded.parent")) {
          $(this)._tt('expand');
        }
        
        // this.style.display = "table-row"; // Unfortunately this is not possible with IE :-(
        $(this).show();
      });
      
      return this;
    },
    
    /**
     * reveal
     */
    reveal : function() {
      $(ancestorsOf($(this))._tt('reverse')).each(function() {
        initialize($(this));
        $(this)._tt('expand').show();
      });
      
      return this;
    },
    
    /**
     * Add an entire branch to +destination+
     */
    appendSubTree : function(parentId) {

      var node   = $(this);
      var parent = $(parentId);
      
      if( !parent.hasClass('parent') ){
        
        parent.addClass('parent');
        
        var cell      = $(parent.children("td")[options.treeColumn]);
        var padding   = getPaddingLeft(cell) + options.indent;
    
        if(options.expandable) {
          
          cell.prepend('<span style="margin-left: -' 
            + options.indent + 'px; padding-left: ' 
            + options.indent + 'px" class="expander"></span>');
          
          $(cell[0].firstChild).click(function() { 
            parent._tt('toggleBranch'); 
          });
          
          if(options.clickableNodeNames) {
            
            cell[0].style.cursor = "pointer";
            $(cell).click(function(e) {
              // Don't double-toggle if the click is on the existing expander icon
              if (e.target.className != 'expander') {
                parent._tt('toggleBranch');
              }
            });
          }
          
          // Check for a class set explicitly by the user, otherwise set the default class
          if( !(parent.hasClass("expanded") || parent.hasClass("collapsed")) ) {
            parent.addClass(options.initialState);
          }
    
          parent._tt( 'expand' );
        }
      }
      
      indent(node, ancestorsOf(node).length * options.indent);
      
      return this;
    },
    
    /**
     * Add an entire branch to +destination+
     */
    appendBranchTo : function(destination) {

      var node   = $(this);
      var parent = $('#'+node.getActionClass(options.childPrefix,true));
      
      var ancestorNames = $.map(ancestorsOf($(destination)), function(a) { 
        return a.id; 
      });
      
      // Conditions:
      // 1: +node+ should not be inserted in a location in a branch if this would
      //    result in +node+ being an ancestor of itself.
      // 2: +node+ should not have a parent OR the destination should not be the
      //    same as +node+'s current parent (this last condition prevents +node+
      //    from being moved to the same location where it already is).
      // 3: +node+ should not be inserted as a child of +node+ itself.
      if(
        $.inArray(node[0].id, ancestorNames) == -1 
          && (!parent || (destination.id != parent[0].id)) 
          && destination.id != node[0].id
      ){
        
        indent(node, ancestorsOf(node).length * options.indent * -1); // Remove indentation
        
        if(parent) { 
          node.removeClass(options.childPrefix + parent[0].id); 
        }
        
        node.addClass(options.childPrefix + destination.id);
        move(node, destination); // Recursively move nodes to new location
        indent(node, ancestorsOf(node).length * options.indent);
      }
      
      return this;
    },
    
    /**
     * Add reverse() function from JS Arrays
     */
    reverse : function() {
      return this.pushStack(this.get().reverse(), arguments);
    },
    
    /**
     * 
     */
    toggleBranch : function() {
      
      if($(this).hasClass("collapsed")) {
        $(this)._tt('expand');
      } 
      else {
        $(this).removeClass("expanded").treeTable('collapse');
      }
      
      return this;
    }
  };

  /* setzen des eigentlichen plugins
   * 
   */
  $.fn.treeTable = function( method ) {

    this.defaults = {
      childPrefix: "child-of-",
      clickableNodeNames: false,
      expandable: true,
      indent: 19,
      initialState: "collapsed",
      className: 'treeTable',
      treeColumn: 1
    };
    
    if ( methods[method] ) {
      
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      
      return methods.init.apply( this, arguments );
    } else {
      
      $.error( 'Method ' +  method + ' does not exist on jQuery.treeTable' );
    }    
  
  };
  
  
  // shortcut
  $.fn._tt = $.fn.treeTable;
  
  
  // === Private functions
  
  /**
   * 
   */
  function ancestorsOf(node) {
    
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  };
  
  /**
   * 
   * @param node
   * @returns
   */
  function childrenOf(node) {
    return $("table."+options.className+" tbody tr." + options.childPrefix + node[0].id);
  };
  
  /**
   * 
   * @param node
   * @returns
   */
  function getPaddingLeft(node) {
    
    if( node[0] === undefined )
      return defaultPaddingLeft;
    
    var paddingLeft = parseInt(node[0].style.paddingLeft, 10);
    
    return (isNaN(paddingLeft)) 
      ? defaultPaddingLeft 
      : paddingLeft;
  };
  
  /**
   * 
   * @param node
   * @param value
   * @returns
   */
  function indent(node, value) {
    var cell = $(node.children("td")[options.treeColumn]);
    
    if( cell[0] === undefined )
      return;
    
    cell[0].style.paddingLeft = getPaddingLeft(cell) + value + "px";
    
    childrenOf(node).each(function() {
      indent($(this), value);
    });
  }
  
  /**
   * 
   * @param node
   * @returns
   */
  function initialize(node) {
    
    if(!node.hasClass("initialized")) {
      node.addClass("initialized");
      
      var childNodes = childrenOf(node);
      
      if(!node.hasClass("parent") && childNodes.length > 0) {
        node.addClass("parent");
      }
      
      if(node.hasClass("parent")) {
        
        var cell = $(node.children("td")[options.treeColumn]);
        var padding = getPaddingLeft(cell) + options.indent;
        
        childNodes.each(function() {
          $(this).children("td")[options.treeColumn].style.paddingLeft = padding + "px";
        });
        
        if(options.expandable) {
          
          cell.prepend('<span style="margin-left: -' 
              + options.indent + 'px; padding-left: ' 
              + options.indent + 'px" class="expander"></span>');
          
          $(cell[0].firstChild).click(function() { 
            node._tt('toggleBranch'); 
          });
          
          if(options.clickableNodeNames) {
            
            cell[0].style.cursor = "pointer";
            $(cell).click(function(e) {
              // Don't double-toggle if the click is on the existing expander icon
              if (e.target.className != 'expander') {
                node._tt('toggleBranch');
              }
            });
          }
          
          // Check for a class set explicitly by the user, otherwise set the default class
          if(!(node.hasClass("expanded") || node.hasClass("collapsed"))) {
            node.addClass(options.initialState);
          }

          if(node.hasClass("expanded")) {
            node.__tt('expand');
          }
        }
      }
    }
  };
  
  
  /**
   * 
   * @param node
   * @returns
   */
  function addChild(node) {

    if(node.hasClass("parent") ) {
      return;
    }
    
    var childNodes = childrenOf(node);
    
    node.addClass("parent");
    
    var cell = $(node.children("td")[options.treeColumn]);
    var padding = getPaddingLeft(cell) + options.indent;
    
    childNodes.each(function() {
      $(this).children("td")[options.treeColumn].style.paddingLeft = padding + "px";
    });
    
    if(options.expandable) {
      cell.prepend('<span style="margin-left: -' 
        + options.indent + 'px; padding-left: ' 
        + options.indent + 'px" class="expander"></span>');
      
      $(cell[0].firstChild).click(function() { 
        node._tt('toggleBranch'); 
      });
      
      if(options.clickableNodeNames) {
        cell[0].style.cursor = "pointer";
        $(cell).click(function(e) {
          // Don't double-toggle if the click is on the existing expander icon
          if (e.target.className != 'expander') {
            node._tt('toggleBranch');
          }
        });
      }
      
      // Check for a class set explicitly by the user, otherwise set the default class
      if(!(node.hasClass("expanded") || node.hasClass("collapsed"))) {
        node.addClass(options.initialState);
      }

      if(node.hasClass("expanded")) {
        node._tt( 'expand' );
      }
    }

  };
  
  /**
   * move a complete subtreenode inside the treetable
   * @param node
   * @param destination
   * @returns
   */
  function move(node, destination) {
    node.insertAfter(destination);
    childrenOf(node)._tt('reverse').each(function() { 
      move($(this), node[0]); 
    });
  };
  
  /**
   * search the parent tr by the classname with prefix "child-of-" 
   * of a treetable td row
   * @param node
   * @returns
   */
  function parentOf(node) {
    
    var rawClass = node.attr('class');
    
    if( undefined === rawClass )
      return null;
    
    var classNames = rawClass.split(' ');
    
    for(key in classNames) {
      if(classNames[key].match(options.childPrefix)) {
        return $("#" + classNames[key].substring(9));
      }
    }
  };
  
})(jQuery);
