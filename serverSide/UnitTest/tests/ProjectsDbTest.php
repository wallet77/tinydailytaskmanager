<?php

require '../../storage/ProjectStorage.php';
require '../../bean/ProjectBean.php';
require '../../jsonConverter/ToJsonConverter.php';
require '../../jsonConverter/FromJsonConverter.php';
require '../../librairies/pimple/pimple.php';
require '../../storage/database/db.php';

class ProjectsDbTest extends PHPUnit_Framework_TestCase
{
	private $container;

	protected function setUp()
    {
        $container = new Pimple();
    	/* @var $storage ProjectStorage */
    	$storage = new ProjectStorage();
 
    	$container["storageProject"] = $storage;
    	$container["db"] = dbconnect("../../storage/database/connect_info_test.php");
    	$GLOBALS["TDTM"]["container"] = $container;
    }
    
 	/**
     * Test create a project
     * 
     * @test
     */
    public function testCreateProject()
    {
    	/* @var $storage ProjectStorage */
    	$storage = $GLOBALS["TDTM"]["container"]["storageProject"];

    	$project = new ProjectBean();
    	$project->setDescription("test !!!");
    	$project->setEndtime("10/10/2013");
    	$project->setStarttime("10/10/2013");
    	$project->setName("test");

    	try {
    		$storage->createProject($project);
    	} catch (Exception $e) {
    		$this->fail('Project not created');
    	}
    }
}