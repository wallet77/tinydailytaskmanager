/** 
 * Form for managing task operation <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link Ext.form.field.Text} : name</li>
 * <li>{@link Ext.form.field.Text} : starttime</li>
 * <li>{@link Ext.form.field.Text} : starttime</li>
 * <li>{@link Ext.form.field.TextArea} : description</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.TaskForm' ,{
    extend: 'Ext.FormPanel',
    alias: 'widget.taskForm',

    padding: '10 25 10 10',
    border: false,
	width: 490,
	defaults: {
		width: '100%'
	},

	/** 
	 * Build task form's content
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		var gridMembers = Ext.create('TDTM.view.grid.GridMemberByTask');

		return [{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["task"]["name"],
				name: 'name',
				value: ''
			},
			{
				xtype: 'datefield',
				fieldLabel: LanguageMessages["task"]["starttime"],
				name: 'starttime',
				format: Globals["date"]["fullDateFormat"],
				listeners: {
					select: function(dtpIssueDate, date) {
						TimeUtils.bindTimeWithDate(dtpIssueDate, date);
					}
				}
			},
			{
				xtype: 'datefield',
				fieldLabel: LanguageMessages["task"]["endtime"],
				name: 'endtime',
				format: Globals["date"]["fullDateFormat"],
				listeners: {
					select: function(dtpIssueDate, date) {
						TimeUtils.bindTimeWithDate(dtpIssueDate, date);
					}
				}
			},
			{
	            xtype: 'textareafield',
	            fieldLabel: LanguageMessages["task"]["description"],
	            name: 'description',
	            rows: 7
		},
		gridMembers];
	},

	/** 
	 * Constructor
	 * 
	 * @param {Object} config
	 * 		javascript structure which contains all informations.
	 */
	constructor: function(config) {

		Ext.apply(this, {
			items: this.buildItems()
		});
        this.callParent(arguments);
    }
});

/** 
 * Window for adding/editing a task <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link TDTM.view.windows.TaskForm}</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.WindowTask', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowTask',

	closable: true,
	autoShow: false,
	layout: 'hbox',
	align: 'middle',
	defaults: {
		flex: 1
	},
	overflowY: 'scroll',
    bodyStyle: {
		'background-color':'white',
		'padding' : '5px'
	},
	width: 570,

	/** 
	 * Build window's content.<br/>
	 * It builds project form.
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		var taskForm = Ext.create('TDTM.view.windows.TaskForm', {});

		return [taskForm];

	},

	/** 
	 * Build window's buttons.<br/>
	 * This method is called in case we try to add a task.
	 * 
	 * @return {Array} array of buttons
	 */
	buildButtons: function() {
		return [{
			text: LanguageMessages["button"]["cancel"],
			scope: this,
			handler: this.close
		},
		{
			name: 'submitTask',
			text: LanguageMessages["button"]["save"]
		}];
	},

	/** 
	 * Constructor
	 * 
	 * @param {Object} config
	 * 		javascript structure which contains all informations.
	 */
	constructor: function(config) {

		if(!config) {
			config = {};
		}

		var taskId = config.task.raw.id;

		if(!taskId) {
			this.title = LanguageMessages["task"]["addTitle"];
			this.id = 'addTask';
			this.modal = true;
			this.autoShow = false;
			this.closeAction = 'destroy';
		} else {
			this.title = LanguageMessages["task"]["editTitle"] + " : " + config.task.raw["name"];
			this.id = 'task' + taskId;
			this.constrain = true;
			this.maximizable = true;
			this.autoDestroy = true;
		}
		this.buttons = this.buildButtons();

		Ext.apply(this, {
			items: this.buildItems()
		});

		this.callParent(arguments);
	}
});