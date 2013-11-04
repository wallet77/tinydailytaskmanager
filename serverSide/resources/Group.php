<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles group access
 *
 * @uri /group
 * @uri /group/:id
 */
class Group extends Resource
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
    public function getGroup($id)
    {
		/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];
		$id = str_replace('group_', '', $id);
    	try {
    		$group = $service->getGroup($id);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "nogroup")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertGroupBean($group), array('content-type' => 'application/json'));
    }

	/**
     * Create a group
     *
     *
     * @method POST
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function createGroup()
    {
    	/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];
 
		$group = FromJsonConverter::convertToGroupBean($this->request->data);
		$res = $service->createGroup($group);

		if($res["group"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertGroupBean($res["group"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Update a group
     *
     *
     * @method PUT
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function updateGroup($id)
    {
    	/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];
 		$id = str_replace('group_', '', $id);
		$group = FromJsonConverter::convertToGroupBean($this->request->data);
		$group->setId($id);

		$res = $service->updateGroup($group);

        if($res["group"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertGroupBean($res["group"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Delete a group
     *
     *
     * @method DELETE
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function deleteGroup($id)
    {
    	/* @var $service GroupService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceGroup"];
		$id = str_replace('group_', '', $id);
		if($service->deleteGroup($id)) {
			return new Response(Response::OK, "", array('content-type' => 'application/json'));
		}
        return new Response(Response::IMATEAPOT, "", array('content-type' => 'application/json'));
    }
}