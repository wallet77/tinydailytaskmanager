<?php
/**
 * Database layer to realize operations on "task".
 * 
 * @package tdtm.serverSide.storage
 * @author Vincent Vallet
 * @since 1.0
 *
 */
class TaskStorage {

	public function getTask($id) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM task WHERE id = ?");
		$req->execute(array($id));

		$task = new TaskBean();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				// get the member
				$row = $req->fetch(PDO::FETCH_ASSOC);

				$task->setId($id);
				$task->setName($row['name']);
				$task->setDesription($row['description']);
				$task->setStarttime($row['starttime']);
				$task->setEndtime($row['endtime']);
				$task->setGroupid($row['groupid']);
				$task->setMembers($this->getMembersByTask($id));
			} else {
				throw new TaskNotFoundException("No task found with id = $id");
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $task;
	}
	
	public function createTask($task) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("INSERT INTO task (name,description,start_time,end_time,projectid,parentgroupid) VALUES(?,?,FROM_UNIXTIME(?),FROM_UNIXTIME(?),?,?)");
		$req->execute(array($task->getName(), $task->getDescription(), $task->getStarttime(),$task->getEndtime(),$task->getProjectid(),$task->getParentgroupid()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$taskId = $db->lastInsertId();
		$task->setId($taskId);
		
		$this->attachMember($taskId, $task->getMembers());

		$req->closeCursor();

		return $task;
	}
	
	public function updateTask($task) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($task->getId() === null || $task->getId() === "") {
			throw new TaskNotFoundException("No task with empty id");
		}

		$req = $db->prepare("UPDATE task SET name=?,description=?,start_time=FROM_UNIXTIME(?),end_time=FROM_UNIXTIME(?) WHERE id=?");
		$req->execute(array($task->getName(), $task->getDescription(), $task->getStarttime(), $task->getEndtime(), $task->getId()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$this->attachMember($task->getId(), $task->getMembers());

		$req->closeCursor();

		return $task;
	}
	
	private function attachMember($taskId, $allMembers) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($taskId === null || $taskId === "") {
			throw new TaskNotFoundException("No task with empty id");
		}
		
		//clean table from previsous record
		$req = $db->prepare("DELETE FROM task_x_member WHERE id_task=?");
		$req->execute(array($taskId));
	
		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		foreach ($allMembers as $key => $value) {
			
			$req = $db->prepare("INSERT INTO task_x_member (id_task,id_member) VALUES(?,?)");
			$req->execute(array($taskId, $value->getId()));
	
			// if request failed
			if($req->errorCode() != 0)
			{
				throw new Exception('Database error !');
			}
	
			$req->closeCursor();
		}
	}
	
	public function deleteTask($taskId) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($taskId === null || $taskId === "") {
			throw new TaskNotFoundException("No task with empty id");
		}
		
		// begin the transaction
		$db->beginTransaction();

		$req = $db->prepare("DELETE FROM task WHERE id=?");
		$req->execute(array($taskId));

		// if request failed
		if($req->errorCode() != 0)
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}

		// delete all link between task and member
		$req2 = $db->prepare("DELETE FROM task_x_member WHERE id_task=?");
		$req2->execute(array($taskId));

		// if request failed
		if($req2->errorCode() != 0)
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}

		$db->commit();

		$req->closeCursor();
	}
	
	public function getTasksByMemberByProject($memberid, $projectid) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT t.* FROM task t LEFT JOIN task_x_member x ON (x.id_task = t.id) WHERE x.id_member=? AND t.projectid=?");
		$req->execute(array($memberid, $projectid));

		$allTasks = Array();
		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				while ($row_task = $req->fetch(PDO::FETCH_ASSOC))
				{
					$task = new TaskBean();
					$task->setId($row_task['id']);
					$task->setName($row_task['name']);
					$task->setDescription($row_task['description']);
					$task->setStarttime($row_task['start_time']);
					$task->setEndtime($row_task['end_time']);
					$task->setMembers($this->getMembersByTask($row_task['id']));
					$allTasks[] = $task;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allTasks;
	}
	
	public function getTasksByProject($projectid, $memberid=null) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT t.* FROM task t WHERE t.projectid=?");
		$req->execute(array($projectid));

		$allTasks = Array();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				while ($row_task = $req->fetch(PDO::FETCH_ASSOC))
				{
					$task = new TaskBean();
					$task->setId($row_task['id']);
					$task->setName($row_task['name']);
					$task->setDescription($row_task['description']);
					$task->setStarttime($row_task['start_time']);
					$task->setEndtime($row_task['end_time']);
					$task->setMembers($this->getMembersByTask($row_task['id']));
					$allTasks[] = $task;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allTasks;
	}
	
	public function getMembersByTask($taskid) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT m.* FROM member m LEFT JOIN task_x_member x ON (x.id_member = m.id) WHERE x.id_task=?");
		$req->execute(array($taskid));
		
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
					$allMembers[] = $member;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allMembers;
	}
}