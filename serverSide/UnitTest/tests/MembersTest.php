<?php

use Tonic\Resource,
Tonic\Response;

require '../../librairies/Tonic/Autoloader.php';
require '../../resources/MembersCollection.php';
require '../../resources/MembersProject.php';
require '../../resources/Member.php';
require '../../exception/MemberNotFoundException.php';
require '../../services/MemberService.php';
require '../resources/MemberStorageMock.php';
require '../../bean/MemberBean.php';
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
    	$service = new MemberService();
    	$memberStorage = new MemberStorageMock();
    	$service->setMemberStorage($memberStorage);
 
    	$container["serviceMember"] = $service;
    	$GLOBALS["TDTM"]["container"] = $container;
    }

    /**
     * Test getMembers
     * 
     * @test
     */
    public function testGetMembers()
    {

    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/members',
		    'method' => 'GET',
		    'contentType' => 'application/json',
		));
 
        /* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();

		$members = FromJsonConverter::convertToListOfMemberBean($response->body);

		$this->assertEquals(3, count($members));
    }

	/**
     * Test getMembers by poject
     * 
     * @test
     */
    public function testGetMembersByProject()
    {

    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/members/project/1',
		    'method' => 'GET',
		    'contentType' => 'application/json',
		));
 
        /* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();

		$members = FromJsonConverter::convertToListOfMemberBean($response->body);

		$this->assertEquals(2, count($members));
    }
    
 	/**
     * Test getMember
     * 
     * @test
     */
    public function testGetMember()
    {
    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/member/1021',
		    'method' => 'GET',
		    'contentType' => 'application/json',
		));

		/* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Response */
		$response = $resource->exec();
		/* @var $member MemberBean */
		$member = FromJsonConverter::convertToMemberBean($response->body);

		$this->assertEquals("toto", $member->getName());
		$this->assertEquals("titi", $member->getFirstname());
		$this->assertEquals("0122222222", $member->getTel());
		$this->assertEquals("titi@test.com", $member->getEmail());
    }
    
	/**
     * Test createMember
     * 
     * @test
     */
    public function testCreateMember()
    {
    	$app = new \Tonic\Application();
    	$request = new \Tonic\Request(array(
		    'uri' => '/member',
		    'method' => 'POST',
		    'contentType' => 'application/json',
    		'data' => '{"name":"toto","firstname":"titi","tel":"0122222222","email":"titi@test.com", "function": "leader"}'
		));

		/* @var $resource Resource */
		$resource = $app->getResource($request);
		/* @var $response Tonic\Response */
		$response = $resource->exec();

		$this->assertEquals(200, $response->code);
    }
}