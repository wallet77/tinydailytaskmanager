<?php
class MemberStorageMock {

	public function getMember($id) {
		$member = new MemberBean();
		$member->setName("toto");
		$member->setFirstname("titi");
		$member->setTel("0122222222");
		$member->setEmail("titi@test.com");
		$member->setFunction("leader");
		return $member;
	}

	public function getAllMembers() {
		return array($this->getMember(1),$this->getMember(1),$this->getMember(1));
	}

	public function getAllProjectMembers() {
		return array($this->getMember(1),$this->getMember(1));
	}

	public function createMember($member) {
		return $this->getMember(1);
	}
}