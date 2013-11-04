/** 
 * Controller for managing maintoolbar's operations <br/><br/>
 * 
 * It is used to : <ul>
 * <li>make operations after panel has been displayed</li>
 * <li>launch onProjectSelect function when user select a project</li>
 * <li>launch onMemberSelect function when user select a member</li>
 * <li>launch onLogout function when user clicks on buttonLogout button</li>
 * </ul>
 */
Ext.define('TDTM.controller.MainToolbar', {
    extend: 'Ext.app.Controller',

    /**
     * @property {Array} views 
     * 		views list
     */
    views: [
            'main.MainToolbar'
    ],

    /**
     * @property {Array} stores 
     * 		stores list
     */
    stores: [
            'Projects',
            'Members'
    ],

    /**
     * @property {Array} models
     * 		models list
     */
    models: [
            'Project',
            'Member'
    ],

    /** 
	 * Initialization function.<br/>
	 * It binds controllers with functions.
	 *
	 */
    init: function() {
        this.control({
            '#buttonLogout': {
            	click: this.onLogout
            },
            '#buttonAdministration': {
            	click: this.onAdmin
            },
            '#projectSelect': {
            	select: this.onSelectProject
            },
            '#memberSelect': {
            	select: this.onSelectMember
            }
        });
    },

    /** 
	 * Function triggered when user click on logout button.
	 * 
	 * @param {Object} c
	 * 		logout button
	 * 
	 */
    onLogout: function(c) {
    	Ext.util.Cookies.clear("tdtm_username");
    	Ext.util.Cookies.clear("tdtm_password");
    	window.location.reload();
    },

    /** 
	 * Function triggered when user click on administration button.
	 * 
	 * @param {Object} c
	 * 		administration button
	 * 
	 */
    onAdmin: function(c) {
    	Utils.loadAdministration();
    },

    /** 
	 * Function triggered when user select project
	 * 
	 * @param {Ext.form.field.ComboBox} combo
	 * 		project combobox
	 * @param {Array} records
	 * 		set of selected items
	 * 
	 */
    onSelectProject: function(combo, records, eOpts) {

    	var project = records[0];
    	
    	Ext.Ajax.request({
            url: Globals["url"]["server"] + '/project/' + project.get("id") + '/root',
            method: 'GET',

            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                var iconPath = Globals["path"]["icon"];

                var nbChild = data["children"].length;
                for(var i = 0 ; i < nbChild; i++) {
                	var currentItem = data["children"][i];
    	    		var currentType = currentItem['type'];
    	    		currentItem['icon'] = iconPath + currentType + '16.png';
    	    	}

                var rootNode = {
                		name: LanguageMessages["task"]["title"],
                		type: "root",
                		icon: iconPath + 'group16.png',
                		cls: 'rootNode',
                		expanded: false,
                		children: data["children"],
                		id: data["id"]
                };
                
                if(Ext.getCmp("taskTree")) {
                	Ext.getCmp("taskTree").destroy();
                }
                var tree = Ext.create('TDTM.view.main.TaskTree', {rootNode: rootNode});
                var treetab = Ext.getCmp("treeTabRegion");
                treetab.getActiveTab().removeAll();
                treetab.getActiveTab().add(tree);
                
                Utils.loadCalendar(project, null);
            },
            failure: function(response, opts) {

                Ext.MessageBox.show({
                    title: LanguageMessages["error"]["loadProject"]["title"],
                    msg: LanguageMessages["error"]["loadProject"]["msg"],
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    /** 
	 * Function triggered when user select a member
	 * 
	 * @param {Ext.form.field.ComboBox} combo
	 * 		member combobox
	 * @param {Array} records
	 * 		set of selected items
	 * 
	 */
    onSelectMember: function(combo, records, eOpts) {

    	var member = records[0];
    	var combobox = Ext.getCmp("projectSelect");
    	
    	var v = combobox.getValue();
    	var project = combobox.findRecord(combobox.valueField || combobox.displayField, v);
        Utils.loadCalendar(project, member);
    }
});