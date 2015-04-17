Ext.define('ProjectManagement.view.login', {
	 extend: 'Ext.window.Window', 
    alias: 'widget.login',
    autoShow: true, 
    closable :false,
    xtype: 'form',    
    title: 'P M Login',
    frame:true,
    width: 320,
    bodyPadding: 10,
     
    defaultType: 'textfield',
       
    items: [
		{
			xtype: 'image',
			fieldLabel: 'Image Here',
			src: 'velankani_logo.gif',
			width: 50,
			height: 50
			
		},
        {
            allowBlank: false,
            fieldLabel: 'User ID',
            name: 'user',
            emptyText: 'user id'
        },
        {
            allowBlank: false,
            fieldLabel: 'Password',
            name: 'pass',
            emptyText: 'password',
            inputType: 'password'
        }           
        
    ],
    
    buttons: [{
       text: 'Login',
       action: 'submit',
        formBind: true
        /*, listeners: {
            onClick: 'onLoginClick'
        }*/
    }]
    
});

