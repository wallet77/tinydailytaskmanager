<?php

use Tonic\Resource,
Tonic\Response;

require '../../librairies/Tonic/Autoloader.php';
require '../../resources/Task.php';
require '../../resources/TasksMember.php';
require '../../resources/TasksCollection.php';
require '../../exception/TaskNotFoundException.php';
require '../../services/TaskService.php';
require '../resources/TaskStorageMock.php';
require '../../bean/TaskBean.php';
require '../../jsonConverter/ToJsonConverter.php';
require '../../jsonConverter/FromJsonConverter.php';
require '../../librairies/pimple/pimple.php';

class MembersTest extends PHPUnit_Framework_TestCase
{
	private $container;

	protected function setUp()
    {
        $container = new Pimple();
    	/* @var $service MemberService */
    	$service = new TaskService();
    	$storage = new TaskStorageMock();
    	$service->setTaskStorage($storage);
 
    	$container["serviceTask"] = $service;
    	$GLOBALS["TDTM"]["container"] = $container;
    }
    
 	/**
     * Test getProject
     * 
     * @test
     */
    public function testGetTasksByProjectByMember()
    {
    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/project/1021/member/1020/tasks',
		    'method' => 'GET',
		    'contentType' => 'application/json',
		));

		/* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();
		/* @var $allTasks array */
		$allTasks = FromJsonConverter::convertToListOfTaskBean($response->body);

		$this->assertEquals(2, count($allTasks));
    }
}