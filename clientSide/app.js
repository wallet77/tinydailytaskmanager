/** 
 * Main application for Tiny Daily Task Manager.
 *
 * @class Ext.application
 * @singleton
 * @author Vincent Vallet
 */
Ext.application({
    requires: ['Ext.container.Viewport'],

    /**
     * @property {String} name
     * 		name of the application, 'TDTM' is also used as root package
     */
    name: 'TDTM',

    /**
     * @property {String} appFolder
     * 		application's files folder
     */
    appFolder: 'clientSide/app',

	controllers: [
	   'Administration',
	   'MainToolbar',
       'TaskTree',
       'LoginWindow',
       'GridProject',
       'GridMemberByTask',
       'GridMember',
       'WindowProject',
       'WindowMember',
       'WindowTask',
       'WindowGroup'
	],

	views: [
	   'main.MainToolbar',
	   'main.Trees',
	   'main.LoginWindow'
	],

	/** 
	 * This function create global viewport and all global sections.<br/>
	 * List of sections : <ul>
	 * <li> Main toolbar : {@link TDTM.view.main.MainToolbar}</li>
	 * <li> Tab of trees : {@link TDTM.view.main.Trees}</li>
	 * <li> Main informations area : {@link Ext.container.Container}</li>
	 * </ul>
	 * 
	 * This method also checks if user's informations are stored in cookies.
	 * If yes we only reload interface, if not we load a login window.
	 */
    launch: function() {
    	// main layout
	    Ext.create('Ext.Viewport', {
	    	id: 'mainViewPort',
	        layout: {
	            type: 'border',
	            padding: 0
	        },
	        defaults: {
	            split: true
	        },
	        items: [
	        	{
	        	xtype: 'mainToolbar',
	        	split: false,
	        	margin: '0 0 10 0'
	        }
	        ,{
	        	xtype: 'treeTab',
	        	hidden: true
	        }
	        ,{
	        	xtype: 'container',
	        	id: 'calendarRegion',
				region: 'center',
				split: true,
				collapsible: false,
				autoScroll:true,
				style: {
					"background-color": "white"
				}
	        }]
	    });

	    // Create a login window and display it only if user is not logged
	    // and if server required an authentification
		if(Globals["enableAuth"] && !Ext.util.Cookies.get("TDTM_username")) {
			var win = Ext.create('TDTM.view.main.LoginWindow');
			win.show();
		} else {
			Utils.loadInterface();
		}
    }
});