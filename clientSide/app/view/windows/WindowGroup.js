/** 
 * Form for managing group operation <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link Ext.form.field.Text} : name</li>
 * <li>{@link Ext.form.field.TextArea} : description</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.GroupForm' ,{
    extend: 'Ext.FormPanel',
    alias: 'widget.groupForm',

    padding: '10 25 10 10',
    border: false,
	width: 490,

	/** 
	 * Build group form's content
	 * 
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		return [{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["group"]["name"],
				name: 'name',
				value: ''
			},
			{
	            xtype: 'textareafield',
	            fieldLabel: LanguageMessages["group"]["description"],
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
 * Window for adding/editing a group <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link TDTM.view.windows.GroupForm}</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.WindowGroup', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowGroup',

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
	 * It builds group form.
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		var groupForm = Ext.create('TDTM.view.windows.GroupForm', {});

		return [groupForm];

	},

	/** 
	 * Build window's buttons.<br/>
	 * This method is called in case we try to add a group.
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
			name: 'submitGroup',
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
		
		var groupId = config.group.raw.id;

		if(!groupId) {
			this.title = LanguageMessages["group"]["addTitle"];
			this.id = 'addGroup';
			this.modal = true;
			this.autoShow = false;
			this.closeAction = 'destroy';
		} else {
			this.title = LanguageMessages["group"]["editTitle"] + " : " + config.group.get("name");
			this.id = 'group' + groupId;
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