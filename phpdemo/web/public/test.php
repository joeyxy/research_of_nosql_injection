<?php
$m = new MongoDB\Driver\Manager("mongodb://mongo:27017/test");

// Don't do this!!!
$username = $_GET['field']; 

$cmd = new \MongoDB\Driver\Command( [
    'eval' => "print('Hello, $username!');"
] );

$r = $m->executeCommand( 'test', $cmd );
?>