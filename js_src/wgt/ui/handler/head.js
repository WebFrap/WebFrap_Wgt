/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$IU.addHandler( 'find', 'gui>head', function( mNode ){

  // setting new page title
  if( mNode.children("title").get().length > 0 ){

    var titleVar = mNode.children("title").text();

    if( !window.$B.empty(titleVar) ){

      document.title = titleVar;
    }
  }

  // add and delete CSS Files
  if(mNode.children("css").get().length > 0){

    mNode.children("css").each(function(){

      var op = $S(this);
      var action = op.attr("action");
      var source = op.attr("src");

      if (action == "add") { // add

        if ($S("head link[href=" + source + "]").get().length == 0){ // allready added?
          $S("head").append('<link rel="stylesheet" href="' + source + '" />');

        }

      }
      else{ // remove

        $S("head link[href=" + source + "]").remove();
      }

    });
  }//end if

  // add and delete JS Files
  if(mNode.children("js").get().length > 0) {

    mNode.children("js").each(function()  {

      var op = $S(this);
      var action = op.attr("action");
      var source = op.attr("src");

      if (action == "add") { // add
        if ($S("head script[src=" + source + "]").get().length == 0) { // allready added?

          $S("head").append('<script type="text/javascript" src="' + source + '"></script>');
        }
      }
      else {// remove

        $S("head script[src=" + source + "]").remove();
      }

    });
  }//end if

  // add and delete JS Files
  if(mNode.children("redirect").get().length > 0) {

    mNode.children("redirect").each(function() {

      var redirectUrl = $S(this);
      $R.redirect(redirectUrl.text());
    });
  }//end if

});