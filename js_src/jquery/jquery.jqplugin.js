/*
*jQuery browser plugin detection 1.0
* http://plugins.jquery.com/project/jqplugin
* Checks for plugins / mimetypes supported in the browser extending the jQuery.browser object
* Copyright (c) 2008 Leonardo Rossetti motw.leo@gmail.com
* MIT License: http://www.opensource.org/licenses/mit-license.php
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

jQuery.extend(jQuery.browser, {
    flash: (function () {
        var found = false;
		try {
			new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			found = true;
		} catch(e) {
			jQuery.each(navigator.plugins, function () {
				if (this.name.match(/flash/gim)) {
					found = true;
					return false;
				}
			});	
		}
		return found;
    })(),
	
	sl: (function () {
		var found = false;
		try {
			new ActiveXObject("AgControl.AgControl");
			found = true;
		} catch (e) {
			jQuery.each(navigator.plugins, function () {
	            if (this.name.match(/silverlight/gim)) {
	                found = true;
	                return false;
	            }
			});
		}
		return found;
	})(),

    pdf: (function () {
        var found = false;
		try {
			(new ActiveXObject("AcroPDF.PDF") || new ActiveXObject("PDF.PdfCtrl"));
			found = true;
		} catch(e) {
			jQuery.each(navigator.mimeTypes, function () {
	            if (this.suffixes.match(/pdf/gim)) {
	                found = true;
	                return false;
	            }
			});
		}
        return found;
    })(),

    java: (function () {
        return navigator.javaEnabled();
    })(),

    qtime: (function () {
        var found = false;
		try {
			new ActiveXObject("QuickTime.QuickTime");
			found = true;
		} catch(e) {
			jQuery.each(navigator.plugins, function () {
	            if (this.name.match(/quicktime/gim)) {
	                found = true;
	                return false;
	            }
			});
		}
        return found;
    })(),

    wmp: (function () {
        var found = false;
		try {
			new ActiveXObject("WMPlayer.OCX");
			found = true;
		} catch(e) {
			jQuery.each(navigator.plugins, function () {
	            if (this.name.match(/(windows\smedia)|(Microsoft)/gim)) {
	                found = true;
	                return false;
	            }
	        });
		}
        return found;
    })(),
	
	shk: (function () {
		var found = false;
		try {
			new ActiveXObject("SWCtl.SWCtl");
			found = true;
		} catch(e) {
			jQuery.each(navigator.plugins, function () {
	            if (this.name.match(/shockwave/gim) && !this.name.match(/flash/gim)) {
	                found = true;
	                return false;
	            }
	        });
		}
		return found;
	})(),

    rp: (function () {
        var found = false;
		try {
			new ActiveXObject("RealPlayer");
			found = true;
		} catch(e) {
			jQuery.each(navigator.plugins, function () {
				if (this.name.match(/realplayer/gim)) {
					found = true;
					return false;
				}
			});
		}
        return found;
    })()
});