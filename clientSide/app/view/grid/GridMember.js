/** 
 * Datagrid for member list <br/>
 * This grid allow administrator to see and delete member <br/><br/>
 * 
 * This grid is linked to store {@link TDTM.store.Members}
 */
Ext.define('TDTM.view.grid.GridMember', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridMember',

    multiSelect: false,
    flex: 1,

    /** 
	 * Function which create a new store for grid of properties.
	 * 
	 * @return {@link PA.store.Members}
	 * 
	 */
    buildStore: function() {
    	return Ext.create('TDTM.store.Members');
    },

    /** 
	 * Build grid's columns header.<br/>
	 * 
	 * @return {Array} array of columns
	 */
    buildColumns: function() {
    	return [{
            header: LanguageMessages["member"]["name"],
            dataIndex: 'name',
            flex: 1
        }, {
            header: LanguageMessages["member"]["firstname"],
            dataIndex: 'firstname',
            flex: 1
        }, {
            header: LanguageMessages["member"]["email"],
            dataIndex: 'email',
            flex: 1
        }, {
            header: LanguageMessages["member"]["tel"],
            dataIndex: 'tel',
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
			itemId: 'addMember',
			text: LanguageMessages["button"]["add"],
			icon: './clientSide/resources/img/icons/add.png'
		},
		{
			itemId: 'removeMember',
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