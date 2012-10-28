<h2>UI Element: Context Menu</h2>

<div id="my_div" class="wcm wcm_control_context_menu" style="width:200px;height:200px;border:1px dotted silver;" >
  Right click to view the context menu
</div>
<var>{"menu":"my_menu"}</var>


<ul id="my_menu" class="wgt_context_menu">
  <li><a class="wgt-bgi edit" href="#edit">Edit</a></li>
  <li class="cut separator"><a href="#cut">Cut</a></li>
  <li class="copy"><a href="#copy">Copy</a></li>
  <li class="paste"><a href="#paste">Paste</a></li>
  <li class="delete"><a href="#delete">Delete</a></li>
  <li class="quit separator"><a href="#close">Close</a></li>
</ul>

<script type="text/javascript">
  
  $S(document).ready( function() {

    $S('#my_div').data('wgt-context-action',{
      edit: function( el, pos ){
        alert( 'Y '+pos.y );
      },
      cut: function( el, pos ){
        alert( 'X '+pos.x );
      },
      close: function( el, pos ){
      }
    });

    /*
    // Show menu when #myDiv is clicked
    $S("#my_div").contextMenu({
      menu: 'my_menu'
    },
      function( action, el, pos) {
      alert(
        'Action: ' + action + '\n\n' +
        'Element ID: ' + $S(el).attr('id') + '\n\n' + 
        'X: ' + pos.x + '  Y: ' + pos.y + ' (relative to element)\n\n' + 
        'X: ' + pos.docX + '  Y: ' + pos.docY+ ' (relative to document)'
        );
    });
    */
    
  });
</script>

<div class="wgt-box full wgt-scroll-y heigh-large" >

  <div class="wgt-clear-large" ></div>
  <h3>Source Code</h3>
  <?php highlight_file(__FILE__);  ?>

</div>