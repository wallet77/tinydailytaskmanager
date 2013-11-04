/** 
 * Representation of a project.<br/>
 * 
 * It can be used for any widget which used project object.
 * 
 * @class TDTM.model.Project
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.Project', {
    extend: 'Ext.data.Model',

    autoDestroy: false,

    /**
     * @property {Array} fields
     * 		List of fields
     */
    fields: [{name: 'id', type: 'string'}, 
             {name: 'name', type: 'string'}, 
             {name: 'starttime', type: 'date'}, 
             {name: 'endtime', type: 'date'},
             {name: 'description', type: 'string'}]
});