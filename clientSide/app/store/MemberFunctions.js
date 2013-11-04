/** 
 * Store for member's functions list<br/><br/>
 * 
 * It uses model {@link TDTM.model.MemberFunctions} <br/>
 * This store is used as local set of data.
 * 
 */
Ext.define('TDTM.store.MemberFunctions', {
    extend: 'Ext.data.Store',

    autoLoad: true,

	model: 'TDTM.model.MemberFunction',

    data: [
           {'name' : LanguageMessages["member"]["functions"]["leader"], 'value' : 'leader'},
           {'name' : LanguageMessages["member"]["functions"]["member"], 'value' : 'member'},
           {'name' : LanguageMessages["member"]["functions"]["volunteer"], 'value' : 'volunteer'}
    ]
});