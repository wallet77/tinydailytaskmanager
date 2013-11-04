/** 
 * Representation of a member's function.<br/>
 * 
 * @class TDTM.model.MemberFunction
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.MemberFunction', {
    extend: 'Ext.data.Model',

    /**
     * @property {Array} fields
     * 		List of fields
     */
    fields: ['name', 'value']
});