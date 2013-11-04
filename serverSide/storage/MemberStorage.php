<?php

/**
 * Members storage layer.
 * 
 * @author Vincent Vallet
 * @since 1.0
 * @package serverSide.storage
 */
class MemberStorage {

	public function getMember($id) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM member WHERE id = ?");
		$req->execute(array($id));

		$member = new MemberBean();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				// get the member
				$row = $req->fetch(PDO::FETCH_ASSOC);

				$member->setId($id);
				$member->setName($row['name']);
				$member->setFirstname($row['firstname']);
				$member->setEmail($row['email']);
				$member->setTel($row['tel']);
			} else {
				throw new MemberNotFoundException("No member found with id = $id");
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $member;
	}

	public function getAllMembers() {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM member");
		$req->execute();

		$allMembers = Array();
		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				
				while ($row_member = $req->fetch(PDO::FETCH_ASSOC))
				{
					$member = new MemberBean();
					$member->setId($row_member['id']);
					$member->setName($row_member['name']);
					$member->setFirstname($row_member['firstname']);
					$member->setEmail($row_member['email']);
					$member->setTel($row_member['tel']);
					$member->setFunction($row_member['function']);
					$allMembers[] = $member;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allMembers;
	}
	
	public function getAllProjectMembers($projectid) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT m.* FROM member m LEFT JOIN project_x_member x ON (x.memberid = m.id) WHERE x.projectid=?");
		$req->execute(array($projectid));

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				$allMembers = Array();
				
				while ($row_member = $req->fetch(PDO::FETCH_ASSOC))
				{
					$member = new MemberBean();
					$member->setId($id);
					$member->setName($row_member['name']);
					$member->setFirstname($row_member['firstname']);
					$member->setEmail($row_member['email']);
					$member->setTel($row_member['tel']);
					$allMembers[] = $member;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allMembers;
	}
	
	public function createMember($member) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("INSERT INTO member (name,firstname,email,tel,function) VALUES(?,?,?,?,?)");
		$req->execute(array($member->getName(), $member->getFirstname(), $member->getEmail(), $member->getTel(), $member->getFunction()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$member->setId($db->lastInsertId());

		$req->closeCursor();

		return $member;
	}
	
	public function updateMember($member) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($member->getId() === null || $member->getId() === "") {
			throw new MemberNotFoundException("No member with empty id");
		}

		$req = $db->prepare("UPDATE member SET name=?,firstname=?,email=?,tel=?, function=? WHERE id=?");
		$req->execute(array($member->getName(), $member->getFirstname(), $member->getEmail(), $member->getTel(), $member->getFunction(), $member->getId()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();
		
		return $member;
	}

	public function deleteMember($memberId) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($memberId === null || $memberId === "") {
			throw new MemberNotFoundException("No member with empty id");
		}

		// begin of the transaction
		$db->beginTransaction();

		$req = $db->prepare("DELETE FROM member WHERE id=?");
		$req->execute(array($memberId));

		// if request failed
		if($req->errorCode() != 0)
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}
		
		// delete all link between task and member
		$req2 = $db->prepare("DELETE FROM task_x_member WHERE id_member=?");
		$req2->execute(array($memberId));

		// if request failed
		if($req2->errorCode() != 0)
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}

		$db->commit();

		$req->closeCursor();
	}
}