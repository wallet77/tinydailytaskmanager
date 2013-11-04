/** 
 * Controller for managing project window's operations <br/><br/>
 * It is used to : <ul>
 * <li>launch creation function when user clicks on submit button</li>
 * <li>make operations after window of type {@link TDTM.view.window.WindowProject} was displayed</li>
 * <li>make operations after form of window (of type {@link TDTM.view.window.ProjectForm}) was displayed</li>
 * </ul>
 */
Ext.define('TDTM.controller.WindowProject', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'windows.WindowProject'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'button[name="submitProject"]' : {
            	click: this.onClickSave
            },
            'windowProject' : {
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
		var windowProject = c.findParentByType('window');
		this.addProject(windowProject);
	},

	/** 
	 * Function which adds a project.<br/>
	 * It prepares json structure and send it through an ajax request.
	 * 
	 * @param {TDTM.view.window.WindowProject} windowForm
	 * 		current window containing the form
	 * 
	 */
	addProject: function(windowForm, exists) {

    	var json = this.generateJSON(windowForm);

    	var mask = new Ext.LoadMask({target: windowForm, msg: LanguageMessages["loading"]});
		mask.show();
		
		var project = windowForm.project;

		var method = "POST";
		var exists = false;
		var url = Globals["url"]["server"] + '/project';

		if(project) {
			method = 'PUT';
			exists = true;
			url += '/' + project.get("id");
		}

    	Ext.Ajax.request({
    		url: url,
    		method: method,
    		jsonData: json,

	    	success: function(response, opts) {

	    		var data = Ext.decode(response.responseText);
	    		
	    		if(!exists) {
	    			// add project in grid
	    			Utils.addProjectInGrid(data);
	    		} else {
	    			Utils.updateProjectInGrid(project,data);
	    		}

	    		//close form window
	        	windowForm.close();

	    		// delete waiting picture
	    		mask.hide();
	        },
	        failure: function(response, opts) {
	        	mask.hide();

	        	Ext.MessageBox.show({
	        		title: LanguageMessages["error"]["saveProject"]["title"],
	        		msg: LanguageMessages["error"]["saveProject"]["msg"],
	        		buttons: Ext.MessageBox.OK,
	        		icon: Ext.MessageBox.ERROR
	        	});
	        }
    	});
	},

	/** 
	 * Function which generates a json structure from project form.<br/>
	 * This structure can be sent to server that is able to decode json.
	 * 
	 * @param {TDTM.view.window.WindowProject} windowForm
	 * 		current window containing the form
	 * 
	 * @return {Object}
	 */
	generateJSON: function(windowForm) {

		var genJson = {
		        'name': windowForm.query('textfield[name="name"]')[0].getValue(),
		        'description': windowForm.query('textfield[name="description"]')[0].getValue(),
		        'starttime': TimeUtils.toTimestamp(windowForm.query('textfield[name="starttime"]')[0].getValue()),
		        'endtime': TimeUtils.toTimestamp(windowForm.query('textfield[name="endtime"]')[0].getValue())
		};

		return genJson;
	},

	/** 
	 * Function triggered after window has been displayed.<br/>
	 * It allows to set project information into form's fields.
	 * 
	 * @param {TDTM.view.window.WindowProject} windowProject
	 * 		current window
	 * 
	 */
	onRender: function(windowProject) {

		var project = windowProject.project;

		if(project) {
			
			var form = windowProject.query('projectForm')[0];
						form.getForm().findField("name").setValue(project.get("name"));
						form.getForm().findField("endtime").setValue(Ext.Date.format(new Date(project.get("endtime")),Globals["date"]["fullDateFormat"]));
						form.getForm().findField("starttime").setValue(Ext.Date.format(new Date(project.get("starttime")),Globals["date"]["fullDateFormat"]));
						form.getForm().findField("description").setValue(project.get("description"));
		}
	}
});