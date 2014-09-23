Tiny Daily Task Manager installation guide
====================

Requirements
--------------------------------------

1. Install a web server like apache 2
2. Ensure your web server accepts GET, POST, PUT and DELETE request
3. Install a mysql database server


Installation
--------------------------------------

1. Download the source code
2. Extract source code in a folder (for example : [Path]/tinyDailyTaskManager)
3. Make sure your server is connected to this folder.<br/>
	<i>With easyPHP go to Administration > Add alias > Enter a name (example : tdtm) and the directory path ([Path]/tdtm)</i>
4. Configure REST base url.<br/>
		Open file [Path]/tinyDailyTaskManager/clientSide/config.js<br/>
		Edit the line Globals -> url -> server (for example : http://127.0.0.1/tinyDailyTaskManager/dispatch.php)<br/>
		<i>File dispatch.php in url is necessary for Tonic framework.</i>
5. Configure database connection.<br/>
	Open file [Path]/tinyDailyTaskManager/serverSide/storage/database/connect_info.php<br/>
	Edit database name, user, password and url.
6. Import sql structure from [Path]/tinyDailyTaskManager/tdtm.sql</i><br/>
	<i>With easyPHP go to Admisnistration > Mysql > open</i><br/>
	<i>Create a new database.</i><br/>
	<i>Go to your database > import > choose the tdtm.sql file.</i>
7. Test your installation at yourUrl/tinyDailyTaskManager/
