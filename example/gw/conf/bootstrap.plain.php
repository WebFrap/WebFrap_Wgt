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

include './conf/path.php';

error_reporting( E_ALL| E_STRICT );


include PATH_FW.'src/Webfrap.php';
include PATH_FW.'src/Conf.php';

spl_autoload_register('Webfrap::indexAutoload');
spl_autoload_register('Webfrap::pathAutoload');


// Gateway Path
Webfrap::$autoloadPath[]  = PATH_GW.'src/';
Webfrap::$autoloadPath[]  = PATH_THEME.'src/';

// load only the sources from libs
Webfrap::loadModulePath(true);
//Webfrap::loadLibPath(true);

// Framework Path
Webfrap::$autoloadPath[]  = PATH_FW.'src/';;



