<?php
   // connect to mongodb
   $manager =  new MongoDB\Driver\Manager("mongodb://mongo:27017");
   $dbUsername = null;
   $dbPassword = null;
  
   $data = array(
   		'username' =>  $_REQUEST['username'],
   		'password' =>  $_REQUEST['password']
   ); 
   $query = new MongoDB\Driver\Query($data);
   $cursor = $manager->executeQuery('test.users', $query)->toArray();
/*    $data = array(
   		'username' => array('$ne' => 1),
   		'password' => array('$ne' => 1)
   		 
   ); */
   $string = json_encode($data);
    echo $string;

   $doc_failed = new DOMDocument();
   $doc_failed->loadHTMLFile("failed.html");
   $doc_succeed = new DOMDocument();
   $doc_succeed->loadHTMLFile("succeed.html");
   if(count($cursor)>0){
   	echo $doc_succeed->saveHTML();
   }
   else{
   	echo $doc_failed->saveHTML();
   }
