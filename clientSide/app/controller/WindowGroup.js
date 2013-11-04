/** 
 * Controller for managing group window's operations <br/><br/>
 * It is used to : <ul>
 * <li>launch creation function when user clicks on submit button</li>
 * <li>make operations after window of type {@link TDTM.view.window.WindowGroup} was displayed</li>
 * <li>make operations after form of window (of type {@link TDTM.view.window.GroupForm}) was displayed</li>
 * </ul>
 */
Ext.define('TDTM.controller.WindowGroup', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'windows.WindowGroup'
    ],
    
    /**
     * @property {Array} models 
     * 		models list
     */
    models: [
             'Group',
             'TreeNode'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'button[name="submitGroup"]' : {
            	click: this.onClickSave
            },
            'windowGroup' : {
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
		var windowGroup = c.findParentByType('window');
		this.addGroup(windowGroup);
	},

	/** 
	 * Function which adds a group.<br/>
	 * It prepares json structure and send it through an ajax request.
	 * 
	 * @param {TDTM.view.window.WindowGroup} windowForm
	 * 		current window containing the form
	 * 
	 */
	addGroup: function(windowForm, exists) {

    	var json = this.generateJSON(windowForm);

    	var mask = new Ext.LoadMask({target: windowForm, msg: LanguageMessages["loading"]});
		mask.show();
		
		var group = windowForm.group;
		var groupId = group.raw.id;

		var method = "POST";
		var exists = false;
		var url = Globals["url"]["server"] + '/group';

		if(groupId) {
			method = 'PUT';
			exists = true;
			url += '/' + groupId;
		}

    	Ext.Ajax.request({
    		url: url,
    		method: method,
    		jsonData: json,

	    	success: function(response, opts) {
	    		
	    		var data = Ext.decode(response.responseText);

	    		if(!exists) {

	    			// add group in tasks' tree
	    			Utils.addGroupInTree(data);

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
	        		title: LanguageMessages["error"]["saveGroup"]["title"],
	        		msg: LanguageMessages["error"]["saveGroup"]["msg"],
	        		buttons: Ext.MessageBox.OK,
	        		icon: Ext.MessageBox.ERROR
	        	});
	        }
    	});
	},

	/** 
	 * Function which generates a json structure from group form.<br/>
	 * This structure can be sent to server that is able to decode json.
	 * 
	 * @param {TDTM.view.window.WindowGroup} windowGroup
	 * 		current window containing the form
	 * 
	 * @return {Object}
	 */
	generateJSON: function(windowGroup) {

		var group = windowGroup.group;

		var genJson = {
		        'name': windowGroup.query('textfield[name="name"]')[0].getValue(),
		        'description': windowGroup.query('textfield[name="description"]')[0].getValue(),
		        'parentgroupid': group.raw.parentgroupid,
		        'projectid': group.raw.projectid
		};

		return genJson;
	},

	/** 
	 * Function triggered after window has been displayed.<br/>
	 * It allows to set group information into form's fields.
	 * 
	 * @param {TDTM.view.window.WindowGroup} windowGroup
	 * 		current window
	 * 
	 */
	onRender: function(windowGroup) {

		var group = windowGroup.group;

		if(group) {
			var form = windowGroup.query('groupForm')[0];
			form.getForm().findField("name").setValue(group.get("name"));
			form.getForm().findField("description").setValue(group.raw["description"]);
		}
	}
});