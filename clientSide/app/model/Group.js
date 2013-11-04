/** 
 * Representation of a group.<br/>
 * 
 * It can be used for any widget which used group object.
 * 
 * @class TDTM.model.Group
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.Group', {
    extend: 'Ext.data.Model',

    autoDestroy: false,

    /**
     * @property {Array} fields
     * 		List of fields
     */
    fields: ['id', 'name', 'description', 'projectid', 'parentgroupid']
});