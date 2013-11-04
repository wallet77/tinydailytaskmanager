/** 
 * Controller for managing gridProject's operations <br/><br/>
 * It is used to : <ul>
 * <li>make operations when row is selected</li>
 * <li>launch creation function when user clicks on addProject button</li>
 * <li>launch deletion function when user clicks on removeProject button</li>
 * </ul>
 */
Ext.define('TDTM.controller.GridProject', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'grid.GridProject'
    ],

    /**
     * @property {Array} stores 
     * 		stores list
     */
    stores: [
             'Projects'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'gridProject' : {
            	selectionchange: this.onSelection,
            	itemdblclick: this.onDbclick
            },
            '#addProject' : {
            	click: this.onClickAdd
            },
            '#removeProject' : {
            	click: this.onClickRemove
            }
        });
    },

    /** 
	 * Function triggered when row is selected.<br/>
	 * It enables remove button.
	 * 
	 * @param {Ext.selection.Model} selectionModel
	 * @param {Array({Ext.data.Model}} records
	 * 		all selected lines
	 * 
	 */
    onSelection: function(selectionModel, records) {
    	// enable delete button
    	selectionModel.view.panel.down('#removeProject').setDisabled(!records.length);
    },

    /** 
	 * Function triggered when user click on addProject button.
	 * 
	 * @param {Object} c
	 * 		button addProject
	 * 
	 */
    onClickAdd: function(c){
    	
    	var windowOpen = Ext.ComponentQuery.query('window[id=addProject]');
    	if (!windowOpen || !windowOpen[0]){

    		var windowProject = Ext.create('TDTM.view.windows.WindowProject');
        	windowProject.setVisible(true);
    	}

    },

    /** 
	 * Function triggered when user click on removeProject button.
	 * 
	 * @param {Object} c
	 * 		button removeProject
	 * 
	 */
    onClickRemove: function(c){
    	var grid = c.findParentByType('grid');
    	var sm = grid.getSelectionModel();
    	
    	var selectedProjects = sm.getSelection();

    	// delete all selected project one by one
    	for(index in selectedProjects) {
    		
    		var project = selectedProjects[index]["data"];
    	
	    	Ext.Ajax.request({
	            url: Globals["url"]["server"] + '/project/' + project["id"],
	            method: 'DELETE',
	
	            success: function(response, opts) {
	            	var store = grid.getStore();

	            	store.remove(selectedProjects[index]);
	
	            	if (store.getCount() > 0) {
	            		sm.select(0);
	            	}
	            },
	            failure: function(response, opts) {
	
	                Ext.MessageBox.show({
	                    title: LanguageMessages["error"]["deleteProject"]["title"],
	                    msg: LanguageMessages["error"]["deleteProject"]["msg"] + project["name"],
	                    buttons: Ext.MessageBox.OK,
	                    icon: Ext.MessageBox.ERROR
	                });
	            }
	        });
    	}
	},

	/**
	 * Launched when user double click on grid's row
	 * 
	 * @param {Ext.view.View} dataview
	 * 		grid's view
	 * @param {Ext.data.Model} record
	 * 		current selected record
	 * @param {HTMLElement} item
	 * 		html representing the selected row
	 * @param {Number} index
	 * 		item's number
	 * @param e
	 */
	onDbclick: function(dataview, record, item, index, e) {
		var projectId = record.get("id");
		
		var windowOpen = Ext.ComponentQuery.query('window[id=project' + projectId + ']');
    	if (!windowOpen || !windowOpen[0]){

    		var windowProject = Ext.create('TDTM.view.windows.WindowProject', {project: record});
        	windowProject.setVisible(true);
    	}
	}

});