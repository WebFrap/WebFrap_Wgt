<?php 
header("Content-Type:  text/xml; charset=utf-8");
echo '<?xml version="1.0" encoding="UTF-8" ?>';
?>
<wgt>
  <gui>
    <head>
    </head>
    <messages>
      <message>OK</message>
    </messages>
    
    <body>
      <htmlArea selector="div#wgt-debug-box" action="html"><![CDATA[
      <pre><?php
      var_dump( isset($_GET)?$_GET:null );
      ?></pre>
      <pre><?php
      var_dump( isset($_POST)?$_POST:null );
      ?></pre>
      ]]></htmlArea>
    </body>
  </gui>
  <code></code>
  <data></data>
</wgt>