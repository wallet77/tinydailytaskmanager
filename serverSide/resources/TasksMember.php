<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource is used to retrieve tasks by project by member
 *
 * @uri /project/:projectid/member/:memberid/tasks
 */
class TasksMember extends Resource
{ 

    /**
     * Retrieve all tasks of a specific project
     * assign to a specific member
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getTasks($projectid,$memberid)
    {
		/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];

    	try {
    		$tasks = $service->getTasksByMemberByProject($memberid, $projectid);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "notask")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertListOfTaskBean($tasks), array('content-type' => 'application/json'));
    }
}