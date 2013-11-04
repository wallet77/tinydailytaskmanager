<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles member access
 *
 * @uri /member
 * @uri /member/:id
 */
class Member extends Resource
{ 

    /**
     * Retrieve a specific member
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getMember($id)
    {
		/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];

    	try {
    		$member = $service->getMember($id);
    	} catch (Exception $e) {
    		return new Response(Response::IMATEAPOT, json_encode(array("code" => "nomember")), array('content-type' => 'application/json'));
		}

        return new Response(Response::OK, ToJsonConverter::convertMemberBean($member), array('content-type' => 'application/json'));
    }

	/**
     * Create a member
     *
     *
     * @method POST
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function createMember()
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];
 
		$member = FromJsonConverter::convertToMemberBean($this->request->data);
		$res = $service->createMember($member);

		if($res["member"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertMemberBean($res["member"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Update a member
     *
     *
     * @method PUT
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function updateMember($id)
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];
 
		$member = FromJsonConverter::convertToMemberBean($this->request->data);
		$member->setId($id);

		$res = $service->updateMember($member);
		if($res["member"] !== null) {
			return new Response(Response::OK, ToJsonConverter::convertMemberBean($res["member"]), array('content-type' => 'application/json'));
		}

        return new Response(Response::IMATEAPOT, $res["error"], array('content-type' => 'application/json'));
    }
    
	/**
     * Delete a member
     *
     *
     * @method DELETE
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function deleteMember($id)
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];
 
		if($service->deleteMember($id)) {
			return new Response(Response::OK, "", array('content-type' => 'application/json'));
		}
        return new Response(Response::IMATEAPOT, "", array('content-type' => 'application/json'));
    }
}