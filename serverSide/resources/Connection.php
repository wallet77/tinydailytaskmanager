<?php
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * This resource handles connection process
 *
 * @uri /connection
 */
class Connection extends Resource
{

    /**
     * Get a user informations
     *
     *
     * @method GET
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function getConnectionInformation()
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
}