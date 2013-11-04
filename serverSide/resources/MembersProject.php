<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles all members access by project
 *
 * @uri /members/project/:id
 */
class MembersProject extends Resource
{

    /**
     * Retrieve all members of a project
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @return Response
     */
    public function getMembers($id)
    {
    	/* @var $service MemberService */
    	$service = $GLOBALS["TDTM"]["container"]["serviceMember"];
    	$members = $service->getAllProjectMembers($id);

        return new Response(Response::OK, ToJsonConverter::convertListOfMemberBean($members), array('content-type' => 'application/json'));
    }
}