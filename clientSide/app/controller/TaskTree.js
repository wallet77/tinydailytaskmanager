/** 
 * Controller for managing tree of tasks operations <br/><br/>
 * It is used to : <ul>
 * <li>display task tree</li>
 * </ul>
 */
Ext.define('TDTM.controller.TaskTree', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'main.Trees',
    ],

    /**
     * @property {Array} stores 
     * 		stores list
     */
    stores: [
             'Tree'
    ],

    /**
     * @property {Array} models 
     * 		models list
     */
    models: [
             'TreeNode',
             'Group',
             'Task'
    ],

    /**
     * @property {Object} actions 
     * 		List of contextmenu items
     */
    actions: {
		addTask: Ext.create('Ext.Action', {
			icon: 'clientSide/resources/img/icons/add.png',
	        text: LanguageMessages["contextmenu"]["addTask"],
	        disabled: false,
	        handler: function () {
	        	var selectedGroup = Ext.getCmp('taskTree').getSelectionModel().getSelection()[0];

	        	var task = Ext.create('TDTM.model.Task', {
	                "projectid": Ext.getCmp('projectSelect').getValue(),
	                "parentgroupid": selectedGroup.raw.id               
	            });

	        	var addtask = Ext.create('TDTM.view.windows.WindowTask', {task: task});
	        	addtask.show();
	        }
		}),
		addGroup: Ext.create('Ext.Action', {
			icon: 'clientSide/resources/img/icons/add.png',
	        text: LanguageMessages["contextmenu"]["addGroup"],
	        disabled: false,
	        handler: function () {
	        	var selectedGroup = Ext.getCmp('taskTree').getSelectionModel().getSelection()[0];
		        var group = Ext.create('TDTM.model.Group', {
	                "projectid": Ext.getCmp('projectSelect').getValue(),
	                "parentgroupid": selectedGroup.raw.id               
	            });
	        	var addgroup = Ext.create('TDTM.view.windows.WindowGroup',{group: group});
	        	addgroup.show();
	        }
		}),
		separator: Ext.create('Ext.menu.Separator'),
		deleteItem: Ext.create('Ext.Action', {
			icon: 'clientSide/resources/img/icons/delete.png',
	        text: LanguageMessages["contextmenu"]["delete"],
	        disabled: false,
	        handler: function () {
	        	var selectedItem = Ext.getCmp('taskTree').getSelectionModel().getSelection()[0];
	        	if(selectedItem.get('type') === "task") {
	        		Utils.deleteTask(selectedItem);
	        	} else {
	        		Utils.deleteGroup(selectedItem);
	        	}
	        }
		}),
		reloadItem: Ext.create('Ext.Action', {
			icon: 'clientSide/resources/img/icons/reload.png',
	        text: LanguageMessages["contextmenu"]["reload"],
	        disabled: false,
	        handler: function () { 
	        	var tree = Ext.getCmp('taskTree');
	        	tree.getStore().load();
	        }
		})
    },

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'taskTree': {
            	itemcontextmenu: this.onItemcontextmenu,
            	beforeload: this.onBeforeload,
            	load: this.onLoad,
            	itemdblclick: this.onItemdblclick
            }
        });
    },

    /** 
	 * Function triggered after a right click.<br/>
	 * It displays contextmenu according to node type (root node, target, bundle ...)
	 * 
	 * @param {Ext.view.View} view
	 * 		view of the tree
	 * @param {PA.model.TreeNode} rec
	 * @param HTMLElement node
	 * @param Number index
	 * @param {Ext.EventObject} e
	 * 
	 */
	onItemcontextmenu: function(view, rec, node, index, e) {

		var items = new Array();
		var type = rec.get('type');

		if(type === "group" || type === "root") {
			items.push(this.actions.addGroup);
			items.push(this.actions.addTask);
			items.push(this.actions.separator);
		}

		if(type !== "root") {
			items.push(this.actions.deleteItem);
		} else {
			items.push(this.actions.reloadItem);
		}

		var contextMenu = Ext.create('Ext.menu.Menu', {
			items: items
		});

        e.stopEvent();
        contextMenu.showAt(e.getXY());
        return false;
    },
    
    /**
     * Function triggered when tree is loaded.<br/>
     * This function change the store url with the current node url.
     * This allows tree to have a lazy loading behavior.<br/><br/>
     * 
     * <b>Explanation</b><br/>
     * Each time a node is expanded "beforeload" event is triggered on tree.
     * After this event a reload operation is launched on tree's store.
     * <br/>
     * In case of lazy loading, we don't want to reload the store but only a node.
     * So we need to call the node url (which will ask to the server the children of this node).
     * <br/>
     * So we replace store url by node url to retrieve node's children from the server.
     * 
     * @param {TDTM.store.Tree} store
     * 		tree's store
     * @param {Ext.data.Operation} operation
     * 		oject to retrieve element
     * @param {Object} eOpts
     * 
     */
    onBeforeload: function(store, operation, eOpts) {
    	var node = operation.node;
    	var type = node.get('type');
    	var id = node.get('id');
    	var url = Globals["url"]["server"];

    	if(type === "group" || type === "root") {
    		url += '/group/';
    	} else {
    		url += '/task/';
    	}
    	store.getProxy().url = url + id + '/children';
    },

    /**
     * Function triggered when tree is loaded.<br/>
     * This function change node's icon according to task's type.
     * 
     * @param {TDTM.store.Tree} store
     * 		bundles tree's store
     * @param {Ext.data.NodeInterface} node
     * 		node loaded
     * @param {Ext.data.Model[]} records
     * 		all records from server
     * @param Boolean successful
     * 		if operation is a success
     * @param Object eOpts
     */
    onLoad: function( store, node, records, successful, eOpts ) {

    	// loop through children
    	// and change icon if necessary
    	if(records) {
	    	var nbChild = records.length;
	    	for(var i = 0 ; i < nbChild; i++) {
	    		var currentType = records[i].get('type');
	    		records[i].set('icon', Globals["path"]["icon"] + currentType + '16.png');
	    	}
    	}
    },

    /**
     * Function triggered when double click is triggered.<br/>
     * This function load a window with current selected task's informations.
     * 
     * @param {Ext.view.View} view
     * @param {TDTM.model.TreeNode} record
     * 		node loaded
     * @param HTMLElement item
     * 		html node representation
     * @param Number index
     * 		item's index
     * @param Object eOpts
     */
    onItemdblclick: function(view, record, item, index, eOpts) {

    	if(record.get('type') === "root") {
    		return;
    	}

    	var nodeId = record.get('id');

    	var view = 'TDTM.view.windows.WindowGroup';
    	var config = {
    			group: record
    	};
    	var windowId = 'group';

    	if(record.get('type') === "task") {
    		view = 'TDTM.view.windows.WindowTask';
        	config = {
        			task: record
        	};
        	windowId = 'task';
    	}

    	windowId += nodeId;

    	var windowOpen = Ext.ComponentQuery.query('window[id=' + windowId + ']');

    	if (!windowOpen || !windowOpen[0]){

    		var showWindow = Ext.create(view,config);
        	showWindow.setVisible(true);
    	}
    }
});