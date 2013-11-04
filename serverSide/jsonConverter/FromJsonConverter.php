<?php
class FromJsonConverter {

	/**
	 * Convert a json structure to member bean
	 * 
	 * @param String $json
	 */
	public static function convertToMemberBean($json) {

		$data = $json;
		if(is_string($json)) {
			$data = json_decode($json);
		}

		$member = new MemberBean();
		if(property_exists( $data , "id" )) {
			$member->setId($data->id);
		}
		$member->setName($data->name);
		$member->setFirstname($data->firstname);
		if(property_exists( $data , "tel" )) {
			$member->setTel($data->tel);
		}
		$member->setEmail($data->email);
		$member->setFunction($data->function);

		return $member;
	}

	/**
	 * Convert a json structure to a list of member bean
	 * 
	 * @param String $json
	 */
	public static function convertToListOfMemberBean($json) {
		$data = json_decode($json);

		$allMembers = array();

		foreach ($data as $member) {
			$allMembers[] = FromJsonConverter::convertToMemberBean($member);
		}

		return $allMembers;
	}

	/**
	 * Convert a json structure to project bean
	 * 
	 * @param String $json
	 */
	public static function convertToProjectBean($json) {
		$data = json_decode($json);

		$project = new ProjectBean();
		if(property_exists( $data , "id" )) {
			$project->setId($data->id);
		}
		$project->setName($data->name);
		if(property_exists( $data , "description" )) {
			$project->setDescription($data->description);
		}
		$project->setStarttime($data->starttime);
		$project->setEndtime($data->endtime);

		return $project;
	}

	/**
	 * Convert a json structure to group bean
	 * 
	 * @param String $json
	 */
	public static function convertToGroupBean($json) {
		$data = json_decode($json);

		$group = new GroupBean();
		if(property_exists( $data , "id" )) {
			$group->setId(strtr($data->id, "group_", ""));
		}
		$group->setName($data->name);
		$group->setDescription($data->description);
		$group->setProjectid($data->projectid);
		$group->setParentgroupid(str_replace('group_', '', $data->parentgroupid));
		if(property_exists( $data , "children" )) {
			$group->setChildren($data->children);
		}

		return $group;
	}
	
	/**
	 * Convert a json structure to an array of tasks
	 * 
	 * @param String $json
	 */
	public static function convertToTaskBean($json) {
		$data = json_decode($json);

		$task = new TaskBean();
		if(property_exists( $data , "id" )) {
			$task->setId(str_replace('task_', '', $data->id));
		}
		$task->setName($data->name);
		$task->setDescription($data->description);
		$task->setEndtime($data->endtime);
		$task->setStarttime($data->starttime);
		$task->setProjectid($data->projectid);
		$task->setParentgroupid(str_replace('group_', '', $data->parentgroupid));
		
		$allMembers = array();
		$jsonMembers = $data->members;

		if(is_array($jsonMembers)) {
			foreach ($jsonMembers as $key => $value) {
				
				$member = new MemberBean();
				$member->setId($value);
				$allMembers[] = $member;
			}
		}
		$task->setMembers($allMembers);

		return $task;
	}
	
	/**
	 * Convert a json structure to task bean
	 * 
	 * @param String $json
	 */
	public static function convertToListOfTaskBean($json) {
		$data = json_decode($json);

		$allTasks = array();

		foreach ($data as $task) {
			$allTasks[] = FromJsonConverter::convertToTaskBean($task);
		}

		return $allTasks;
	}
}