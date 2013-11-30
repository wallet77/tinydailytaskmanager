/** 
 * Controller for managing login window's operations <br/><br/>
 * It is used to : <ul>
 * <li>make operations after form was displayed</li>
 * <li>launch onLogin function when user clicks on buttonLogin button</li>
 * </ul>
 */
Ext.define('TDTM.controller.LoginWindow', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'main.LoginWindow'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            '#buttonLogin': {
            	click: this.onLogin
            },
            '#windowLoginForm > form': {
            	afterrender: this.afterRender
            }
        });
    },

	/** 
	 * Function triggered after form has been displayed.<br/>
	 * It allows enter key to be pressed to submit form.
	 * 
	 * @param {Ext.FormPanel} thisForm
	 * 		current form
	 * 
	 */
    afterRender: function(thisForm, options){
    	thisForm.keyNav = Ext.create('Ext.util.KeyNav', thisForm.el, {
            enter: function(){
            	Ext.getCmp('buttonLogin').fireEvent('click',Ext.getCmp('buttonLogin'));
            },
            scope: thisForm
        });
    },

    /** 
	 * Function triggered when user click on buttonLogin button.
	 * 
	 * @param {Object} c
	 * 		button buttonLogin
	 * 
	 */
    onLogin: function(c) {
    	
    	var window = c.findParentByType('window');

    	// save informations in globals variables
    	Ext.util.Cookies.set("tdtm_username", window.query('textfield[name="username"]')[0].getValue());
    	Ext.util.Cookies.set("tdtm_password", window.query('textfield[name="password"]')[0].getValue());

    	// set headers for all ajax request
    	// don't need to repeat it for each request
    	Ext.Ajax.defaultHeaders = getHeaders();

    	window.close();
    	Utils.loadInterface();

//    	Ext.Ajax.request({
//    		url: serverRestUrl + '/test-connection',
//    		method: 'GET',
//
//	    	success: function(response, opts) {
//	    		window.close();
//
//	    		Utils.loadInterface();
//
//	        },
//	        failure: function(response, opts) {
//
//	        	Ext.MessageBox.show({
//	        		title: 'Tentative de connexion',
//	        		msg: 'Error',
//	        		buttons: Ext.MessageBox.OK,
//	        		icon: Ext.MessageBox.ERROR
//	        	});
//	        }
//    	});
    },
});