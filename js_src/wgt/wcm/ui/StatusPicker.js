/* Licence see: /LICENCES/wgt/licence.txt */

/**
 * @author dominik alexander bonsch <db@webfrap.net>
 */
$R.addAction( 'ui_status_picker', function( jNode ){

  jNode.removeClass("wcm_ui_status_picker");
  
  /*
<div id="{$rowid}-stpckr" class="wgt-grid_menu" >
  <button
    class="wcm wcm_control_dropmenu wgt-button ui-state-default" tabindex="-1"
    id="{$rowid}-stpckr-cntrl"
    style="width:40px;"
    wgt_drop_box="{$rowid}-stpckr-menu" >
    <i class="icon-circle" ></i>
  </button>
</div>
<div class="wgt-dropdownbox al_right" id="{$rowid}-stpckr-menu" >
  <ul>
    <li><a href="#00C000" value="1" ><i class="icon-circle" style="color:#00C000;" ></i> Green</a></li>
    <li><a href="#F4F400" value="2" ><i class="icon-warning-sign" style="color:#F4F400;" ></i> Yellow</a></li>
    <li><a href="#FF0000" value="3" ><i class="icon-exclamation-sign" style="color:#FF0000;" ></i> Red</a></li>
  </ul>
</div>
  */
  
  var parent = jNode.parent(),
   value = jNode.attr('status'),
   active = null,
   grid;
  
  if (jNode.attr('wgt_bind')) {
    grid = $S('#'+jNode.attr('wgt_bind'));
  }

  jNode.dropdown({
    "align":"right",
    "closeScroll":"true"
  });
  
  $S('#'+parent.attr('id')+'-menu').find('li').click(function(){

    var self=$S(this).find('a');
    parent.parent().css('backgroundColor',self.attr('href'));
    jNode.html(self.find('i').clone());
    
    if(grid){
      grid.grid('writeSavedata',jNode.parent().parent().attr('name'),self.attr('value'));
    }
    
    return false;
  });
  
  if (0!=value) {
    value = value-1;
    active = $S('#'+parent.attr('id')+'-menu a').eq(value);
    parent.parent().css('backgroundColor',active.attr('href'));
    jNode.html(active.find('i').clone());
  }
  

  
});

