<?php

class GroupBean {
	private $id;
	private $name;
	private $description;
	private $projectid;
	private $parentgroupid;

	private $children;

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
	
	public function getChildren() {
		return $this->children;
	}

	public function setChildren($children) {
		$this->children = $children;
	}

	public function __toString() {
		return " id : " . $this->id . ", name : " . $this->name . ", description : " . $this->description . ", parentgroupid : " . $this->parentgroupid;
	}
}