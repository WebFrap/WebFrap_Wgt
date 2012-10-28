<h2>UI Element: Selectbox</h2>



<div id="prototype" class="wcm wcm_ui_dbl_list_selector wgt-dbl_list_selector bw3 wgt-border" >

  <var id="prototype-cfg-dbl_list" >{
      "url_connect" : "dump.php?c=fuu",
      "url_disconnect"  : "dump.php?c=fuu"
  }</var>

  <ul class="out bw1 dbl_list" >
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
    <li>Entry Out 1<input class="wgt-ignore" name="fu[]" type="hidden" value="1" /></li>
    <li>Entry Out 2<input class="wgt-ignore" name="fu[]" type="hidden" value="2" /></li>
    <li>Entry Out 3<input class="wgt-ignore" name="fu[]" type="hidden" value="3" /></li>
    <li>Entry Out 4<input class="wgt-ignore" name="fu[]" type="hidden" value="4" /></li>
  </ul>
  
  <div class="menu bw05" >
    <div class="entry" >
      <button class="wgt-button all_in ui-icon ui-icon-arrowthickstop-1-e" >&nbsp;&nbsp;</button>
    </div>
    <div class="entry" >
      <button class="wgt-button seleted_in ui-icon ui-icon-arrowthick-1-e" >&nbsp;&nbsp;</button>
    </div>
    <div class="wgt-clear small" >&nbsp;</div>
    <div class="entry" >
      <button class="wgt-button seleted_out ui-icon ui-icon-arrowthick-1-w" >&nbsp;&nbsp;</button>
    </div>
    <div class="entry" >
      <button class="wgt-button all_out ui-icon ui-icon-arrowthickstop-1-w" >&nbsp;&nbsp;</button>
    </div>
  </div>
  
  <ul class="in bw1 dbl_list" >
    <li>Entry In 1<input name="fu[]" type="hidden" value="11" /></li>
    <li>Entry In 2<input name="fu[]" type="hidden" value="12" /></li>
    <li>Entry In 3<input name="fu[]" type="hidden" value="13" /></li>
    <li>Entry In 4<input name="fu[]" type="hidden" value="14" /></li>
  </ul>
  
  <div class="clear" ></div>
</div>

<?php /*

<style type="text/css" >

.dbl_list_selector
{
  border:1px solid silver;
  margin: 3px;
}

.dbl_list_selector ul.out,
.dbl_list_selector ul.in
{
  margin:5px;
  border:1px solid silver;
  max-height: 250px;
  overflow:auto;
}


.dbl_list_selector ul.out
{
  float:left;
}

.dbl_list_selector ul.in
{
  float:right;
}

.dbl_list_selector div.menu
{
  float:left;
  text-align: center;
  margin:5px;
  margin-top:10px;
}

.dbl_list_selector div.menu .entry
{
  padding:2px;
  margin-left:38px;
}

.dbl_list_selector ul li
{
  border:1px solid silver;  
  padding:3px;
}

</style>

<script type="text/javascript" >
$S(function() {
  
    
  $S( "#prototype ul.out, #prototype ul.in" ).sortable({
    
   /**
    * the remove event
    * /
    connectWith: ".dbl_list",
    
   /**
    * the remove event
    * /
    items: "li:not(.ui-state-disabled)",

    /**
    * the remove event
    * /
    receive: function( event, ui) {

      if( $S(ui.sender).find('li').length == 0  ){
        
        $S(ui.sender).append('<li class="ui-state-disabled" >no entries...</li>');
      }
      
      if( $S(this).find('.ui-state-disabled').length != 0   ){
        
        $S(this).find('.ui-state-disabled').remove();
      }

      $S( ui.item ).removeClass('ui-state-highlight');
      
      if( $S(this).is('.in') ){
        
        $S(ui.item).find('input').removeClass('wgt-ignore');
      } else {
        
        $S(ui.item).find('input').addClass('wgt-ignore');
      }
  
    }
        
  }).disableSelection();
  
  $S( "#prototype ul li" ).each(function(){

    $S(this).click(function(){
      $S(this).toggleClass('ui-state-highlight');
    });
  });
  
  $S( "#prototype button.all_in" ).click(function(){
    
    $S( "#prototype ul.in" ).append( $S( "#prototype ul.out li:not(.ui-state-disabled)" ) );
    $S( "#prototype ul.in input" ).removeClass('wgt-ignore');
    $S( "#prototype ul.in li.ui-state-disabled" ).remove();
    $S( "#prototype ul.in li" ).removeClass('ui-state-highlight');
    
    if( $S( "#prototype ul.out li" ).length == 0 ){
      $S( "#prototype ul.out" ).append('<li class="ui-state-disabled" >no entries...</li>');
    }
  }).addClass('ui-icon ui-icon-arrowthickstop-1-e');
  
  $S( "#prototype button.all_out" ).click(function(){
    $S( "#prototype ul.out" ).append( $S( "#prototype ul.in li:not(.ui-state-disabled)" ) );
    $S( "#prototype ul.out input:not(.wgt-ignore)" ).addClass('wgt-ignore').removeClass('ui-state-highlight');
    $S( "#prototype ul.out li.ui-state-disabled" ).remove();
    $S( "#prototype ul.out li" ).removeClass('ui-state-highlight');
    
    if( $S( "#prototype ul.in li" ).length == 0 ){
      $S( "#prototype ul.in" ).append('<li class="ui-state-disabled" >no entries...</li>');
    }
  });

  $S( "#prototype button.seleted_in" ).click(function(){
    
    var entries = $S( "#prototype ul.out li.ui-state-highlight:not(.ui-state-disabled)" );
    
    if( !entries.length )
      return;
    
    $S( "#prototype ul.in" ).append( entries );
    $S( "#prototype ul.in input" ).removeClass('wgt-ignore').removeClass('ui-state-highlight');
    $S( "#prototype ul.in li.ui-state-disabled" ).remove();
    $S( "#prototype ul.in li" ).removeClass('ui-state-highlight');
    
    
    if( $S( "#prototype ul.out li" ).length == 0 ){
      $S( "#prototype ul.out" ).append('<li class="ui-state-disabled" >no entries...</li>');
    }
  });
  
  $S( "#prototype button.seleted_out" ).click(function(){
    
    var entries = $S( "#prototype ul.in li.ui-state-highlight:not(.ui-state-disabled)" );
    if( !entries.length )
      return;
    
    $S( "#prototype ul.out" ).append( entries );
    $S( "#prototype ul.out input:not(.wgt-ignore)" ).addClass('wgt-ignore').removeClass('ui-state-highlight');
    $S( "#prototype ul.out li.ui-state-disabled" ).remove();
    $S( "#prototype ul.out li" ).removeClass('ui-state-highlight');
    
    if( $S( "#prototype ul.in li" ).length == 0 ){
      $S( "#prototype ul.in" ).append('<li class="ui-state-disabled" >no entries...</li>');
    }
  });

});
</script>
*/?>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file( __FILE__ );  ?>

</div>