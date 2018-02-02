<?php
$manager =  new MongoDB\Driver\Manager("mongodb://mongo:27017");
  $query_body =array(
		'$where'=>"
		function q() {
			var username = ".$_REQUEST["username"].";
			var password = ".$_REQUEST["password"].";if(username == 'admin'&&password == '123456') return true; else{ return false;}}
");  
  //username=1&password=1;return true;}//
//$query_body = "function q() { var username = 1; var password = 1;return true;}//if(username == '1') 
//		return true;else{return false;}";
//echo $query_body;

$query = new MongoDB\Driver\Query($query_body);
$cursor = $manager->executeQuery('test.users', $query)->toArray();
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
