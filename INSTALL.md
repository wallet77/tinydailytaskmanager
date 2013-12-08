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
3. Make sure your server is connected to this folder.
	With easyPHP go to Administration > Add alias > Enter a name (example : tdtm) and the directory path ([Path]/tdtm)
4. Configure REST base url. Open file [Path]/tinyDailyTaskManager/clientSide/config.js and edit the line Globals -> url -> server (for example : http://127.0.0.1/tinyDailyTaskManager/dispatch.php)
	File dispatch.php in url is necessary for Tonic framework.
5. Configure database connection. Open file [Path]/tinyDailyTaskManager/serverSide/storage/database/connect_info.php and edit database name, user, password and url.
6. Import sql structure from [Path]/tinyDailyTaskManager/tdtm.sql
	With easyPHP go to Admisnistration > Mysql > open
	Create a new database.
	Go to your database > import > choose the tdtm.sql file.
7. Test your installation at yourUrl/tinyDailyTaskManager/