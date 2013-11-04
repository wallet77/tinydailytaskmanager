/** 
 * Controller for managing administration panel operations <br/><br/>
 * It is used to : <ul>
 * <li>launch onProjectClicked function when user clicks on buttonProject button</li>
 * <li>launch onMemberClicked function when user clicks on buttonMember button</li>
 * </ul>
 */
Ext.define('TDTM.controller.Administration', {
    extend: 'Ext.app.Controller',

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            '#buttonProject': {
            	click: this.onProjectClicked
            },
            '#buttonMember': {
            	click: this.onMemberClicked
            }
        });
    },

    /** 
	 * Function triggered when user click on buttonProject button.
	 * 
	 * @param {Object} c
	 * 		button buttonProject
	 * 
	 */
    onProjectClicked: function(c) {

    	Utils.loadProjectInterface();
    },

    /** 
	 * Function triggered when user click on buttonMember button.
	 * 
	 * @param {Object} c
	 * 		button buttonProject
	 * 
	 */
    onMemberClicked: function(c) {

    	Utils.loadMemberInterface();
    }
});