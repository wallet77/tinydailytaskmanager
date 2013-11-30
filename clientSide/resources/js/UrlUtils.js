/**
 * Compilation of methods 
 * 
 * @class UrlUtils
 * @singleton
 * 
 * @since 1.0.0
 * @author Vincent Vallet
 */
var UrlUtils = {

    /**
     * Return the url value corresponding to the given param name
     * 
     * @param {String} param
     * @return {String} value
     *      return param's value if it exits, otherwise return null
     */
	getUrlParam : function(param) {
	    var SearchString = window.location.search.substring(1);
	    var VariableArray = SearchString.split('&');
	    for(var i = 0; i < VariableArray.length; i++){
	        var KeyValuePair = VariableArray[i].split('=');
	        if(KeyValuePair[0] == param){
	            return KeyValuePair[1];
	        }
	    }
	    
	    return null;
	}

}