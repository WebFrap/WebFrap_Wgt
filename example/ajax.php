<?php 

header( 'Content-Type:text/xml; charset=utf-8' );

echo '<?xml version="1.0" encoding="UTF-8" ?>'."\n"; 
  
$file   = isset($_GET['page'])? str_replace( '.','/',$_GET['page'] ):'the_index';

$pathIcon = '../icons/default/';

$elements = array();
$title    = null;

$messages = array();
$warnings = array();
$errors   = array();

$code = '';
$data = '';

if( file_exists('./'.$file.'.php') )
  include './'.$file.'.php';
else
  include './data_not_exists.php';
  
  
$codeMessages = '';
  
// Gibet Fehlermeldungen? Wenn ja dann Raus mit
if( $errors )
{
  $codeMessages .= '<error><![CDATA['.NL;

   foreach( $errors as $error )
    $codeMessages .= $error.'<br />'.NL;

  $codeMessages .= ']]></error>';
}

if( $warnings )
{
  $codeMessages .= '<warning><![CDATA['.NL;

  foreach( $warnings as $warn )
    $codeMessages .= $warn."<br />".NL;

  $codeMessages .= ']]></warning>';
}


if( $messages )
{
  $codeMessages .= '<message><![CDATA['.NL;

   foreach( $messages as $message )
      $codeMessages .= $message.'<br />'.NL;

  $codeMessages .= ']]></message>'.NL;
}

?>
<wgt>
  <gui>
    <head></head>

    <messages><?php echo $codeMessages ?></messages>

    <body>

      <?php 
      
      foreach( $elements as $element )
      {
        echo $element."\n";
      }
      
      ?>
    
    </body>
  </gui>

  <code><![CDATA[<?php echo $code ?>]]></code>
  <data><![CDATA[<?php echo $data ?>]]></data>

</wgt>