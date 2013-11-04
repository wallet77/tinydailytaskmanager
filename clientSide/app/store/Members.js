/** 
 * Store for projects members list<br/><br/>
 * 
 * It uses model {@link TDTM.model.Members} <br/>
 * This store is connected to server side via a REST Api.
 * Its content is downloaded after interface has been loaded.
 */
Ext.define('TDTM.store.Members', {
    extend: 'Ext.data.Store',

    autoDestroy: false,

	model: 'TDTM.model.Member'
});