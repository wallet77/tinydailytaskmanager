<?php
/**
 * Bean representing a task.
 * 
 * A task is a unit of work that can be realized by one or many members.
 * It is composed by a start and end date and it is the main information of this application.
 * 
 * @author Vincent Vallet
 * @since 1.0
 */
class TaskBean {
	private $id;
	private $name;
	private $description;
	private $starttime;
	private $endtime;
	private $projectid;
	private $parentgroupid;
	
	private $members;

	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}

	public function getName() {
		return $this->name;
	}
	
	public function setName($name) {
		$this->name = $name;
	}
	
	public function getDescription() {
		return $this->description;
	}
	
	public function setDescription($description) {
		$this->description = $description;
	}

	public function getStarttime() {
		return $this->starttime;
	}
	
	public function setStarttime($starttime) {
		$this->starttime = $starttime;
	}

	public function getEndtime() {
		return $this->endtime;
	}
	
	public function setEndtime($endtime) {
		$this->endtime = $endtime;
	}

	public function getProjectid() {
		return $this->projectid;
	}

	public function setProjectid($projectid) {
		$this->projectid = $projectid;
	}

	public function getParentgroupid() {
		return $this->parentgroupid;
	}

	public function setParentgroupid($parentgroupid) {
		$this->parentgroupid = $parentgroupid;
	}
	
	public function getMembers() {
		return $this->members;
	}

	public function setMembers($members) {
		$this->members = $members;
	}

	public function __toString() {
		return " id : " . $this->id . ", name : " . $this->name . ", description : " . $this->description;
	}
}