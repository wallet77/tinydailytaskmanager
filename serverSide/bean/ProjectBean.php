<?php

class ProjectBean {
	private $id;
	private $name;
	private $starttime;
	private $endtime;
	private $description;
	
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

	public function getDescription() {
		return $this->description;
	}

	public function setDescription($description) {
		$this->description = $description;
	}

	public function __toString() {
		return "id : " . $this->id . ", name : " . $this->name . ", starttime : " . $this->starttime . ", endtime : " . $this->endtime . ", description : " . $this->description;
	}
}