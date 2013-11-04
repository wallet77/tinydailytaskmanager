<?php

class GroupService {

	private $groupStorage;

	public function getGroupStorage() {
		return $this->groupStorage;
	}

	public function setGroupStorage($groupStorage) {
		$this->groupStorage = $groupStorage;
	}

	public function getRootGroup($projectid) {
		$res = array();
		try {
			$res["group"] = $this->groupStorage->getRootGroup($projectid);
		} catch (Exception $e) {
			$res = array("error" => $e->getMessage(), "group" => null);
		}

		return $res;
	}

	public function getGroup($id) {
		return $this->groupStorage->getGroup($id);
	}
	
	public function getChildren($id) {
		return $this->groupStorage->getChildren($id);
	}
	
	public function getParent($id) {
		return $this->groupStorage->getParent($id);
	}
	
	public function createGroup($group) {
		$res = array();
		try {
			$res["group"] = $this->groupStorage->createGroup($group);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "group" => null);
		}

		return $res;
	}
	
	public function updateGroup($group) {
		$res = array();
		try {
			$res["group"] = $this->groupStorage->updateGroup($group);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "group" => null);
		}

		return $res;
	}

	public function deleteGroup($groupId) {
		try {
			$this->groupStorage->deleteGroup($groupId);
		} catch(Exception $e) {
			return false;
		}

		return true;
	}
}