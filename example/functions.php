<?php

function tagIcon( $name, $alt, $size = "xsmall" )
{
  global $pathIcon;
  
  echo <<<ICON
<img src="{$pathIcon}{$size}/{$name}" alt="{$alt}" class="icon {$size}" />
ICON;

}
