/** 
 * Bundle tree view
 */
Ext.define('TDTM.view.main.TaskTree' ,{
    extend: 'Ext.tree.Panel',
    alias: 'widget.taskTree',

    id: 'taskTree',
	bodyBorder: false,
	border: false,
	multiSelect: true,
    //store: 'Tree',
    rootVisible: true,
    singleExpand: false,
    displayField: 'name',
    scroll: false,
    style: {
    	overflow: 'visible'
    },
    viewConfig: {
        stripeRows: true
	},
	
	/** 
	 * Build tree store
	 * 
	 * 
	 * @return {Array} array of items
	 */
	buildStore: function(rootNode) {

		return Ext.create('TDTM.store.Tree',{rootNode: rootNode});
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

		Ext.apply(this, {
			store: this.buildStore(config.rootNode)
		});
        this.callParent(arguments);
    }
});

/** 
 * Main tree tab <br/><br/>
 * Contains :
 * <ul>
 * <li>{@link PA.view.main.MainTree}</li>
 * <li>{@link PA.view.main.TreeTarget}</li>
 * <li>{@link PA.view.main.TreeProvisioning}</li>
 * </ul>
 */
Ext.define('TDTM.view.main.Trees' ,{
    extend: 'Ext.tab.Panel',
    alias: 'widget.treeTab',

    region: 'west',
    id: 'treeTabRegion',
	split: true,
	collapsible: false,
	width: 250,
	plain: true,
	autoScroll: true,
	bodyStyle: {
	    overflow: 'auto'
	},
    items: [{
    	title: LanguageMessages["task"]["title"],
    	style: {
	    	overflowY: 'visible'
	    },
	    bodyStyle: {
	    	overflowY: 'visible'
	    },
    	items: [
//    	        {
//    		xtype: 'taskTree'
//    	}
    	        ]
	}],

    initComponent: function() {
        this.callParent(arguments);
    }
});