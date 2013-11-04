<?php

class MemberBean {
	private $id;
	private $name;
	private $firstname;
	private $tel;
	private $email;
	private $function;
	
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
	
	public function getFirstname() {
		return $this->firstname;
	}
	
	public function setFirstname($name) {
		$this->firstname = $name;
	}
	
	public function getTel() {
		return $this->tel;
	}
	
	public function setTel($tel) {
		$this->tel = $tel;
	}
	
	public function getEmail() {
		return $this->email;
	}
	
	public function setEmail($email) {
		$this->email = $email;
	}
	
	public function getFunction() {
		return $this->function;
	}
	
	public function setFunction($function) {
		$this->function = $function;
	}
	
	public function __toString() {
		return " name : " . $this->name;
	}
}