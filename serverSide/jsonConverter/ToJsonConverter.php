<?php
class ToJsonConverter {
	
	/**
	 * Convert a list of project bean into json structure
	 * 
	 * @param array $projects
	 */
	public static function convertListOfProjectBean($projects) {

		$allProjects = array();

		foreach ($projects as $value) {
			$allProjects[] = ToJsonConverter::convertProjectBean($value, false);
		}

		return json_encode($allProjects);
	}

	/**
	 * Convert a project bean into json structure
	 * 
	 * @param ProjectBean $project
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertProjectBean($project, $encode=true) {
		$data = array(
			'id' => $project->getId(),
            'name' => $project->getName(),
            'starttime' => $project->getStarttime(),
            'endtime' => $project->getEndtime(),
			'description' => $project->getDescription(),
        );

        if($encode) {
        	return json_encode($data);
        }
		return $data;
	}

	/**
	 * Convert a list of member bean into json structure
	 * 
	 * @param array $members
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertListOfMemberBean($members, $encode=true) {

		$allMembers = array();

		if(!empty($members)) {
			foreach ($members as $value) {
				$allMembers[] = ToJsonConverter::convertMemberBean($value, false);
			}
		}
		
		if(!$encode) {
			return $allMembers;
		}

		return json_encode($allMembers);
	}

	/**
	 * Convert a member bean into json structure
	 * 
	 * @param MemberBean $member
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertMemberBean($member, $encode=true) {
		$data = array(
			'id' => $member->getId(),
            'name' => $member->getName(),
            'firstname' => $member->getFirstname(),
            'tel' => $member->getTel(),
			'email' => $member->getEmail(),
			'function' => $member->getFunction()             
        );

        if($encode) {
        	return json_encode($data);
        }
		return $data;
	}

	/**
	 * Convert a group bean into json structure
	 * 
	 * @param GroupBean $group
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertGroupBean($group, $encode=true) {
		$data = array(
			'id' => "group_" . $group->getId(),
            'name' => $group->getName(),
			'description' => $group->getDescription(),
            'projectid' => $group->getProjectid(),
            'parentgroupid' => 'group_' . $group->getParentgroupid(),
			'type' => 'group',
			'leaf' => false
        );

        $children = $group->getChildren();
        if(!empty($children)) {
        	$data["children"] = ToJsonConverter::convertListOfGroupBean($children, false);
        }

        if($encode) {
        	return json_encode($data);
        }
		return $data;
	}
	
	/**
	 * Convert a list of group bean into json structure
	 * 
	 * @param array $groups
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertListOfGroupBean($groups, $encode=true) {

		$allGroups = array();
		if(is_array($groups)) {
			foreach ($groups as $value) {
				if($value instanceof GroupBean) {
					$allGroups[] = ToJsonConverter::convertGroupBean($value, false);
				} else {
					$allGroups[] = ToJsonConverter::convertTaskBean($value, false);
				}
			}
		}

		if($encode) {
        	return json_encode($allGroups);
        }
		return $allGroups;
	}

	/**
	 * Convert a list of task bean into json structure
	 * 
	 * @param array $member
	 */
	public static function convertListOfTaskBean($tasks) {

		$allTasks = array();

		foreach ($tasks as $value) {
			$allTasks[] = ToJsonConverter::convertTaskBean($value, false);
		}

		return json_encode($allTasks);
	}
	
	/**
	 * Convert a task bean into json structure
	 * 
	 * @param TaskBean $task
	 * @param boolean $encode
	 * 		determines if we need to encode data (true) or not (false), by default it's set to true
	 */
	public static function convertTaskBean($task, $encode=true) {

		$data = array(
			'id' => "task_" . $task->getId(),
            'name' => $task->getName(),
			'description' => $task->getDescription(),
            'starttime' => $task->getStarttime(),
            'endtime' => $task->getEndtime(),
			'projectid' => $task->getProjectid(),
            'parentgroupid' => 'group_' . $task->getParentgroupid(),
			'members' => ToJsonConverter::convertListOfMemberBean($task->getMembers(), false),
			'type' => 'task',
			'leaf' => true
        );

        if($encode) {
        	return json_encode($data);
        }
		return $data;
	}
}