<?php

/**
 * All connection operations.
 * This service can be used everywhere in application.
 *
 * @author Vincent Vallet
 * @since 1.0
 * @package serverSide.services
 */
class ConnectionService {

	private $connectionStorage;

	public function getConnectionStorage() {
		return $this->$connectionStorage;
	}

	public function setConnectionStorage($connectionStorage) {
		$this->connectionStorage = $connectionStorage;
	}

public function getConnectionInfo($login, $password) {

		try {
			$this->connectionStorage->getConnectionInfo($login, $password);
		} catch (Exception $e) {
			throw $e;
		}
	}
}