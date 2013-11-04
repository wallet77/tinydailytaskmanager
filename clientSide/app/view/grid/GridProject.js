/** 
 * Datagrid for project list <br/>
 * This grid allow administrator to see and delete project <br/><br/>
 * 
 * This grid is linked to store {@link TDTM.store.Projects}
 */
Ext.define('TDTM.view.grid.GridProject', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridProject',

    multiSelect: false,
    flex: 1,

    /** 
	 * Function which create a new store for grid of properties.
	 * 
	 * @return {@link TDTM.store.Projects}
	 * 
	 */
    buildStore: function() {
    	return Ext.create('TDTM.store.Projects');
    },

    /** 
	 * Build grid's columns header.<br/>
	 * 
	 * @return {Array} array of columns
	 */
    buildColumns: function() {
    	return [{
            header: LanguageMessages["project"]["name"],
            dataIndex: 'name',
            flex: 1
        }, {
        	xtype: 'datecolumn',
        	type: 'date',
            header: LanguageMessages["project"]["starttime"],
            dataIndex: 'starttime',
            format: Globals["date"]["fullDateFormat"],
            flex: 1
        }, {
        	xtype: 'datecolumn',
        	type: 'date',
            header: LanguageMessages["project"]["endtime"],
            dataIndex: 'endtime',
            format: Globals["date"]["fullDateFormat"],
            flex: 1
        }];
    },

    /** 
	 * Build grid's top toolbar.<br/>
	 * It contains two buttons, one to add a new project and one to remove current selected project.
	 * 
	 * @return {Array} toolbar
	 */
    buildTbar: function() {
    	return [{
			itemId: 'addProject',
			text: LanguageMessages["button"]["add"],
			icon: './clientSide/resources/img/icons/add.png'
		},
		{
			itemId: 'removeProject',
			text: LanguageMessages["button"]["remove"],
			icon: './clientSide/resources/img/icons/delete.png',
			disabled: true
		}];
    },

    /** 
	 * Constructor
	 * 
	 * @param {Object} config
	 */
    constructor: function(config) {

    	if(!config) {
    		config={};
    	}

    	// independant instances
    	Ext.apply(this, {
    		tbar: this.buildTbar(),
    		columns: this.buildColumns(),
    		store: this.buildStore()
        });

    	this.callParent(arguments);
    }
});