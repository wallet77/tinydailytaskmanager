<?php
/**
 * Describe a set of operations that can be realized on task.
 * This service can be used everywhere in application.
 *
 * @author Vincent Vallet
 * @since 1.0
 * @package serverSide.services
 */
class TaskService {

	/**
	 * Database layer for task operations
	 * 
	 * @var TaskStorage
	 */
	private $taskStorage;

	public function getTaskStorage() {
		return $this->taskStorage;
	}

	public function setTaskStorage($taskStorage) {
		$this->taskStorage = $taskStorage;
	}

	public function getTask($id) {
		return $this->taskStorage->getTask($id);
	}
	
	public function createTask($task) {
		$res = array();
		try {
			$res["task"] = $this->taskStorage->createTask($task);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "task" => null);
		}

		return $res;
	}
	
	public function updateTask($task) {
		$res = array();
		try {
			$res["task"] = $this->taskStorage->updateTask($task);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "task" => null);
		}

		return $res;
	}

	public function deleteTask($taskId) {
		try {
			$this->taskStorage->deleteTask($taskId);
		} catch(Exception $e) {
			return false;
		}

		return true;
	}

	public function getTasksByProject($projectid) {
		return $this->taskStorage->getTasksByProject($projectid);
	}

	public function getTasksByMemberByProject($memberid,$projectid) {
		return $this->taskStorage->getTasksByMemberByProject($memberid,$projectid);
	}

	public function getMembersByTask($taskid) {
		return $this->taskStorage->getMembersByTask($taskid);
	}
}