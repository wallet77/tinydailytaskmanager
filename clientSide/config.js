// disable request caching system
Ext.Ajax.disableCaching = false;

/**
 * Special headers for all ajax resquest
 * 
 * @return {Object} header information
 */
function getHeaders() {
	var username = Ext.util.Cookies.get("TDTM_username");
	var password = Ext.util.Cookies.get("TDTM_password");
	return {
		'Accept': '*/*', // important for firefox, if not it only consider response as xml format
		'Content-Type': 'application/json',
		'Authorization': 'Basic ' + Base64.encode(username + ':' + password)
	};
};


Globals = {
		"defaultLanguage": "en",
		"url": {
			"server": "http://127.0.0.1/tinyDailyTaskManager/dispatch.php"
		},
		"path": {
			"img": "./clientSide/resources/img/",
			"icon": "./clientSide/resources/img/icons/",
			"language": "clientSide/i18n/"
		},
		"date": {
			"fullDateFormat": "d/m/Y H:i:s"
		}
};

