/** 
 * Form for managing member operation <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link Ext.form.field.Text} : name</li>
 * <li>{@link Ext.form.field.Text} : firstname</li>
 * <li>{@link Ext.form.field.Text} : tel</li>
 * <li>{@link Ext.form.field.Text} : email</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.MemberForm' ,{
    extend: 'Ext.FormPanel',
    alias: 'widget.memberForm',

    padding: '10 25 10 10',
    border: false,
	width: 490,

	/** 
	 * Build member form's content
	 * 
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		return [{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["member"]["name"],
				name: 'name',
				value: ''
			},
			{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["member"]["firstname"],
				name: 'firstname',
				value: ''
			},
			{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["member"]["tel"],
				name: 'tel',
				value: ''
			},
			{
				xtype: 'textfield',
				fieldLabel: LanguageMessages["member"]["email"],
				name: 'email',
				value: ''
		},{
			xtype: 'combo',
			fieldLabel: LanguageMessages["member"]["function"],
			name: 'function',
			store:  Ext.create('TDTM.store.MemberFunctions'),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: 'member'
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
 * Window for adding/editing a member <br/><br/>
 * It contains :
 * <ul>
 * <li>{@link TDTM.view.windows.MemberForm}</li>
 * </ul>
 */
Ext.define('TDTM.view.windows.WindowMember', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowMember',

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
	 * It builds member form.
	 * 
	 * @return {Array} array of items
	 */
	buildItems: function() {

		var memberForm = Ext.create('TDTM.view.windows.MemberForm', {});

		return [memberForm];

	},

	/** 
	 * Build window's buttons.<br/>
	 * This method is called in case we try to add a member.
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
			name: 'submitMember',
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

		if(!config.memberId) {
			this.title = LanguageMessages["member"]["addTitle"];
			this.id = 'addMember';
			this.modal = true;
			this.autoShow = false;
			this.closeAction = 'destroy';
		} else {
			this.title = LanguageMessages["member"]["editTitle"] + config.member.get("name");
			this.id = 'member' + config.member.get("id");
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