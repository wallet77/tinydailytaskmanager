/** 
 * Compilation of methods 
 * 
 * @class Utils
 * @singleton
 * 
 * @since 1.0.0
 * @author Vincent Vallet
 */
var Utils = {

	    /**
         * Method which load a script asynchronously
         * 
         * @param {String} url 
         * @param {Function} callback
         */
	    loadScript: function(url, callback)
        {
            var s,
                r,
                t;

            r = false;
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = url;

            s.onload = s.onreadystatechange = function() {

                if ( !r && (!this.readyState || this.readyState == 'complete') )
                {
                    r = true;
                    if(typeof callback === "function") {
                        callback();
                    }
                }
            };

            var head = document.getElementsByTagName('head')[0];
            t = document.getElementsByTagName('script')[0];
            head.insertBefore(s, t);
        },

        /**
         * Asynchronously load scripts 
         */
        loadAllScripts: function() {
            Utils.loadScript('clientSide/resources/js/TimeUtils.js');
            Utils.loadScript('clientSide/resources/js/lib/jquery/jquery-1.10.2.min.js', function() {
                Utils.loadScript('clientSide/resources/js/lib/jquery/jquery-ui-1.10.3.min.js', function() {
                    Utils.loadScript('clientSide/resources/js/lib/fullCalendar/fullcalendar.min.js');
                });
            });
            
        },

	    /**
		 * Show interface after login.
		 * This function show trees, tabs and fill the toolbar.
		 * 
		 */
	    loadInterface: function() {
	    	// show main tab information
            var calendarRegion = Ext.getCmp('calendarRegion');
           // calendarRegion.add();
            calendarRegion.setVisible(true);
            // show tasks tree
            Ext.getCmp('treeTabRegion').setVisible(true);

            var languagesMenu = {
                id: 'buttonLanguage',
                icon: Globals["path"]["icon"] + 'lang/lang.png',
                text: LanguageMessages["language"]["title"],
                menu: [{
                    icon: Globals["path"]["icon"] + 'lang/fr.png',
                    text: LanguageMessages["language"]["fr"],
                    value: "fr"
                },{
                    icon: Globals["path"]["icon"] + 'lang/en.png',
                    text: LanguageMessages["language"]["en"],
                    value: "en"
                }]
            };

            // sliding menu
            var menu = Ext.create('Ext.menu.Menu', {
                id: 'mainMenu',
                style: {
                    overflow: 'visible',
                },
                items: [{
                	id: 'buttonAdministration',
                	icon: Globals["path"]["icon"] + 'admin.png',
                	text: LanguageMessages["administration"],
            	},
            	languagesMenu,
            	{
                	id: 'buttonLogout',
                	icon: Globals["path"]["icon"] + 'logout.png',
                	text: LanguageMessages["login"]["logout"],
            	}]
            });
            
            var projectSelect = Ext.create('Ext.form.field.ComboBox', {
                    id: 'projectSelect',
                    style: {"margin-right": "50px"}, 
    				fieldLabel: LanguageMessages["field"]["project"],
    				name: 'projects',
    				multipleSelect: false,
    				queryMode: 'local',
    				displayField: 'name',
    				valueField: 'id',
    				store: Ext.create('TDTM.store.Projects')
    		});

            var memberSelect = Ext.create('Ext.form.field.ComboBox', {
                id: 'memberSelect',
				fieldLabel: LanguageMessages["field"]["member"],
				name: 'members',
				multipleSelect: false,
				queryMode: 'local',
				displayField: 'name',
				valueField: 'id',
				store: Ext.create('TDTM.store.Members'),
				listConfig: {
    
                    // Custom rendering template for each item
                    getInnerTpl: function() {
                        return '<div class="x-combo-list-item"><tpl if="id != \'all\'"> {firstname} {name} ({email})<tpl else>' + LanguageMessages["field"]["allMember"] + '</tpl></div>' +
                            '{excerpt}';
                    }
                }
            });

            var accountMenu = Ext.create('Ext.Button', {
            	cls : 'account',
            	menu: menu,
            });

            var infoLogin =  Ext.create('Ext.Panel', {
            	border: false,
            	// html: "<span>" + LanguageMessages["hello"] + " <b>" + Ext.util.Cookies.get("tdtm_username") + "</b></span>",
            	html: "<span>" + LanguageMessages["hello"] + "</span>",
            	items: [accountMenu],
            });


            // change toolbar
            var toolbar = Ext.getCmp('mainToolbarRegion');
            toolbar.removeAll();
            toolbar.add(projectSelect);
            toolbar.add(memberSelect);
            toolbar.add({xtype: 'container', flex: 1});
            toolbar.add(infoLogin);

            Ext.Ajax.request({
                url: Globals["url"]["server"] + '/projects',
                method: 'GET',

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    projectSelect.getStore().loadData(data);

                    Ext.Ajax.request({
                        url: Globals["url"]["server"] + '/members',
                        method: 'GET',

                        success: function(response, opts) {
                            var dataMembers = Ext.decode(response.responseText);
                            dataMembers.unshift({"id": "all"});
                            memberSelect.getStore().loadData(dataMembers);
                        },
                        failure: function(response, opts) {
        
                            Ext.MessageBox.show({
                                title: LanguageMessages["error"]["loadMember"]["title"],
                                msg: LanguageMessages["error"]["loadMember"]["msg"],
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                    
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
         * Method which load administration interface
         */
        loadAdministration: function() {

            var region = Ext.getCmp('calendarRegion');
            var buttonProject = Ext.create('Ext.Button', {
                id: 'buttonProject',
                cls : 'project',
                tooltip: LanguageMessages["tooltip"]["buttonProject"]
            });
            var buttonMember = Ext.create('Ext.Button', {
                id: 'buttonMember',
                cls : 'member',
                tooltip: LanguageMessages["tooltip"]["buttonMember"]
            });

            Utils.clearCenterRegion();
            region.add(buttonProject);
            region.add(buttonMember);
        },
        
         /**
         * Method which load administration interface to manage projects.
         * It will insert grid of projects in order to add / edit / delete member.
         */
        loadProjectInterface: function() {
            var region = Ext.getCmp('calendarRegion');
            var grid = Ext.create('TDTM.view.grid.GridProject');

            Utils.clearCenterRegion();
            region.add(grid);

            Ext.Ajax.request({
                url: Globals["url"]["server"] + '/projects',
                method: 'GET',

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    grid.getStore().loadData(data);
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
         * Method which load administration interface to manage members.
         * It will insert grid of members in order to add / edit / delete member.
         */
        loadMemberInterface: function() {
            var region = Ext.getCmp('calendarRegion');
            var grid = Ext.create('TDTM.view.grid.GridMember');
            Utils.clearCenterRegion();
            region.add(grid);

            Ext.Ajax.request({
                url: Globals["url"]["server"] + '/members',
                method: 'GET',

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    grid.getStore().loadData(data);
                },
                failure: function(response, opts) {

                    Ext.MessageBox.show({
                        title: LanguageMessages["error"]["loadMember"]["title"],
                        msg: LanguageMessages["error"]["loadMember"]["msg"],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        },

        /**
         * Method which adds a new project in project grid
         *  
         * @param {Object} project
         *      json structure representing a project returned by server side
         */
        addProjectInGrid: function(project) {

            var grid = Ext.getCmp('calendarRegion').query("gridProject")[0];

            project["starttime"] = TimeUtils.getDateFromTimestamp(project["starttime"]);
            project["endtime"] = TimeUtils.getDateFromTimestamp(project["endtime"]);

            var r = Ext.create('TDTM.model.Project', project);

            // save the new member
            grid.getStore().insert(0, r);
        },
        
        /**
         * Method which updates a project in project grid
         *  
         * @param {TDTM.model.Project} project
         *      record representing a project
         */
        updateProjectInGrid: function(project,data) {

            var grid = Ext.getCmp('calendarRegion').query("gridProject")[0];
            var store = grid.getStore();
            var projectRecord = store.getById(project.get("id"));

            data["starttime"] = TimeUtils.getDateFromTimestamp(data["starttime"]);
            data["endtime"] = TimeUtils.getDateFromTimestamp(data["endtime"]);

            projectRecord.set(data);

            // remove record and add it again
            // if record is updated (and grid is refreshed) column endtime isn't display properly
            store.remove(projectRecord);
            store.insert(0, projectRecord);
        },
        
        /**
         * Method which adds a new member in members grid
         *  
         * @param {TDTM.view.window.WindowMember} windowForm
         */
        addMemberInGrid: function(windowForm) {

            var grid = Ext.getCmp('calendarRegion').query("gridMember")[0];
            var name = windowForm.query('textfield[name="name"]')[0].getValue();
            var firstname = windowForm.query('textfield[name="firstname"]')[0].getValue();
            var tel = windowForm.query('textfield[name="tel"]')[0].getValue();
            var email = windowForm.query('textfield[name="email"]')[0].getValue();
            var functionMember = windowForm.query('textfield[name="function"]')[0].getValue();

            var r = Ext.create('TDTM.model.Member', {
                "name": name,
                "firstname": firstname,
                "tel": tel,
                "email": email,
                "function": functionMember                
            });

            // save the new member
            grid.getStore().insert(0, r);
        },
        
        /**
         * Method which updates a member in members grid
         *  
         * @param {TDTM.model.Member} member
         * @param {Object} data
         */
        updateMemberInGrid: function(member, data) {

            var grid = Ext.getCmp('calendarRegion').query("gridMember")[0];
            var store = grid.getStore();
            var memberRecord = store.getById(member.get("id"));

            memberRecord.set(data);

            // remove record and add it again
            // if record is updated (and grid is refreshed) column endtime isn't display properly
            store.remove(memberRecord);
            store.insert(0, memberRecord);
        },
        
        /**
         * Method which adds a new group in tasks tree
         *  
         * @param {TDTM.model.Group} group
         */
        addGroupInTree: function(group) {

            var node = Ext.create('TDTM.model.TreeNode',{
                    id:     group['id'],
                    name:   group['name'],
                    description:   group['description'],
                    leaf:   false,
                    type:   'group',
                    icon:   Globals["path"]["icon"] + '/group16.png'
             });

            Utils.addElementInTreeStore(group['parentgroupid'], node);
        },

        /**
         * Method which adds a new task in tasks tree
         *  
         * @param {Object} task
         */
        addTaskInTree: function(task) {

            var node = Ext.create('TDTM.model.TreeNode',{
                    id:     task['id'],
                    name:   task['name'],
                    description:    task['description'],
                    starttime:      new Date(task['starttime']),
                    endtime:        new Date(task['endtime']),
                    leaf:   true,
                    type:   'task',
                    icon:   Globals["path"]["icon"] + '/task16.png'
             });
            Utils.addElementInTreeStore(task['parentgroupid'], node);
            
        },

        /**
         * Method which updates a node in tasks tree
         *  
         * @param {Object} data
         */
        updateNodeInTree: function(data) {

            Utils.updateElementInTreeStore({
                    id:             data['id'],
                    name:           data['name'],
                    description:    data['description'],
                    starttime:      TimeUtils.convertTimestamp(data['starttime']),
                    endtime:        TimeUtils.convertTimestamp(data['endtime']),
                    members:        data['members']
             });
        },
        
        /**
         * Add a node in task tree
         * 
         * @param {String} parentId
         *      id of parent node 
         * @param {Object} element
         */
        addElementInTreeStore: function(parentId, element) {
            var store = Ext.getCmp("taskTree").getStore();
            var node = store.getNodeById(parentId);

            // if node exists in store (expanded at least one time)
            if(node) {
                node.appendChild(element.raw);
            }
        },

        /**
         * Update a node in task tree
         * 
         * @param {TDTM.model.TreeNode} node
         */
        updateElementInTreeStore: function(data) {
            var store = Ext.getCmp("taskTree").getStore();
            var treeNode = store.getNodeById(data['id']);

            // if node exists in store (expanded at least one time)
            if(treeNode) {
                for (var key in data) {
                   treeNode.set(key, data[key]);
                   treeNode.raw[key] = data[key];
                }
               // treeNode.commit();
            }
        },

        /**
         * Method which delete a task
         *  
         * @param {TDTM.model.Task} task
         */
        deleteTask: function(task) {

            Ext.Ajax.request({
                url: Globals["url"]["server"] + '/task/' + task.raw.id,
                method: 'DELETE',

                success: function(response, opts) {
                    Utils.deleteTreeNode(task.raw.id);
                },
                failure: function(response, opts) {

                    Ext.MessageBox.show({
                        title: LanguageMessages["error"]["deleteTask"]["title"],
                        msg: LanguageMessages["error"]["deleteTask"]["msg"],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        },

         /**
         * Method which delete a group
         *  
         * @param {TDTM.model.Group} group
         */
        deleteGroup: function(group) {

            Ext.Ajax.request({
                url: Globals["url"]["server"] + '/group/' + group.raw.id,
                method: 'DELETE',

                success: function(response, opts) {
                    Utils.deleteTreeNode(group.raw.id);
                },
                failure: function(response, opts) {

                    Ext.MessageBox.show({
                        title: LanguageMessages["error"]["deleteGroup"]["title"],
                        msg: LanguageMessages["error"]["deleteGroup"]["msg"],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        },
        
        /**
         * Delete an element, defined by it's id, in task tree 
         */
        deleteTreeNode: function(id) {
            var store = Ext.getCmp("taskTree").getStore();
            var node = store.getNodeById(id);

            // if node exists in store (expanded at least one time)
            if(node) {
                node.parentNode.removeChild(node);
            }
        },
        
        /**
         * Clear all html elements and Ext components in center region.
         * Because of jQuery calendar we need to clear all html elements in innerCt
         * of main div. 
         */
        clearCenterRegion: function() {
            // remove all ext component
            var region = Ext.getCmp('calendarRegion');
            region.removeAll();
            // clean calendar div
            $('#calendarRegion-innerCt').empty();
        },

        /**
         * Loads the main calendar according to project selected.
         * 
         * @param {TDTM.model.Project} project
         * @param {TDTM.model.Member} member
         */
        loadCalendar: function(project, member) {
            var projectId = project.get("id");
            var url = Globals["url"]["server"] + '/project/' + projectId + '/tasks';

            // if we have a valid member
            if(member && member.get("id") !== "all") {
                url = Globals["url"]["server"] + '/project/' + projectId + '/member/' + member.get("id") + '/tasks';
            }

            Ext.Ajax.request({
                url: url,
                method: 'GET',

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    
                    var allTasks = [];
                    for (index in data){
                        var task = data[index];
                        var convertedTask = {
                            id: task["id"],
                            title: task["name"],
                            start: new Date(task["starttime"]),
                            end: new Date(task["endtime"]),
                            allDay: false
                        }
                        allTasks[index] = convertedTask;
                    }

                    Utils.clearCenterRegion();

                    // create a new calendar
                    $('#calendarRegion-innerCt').fullCalendar({
                        contentHeight: 1200,
                        theme: true,
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        editable: false,
                        events: allTasks
                    });
                    
                },
                failure: function(response, opts) {

                    Ext.MessageBox.show({
                        title: LanguageMessages["error"]["loadTask"]["title"],
                        msg: LanguageMessages["error"]["loadTask"]["msg"],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
}