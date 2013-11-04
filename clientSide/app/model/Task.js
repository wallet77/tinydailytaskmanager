/** 
 * Representation of a task.<br/>
 * 
 * It can be used for any widget which used task object.
 * 
 * @class TDTM.model.Task
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.Task', {
    extend: 'Ext.data.Model',

    autoDestroy: false,

    /**
     * @property {Array} fields
     * 		List of fields
     */
    fields: ['id', 'name', 'starttime', 'endtime', 'description', 'projectid', 'parentgroupid']
});