<?php

class GroupStorage {

	public function getRootGroup($projectid) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM `group` WHERE projectid=? AND parentgroupid=0");
		$req->execute(array(intval($projectid) ));

		$group = new GroupBean();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				// get the member
				$row = $req->fetch(PDO::FETCH_ASSOC);

				$group->setId($row['id']);
				$group->setName($row['name']);
				$group->setDescription($row['description']);
				$group->setParentgroupid($row['parentgroupid']);
				$group->setProjectid($row['projectid']);
				$group->setChildren($this->getChildren($row['id']));
			} else {
				throw new GroupNotFoundException("No group found with projectid = $projectid");
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $group;
	}

	public function getGroup($id) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM `group` WHERE id = ?");
		$req->execute(array($id));

		$group = new GroupBean();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				// get the member
				$row = $req->fetch(PDO::FETCH_ASSOC);

				$group->setId($id);
				$group->setName($row['name']);
				$group->setDescription($row['description']);
				$group->setParentgroupid($row['parentgroupid']);
				$group->setProjectid($row['projectid']);
			} else {
				throw new GroupNotFoundException("No group found with id = $id");
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $group;
	}

	public function getChildren($id) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM `group` WHERE parentgroupid=?");
		$req->execute(array($id));

		$children = Array();
		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				while ($row = $req->fetch(PDO::FETCH_ASSOC))
				{
					$group = new GroupBean();
					$group->setId($row['id']);
					$group->setName($row['name']);
					$group->setDescription($row['description']);
					$group->setParentgroupid($row['parentgroupid']);
					$group->setProjectid($row['projectid']);
					$children[] = $group;
				}
			}
		} else {
			throw new Exception('Database error !');
		}
		
		$req = $db->prepare("SELECT * FROM `task` WHERE parentgroupid=?");
		$req->execute(array($id));

		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				/* @var $service TaskService */
    			$service = $GLOBALS["TDTM"]["container"]["serviceTask"];
				$taskStorage = $service->getTaskStorage();

				while ($row = $req->fetch(PDO::FETCH_ASSOC))
				{
					$task = new TaskBean();
					$task->setId($row['id']);
					$task->setName($row['name']);
					$task->setDescription($row['description']);
					$task->setStarttime($row['start_time']);
					$task->setEndTime($row['end_time']);
					$task->setMembers($taskStorage->getMembersByTask($row['id']));
					$children[] = $task;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $children;
	}
	
	public function getParent($groupid) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT g1.* FROM `group` g1, g2 WHERE g1.id = g2.parentgroupid AND g2.id=?");
		$req->execute(array($groupid));

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			$group = null;
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				$row = $req->fetch(PDO::FETCH_ASSOC);
				$group = new GroupBean();
				$group->setId($id);
				$group->setName($row['name']);
				$group->setDescription($row['description']);
				$group->setParentgroupid($row['parentgroupid']);
				$group->setProjectid($row['projectid']);
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $group;
	}
	
	public function createGroup($group) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("INSERT INTO `group` (name,description,parentgroupid,projectid) VALUES(?,?,?,?)");
		$req->execute(array($group->getName(), $group->getDescription(), $group->getParentgroupid(), $group->getProjectid()));

		$groupId = $db->lastInsertId();
		$group->setId($groupId);

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $group;
	}
	
	public function updateGroup($group) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($group->getId() === null || $group->getId() === "") {
			throw new GroupNotFoundException("No group with empty id");
		}

		$req = $db->prepare("UPDATE `group` SET name=?,description=?,parentgroupid=?,projectid=? WHERE id=?");
		$req->execute(array($group->getName(), $group->getDescription(), $group->getParentgroupid(), $group->getProjectid(), $group->getId()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $group;
	}
	
	public function deleteGroup($groupId) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($groupId === null || $groupId === "") {
			throw new GroupNotFoundException("No group with empty id");
		}

		$this->deleteChildren($groupId);

		$req = $db->prepare("DELETE FROM `group` WHERE id=?");
		$req->execute(array($groupId));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return;
	}
	
	private function deleteChildren($parentId) {

		try {
			$this->deleteChildrenGroup($parentId);
			$this->deleteChildrenTask($parentId);
		} catch(Exception $e) {
			throw $e;
		}

		return;
	}
	
	private function deleteChildrenGroup($parentGroupId) {

		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT id FROM `group` WHERE parentgroupid=?");
		$req->execute(array($parentGroupId));
		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				while ($row = $req->fetch(PDO::FETCH_ASSOC))
				{
					$this->deleteGroup($row['id']);
				}
			}
		} else {
			throw new Exception('Database error !');
		}
		
		$req->closeCursor();

		return;
	}
	
	private function deleteChildrenTask($parentGroupId) {

		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("DELETE FROM `task` WHERE parentgroupid=?");
		$req->execute(array($parentGroupId));
		// if request finish successfuly
		if($req->errorCode() != 0) {
			throw new Exception('Database error !');
		}

		$req->closeCursor();
	}
}