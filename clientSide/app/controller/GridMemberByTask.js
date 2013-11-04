/** 
 * Controller for managing gridMemberByTask's operations <br/><br/>
 * It is used to : <ul>
 * <li>make operations when row is selected</li>
 * <li>launch creation function when user clicks on addMember button</li>
 * <li>launch deletion function when user clicks on removeMember button</li>
 * </ul>
 */
Ext.define('TDTM.controller.GridMemberByTask', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'grid.GridMemberByTask'
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
            'gridMemberByTask' : {
            	selectionchange: this.onSelection
            },
            '#addMemberToTask' : {
            	click: this.onClickAdd
            },
            '#removeMemberToTask' : {
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
    	selectionModel.view.panel.down('#removeMemberToTask').setDisabled(!records.length);
    },

    /** 
	 * Function triggered when user click on addMemberToTask button.
	 * 
	 * @param {Object} c
	 * 		button addMemberToTask
	 * 
	 */
    onClickAdd: function(c){

    	var grid = c.findParentByType('gridMemberByTask');
    	var combo = grid.query('[name=attachMember]')[0];
    	var selectedMembers = combo.getValue();
    	var store = grid.getStore();

    	var allMembers = [];

    	// loop through combox value
    	for(index in selectedMembers) {
    		var member = combo.findRecordByValue(selectedMembers[index]);
    		// if record doesn"t not exist in grid
    		if(store.indexOf(member) === -1) {
    			allMembers.push(member);
    		}
    	}

    	store.insert(0, allMembers);

    },

    /** 
	 * Function triggered when user click on removeMemberToTask button.
	 * 
	 * @param {Object} c
	 * 		button addMemberToTask
	 * 
	 */
    onClickRemove: function(c){
    	var grid = c.findParentByType('grid');
    	var sm = grid.getSelectionModel();
    	
    	var selectedMembers = sm.getSelection();

    	// delete all selected project one by one
    	for(index in selectedMembers) {
    		
    		var store = grid.getStore();
    		
        	store.remove(selectedMembers[index]);

        	if (store.getCount() > 0) {
        		sm.select(0);
        	}
    	}
	}
});