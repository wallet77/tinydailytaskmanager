<?php
require './serverSide/librairies/Tonic/Autoloader.php';
require './serverSide/init.php';


$app = new Tonic\Application(array(
	'load' => './serverSide/resources/*.php'
));

//$request = new Tonic\Request(array("uri"=>"/tinyDailyTaskManager/dispatch.php"));
$request = new \Tonic\Request(array(
	'uri' => $_SERVER["PATH_INFO"],
	'method' => $_SERVER["REQUEST_METHOD"],
	'contentType' => 'application/json',
));

try {

    $resource = $app->getResource($request);

    #echo $resource; die;

    $response = $resource->exec();

} catch (Tonic\NotFoundException $e) {
    $response = new Tonic\Response(404, $e->getMessage());

} catch (Tonic\UnauthorizedException $e) {
    $response = new Tonic\Response(401, $e->getMessage());
    $response->wwwAuthenticate = 'Basic realm="My Realm"';

} catch (Tonic\Exception $e) {
    $response = new Tonic\Response($e->getCode(), $e->getMessage());
}

$response->output();