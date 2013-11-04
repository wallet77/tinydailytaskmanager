<?php

class ProjectStorage {

	public function getProject($id) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM project WHERE id = ?");
		$req->execute(array($id));

		$project = new ProjectBean();

		// if request finish successfuly
		if($req->errorCode() === 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{

				// get the member
				$row = $req->fetch(PDO::FETCH_ASSOC);

				$project->setId($id);
				$project->setName($row['name']);
				$project->setDescription($row['description']);
				$project->setStarttime($row['starttime']);
				$project->setEndtime($row['endtime']);
			} else {
				throw new ProjectNotFoundException("No project found with id = $id");
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $project;
	}

	public function getAllProjects() {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$req = $db->prepare("SELECT * FROM project");
		$req->execute();

		$allProjects = Array();

		// if request finish successfuly
		if($req->errorCode() == 0)
		{
			//if we have at least one result
			if($req->rowCount() > 0)
			{
				
				while ($row = $req->fetch(PDO::FETCH_ASSOC))
				{
					$project = new ProjectBean();
					$project->setId($row['id']);
					$project->setName($row['name']);
					$project->setDescription($row['description']);
					$project->setStarttime($row['start_time']);
					$project->setEndtime($row['end_time']);
					$allProjects[] = $project;
				}
			}
		} else {
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $allProjects;
	}

	public function createProject($project) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		$db->beginTransaction();

		$req_txt = "INSERT INTO project (name,start_time,end_time,description) VALUES(?,FROM_UNIXTIME(?),FROM_UNIXTIME(?),?)";
		$req = $db->prepare($req_txt);
		$req->execute(array($project->getName(), $project->getStarttime(), $project->getEndtime(), $project->getDescription()));

		$projectId = $db->lastInsertId();
		$project->setId($projectId);

		// if request failed
		if($req->errorCode() != 0)
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}

		$req2 = $db->prepare("INSERT INTO `group` (name, projectid) VALUES(?,?)");
		try {
			$req2->execute(array("taskRoot", $projectId));
		}
		catch( PDOException $Exception ) {
   			 echo $Exception->getMessage();
		}

		if($req2->errorCode() == 0 )
		{
			$db->commit();
		}
		else
		{
			$db->rollBack();
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $project;
	}

	public function updateProject($project) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($project->getId() === null || $project->getId() === "") {
			throw new MemberNotFoundException("No member with empty id");
		}

		$req = $db->prepare("UPDATE project SET name=?,start_time=FROM_UNIXTIME(?),end_time=FROM_UNIXTIME(?),description=? WHERE id=?");
		$req->execute(array($project->getName(), $project->getStarttime(), $project->getEndtime(), $project->getDescription(), $project->getId()));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();

		return $project;
	}
	
	public function deleteProject($projectId) {
		$db = $GLOBALS["TDTM"]["container"]["db"];

		if($projectId === null || $projectId === "") {
			throw new MemberNotFoundException("No project with empty id");
		}

		$req = $db->prepare("DELETE FROM project WHERE id=?");
		$req->execute(array($projectId));

		// if request failed
		if($req->errorCode() != 0)
		{
			throw new Exception('Database error !');
		}

		$req->closeCursor();
	}
}