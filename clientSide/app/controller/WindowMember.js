/** 
 * Controller for managing member window's operations <br/><br/>
 * It is used to : <ul>
 * <li>launch creation function when user clicks on submit button</li>
 * <li>make operations after window of type {@link TDTM.view.window.WindowMember} was displayed</li>
 * </ul>
 */
Ext.define('TDTM.controller.WindowMember', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'windows.WindowMember'
    ],

    /**
     * @property {Array} stores 
     * 		views list
     */
    stores: [
            'MemberFunctions'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'button[name="submitMember"]' : {
            	click: this.onClickSave
            },
            'windowMember' : {
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
		var windowMember = c.findParentByType('window');
		this.addMember(windowMember);
	},

	/** 
	 * Function which adds a member.<br/>
	 * It prepares json structure and send it through an ajax request.
	 * 
	 * @param {TDTM.view.window.WindowMember} windowForm
	 * 		current window containing the form
	 * 
	 */
	addMember: function(windowForm, exists) {

    	var json = this.generateJSON(windowForm);

    	var mask = new Ext.LoadMask({target: windowForm, msg: LanguageMessages["loading"]});
		mask.show();
		
		var member = windowForm.member;

		var method = "POST";
		var exists = false;
		var url = Globals["url"]["server"] + '/member';

		if(member) {
			method = 'PUT';
			exists = true;
			url += '/' + member.get("id");
		}

    	Ext.Ajax.request({
    		url: url,
    		method: method,
    		jsonData: json,

	    	success: function(response, opts) {
	    		
	    		var data = Ext.decode(response.responseText);

	    		if(!exists) {

	    			// add project in grid
	    			Utils.addMemberInGrid(windowForm);

	    		} else {
	    			Utils.updateMemberInGrid(member, data);
	    		}

	    		//close form window
	        	windowForm.close();

	    		// delete waiting picture
	    		mask.hide();
	        },
	        failure: function(response, opts) {
	        	mask.hide();

	        	Ext.MessageBox.show({
	        		title: LanguageMessages["error"]["saveMember"]["title"],
	        		msg: LanguageMessages["error"]["saveMember"]["msg"],
	        		buttons: Ext.MessageBox.OK,
	        		icon: Ext.MessageBox.ERROR
	        	});
	        }
    	});
	},

	/** 
	 * Function which generates a json structure from member form.<br/>
	 * This structure can be sent to server that is able to decode json.
	 * 
	 * @param {TDTM.view.window.WindowMember} windowForm
	 * 		current window containing the form
	 * 
	 * @return {Object}
	 */
	generateJSON: function(windowForm) {

		var genJson = {
		        'name': windowForm.query('textfield[name="name"]')[0].getValue(),
		        'firstname': windowForm.query('textfield[name="firstname"]')[0].getValue(),
		        'tel': windowForm.query('textfield[name="tel"]')[0].getValue(),
		        'email': windowForm.query('textfield[name="email"]')[0].getValue(),
		        'function': windowForm.query('textfield[name="function"]')[0].getValue()
		};

		return genJson;
	},

	/** 
	 * Function triggered after window has been displayed.<br/>
	 * It allows to set project information into form's fields.
	 * 
	 * @param {TDTM.view.window.WindowMember} windowMember
	 * 		current window
	 * 
	 */
	onRender: function(windowMember) {

		var member = windowMember.member;

		if(member) {
			
			var form = windowMember.query('memberForm')[0];
			form.getForm().findField("name").setValue(member.get("name"));
			form.getForm().findField("firstname").setValue(member.get("firstname"));
			form.getForm().findField("tel").setValue(member.get("tel"));
			form.getForm().findField("email").setValue(member.get("email"));
			form.getForm().findField("function").setValue(member.get("function"));
		}
	}
});