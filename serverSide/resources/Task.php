<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles task access
 *
 * @uri /task
 * @uri /task/:id
 */
class Task extends Resource
{

    /**
     * Retrieve a specific task
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getTask($id)
    {
		/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
		$id = str_replace('task_', '', $id);
    	try {
    		$task = $service->getTask($id);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "notask")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertTaskBean($task), array('content-type' => 'application/json'));
    }

	/**
     * Create a task
     *
     *
     * @method POST
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function createTask()
    {
    	/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
 
		$task = FromJsonConverter::convertToTaskBean($this->request->data);
		$res = $service->createTask($task);

		if($res["task"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertTaskBean($res["task"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Update a task
     *
     *
     * @method PUT
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function updateTask($id)
    {
    	/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
 		$id = str_replace('task_', '', $id);
		$task = FromJsonConverter::convertToTaskBean($this->request->data);
		$task->setId($id);

		$res = $service->updateTask($task);

		if($res["task"] !== null) {
			return new Response(Response::OK,  ToJsonConverter::convertTaskBean($res["task"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Delete a task
     *
     *
     * @method DELETE
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function deleteTask($id)
    {
    	/* @var $service TaskService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
		$id = str_replace('task_', '', $id);
		if($service->deleteTask($id)) {
			return new Response(Response::OK, "", array('content-type' => 'application/json'));
		}
        return new Response(Response::IMATEAPOT, "", array('content-type' => 'application/json'));
    }
}