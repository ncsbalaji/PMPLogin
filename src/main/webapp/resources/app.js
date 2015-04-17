Ext.application({
	requires : [ 'Ext.container.Viewport', 
	             'ProjectManagement.view.login',
	             'ProjectManagement.view.MainPage' ],

	views : [ 'login',
	          'MainPage' ],
	controllers : [ 'loginController' ],
	
	name : 'ProjectManagement',
	

	appFolder : 'resources/app',
	launch : function() {
		Ext.getBody().setStyle('overflow', 'auto');
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
		
			xtype : 'panel',
			items : [ {
				xtype : 'panel',
				layout : 'vbox',
				items : [ {
							xtype : 'panel',
							width : 1360,						
							layout :'hbox',
						
							 items: [{
									xtype: 'image',
									id:'logoImage',
									fieldLabel: 'Image Here',
									src: 'resources/sub_logo.gif',
									margin : '0 1050 5 10',
									height : 50,
									renderTo: Ext.getBody(),
								/*	autoEl: {
							            tag: 'a',
							            href: 'mainpageImage',
							            target: '_blank'
							            //add any other attributes to the 'a' tag as needed
							        }*/
									listeners: {
									    el: {
									        click: function() {
										      Ext.getCmp('projectTaskDetailsId').layout.setActiveItem(0);
										      Ext.getCmp('tabpanel').setActiveTab(0);
									        }
									    },
							 
										 afterrender: function(c) {
								                Ext.create('Ext.tip.ToolTip', {
								                    target: c.getEl(),
								                    html: 'click for HomePage'
								                });
								            }
									}
									
								},
							         {
									xtype: 'displayfield',
							        fieldLabel:  'You are Logged in As',
							        name: 'home_score',
							        value :data,	                             
							        margin : '0 10 5 10',
							        height : 50
							    }, {
							    	
							    	xtype: 'button',
							    	text:'Log out',
							    	 margin : '5 0 5 20',
							    	 renderTo: Ext.getBody(),
							    	 tooltip : 'click here to LogOut',
							    	 handler: function() {
							    		 Ext.Msg.confirm('logout?', 'Are you sure you want to logout?', function(answer) {
							    		        if (answer === "yes") {
							    			
							    		//refreshes the page, erasing memory proxy
							    		window.location.href = "j_spring_security_logout";
							    		}});
							    	    }
							    }
								
								]
						},
						 {
							xtype : 'homePage',
							width : 1360,
							height : 500
							//title : 'Velankani Soft ware Pvt Ltd for homePage'
						},
				         {
					        xtype: 'text',
					        name: 'footerText',
					        text: '&#169; Copyright 2015-2016 Velankani Software Pvt Ltd.',//get user details and set here
					        margin : '25 5 0 535',
					        height : 20
					    }]

			}
			]
		});

	}
});
var data;
Ext.Ajax.request({
   	
       url: 'projects/logindetails/',
           
           //format: 'json',
   	       // headers: { 'Content-Type': 'application/json' },
       dataType: 'text',
     success : function(result) {
   	 data= result.responseText;
   	 console.log(data);
               }
   });