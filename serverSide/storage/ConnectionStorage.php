<?php
/**
 * Database layer for connection.
 * 
 * @package tdtm.serverSide.storage
 * @author Vincent Vallet
 * @since 1.0
 *
 */
class ConnectionStorage {

	public function getConnectionfo($login, $password) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM user WHERE login = ? AND password = ?");
		$req->execute(array($login, $password));

		// if request finish successfuly
		if($req->errorCode() != 0 || $req->rowCount() == 0)
		{
			throw new Exception('No user ' + $login + ' in database or bad password !');
		}
	}
}