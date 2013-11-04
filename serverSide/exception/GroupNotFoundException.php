<?php
/**
* Exception throwed when a group was not found
* 
* @package tdtm.serverSide.exception
* @author Vincent Vallet
* @version 1.0
*/
class GroupNotFoundException extends Exception
{
	public function __construct($message, $code = 0, Exception $previous = null) {
		parent::__construct($message, $code, $previous);
	}

	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}
}