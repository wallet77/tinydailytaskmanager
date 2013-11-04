/** 
 * Controller for managing task window's operations <br/><br/>
 * It is used to : <ul>
 * <li>launch creation function when user clicks on submit button</li>
 * <li>make operations after window of type {@link TDTM.view.window.WindowTask} was displayed</li>
 * <li>make operations after form of window (of type {@link TDTM.view.window.TaskForm}) was displayed</li>
 * </ul>
 */
Ext.define('TDTM.controller.WindowTask', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'windows.WindowTask',
            'grid.GridMemberByTask'
    ],

    /**
     * @property {Array} models 
     * 		models list
     */
    models: [
             'Task',
             'TreeNode'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'button[name="submitTask"]' : {
            	click: this.onClickSave
            },
            'windowTask' : {
            	afterrender: this.onRender
            }
        });
    },

    /** 
	 * Function triggered after user clicked on submit button.
	 * 
	 * @param {Object} c
	 * 		button that trigger this function
	 * 
	 */
	onClickSave: function(c) {
		var windowTask = c.findParentByType('window');
		this.addTask(windowTask);
	},

	/** 
	 * Function which adds a task.<br/>
	 * It prepares json structure and send it through an ajax request.
	 * 
	 * @param {TDTM.view.window.WindowTask} windowForm
	 * 		current window containing the form
	 * 
	 */
	addTask: function(windowForm, exists) {

    	var json = this.generateJSON(windowForm);

    	var mask = new Ext.LoadMask({target: windowForm, msg: LanguageMessages["loading"]});
		mask.show();
		
		var task = windowForm.task;
		var taskId = task.raw.id;

		var method = "POST";
		var exists = false;
		var url = Globals["url"]["server"] + '/task';

		if(taskId) {
			method = 'PUT';
			exists = true;
			url += '/' + taskId;
		}

    	Ext.Ajax.request({
    		url: url,
    		method: method,
    		jsonData: json,

	    	success: function(response, opts) {
	    		var data = Ext.decode(response.responseText);

	    		if(!exists) {

	    			// add node in tree
	    			Utils.addTaskInTree(data);

	    		} else {
	    			// updates node in grid
	    			Utils.updateNodeInTree(data);
	    		}

	    		//close form window
	        	windowForm.close();

	    		// delete waiting picture
	    		mask.hide();
	        },
	        failure: function(response, opts) {
	        	mask.hide();

	        	Ext.MessageBox.show({
	        		title: LanguageMessages["error"]["saveTask"]["title"],
	        		msg: LanguageMessages["error"]["saveTask"]["msg"],
	        		buttons: Ext.MessageBox.OK,
	        		icon: Ext.MessageBox.ERROR
	        	});
	        }
    	});
	},

	/** 
	 * Function which generates a json structure from task form.<br/>
	 * This structure can be sent to server that is able to decode json.
	 * 
	 * @param {TDTM.view.window.WindowTask} windowTask
	 * 		current window containing the form
	 * 
	 * @return {Object}
	 */
	generateJSON: function(windowTask) {
		
		var task = windowTask.task;
		
		var members = [];

		// get all members, loop through the store
		var myItems = windowTask.query('gridMemberByTask')[0].getStore().getRange();
		for (var i in myItems) {
			members.push(myItems[i].get('id'));
		}

		var genJson = {
		        'name': windowTask.query('textfield[name="name"]')[0].getValue(),
		        'description': windowTask.query('textfield[name="description"]')[0].getValue(),
		        'starttime': TimeUtils.toTimestamp(windowTask.query('textfield[name="starttime"]')[0].getValue()),
		        'endtime': TimeUtils.toTimestamp(windowTask.query('textfield[name="endtime"]')[0].getValue()),
		        'parentgroupid': task.raw.parentgroupid,
		        'projectid': task.raw.projectid,
		        'members': members
		};

		return genJson;
	},

	/** 
	 * Function triggered after window has been displayed.<br/>
	 * It allows to set task information into form's fields.
	 * 
	 * @param {TDTM.model.WindowTask} windowTask
	 * 		current window
	 * 
	 */
	onRender: function(windowTask) {

		var task = windowTask.task;

		// if we are editing a task
		if(task.get("name"))
		{

			var form = windowTask.query('taskForm')[0];

			form.getForm().findField("name").setValue(task.get("name"));
			form.getForm().findField("endtime").setValue(Ext.Date.format(new Date(task.raw["endtime"]),Globals["date"]["fullDateFormat"]));
			form.getForm().findField("starttime").setValue(Ext.Date.format(new Date(task.raw["starttime"]),Globals["date"]["fullDateFormat"]));
			form.getForm().findField("description").setValue(task.raw["description"]);

			// get members linked to this task
			var members = task.raw["members"];
			var gridStore = windowTask.query('gridMemberByTask')[0].getStore();

			// if members are already loaded
			if(members && members[0].name)
			{
				gridStore.loadData(task.raw["members"]);
			} 
			else
			{
				var mask2 = new Ext.LoadMask({target: windowTask, msg: LanguageMessages["loading"]});
				mask2.show();

				Ext.Ajax.request({
		    		url: Globals["url"]["server"] + '/task/' + task.get("id") + '/members',
		    		method: "GET",

			    	success: function(response, opts) {
			    		var data = Ext.decode(response.responseText);

			    		gridStore.loadData(data);

			    		// delete waiting picture
			    		mask2.hide();
			        },
			        failure: function(response, opts) {
			        	mask2.hide();

			        	Ext.MessageBox.show({
			        		title: LanguageMessages["error"]["loadMember"]["title"],
			        		msg: LanguageMessages["error"]["loadMember"]["msg"],
			        		buttons: Ext.MessageBox.OK,
			        		icon: Ext.MessageBox.ERROR
			        	});
			        }
		    	});
			}
		}
		
		var mask = new Ext.LoadMask({target: windowTask, msg: LanguageMessages["loading"]});
		mask.show();

		Ext.Ajax.request({
    		url: Globals["url"]["server"] + '/members',
    		method: "GET",

	    	success: function(response, opts) {
	    		var data = Ext.decode(response.responseText);

	    		var selectBox = windowTask.query("combo")[0];
	    		selectBox.getStore().loadData(data);

	    		// delete waiting picture
	    		mask.hide();
	        },
	        failure: function(response, opts) {
	        	mask.hide();

	        	Ext.MessageBox.show({
	        		title: LanguageMessages["error"]["loadMember"]["title"],
	        		msg: LanguageMessages["error"]["loadMember"]["msg"],
	        		buttons: Ext.MessageBox.OK,
	        		icon: Ext.MessageBox.ERROR
	        	});
	        }
    	});
	}
});