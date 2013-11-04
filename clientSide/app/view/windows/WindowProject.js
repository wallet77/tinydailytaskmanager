/** 
 * Form for managing project operation <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link Ext.form.field.Text} : name</li>
 * <li>{@link Ext.form.field.Text} : starttime</li>
 * <li>{@link Ext.form.field.Text} : starttime</li>
 * <li>{@link Ext.form.field.TextArea} : description</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.ProjectForm' ,{
    extend: 'Ext.FormPanel',
    alias: 'widget.projectForm',

    padding: '10 25 10 10',
    border: false,
	width: 490,

	/** 
	 * Build project form's content
	 * 
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		return [{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["project"]["name"],
				name: 'name',
				value: ''
			},
			{
				xtype: 'datefield',
				fieldLabel: LanguageMessages["project"]["starttime"],
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
				fieldLabel: LanguageMessages["project"]["endtime"],
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
	            fieldLabel: LanguageMessages["project"]["description"],
	            name: 'description',
	            rows: 7,
		}];
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
 * Window for adding/editing a project <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link TDTM.view.windows.ProjectForm}</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.WindowProject', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowProject',

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

		var projectForm = Ext.create('TDTM.view.windows.ProjectForm', {});

		return [projectForm];

	},

	/** 
	 * Build window's buttons.<br/>
	 * This method is called in case we try to add a project.
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
			name: 'submitProject',
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

		if(!config.projectId) {
			this.title = LanguageMessages["project"]["addTitle"];
			this.id = 'addProject';
			this.modal = true;
			this.autoShow = false;
			this.closeAction = 'destroy';
		} else {
			this.title = LanguageMessages["project"]["editTitle"] + config.project.get("name");
			this.id = 'project' + config.project.get("id");
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