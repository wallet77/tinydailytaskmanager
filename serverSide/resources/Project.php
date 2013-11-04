<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles member access
 *
 * @uri /project
 * @uri /project/:id
 */
class Project extends Resource
{

    /**
     * Retrieve a specific project
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getProject($id)
    {
		/* @var $service ProjectService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceProject"];

    	try {
    		$project = $service->getProject($id);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "noproject")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertProjectBean($project), array('content-type' => 'application/json'));
    }

	/**
     * Create a project
     *
     *
     * @method POST
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function createProject()
    {
    	/* @var $service ProjectService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceProject"];
 
		$project = FromJsonConverter::convertToProjectBean($this->request->data);
		
    	$res = $service->createProject($project);

		if($res["project"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertProjectBean($res["project"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Update a project
     *
     *
     * @method PUT
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function updateProject($id)
    {
    	/* @var $service ProjectService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceProject"];
 
		$project = FromJsonConverter::convertToProjectBean($this->request->data);
		$project->setId($id);
		
		$res = $service->updateProject($project);

		if($res["project"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertProjectBean($res["project"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Delete a project
     *
     *
     * @method DELETE
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function deleteProject($id)
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceProject"];

		if($service->deleteProject($id)) {
			return new Response(Response::OK, "", array('content-type' => 'application/json'));
		}
        return new Response(Response::IMATEAPOT, "", array('content-type' => 'application/json'));
    }
}