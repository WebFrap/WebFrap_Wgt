/* Licence see: /LICENCES/wgt/licence.txt */


// key numbers
window.key = {
  RETURN:13,
  TAB:9,
  ESC:27,
  ARRLEFT:37,
  ARRUP :38,
  ARRRIGHT:39,
  ARRDOWN:40,
  BACKSPACE:8,
  DELETE:46
};

// status
window.stat = {
  UD:'undefined'
};

/**
 * indexOf für Arrays implementieren, wenn die JS Engine 
 * keine native indexOf Funktionalität besitzt
 */
if (!Array.indexOf) {
 
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) { return i; }
    }
    return -1;
  };
  
  /*
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
  }
  */
}

/*
if (!Array.remove) {
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };
}
*/

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

var $console = {
  
    log: function( message ){
      console.log( message );
    },
    debug: function( message ){
      console.log( message );
    },
    info: function( message ){
      console.info( message );
    },
    warn: function( message ){
      console.warn( message );
    },
    error: function( message ){
      console.error( message );
    },
    time: function(){
      console.error( message );      
    },
    timeEnd: function(){
      
    },
    trace: function( message ){
      console.log( message );
    },
    group: function(){
      
    },
    groupEnd: function(){
      
    }
    
};//end console

/**
 * Shortcut für document.getElementById
 * 
 * @param id
 * @returns DomNode
 */
function getById( id ){
  
  return document.getElementById(id);
}//end function getById


function str_replace ( search, replace, subject ) {
  
  // Replace all occurrences of the search string with the replacement string
  //
  // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
  // +       version: 803.1715
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Gabriel Paderni
  // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
  // *     returns 1: 'Kevin.van.Zonneveld'

  if(!(replace instanceof Array)){
    replace=new Array(replace);
    if(search instanceof Array){//If search    is an array and replace    is a string, then this replacement string is used for every value of search
      while(search.length>replace.length){
        replace[replace.length]=replace[0];
      }
    }
  }

  if(!(search instanceof Array))
    search=new Array(search);
  
  while(search.length>replace.length){//If replace    has fewer values than search , then an empty string is used for the rest of replacement values
    replace[replace.length]='';
  }

  if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
    for(k in subject){
      subject[k]=str_replace(search,replace,subject[k]);
    }
    return subject;
  }

  for(var k=0; k<search.length; k++) {
    
    if( subject == null )
      continue;

    var i = subject.indexOf(search[k]);
    while(i>-1){
      
      subject = subject.replace(search[k], replace[k]);
      i = subject.indexOf(search[k],i);
    }
  }

  return subject;

}//end function str_replace */

function trim( str, charlist ) {
    // Strip whitespace (or other characters) from the beginning and end of a string
    //
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
    // +       version: 803.1715
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'

    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}//

function strlen (string) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // +      input by: Kirk Strobeck
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
    // %        note 1: characters and to this function in PHP which does not count the number of bytes
    // %        note 1: but counts the number of characters, something like this is really necessary.
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19
    // *     example 2: strlen('A\ud87e\udc04Z');
    // *     returns 2: 3

    var str = string+'';
    var i = 0, chr = '', lgth = 0;

    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i);
        var next = '', prev = '';
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            if (str.length <= (i+1))  {
                throw 'High surrogate without following low surrogate';
            }
            next = str.charCodeAt(i+1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i)+str.charAt(i+1);
        } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i-1);
            if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
        }
        return str.charAt(i);
    };

    for (i=0, lgth=0; i < str.length; i++) {
        if ((chr = getWholeChar(str, i)) === false) {
            continue;
        } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
        lgth++;
    }
    return lgth;
}

