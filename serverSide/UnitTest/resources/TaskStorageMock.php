<?php
/**
 * Mock of database layer to realize operations on "task".
 * 
 * @package tdtm.serverSide.UnitTest.resources
 * @author Vincent Vallet
 * @since 1.0
 *
 */
class TaskStorageMock {

	public function getTask($id) {
		$task = new TaskBean();
		$task->setDescription("test");
		$task->setEndtime("2013-08-12");
		$task->setGroupid(1001);
		$task->setId($id);
		$task->setName("Task1");
		$task->setStarttime("2013-08-11");
		return $task;
	}

	public function createTask($task) {
		

	}
	
	public function updateTask($task) {
		
	}
	
	public function deleteTask($taskId) {
		
	}
	
	public function getTasksByMemberByProject($memberid, $projectid) {
		return array($this->getTask(1000),$this->getTask(1001));
	}
	
	public function getTasksByProject($projectid) {
		return array($this->getTask(1000),$this->getTask(1001),$this->getTask(1002),$this->getTask(1003));
	}
	
	public function getMembersByTask($taskid) {
		return null;
	}
}