<?php
require './serverSide/resources/MembersCollection.php';
require './serverSide/resources/Project.php';
require './serverSide/resources/ProjectsCollection.php';
require './serverSide/resources/Member.php';
require './serverSide/resources/Group.php';
require './serverSide/resources/GroupChildren.php';
require './serverSide/resources/RootGroup.php';
require './serverSide/resources/Task.php';
require './serverSide/resources/TasksCollection.php';
require './serverSide/resources/TasksMember.php';
require './serverSide/exception/MemberNotFoundException.php';
require './serverSide/services/MemberService.php';
require './serverSide/storage/MemberStorage.php';
require './serverSide/services/ProjectService.php';
require './serverSide/storage/ProjectStorage.php';
require './serverSide/services/GroupService.php';
require './serverSide/storage/GroupStorage.php';
require './serverSide/services/TaskService.php';
require './serverSide/storage/TaskStorage.php';
require './serverSide/services/ConnectionService.php';
require './serverSide/storage/ConnectionStorage.php';
require './serverSide/bean/MemberBean.php';
require './serverSide/bean/ProjectBean.php';
require './serverSide/bean/GroupBean.php';
require './serverSide/bean/TaskBean.php';
require './serverSide/jsonConverter/ToJsonConverter.php';
require './serverSide/jsonConverter/FromJsonConverter.php';
require './serverSide/librairies/pimple/pimple.php';
require './serverSide/storage/database/db.php';

$container = new Pimple();

/*--------------------------------------------------*/
/*  	     Set member service/storage				*/
/*--------------------------------------------------*/
/* @var $service MemberService */
$service = new MemberService();
$memberStorage = new MemberStorage();
$service->setMemberStorage($memberStorage);
$container["serviceMember"] = $service;

/*--------------------------------------------------*/
/*  	     Set project service/storage			*/
/*--------------------------------------------------*/
/* @var $service MemberService */
$projectService = new ProjectService();
$projectStorage = new ProjectStorage();
$projectService->setProjectStorage($projectStorage);
$container["serviceProject"] = $projectService;

/*--------------------------------------------------*/
/*  	     Set group service/storage				*/
/*--------------------------------------------------*/
/* @var $service GroupService */
$groupService = new GroupService();
$groupStorage = new GroupStorage();
$groupService->setGroupStorage($groupStorage);
$container["serviceGroup"] = $groupService;

/*--------------------------------------------------*/
/*  	     Set task service/storage				*/
/*--------------------------------------------------*/
/* @var $service TaskService */
$taskService = new TaskService();
$taskStorage = new TaskStorage();
$taskService->setTaskStorage($taskStorage);
$container["serviceTask"] = $taskService;

/*--------------------------------------------------*/
/*  	     Set connection service/storage			*/
/*--------------------------------------------------*/
/* @var $service ConnectionService */
$connectionService = new ConnectionService();
$connectionStorage = new ConnectionStorage();
$connectionService->setConnectionStorage($connectionStorage);
$container["serviceConnection"] = $connectionService;


$container["db"] = dbconnect();
$GLOBALS["TDTM"]["container"] = $container;