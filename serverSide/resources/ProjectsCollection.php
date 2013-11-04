<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource is used to retrieve all projects
 *
 * @uri /projects
 */
class ProjectsCollection extends Resource
{
	
 	/**
     * Retrieve all projects
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getAllProjects()
    {
		/* @var $service ProjectService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceProject"];

    	try {
    		$projectList = $service->getAllProjects();
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("msg" => $e)), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertListOfProjectBean($projectList), array('content-type' => 'application/json'));
    }
}