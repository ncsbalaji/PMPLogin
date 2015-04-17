Ext.define('ProjectManagement.store.UserStore', {
    extend: 'Ext.data.Store',
    model: 'ProjectManagement.model.UserModel',
    autoLoad: true,   
proxy: {  
    type: 'ajax',
    api: {
        read: 'data/users.json',
        update: 'data/updateUsers.json'
    },
    reader: {
        type: 'json',
        root: 'users',
        successProperty: 'success'
    }
}
});