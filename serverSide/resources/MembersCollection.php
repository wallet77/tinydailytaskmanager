<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource is used to retrieve all members
 *
 * @uri /members
 */
class MembersCollection extends Resource
{
	
 	/**
     * Retrieve all members
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function getMembers()
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];
    	$members = $service->getAllMembers();

        return new Response(Response::OK, ToJsonConverter::convertListOfMemberBean($members), array('content-type' => 'application/json'));
    }
}