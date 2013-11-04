/** 
 * Store for projects combobox<br/><br/>
 * 
 * It uses model {@link TDTM.model.Projects} <br/>
 * This store is connected to server side via a REST Api.
 * Its content is downloaded after interface has been loaded.
 */
Ext.define('TDTM.store.Projects', {
    extend: 'Ext.data.Store',

	model: 'TDTM.model.Project'
});