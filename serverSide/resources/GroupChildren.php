<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles group access
 *
 * @uri /group/:id/children
 */
class GroupChildren extends Resource
{

    /**
     * Retrieve a specific group
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getGroupChildren($id)
    {
		/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];
		$dbId = str_replace('group_', '', $id);
    	try {
    		$group = new GroupBean();
    		$group->setId($dbId);
    		$group->setChildren($service->getChildren($dbId));
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "nogroup")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertGroupBean($group), array('content-type' => 'application/json'));
    }
}