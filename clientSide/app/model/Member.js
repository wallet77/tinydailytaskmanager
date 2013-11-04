/** 
 * Representation of a member.<br/>
 * 
 * It can be used for any widget which used member object.
 * 
 * @class TDTM.model.Member
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.Member', {
    extend: 'Ext.data.Model',

    /**
     * @property {Array} fields
     * 		List of fields
     */
    fields: ['id', 'name', 'firstname', 'email', 'tel', 'function']
});