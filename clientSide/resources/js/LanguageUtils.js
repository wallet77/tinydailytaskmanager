/** 
 * Compilation of methods 
 * 
 * @class LanguageUtils
 * @singleton
 * 
 * @since 1.0.0
 * @author Vincent Vallet
 */
var LanguageUtils = {
    
        /**
         * Load appropriate language and launch interface
         * 
         */
        loadLanguage: function()
        {
            LanguageUtils.localize('');
        },

	    /**
		 * Switch interface language
		 * 
		 */
	    changeLanguage: function(language)
	    {
	    	window.location.href = '&language=' + language;
	    },

        /**
         * Determines which language to load
         * 
         * @param {Sring} language
         */
	    localize: function (language)
	    {
	        var languagePath = Globals["path"]["language"];
	    	// If a string is passed in parameter, let's load the file associated.
	    	if (typeof(language) === "string" && language)
	    	{
	    		Utils.loadScript(languagePath + "messages-"+language+".js", function(){
	    		    Utils.loadScript('clientSide/app.js', function(){
	    		        Utils.loadAllScripts();
	    		    });
	    		});
	    		return;
	    	}

	    	// Let's get the browser's language
	    	var l_lang;
	    	if (navigator.userLanguage) // Explorer
	    	{
	    		l_lang = navigator.userLanguage;
	    	}
	    	else if (navigator.language) // FF
	    	{
	    		l_lang = navigator.language;
	    	}
	    	else
	    	{
	    		l_lang = "";
	    	}

	    	// If the parameter passed is not a string or an array, 
	    	// or if no browser's language can be found, let's use default file.
	    	if (typeof(language) !== "object" || !l_lang)
	    	{
	    		Utils.loadScript(languagePath + "messages.js", function(){
                    Utils.loadScript('clientSide/app.js', function(){
                        Utils.loadAllScripts();
                    });
                });
	    		return;
	    	}
	     
	    	var browserLang = l_lang.substr(0,2);
	     
	    	// If the browser's language is available in the translation files
	    	// let's use that!
	    	for (var i=0; i<language.length; i++)
	    	{
	    		if (language[i] === browserLang)
	    		{
	    			Utils.loadScript(languagePath + "messages-" + browserLang + ".js", function(){
                        Utils.loadScript('clientSide/app.js', function(){
                            Utils.loadAllScripts();
                        });
                    });
	    			return;
	    		} 
	    	}
	     
	    	// If no language found, let's load the default language file:
	    	Utils.loadScript(languagePath + "messages.js", function(){
	    	    Utils.loadAllScripts();
	    	});
	    }
}