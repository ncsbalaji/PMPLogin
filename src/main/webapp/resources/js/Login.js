/**
 * 
 */

Ext.onReady(function(){
	Ext.QuickTips.init();

	// Create a variable to hold our EXT Form Panel.

	// Assign various config options as seen.
	var login = new Ext.FormPanel({
		labelWidth:80,
		url:'j_spring_security_check',
		frame:true,
		title:'Please Login',
        id:'login',
		defaultType:'textfield',
		width: 450,
		autoHeight: true,
		monitorValid:true,
		// Specific attributes for the text fields for username / password.
		// The "name" attribute defines the name of variables sent to the server.

		items:[
		       {
		    	   xtype: 'image',
					fieldLabel: 'Image Here',
					src: 'resources/velankani_logo.gif',
					width: 50,
					height: 50
		},{
			xtype: 'textfield',
			fieldLabel:'Username',
			name:'j_username',
			allowBlank:false
		},{
			xtype: 'textfield',
			fieldLabel:'Password',
			name:'j_password',
			inputType:'password',
			allowBlank:false,
			 listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	submit();
	                       
	                        }
	                }
	            }
		}],

		// All the magic happens after the user clicks the button
		buttons:[{

			text:'Login',
			formBind: true,
			// Function that fires when user clicks the button
			handler:function(){
				submit();
		
		}
		}],

	
	});

	login.render('login');
	
});

function submit(){
	var login = Ext.getCmp('login');
	login.getForm().submit({

		method:'POST', 

		// Functions that fire (success or failure) when the server responds.
		// The server would actually respond with valid JSON,
		// something like: response.write "{ success: true}" or

		// response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}"
		// depending on the logic contained within your server script.
		// If a success occurs, the user is notified with an alert messagebox,

		// and when they click "OK", they are redirected to whatever page
		// you define as redirect. 

		success:function(){
			window.location = 'main';
		},

	// Failure function, see comment above re: success and failure.
	// You can see here, if login fails, it throws a messagebox
	// at the user telling him / her as much.  


	failure:function(form, action){
		Ext.Msg.alert('Failed','Incorrect Credentials!');
		if(action.failureType == 'server'){
			obj = Ext.util.JSON.decode(action.response.responseText);

			Ext.Msg.alert('Login Failed!');
		}else{
			Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText);

		}
		login.getForm().reset();
	} 

	});
}