<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource is used to retrieve tasks by project
 *
 * @uri /project/:projectid/tasks
 * @uri /project/:projectid/task/root
 */
class TaskCollection extends Resource
{ 

    /**
     * Retrieve all tasks of a specific project
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getTasks($projectid)
    {
		/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];

    	try {
    		$tasks = $service->getTasksByProject($projectid);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "notask")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertListOfTaskBean($tasks), array('content-type' => 'application/json'));
    }
}