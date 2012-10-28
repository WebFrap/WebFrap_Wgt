/* Licence see: /LICENCES/wgt/licence.txt */

/*
 
  Markup Beispiel
 
  <li id="li1" >
  Text
  <button id="button_1" class="wcm_ui_control_minidrop control_minidrop" style="font-size: 10px;display:none;" >Menu</button>
  <var>
  [
    {
      "type":"url",
      "action":"dump.php",
      "icon":"controls/entity.png",
      "label":"Entry 1"
    },
    {
      "type":"url",
      "action":"dump.php",
      "icon":"controls/entity.png",
      "label":"Entry 2"
    }
  ]
  </var>
  </li>
 */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'control_minidrop', function( jNode ){

  jNode.removeClass("wcm_control_minidrop");
  jNode.hide().addClass('controll-minidrop');
  
  jNode.parent().mouseover(function(){ 
    if( $S('button.controll-minidrop').length != 0 ){
      jQuery.fn.miniMenu.close();
      $S('button.controll-minidrop').hide(); 
    }
    $S(this).find('button.control-minidrop').show(); 
  });

  jNode.button({
    icons: {
      primary: "ui-icon-gear",
      secondary: "ui-icon-triangle-1-s"
    },
    text: false
  });

  var varData = jNode.next();

  var menuItems = varData.is('var') 
  ? $WGT.robustParseJSON( varData.text() )
  : {};

  jNode.miniMenu({
    globalClose : true,
    plain : true,
    closeParent: true,
    overlayStyle:{width:'120px'},
    menuItems   : menuItems
  });

});