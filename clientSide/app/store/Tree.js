/** 
 * Store for tasks tree <br/><br/>
 * It uses model {@link TDTM.model.TreeNode} <br/>
 * This store is connected to server with a default url.<br/>
 * There is a default root node and no server synchronization
 */
Ext.define('TDTM.store.Tree', {
    extend: 'Ext.data.TreeStore',

    autoSync: false,
	autoLoad: false,

	model: 'TDTM.model.TreeNode',

//    root: {
//        name: LanguageMessages["task"]["title"],
//      //  url: serverRestUrl + '/task',
//        type: "root",
//       // icon: iconPath + 'bundle16.png',
//        cls: 'rootNode',
//        expanded: false,
//        children: []
//    },
    
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

		this.root = config.rootNode;
        this.callParent(arguments);
    }
});