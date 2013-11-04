/** 
 * Main application for Tiny Daily Task Manager.<br/>
 * 
 * <h1>TDTM requirements</h1>
 * What TDTM needs to work correctly ?
 * <h3>Client Side</h3>
 * <ul>
 * 		<li>Extjs 4.2.1</li>
 * 		<li>JsDuck 4.6.1</li>
 * </ul>
 * <h3>Browser compatibility</h3>
 * <ul>
 *		<li>Internet Explorer 6+</li>
 *		<li>Firefox 3.6+ (PC, Mac)</li>
 *		<li>Safari 4+</li>
 *		<li>Chrome 10+</li>
 *		<li>Opera 11+ (PC, Mac)</li>
 * </ul>
 * <h3>Server Side</h3>
 * <ul>
 * 		<li>Any server language compatible with REST Api, default is PHP (2.5.3) </li>
 * 		<li>Apache 2</li>
 * 		<li>Mysql (or any storage system which respects TDTM data model</li>
 * </ul>
 * 
 * <h1>TDTM contraints</h1>
 * TDTM works as a standalone and full screen interface.
 * We just need to launch a single Ext.application to manage all interfaces elements.<br/>
 * 
 * 
 * <h1>TDTM technicals points</h1>
 * 
 * 
 * <h1>TDTM features</h1>
 * <ul>
 * 		<li>Login system</li>
 * 		<li>CRUD Projects</li>
 * 		<li>CRUD Members</li>
 * 		<li>CRUD Task</li>
 * 		<li>Display a week calendar</li>
 * 		<li>Allow task or member filtering on calendar event</li>
 * </ul>
 *
 * @class Ext.application
 * @singleton
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
//		if(!Ext.util.Cookies.get("TDTM_username")) {
//			var win = Ext.create('TDTM.view.main.LoginWindow');
//			win.show();
//		} else {
			Utils.loadInterface();
//		}
    }
});