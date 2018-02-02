<?php
$manager =  new MongoDB\Driver\Manager("mongodb://mongo:27017");
$username = $_REQUEST['username'];
$cmd = new MongoDB\Driver\Command([
  // build the 'distinct' command
  'eval'=> "function(username){db.users.distinct('username',{'username':' + username + '})}",
  'args' => $username,
]);
$cursor = $manager->executeCommand('test', $cmd)->toArray();
var_dump($cursor);
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
