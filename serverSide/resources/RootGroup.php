<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles root group access
 * @uri /project/:projectid/root
 */
class RootGroup extends Resource
{
	/**
     * Retrieve a root group
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getRootGroup($projectid)
    {
		/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];

    	$group = $service->getRootGroup($projectid);
    	if($group["group"] === null) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "noRootGroup", "msg" => $group["error"])), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertGroupBean($group["group"]), array('content-type' => 'application/json'));
    }
}