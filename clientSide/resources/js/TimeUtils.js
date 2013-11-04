/** 
 * Compilation of methods 
 * 
 * @class TimeUtils
 * @singleton
 * 
 * @since 1.0.0
 * @author Vincent Vallet
 */
var TimeUtils = {

	   /**
        * Function which converts a string date to timestamp
        * 
        * @param {String} strDate
        * 
        * @return {Number} converted timestamp
        */
        toTimestamp: function(strDate){
            var initialDate = strDate;
            var datum = Date.parse(initialDate);
            return datum/1000;
        },
        
        /**
         * Function which converts a server timestamp into a javascript timestamp
         * 
         * @param {Number} timestamp
         * 
         * @return {Number} converted timestamp
         */
         convertTimestamp: function(timestamp){
             return timestamp*1000;
         },
        
        /**
         * Bind time with date selected in the picker
         * 
         * @param {Date} dtpIssueDate
         * @param {Date} date
         */
        bindTimeWithDate: function(dtpIssueDate, date) {

            try {
                var currentTime = new Date();
                
                // Get a current hours and add with date.
                date.setHours(currentTime.getHours());
                
                // Get a current minutes and add with date.
                date.setMinutes(currentTime.getMinutes());
                
                // Get a current minutes and add with date.
                date.setSeconds(currentTime.getSeconds());

                var dtDateTimeValue = Ext.Date.format(date, Globals["date"]["fullDateFormat"]);

                dtpIssueDate.setValue(dtDateTimeValue);
            }
            catch (e) {
                console.log(e.message);
            }
        },

        /**
         * Converts a timestamp into a date
         * 
         * @param {Number} timestamp
         */
        getDateFromTimestamp: function(timestamp) {
            return Ext.Date.format(new Date(timestamp*1000), Globals["date"]["fullDateFormat"]);
        }
}