<?php
/*******************************************************************************
*
* @author      : Dominik Bonsch <dominik.bonsch@webfrap.net>
* @date        :
* @copyright   : Webfrap Developer Network <contact@webfrap.net>
* @project     : Webfrap Web Frame Application
* @projectUrl  : http://webfrap.net
*
* @licence     : BSD License see: LICENCE/BSD Licence.txt
* 
* @version: @package_version@  Revision: @package_revision@
*
* Changes:
*
*******************************************************************************/

$theme  = isset($_GET['theme'])?$_GET['theme']:'default';
$css    = isset($_GET['css'])?$_GET['css']:'default';
$js     = isset($_GET['js'])?$_GET['js']:'default';

$file   = isset($_GET['page'])? str_replace( '.','/',$_GET['page'] ):'the_index';

$pathIcon = '../icons/default/';

include "functions.php"

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>WGT Example</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="content-Script-Type" content="text/javascript" />
<meta http-equiv="content-Style-Type" content="text/css" />
<meta http-equiv="content-language" content="de" />
<link type="text/css" href="./gw/css.php?list=default" rel="stylesheet" />
<link type="text/css" href="./gw/theme.php?list=default" rel="stylesheet" />
<script type="text/javascript" src="./gw/js.php?list=default" ></script>

</head>
<body>
<?php

if( file_exists('./'.$file.'.php') )
  include './'.$file.'.php';
else
  include './not_exists.php';

?>

</body>
</html>
