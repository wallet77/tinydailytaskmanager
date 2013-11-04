/** 
 * Representation of a tree node <br />
 * Field 'type' help to determine node utility (folder, task ...)
 * 
 * @class TDTM.model.TreeNode
 * @extends Ext.data.Model
 * 
 * @since 1.0
 * @author vallet-v
 */
Ext.define('TDTM.model.TreeNode', {
    extend: 'Ext.data.Model',

    /**
     * @property {Array} fields
     * 		List of treeNode's fields
     */
    fields: [
             {name: 'id', type:'string'},
             {name: 'name', type:'string'},
             {name: 'type', type:'string'},
             {name: 'description', type:'string'},
             {name: 'starttime', type:'date'},
             {name: 'endtime', type:'date'},
             {name: 'members', type:'array'}
             ]
});