/** 
 * Controller for managing gridMember's operations <br/><br/>
 * It is used to : <ul>
 * <li>make operations when row is selected</li>
 * <li>launch creation function when user clicks on addMember button</li>
 * <li>launch deletion function when user clicks on removeMember button</li>
 * </ul>
 */
Ext.define('TDTM.controller.GridMember', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'grid.GridMember'
    ],

    /**
     * @property {Array} stores 
     * 		stores list
     */
    stores: [
             'Members'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            'gridMember' : {
            	selectionchange: this.onSelection,
            	itemdblclick: this.onDbclick
            },
            '#addMember' : {
            	click: this.onClickAdd
            },
            '#removeMember' : {
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
    	selectionModel.view.panel.down('#removeMember').setDisabled(!records.length);
    },

    /** 
	 * Function triggered when user click on addMember button.
	 * 
	 * @param {Object} c
	 * 		button addMember
	 * 
	 */
    onClickAdd: function(c){
    	
    	var windowOpen = Ext.ComponentQuery.query('window[id=addMember]');
    	if (!windowOpen || !windowOpen[0]){

    		var windowProject = Ext.create('TDTM.view.windows.WindowMember');
        	windowProject.setVisible(true);
    	}

    },

    /** 
	 * Function triggered when user click on removeMember button.
	 * 
	 * @param {Object} c
	 * 		button removeMember
	 * 
	 */
    onClickRemove: function(c){
    	var grid = c.findParentByType('grid');
    	var sm = grid.getSelectionModel();
    	
    	var selectedMembers = sm.getSelection();

    	// delete all selected project one by one
    	for(index in selectedMembers) {
    		
    		var member = selectedMembers[index]["data"];
    	
	    	Ext.Ajax.request({
	            url: Globals["url"]["server"] + '/member/' + member["id"],
	            method: 'DELETE',
	
	            success: function(response, opts) {
	            	var store = grid.getStore();
	
	            	store.remove(selectedMembers[index]);
	
	            	if (store.getCount() > 0) {
	            		sm.select(0);
	            	}
	            },
	            failure: function(response, opts) {
	
	                Ext.MessageBox.show({
	                    title: LanguageMessages["error"]["deleteMember"]["title"],
	                    msg: LanguageMessages["error"]["deleteMember"]["msg"] + member["name"],
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
		var memberId = record.get("id");

		var windowOpen = Ext.ComponentQuery.query('window[id=member' + memberId + ']');
    	if (!windowOpen || !windowOpen[0]){

    		var windowMember = Ext.create('TDTM.view.windows.WindowMember', {member: record});
    		windowMember.setVisible(true);
    	}
	}

});