/** 
 * Main toolbar of the aplication <br/><br/>
 * It contains :
 * <ul>
 * <li>nothing while user is not connected</li>
 * <li> else
 * <ul>
 * <li>project drop down list</li>
 * <li>administration button</li>
 * </ul>
 * </li>
 * </ul>
 */
Ext.define('TDTM.view.main.MainToolbar' ,{
	extend: 'Ext.Panel',
	alias: 'widget.mainToolbar',

	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	
	region: 'north',
	collapsible: false,
	border: false,
	split: false,
	bodyStyle: 'background: none;',

	items: {
		xtype: 'container',
		id: 'mainToolbarRegion',
		layout: {
			type: 'hbox',
			align: 'middle'
		},
		cls: 'mainToolbarBody',
		width: '70%',
		margin: '0 15% 0 0',
	},

	initComponent: function() {
		this.callParent(arguments);
	}
});