function var_dump (){
  
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Zahlii
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // %        note 1: For returning a string, use var_export() with the second argument set to true
    // *     example 1: var_dump(1);
    // *     returns 1: 'int(1)'

    var output = '', pad_char = ' ', pad_val = 4, lgth = 0, i = 0, d = this.window.document;
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    var _repeat_char = function (len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };
    var _getInnerVal = function (val, thick_pad) {
        var ret = '';
        if (val === null) {
            ret = 'NULL';
        }
        else if (typeof val === 'boolean') {
            ret = 'bool(' + val + ')';
        }
        else if (typeof val === 'string') {
            ret = 'string(' + val.length+') "' + val + '"';
        }
        else if (typeof val === 'number') {
            if (parseFloat(val) == parseInt(val, 10)) {
                ret = 'int(' + val + ')';
            }
            else {
                ret = 'float('+val+')';
            }
        }
        // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
        else if (typeof val === 'undefined') {
            ret = 'undefined';
        }
        else if (typeof val === 'function') {
            var funcLines = val.toString().split('\n');
            ret = '';
            for (var i = 0, fll = funcLines.length; i < fll; i++) {
                ret += (i !== 0 ? '\n'+thick_pad : '') + funcLines[i];
            }
        }
        else if (val instanceof Date) {
            ret = 'Date('+val+')';
        }
        else if (val instanceof RegExp) {
            ret = 'RegExp('+val+')';
        }
        else if (val.nodeName) { // Different than PHP's DOMElement
            switch(val.nodeType) {
                case 1:
                    if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
                        ret = 'HTMLElement("' + val.nodeName + '")';
                    }
                    else {
                        ret = 'XML Element("' + val.nodeName + '")';
                    }
                    break;
                case 2:
                    ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
                    break;
                case 3:
                    ret = 'TEXT_NODE(' + val.nodeValue + ')';
                    break;
                case 4:
                    ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
                    break;
                case 5:
                    ret = 'ENTITY_REFERENCE_NODE';
                    break;
                case 6:
                    ret = 'ENTITY_NODE';
                    break;
                case 7:
                    ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue+')';
                    break;
                case 8:
                    ret = 'COMMENT_NODE(' + val.nodeValue + ')';
                    break;
                case 9:
                    ret = 'DOCUMENT_NODE';
                    break;
                case 10:
                    ret = 'DOCUMENT_TYPE_NODE';
                    break;
                case 11:
                    ret = 'DOCUMENT_FRAGMENT_NODE';
                    break;
                case 12:
                    ret = 'NOTATION_NODE';
                    break;
            }
        }
        return ret;
    };

    var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
        var someProp = '';
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
        var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';
        var val = '';

        if (typeof obj === 'object' && obj !== null) {
            if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
                return obj.var_dump();
            }
            lgth = 0;
            for (someProp in obj) {
                lgth++;
            }
            str += 'array('+lgth+') {\n';
            for (var key in obj) {
                var objVal = obj[key];
                if (typeof objVal === 'object' && objVal !== null &&
                    !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val, pad_char);
                } else {
                    val = _getInnerVal(objVal, thick_pad);
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
                }
            }
            str += base_pad + '}\n';
        } else {
            str = _getInnerVal(obj, thick_pad);
        }
        return str;
    };

    output = _formatArray(arguments[0], 0, pad_val, pad_char);
    for (i=1; i < arguments.length; i++) {
        output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
    }

    if (d.body)
    {
        return output;
    }
    else
    {
      try
      {
        d = XULDocument; // We're in XUL, so appending as plain text won't work
        return '<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+output+'</pre>';
      }
      catch (e)
      {
        return output; // Outputting as plain text may work in some plain XML
      }
    }
}

 
function escapearg(s){
  
  if(s == undefined || !s) return '';
  return s.replace('\\','\\\\').
           replace('*','\\*').
           replace('.','\\.').
           replace('/','\\/');
}

function htmlspecialchars(s){
  
  if(s == undefined || !s) 
    return '';
  
  return s.replace('&','&amp;').
           replace('<','&lt;').
           replace('>','&gt;');
}

function ltrim(s){
  
  if(s == undefined || !s) 
    return '';
  
  return s.replace(/^\s+/g,'');
}











