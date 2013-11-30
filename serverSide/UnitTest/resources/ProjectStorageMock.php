<?php
class ProjectStorageMock {

	public function getProject($id) {
		$project = new ProjectBean();
		$project->setName("toto");
		$project->setDescription("test");
		$project->setEndtime("01/01/1970");
		$project->setStarttime("01/01/1970");
		return $project;
	}

	public function getAllProjects() {
		return array($this->getProject(1),$this->getProject(1),$this->getProject(1));
	}
	
	public function createProject($project) {
		return $this->getProject(1);
	}
}