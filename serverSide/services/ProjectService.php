<?php

class ProjectService {

	private $projectStorage;

	public function getProjectStorage() {
		return $this->projectStorage;
	}

	public function setProjectStorage($projectStorage) {
		$this->projectStorage = $projectStorage;
	}

	public function getProject($id) {
		return $this->projectStorage->getProject($id);
	}
	
	public function getAllProjects() {
		return $this->projectStorage->getAllProjects();
	}
	
	public function createProject($project) {
		$res = array();
		try {
			$res["project"] = $this->projectStorage->createProject($project);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "project" => null);
		}

		return $res;
	}
	
	public function updateProject($project) {
		$res = array();
		try {
			$res["project"] = $this->projectStorage->updateProject($project);
		} catch(Exception $e) {
			$res = array("error" => $e->getMessage(), "project" => null);
		}

		return $res;
	}
	
	public function deleteProject($projectId) {
		try {
			$this->projectStorage->deleteProject($projectId);
		} catch(Exception $e) {
			return false;
		}

		return true;
	}
}