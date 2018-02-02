<?php
$manager =  new MongoDB\Driver\Manager("mongodb://mongo:27017");
$username = $_REQUEST['username'];
$cmd = new MongoDB\Driver\Command([
  // build the 'distinct' command
  'eval'=> "db.users.distinct('username',{'username':'$username'})"
]);

var_dump($cmd);
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



// db.users.distinct('username',
//   {'username':username=2'});db.users.drop();)//})
// username=2'});db.users.drop();
