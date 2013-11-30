<?php

use Tonic\Resource,
Tonic\Response;

require '../../librairies/Tonic/Autoloader.php';
require '../../resources/Project.php';
require '../../resources/ProjectsCollection.php';
require '../../exception/ProjectNotFoundException.php';
require '../../services/ProjectService.php';
require '../../storage/ProjectStorage.php';
require '../resources/ProjectStorageMock.php';
require '../../bean/ProjectBean.php';
require '../../jsonConverter/ToJsonConverter.php';
require '../../jsonConverter/FromJsonConverter.php';
require '../../librairies/pimple/pimple.php';

class ProjectsTest extends PHPUnit_Framework_TestCase
{
	private $container;

	protected function setUp()
    {
        $container = new Pimple();
    	/* @var $service MemberService */
    	$service = new ProjectService();
    	$storage = new ProjectStorageMock();
    	$service->setProjectStorage($storage);
 
    	$container["serviceProject"] = $service;
    	$GLOBALS["TDTM"]["container"] = $container;
    }
    
 	/**
     * Test getProject
     * 
     * @test
     */
    public function testGetProject()
    {
    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/project/1021',
		    'method' => 'GET',
		    'contentType' => 'application/json',
		));

		/* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();

		/* @var $project ProjectBean */
		$project = FromJsonConverter::convertToProjectBean($response->body);

		$this->assertEquals("toto", $project->getName());
    }

	/**
     * Test create project
     * 
     * @test
     */
    public function testCreateProject()
    {
    	$app = new \Tonic\Application();

    	$project = new ProjectBean();
    	$project->setDescription("test");
    	$project->setEndtime("12/12/2013 12:00:00");
    	$project->setStarttime("12/12/2013 12:00:00");
    	$project->setName("test");

    	$request = new \Tonic\Request(array(
		    'uri' => '/project',
		    'method' => 'POST',
		    'contentType' => 'application/json',
    		'data' => ToJsonConverter::convertProjectBean($project)
		));

		/* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();
		
		$this->assertEquals(200, $response->code);
    }
}