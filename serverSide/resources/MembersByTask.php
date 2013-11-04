<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource is used to retrieve members by task
 * 
 * @uri /task/:id/members
 */
class MembersByTask extends Resource
{ 
	/**
     * Retrieve all members linked to a task
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getMembers($taskid)
    {
		/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
    	
    	$taskid = str_replace('task_', '', $taskid);
    	try {
    		$members = $service->getMembersByTask($taskid);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "notask")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertListOfMemberBean($members), array('content-type' => 'application/json'));
    }
}