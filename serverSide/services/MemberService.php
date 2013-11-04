<?php
/**
 * Members service layer.
 * 
 * @author Vincent Vallet
 * @since 1.0
 * @package serverSide.services
 */
class MemberService {

	private $memberStorage;

	public function getMemberStorage() {
		return $this->memberStorage;
	}

	public function setMemberStorage($memberStorage) {
		$this->memberStorage = $memberStorage;
	}

	public function getMember($id) {
		return $this->memberStorage->getMember($id);
	}
	
	public function getAllMembers() {
		return $this->memberStorage->getAllMembers();
	}
	
	public function getAllProjectMembers($id) {
		return $this->memberStorage->getAllProjectMembers($id);
	}
	
	public function createMember($member) {
		$res = array();
		try {
			$res["member"] = $this->memberStorage->createMember($member);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "member" => null);
		}

		return $res;
	}
	
	public function updateMember($member) {
		$res = array();
		try {
			$res["member"] = $this->memberStorage->updateMember($member);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "member" => null);
		}

		return $res;
	}
	
	public function deleteMember($memberId) {
		try {
			$this->memberStorage->deleteMember($memberId);
		} catch(Exception $e) {
			return false;
		}

		return true;
	}
}