var formPanel = Ext.create('Ext.FormPanel' , {
	labelWidth: 80,
	bodyCls: 'loginForm',
	layout: 'absolute',

	items: [{
		xtype: 'label',
		style: 'color: #000; font-weight: bold; font-size: 11px',
		text: LanguageMessages["login"]["login"],
		x: 165,
		y: 80,
	}, {
		xtype: 'textfield',
		name: 'username',
		allowBlank: true,
		x: 160,
		y: 98,
		style: 'font-size: 20px',
	}, {
		xtype: 'label',
		style: 'color: #000; font-weight: bold; font-size: 11px',
		text: LanguageMessages["login"]["password"],
		x: 165,
		y: 125,
	}, {
		xtype: 'textfield',
		name: 'password',
		inputType:'password',
		allowBlank: true,
		x: 160,
		y: 140,
		style: 'font-size: 20px',
	}, {
		xtype: 'button',
		id: 'buttonLogin',
		name: 'login',
		text: LanguageMessages["login"]["button"],
		width: 80,
		x: 290,
		y: 210,
		margin: '0 0 5 0',
		formBind: true
	}],
});

/** 
 * Window login <br/><br/>
 * It contains :
 * <ul>
 * <li>an {@link Ext.FormPanel}</li>
 * </ul>
 */
Ext.define('TDTM.view.main.LoginWindow' ,{
	extend: 'Ext.Window',
	alias: 'widget.loginWindow',

	id: 'windowLoginForm',
	layout:'fit',
	closable: true,
	draggable: false,
	resizable: false,
	modal: true,
	width: 425,
	plain: true,
	border: false,
	title: LanguageMessages["login"]["title"],
	bbar: [{
		xtype: 'tbtext',
	    text: '2013 - Vincent Vallet'
	}],
	items: [ formPanel ],
	listeners : {
		'show': function(window) {
			// little trick to add focus on username field
			window.query('textfield[name="username"]')[0].focus(false,100);
		}
	}
});