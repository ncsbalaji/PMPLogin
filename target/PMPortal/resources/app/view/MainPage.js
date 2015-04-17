var userId ;

Ext.define('ProjectManagement.view.MainPage', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.homePage',		
	id :'homePage',
	layout : 'border',
	requires :[''],
	defaults : {
		//bodyStyle : 'padding:15px;',
		
		height : 100,
		frame : true
	},
	items : [ {
			region : 'west',
			title : 'Project details',
			xtype : 'ProjectTree',
			width : 250,
			layout : 'fit'
	
			},
	        {
			region : 'center',		
			id : 'projectTaskDetailsId',
			layout: 'card',        
	         activeItem: 0,
	         items :[{
	        	 xtype :'tabpanel',
	        	  id:'tabpanel',
	        	 items :[{
	        		    title :'Welcome To PMP',
		     			xtype: 'image',
		    			fieldLabel: 'Image Here',
		    			src: 'resources/PMP_mainpage.png'	,
		    			id:'mainpageImage',
		    			activeItem: 0,
	        	 		},
	        	 		{
			        	 xtype : 'CustomerDetails',
			        	 title : 'Customer Details',
			        	 id:'customerDetails',
			        	 activeItem: 1,
			         }]
	        	}, {
	        	 xtype : 'ContentPanel',
	        	 //title : 'Project  Task Details',
	        	 id:'projectcurrentStatus'
	         },
	         {
	        	 xtype : 'LogisticsStatus',
	        	 title : 'Project  Logistics Status',
	        	 id:'projectLogisticsStatus'
	         },
	         {
	        	 xtype : 'UserRegistration',
	        	 title : 'User Registration Form',
	        	 id:'userRegisteration'
	         },
	         {
	        	 xtype : 'ProjectRegistration',
	        	 title : 'Project  Registration Form',
	        	 id:'projectRegistration'
	         },{
	        	 xtype : 'OverallStatus',
	        	 title : 'Overall Projects Status',
	        	 id:'overallProjectStatus'
	         }
	         ]
			
		}  ]

});



var projectTreeStore = Ext.create('Ext.data.TreeStore', {
	autoDestroy: true,
    autoLoad : true,
	root : {
		expanded : true
	},
	autoDestroy: true,
	proxy : {
		type:'ajax',//type : 'rest',
		url : 'projects/treeData/',
		/*format: 'json',
		headers: { 'Content-Type': 'application/json' },
        reader: {
            type: 'json',
            
                },
         writer: {
             type: 'json'
               }  */    
	}
});

Ext.define('ProjectManagement.view.ProjectTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.ProjectTree',
	id : 'tree-panel',
	title : 'Projects ',	
	// region : 'west',
	// split: true,
	height : 360,
	minSize : 150,
	rootVisible : false,
	store : projectTreeStore,
	dockedItems: [{
        xtype: 'toolbar',
        id : 'creatignProjectAndUser', 
        items: [{
            text: 'Create Project',
        }, {
            text: 'Create User',
        }]
    }]
	
});


Ext.define('ProjectManagement.view.MainPageModel', {
	extend : 'Ext.data.Model',
	 groupField: 'department',
	fields : [ 
	           {
	        	   name :'department',
	        	   type : 'string'
	           },{
					name : 'area',
					type : 'string'
				}, {
					name : 'rag',
					type : 'string'
				}, {
					name : 'status',
					type : 'string'
				} , {
					name : 'comment',
					type : 'string'
				}]
});

Ext.define('ProjectManagement.view.OverallStatusModel', {
	extend : 'Ext.data.Model',
	 groupField: 'projectName',
	fields : [ 
	           {
	        	   name :'projectName',
	        	   type : 'string'
	           },{
					name : 'risk',
					type : 'string'
				}, {
					name : 'overallRisk',
					type : 'string'
				}, {
					name : 'people',
					type : 'string'
				} , {
					name : 'schedule',
					type : 'string'
				}, {
					name : 'effort',
					type : 'string'
				} , {
					name : 'sla',
					type : 'string'
				}, {
					name : 'others',
					type : 'string'
				} , {
					name : 'financials',
					type : 'string'
				}, {
					name : 'staffing',
					type : 'string'
				}]
});

Ext.define('ProjectManagement.model.Customer', {
    extend: 'Ext.data.Model',
    fields: [
       {
	    name : 'clientId',
	    type : 'int'
       },
       {
		name : 'clientName',
		type : 'string'
	   }
	
	
	]
});

Ext.define('ProjectManagement.model.User', {
    extend: 'Ext.data.Model',
    fields: [
       {
	    name : 'userId',
	    type : 'int'
       },
       {
		name : 'userName',
		type : 'string'
	   }
	
	
	]
});




    var stateCombo = Ext.create('Ext.data.Store', {
        fields: ['value', 'name'],
        data: [{
            "value": "red",
            "name": "red"
        }, {
            "value": "green",
            "name": "green"
        }, 
        {
            "value": "yellow",
            "name": "yellow"
        }, {
            "value": "gray",
            "name": "gray"
        }]
    });


Ext.define('ProjectManagement.view.ContentPanel', {
	extend : 'Ext.grid.Panel',
	id : 'content-panel',
	alias : 'widget.ContentPanel',
	autoScroll: true,
    //draggable: true,
	requires: [
	             'Ext.selection.CellModel',
	             'Ext.grid.*',
	             'Ext.data.*',
	             'Ext.util.*',
	             'Ext.form.*'
	         ],
	         xtype: 'cell-editing',   
	         frame: true, 
	         dockedItems: [{
	             xtype: 'toolbar',
	             dock: 'top',
				             items: [{
				                 xtype: 'datefield',				                
				                 fieldLabel: 'From',
				                 name: 'from_date',
				                 id: 'from_date',
				                 itemId: 'from_date',
				                 format: 'd-m-Y',
				                 value: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +1)),
				                 //disabled :true,
				                 maxValue: new Date(),
				                 listeners: {
				                	 change: function (newValue, oldValue, eOpts ) {
				                         	//element: 'el', //bind to the underlying el property on the panel //Ext.Date.format(dt, 'Y-m-d')); 
				                       		
				                	   		var newdate = new Date(Ext.Date.format(Ext.getCmp('from_date').getValue(), 'Y,m,d'));
				                	   		var todate = new Date(new Date().setDate(newdate.getDate() - newdate.getDay() +7));
				                	   		
				                	   		//console.log("week number: "+Ext.Date.getWeekOfYear(newdate));
				                	   		
				                	   		todate.setFullYear(newdate.getFullYear());
				                	   		todate.setMonth(newdate.getMonth());
				                	   		
				                        	Ext.getCmp('to_date').setValue(todate); 
				                        	
				                        	var weekCount = Ext.Date.getWeekOfYear(newdate);
				                       	 		if(weekCount != Ext.Date.getWeekOfYear(new Date()) ){
				                       	 			Ext.getCmp('submitStatus').disable();
				                       	 			Ext.getCmp('copyLastWeakStatus').disable();
				                       	 		}else{
					                       	 		Ext.getCmp('submitStatus').enable();
					                       	 		Ext.getCmp('copyLastWeakStatus').enable();
				                       	 		}
				                    		}
					                     },// limited to the current date or prior
				             }, {
				                 xtype: 'datefield',				                
				                 fieldLabel: 'To',
				                 name: 'to_date',
				                 id :  'to_date',
				                 format: 'd-m-Y',
				                 disabled :true,
				                 value: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +7)) 
				             },/*{
			                	  xtype: 'button',
			                	  action: 'viewSelectedWeakStatus',	            	 
					              text: 'View selected week Status',
					              margin: '0 10 0 15'
					             },*/{
		                	  xtype: 'button',
		                	  action: 'copyLastWeakStatus',	 
		                	  id: 'copyLastWeakStatus',	 
				              text: 'Copy Last Status'/*,
				              margin: '0 10 0 15'*/
				             },
		                     {
				             xtype: 'button',
			            	 action: 'exportExcel',	            	 
			            	 text: 'Export Excel'/*,
			            	 margin: '0 10 0 15'*/
				             },
				             {
				            	 xtype: 'button',
				            	 action: 'submitStatus',
				            	 name: 'submitStatus',
				            	 id: 'submitStatus',
				            	 text: 'Submit Status'
				             } ,
				             {
				            	 xtype: 'hidden',
				            	 name: 'submitStatus',
				            	 id: 'hiddenProjectId',
				             } 
				             ]
	         }],
	         items :[{
	        	 xtype : 'panel',
	        	 title : 'sampel panel',
	         }],
	         initComponent: function() {
	             this.ContentPanel = new Ext.grid.plugin.CellEditing({
	                 clicksToEdit: 1
	             });	             
	             
	             Ext.apply(this, {
	                 width: 1010,	               
	                 plugins: [this.ContentPanel],
	                store: Ext.data.StoreManager.lookup('statusStore'),
	                viewConfig: { 
	                    stripeRows: false ,
	                    enableTextSelection: false,
	                    deferEmptyText: false,
	                    emptyText: 'No data available for selected week!! Please select valid week or Copy Last Status',
	                },
	                columns: [ 
	                          {
								text: 'Area',
			                    dataIndex: 'area',
			                    flex: 1,
			                    autoScroll: true,
			                }, {
			                	text: 'RAG',
			                    dataIndex: 'rag',
			                    id: 'status',
			                    flex: 1,
			                    autoScroll: true,
			                    renderer: function (value, meta, record) {
			                    	//Ext.Msg.alert(record.get('rag'));
			                        meta.css = record.get('rag');
			                        return value;
			                    },
			                    editor: new Ext.form.ComboBox({
			                    	store: stateCombo,
			                        itemId: 'stateCombo',
			                        id: 'stateCombo',
			                        queryMode: 'local',
			                       // displayField: 'name',
			                        valueField: 'value',
			                       			                        
			                       tpl: Ext.create('Ext.XTemplate', 
			                                '<tpl for=".">', 
			                                '<div class="x-boundlist-item" style="background-color: {value}">{name}</div>', 
			                                '</tpl>'),                                
			                        displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{name}', '</tpl>'),
			                    }),
			                  
		                },{
		                	text: 'Comments',
		                    dataIndex: 'comment',
		                    flex: 1,
		                    autoScroll: true,
	                        renderer: function(value, metaData, record) {
	                            if (!value) {
	                                return 'please enter comments';
	                            } else {
	                                return value;
	                            }
	                        },
		                    editor: new Ext.form.field.Text({
		                        allowBlank: false,
		                    })
		                }]	,
	                
	            });
	             this.callParent(arguments);
	         }
});

Ext.define('ProjectManagement.view.OverallStatus', {
	extend : 'Ext.grid.Panel',
	id : 'overall-status',
	alias : 'widget.OverallStatus',
	autoScroll: true,
	trackMouseOver: false,
    //draggable: true,
	requires: [
	             'Ext.selection.CellModel',
	             'Ext.grid.*',
	             'Ext.data.*',
	             'Ext.util.*',
	             'Ext.form.*'
	         ],
	         xtype: 'cell-editing',   
	         frame: true, 
	         dockedItems: [{
	             xtype: 'toolbar',
	             dock: 'top',
				             items: [
		                     {
				             xtype: 'button',
			            	 action: 'exportExcel',	            	 
			            	 text: 'Export Excel',
			            	 margin: '0 10 0 900'
				             },
				             ]
	         }],
	         items :[{
	        	 xtype : 'panel',
	        	 title : 'sampel panel',
	         }],
	         initComponent: function() {
	             this.OverallStatus = new Ext.grid.plugin.CellEditing({
	                 clicksToEdit: 1
	             });	             
	             
	             Ext.apply(this, {
	                 width: 1010,	               
	                 plugins: [this.OverallStatus],
	                store: Ext.data.StoreManager.lookup('overallStatusStore'),
	                viewConfig: { 
	                    stripeRows: false ,
	                    enableTextSelection: false,
	                    deferEmptyText: false,
	                    emptyText: 'No Projects available for selected Customer!! Please add Projects',
	                },
	                renderer: function (value, meta, record) {
                    	//Ext.Msg.alert(record.get('rag'));
                        meta.css = record.get('rag');
                        return value;
                    },
	                columns: [
								{
									text: 'Project Name',
								    dataIndex: 'projectName',
								    flex: 1,
								    autoScroll: true,
								},
	                          {
								text: 'RisK',
			                    dataIndex: 'risk',
			                    flex: 1,
			                    autoScroll: true,
			                    renderer: function (value, meta, record) {
			                    	//Ext.Msg.alert(record.get('rag'));
			                        meta.css = record.get('risk');
			                        return value;
			                    },
			                }, {
			                	text: 'OverallRisk',
			                	dataIndex: 'overallRisk',
			                    //id: 'status',
			                    flex: 1,
			                    autoScroll: true,
			                    renderer: function (value, meta, record) {
			                    	//Ext.Msg.alert(record.get('rag'));
			                        meta.css = record.get('overallRisk');
			                        return value;
			                    },
			                  
		                },{
		                	text: 'People',
		                    dataIndex: 'people',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('people');
		                        return value;
		                    },
		                },{
							text: 'Schedule',
							dataIndex: 'schedule',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('schedule');
		                        return value;
		                    },
		                },{
							text: 'Effort',
		                    dataIndex: 'effort',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('effort');
		                        return value;
		                    },
		                },{
							text: 'SLA',
							dataIndex: 'sla',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('sla');
		                        return value;
		                    },
		                },{
							text: 'Others(Specifics)',
		                    dataIndex: 'others',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('others');
		                        return value;
		                    },
		                },{
							text: 'Financials',
							dataIndex: 'financials',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('financials');
		                        return value;
		                    },
		                },{
							text: 'Staffing',
		                    dataIndex: 'staffing',
		                    flex: 1,
		                    autoScroll: true,
		                    renderer: function (value, meta, record) {
		                    	//Ext.Msg.alert(record.get('rag'));
		                        meta.css = record.get('staffing');
		                        return value;
		                    },
		                },]	,
	                
	            });
	             this.callParent(arguments);
	         }
});

Ext.define('ProjectManagement.view.LogisticsStatus', {
	extend : 'Ext.form.Panel',
	id : 'LogisticsStatus',
	alias : 'widget.LogisticsStatus',	

	        	    bodyPadding: 5,
	        	    width: 350,
	        	    layout: 'vbox',
	        	    items: [{
	  	                   xtype: 'hidden',  //should use the more standard hiddenfield
	  	                   name: 'projectId'

	  	                 },
	  	                 {
		  	                   xtype: 'hidden',  //should use the more standard hiddenfield
		  	                   name: 'projectMangerId',
		  	                   id:'projectMangerId'
                            
		  	             },
	  	                 
	  	                 {
	        	    	 xtype: 'textfield',
	        	        fieldLabel: 'Project Name',
	        	        name: 'projectName',
	        	        value : ' Project Management',
	        	        margin : '15 5 5 35',
	        	        editable : true,
	        	        allowBlank: false
	        	    },/*{
	        	    	 xtype: 'textfield',
	        	    	 value : ' Chetan',
	        	    	 fieldLabel: 'Project Manager',
	        	        name: 'projectManger',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },*/
                     {
        	        xtype : 'combo',
        	    	fieldLabel: 'Project Manager',
        	    	store:new Ext.data.Store({
	        	    	    // destroy the store if the grid is destroyed
	        	    	    //autoDestroy: true,
	        	    		
	        	    	    autoLoad : true,
	        	    	    model: ProjectManagement.model.User,
	        	    	    //fields: ['id', 'name'],
	        	    	    proxy: {
	        	    	        type: 'ajax',
	        	    	        // load remote data using HTTP
	        	    	        //pass to and from date as params here // Ext.getCmp('from_date').getValue()
	        	    	        url: 'projects/userdropdown/',	
	        	    	       // method: 'GET',
	        	    	        format: 'json',
	        	    	       // headers: { 'Content-Type': 'application/json' },
	        	    	        reader: {
	        	    	                  type: 'json'
	        	    	            //root: 'clients'
	        	    	                },
	        	    	        writer: {
	        	    	                 type: 'json'
	        	    	                } 
	        	    	           }
	        	    	            }),
    	    	    queryMode: 'local',
    	    	    displayField: 'userName',
    	    	    valueField: 'userName',
        	        name: 'projectManger',
        	 
        	        margin : '5 5 5 35',
        	        allowBlank: false,  
                    listeners:{
        	        select: function(ele, rec, idx){
        	        	/*var r = Ext.ModelManager.create({
               	        	userId : rec.data.userId,
               	        	userName: rec.data.userName
                            
                         }, 'ProjectManagement.model.User');*/

        	        userId = 	rec[0].data.userId;
        	        //Ext.Msg.alert('ok',userId);
        	        //this.up('form').findfield('myTextField').setValue(this.getValue());
        	        Ext.getCmp('projectMangerId').setValue(userId);
       	        	}
       	        	
       	        }
        	    },
	        	    {
	        	    	 xtype: 'textfield',
	        	    	 value : ' Client Ref NAme',
	        	    	 fieldLabel: 'SOW Ref',
	        	        name: 'sowRef',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },{
	        	    	 xtype: 'textfield',
	        	    	 value : ' Customer Poc Name',
	        	    	 fieldLabel: 'Customer PoC',
	        	        name: 'customerPocName',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	 xtype: 'textfield',
	        	    	 value : 'Project Details...Project Details..Project Details ',
	        	    	 fieldLabel: 'Project Details',
	        	        name: 'projectDetails',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	 xtype: 'textfield',
	        	    	 value : ' Java , Extjs, Spring hibernate, MySql',
	        	    	 fieldLabel: 'Technologies',
	        	        name: 'projectTechnologies',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
  	                     xtype: 'datefield',
  	                  	margin : '5 5 5 35',
  	                     fieldLabel: 'Start Date',
  	                     name: 'start_date',
  	                     format: 'd-m-Y',
  	                     value : new Date(),
  	                     maxValue: new Date()  // limited to the current date or prior
  	                 }, {
  	                     xtype: 'datefield',
  	                     margin : '5 5 5 35',
  	                     fieldLabel: 'End Date',
  	                     name: 'end_date', 
  	                   format: 'd-m-Y',
  	                     value: new Date()  // defaults to today
  	                 }],

	        	 
	        	    // Reset and Submit buttons
	        	    buttons: [{
	        	        text: 'Reset',
	        	        handler: function() {
	        	            this.up('form').getForm().reset();
	        	        }
	        	    }, {
	        	        text: 'Submit',
	        	        formBind: true, //only enabled once the form is valid
	        	        disabled: true,
	        	        handler: function() {
	        	            var form = this.up('form').getForm();
	        	            if (form.isValid()) {
	        	            	Ext.Ajax.request({
	        	            		url: 'projects/saveform',
	        	                    method: 'POST',
	        	                    headers: { 'Content-Type': 'application/json' },
	        	                    jsonData : Ext.JSON.encode(form.getValues()),
	        	                    success: function(response) {
	    					            console.log('SUCCESS!');
	    					        },
	    					        success :function(form, action) {
		        	                       Ext.Msg.alert('Success','Success');
	    					        },
	    				            failure : function(form, action) {
	        	                        Ext.Msg.alert('Failed', 'Failed');
	        	                        
	        	                    }
	        	                });
	        	               /* form.submit({
	        	                	method: 'POST',
	        	                	 headers: { 'Content-Type': 'application/json' },
	        	                	 jsonData : Ext.JSON.encode(form.getValues()),
	        	                    success: function(form, action) {
	        	                       Ext.Msg.alert('Success', action.result.msg);
	        	                    },
	        	                    failure: function(form, action) {
	        	                        Ext.Msg.alert('Failed', action.result.msg);
	        	                    }
	        	                });*/
	        	            }
	        	        }
	        	    }]
	       
});


/*var customerNamesStore =  new Ext.data.Store({
    // destroy the store if the grid is destroyed
    //autoDestroy: true,
	
    autoLoad : true,
    model: ProjectManagement.model.Customer,
    //fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        // load remote data using HTTP
        //pass to and from date as params here // Ext.getCmp('from_date').getValue()
        url: 'projects/clientdropdown/',	
       // method: 'GET',
        format: 'json',
        headers: { 'Content-Type': 'application/json' },
        reader: {
            type: 'json'
            	
                },
                writer: {
                    type: 'json'
                      } 
    }
            });*/

/*Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    data : [
        {"id":"1", "name":"Cisco"},
        {"id":"2", "name":"Infinera"},
        {"id":"3", "name":"Airvana"}
      
    ]
});*/


var pmNamesStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
        {"value":"Rekha", "name":"Rekha"},
        {"value":"Mary", "name":"Mary"},
        {"value":"Venkatesh Murthy", "name":"Venkatesh Murthy"}
        //...
    ]
});

var  userDesignationStore  = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
        {"value":"Project Manger", "name":"Project Manger"},
        {"value":"Technical Manger", "name":"Technical Manger"},
        {"value":"Sr Technical Manger", "name":"Sr Technical Manger"}
        
    ]
});



Ext.define('ProjectManagement.view.UserRegistration', {
	extend : 'Ext.form.Panel',
	
	 initComponent: function() {
	      this.on('beforeadd', function(me, field){
	        if (!field.allowBlank)
	          field.labelSeparator += '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';
	      });
	      this.callParent(arguments);
	    },
	//id : 'UserRegistration',
	alias : 'widget.UserRegistration',	

	        	    bodyPadding: 5,
	        	    width: 350,

	        	    // The form will submit an AJAX request to this URL when submitted
	        	    url: 'projects/userRegistration/',
	        	    contentType : 'application/json; charset=utf-8',
	        	    dataType : 'json',
	        	    layout: 'vbox',
	        	
	        	    
	        	    items: [{
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	        fieldLabel: 'User Name',
	        	        labelStyle: 'width:110px',
	        	        name: 'userName',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	xtype : 'combo',
	        	    	//width:300,
	        	    	fieldLabel: 'User Designation',
	        	    	//width:290,
	        	    	labelStyle: 'width:108px',
	        	    	store: userDesignationStore,
        	    	    queryMode: 'local',
        	    	    displayField: 'name',
        	    	    valueField: 'value',
	        	        name: 'userDesignation',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },{
	        	    	xtype : 'combo',
	        	    	//width:300,
	        	    	labelStyle: 'width:108px',
	        	    	//width:297,
	        	    	fieldLabel: 'Reporting To',
	        	    	store:new Ext.data.Store({
   	        	    	    // destroy the store if the grid is destroyed
   	        	    	    //autoDestroy: true,
   	        	    		
   	        	    	    autoLoad : true,
   	        	    	    model: ProjectManagement.model.User,
   	        	    	    //fields: ['id', 'name'],
   	        	    	    proxy: {
   	        	    	        type: 'ajax',
   	        	    	        // load remote data using HTTP
   	        	    	        //pass to and from date as params here // Ext.getCmp('from_date').getValue()
   	        	    	        url: 'projects/userdropdown/',	
   	        	    	       // method: 'GET',
   	        	    	        format: 'json',
   	        	    	       // headers: { 'Content-Type': 'application/json' },
   	        	    	        reader: {
   	        	    	            type: 'json'
   	        	    	            //root: 'clients'
   	        	    	                },
   	        	    	                writer: {
   	        	    	                    type: 'json'
   	        	    	                      } 
   	        	    	    }
   	        	    	            }),
        	    	    queryMode: 'local',
        	    	    displayField: 'userName',
        	    	    //valueField: 'userId',
	        	        name: 'ReportingTo',	        	 
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	    	labelStyle: 'width:110px',
	        	    	fieldLabel: 'Other Details',
	        	        name: 'otherDetails',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	xtype : 'textareafield',
	        	    	//width:300,
	        	    	labelStyle: 'width:110px',
	        	    	fieldLabel: 'Technologies ',
	        	        name: 'technologies',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },{
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	    	labelStyle: 'width:110px',
	        	        fieldLabel: 'Other Details 1',
	        	        name: 'otherDetails1',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	       	fieldLabel: 'Other Details2',
	        	       	// width:310,
	        	       	labelStyle: 'width:110px',
	        	    	 xtype     : 'textareafield',
	        	         grow      : true,
	        	         maxLength : 200,
	        	         name      : 'otherDetails2',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
 	                     xtype: 'text', 
 	                    width:300,
 	                     text:'*Marked fields are mandatory',
 	                     margin : '5 5 5 35',
 	                    styleSelector: '.redcolored',
 	                    //fieldStyle : "color:red;",
 	                    //style : {color:'#3E546B'},
 	                    
 	                 }],

	        	 
	        	    buttons: [{
	        	        text: 'Reset',
	        	        handler: function() {
	        	            this.up('form').getForm().reset();
	        	        }
	        	    }, {
	        	        text: 'Submit Details User',
	        	        formBind: true, //only enabled once the form is valid
	        	        disabled: true,
	        	        handler: function() {
	        	            var form = this.up('form').getForm();
	        	            if (form.isValid()) {
	        	                form.submit({
	        	                    success: function(form, action) {
	        	                       Ext.Msg.alert('Success', action.response.statusText);
	        	                       Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	        	                      // Ext.getCmp('projectTaskDetailsId').layout.setActiveItem( form.getValues().projectName);
	        	                  
	        	                    },
	        	                    failure: function(form, action) {
	        	                        Ext.Msg.alert('Failed', action.response.statusText);
	        	                        Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	        	                    }
	        	                });
	        	            }
	        	        }
	        	    }]
	       
});

Ext.define('ProjectManagement.view.ProjectRegistration', {
	extend : 'Ext.form.Panel',
	id : 'ProjectRegistration',
	 extend: 'Ext.form.Panel',
	    initComponent: function() {
	      this.on('beforeadd', function(me, field){
	        if (!field.allowBlank)
	          field.labelSeparator += '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';
	      });
	      this.callParent(arguments);
	    },
	alias : 'widget.ProjectRegistration',	

	        	    bodyPadding: 5,
	        	    width: 1000,	        	  
	        	   // url: 'projects/create/',	
	        	     //method: 'POST',
	        	    layout: 'vbox', 
	        	    items: [{
	        	    	xtype : 'textfield',
	        	        fieldLabel: 'Project Name',
	        	        //width:300,
	        	        labelStyle: 'width:110px',
	        	        name: 'projectName',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false,
	        	        emptyText : 'please enter project name',
	        	    },
	        	    {
	        	    	xtype : 'combo',
	        	    	fieldLabel: 'Customer Name',
	        	    	//width:300,
	        	    	
	        	    	labelStyle: 'width:108px',
	        	         //matchFieldWidth: false,
	        	    	/*listconfig:{
	        	    		width:192
	        	    	},*/
	        	    	autoWidth:true,
	        	        //labelwidth:150,
	        	    	 store: new Ext.data.Store({
	   	        	    	    // destroy the store if the grid is destroyed
	   	        	    	    //autoDestroy: true,
	   	        	    		
	   	        	    	    autoLoad : true,
	   	        	    	    model: ProjectManagement.model.Customer,
	   	        	    	    //fields: ['id', 'name'],
	   	        	    	    proxy: {
	   	        	    	        type: 'ajax',
	   	        	    	        // load remote data using HTTP
	   	        	    	        //pass to and from date as params here // Ext.getCmp('from_date').getValue()
	   	        	    	        url: 'projects/clientdropdown/',	
	   	        	    	       // method: 'GET',
	   	        	    	        format: 'json',
	   	        	    	       // headers: { 'Content-Type': 'application/json' },
	   	        	    	        reader: {
	   	        	    	            type: 'json'
	   	        	    	            //root: 'clients'
	   	        	    	                },
	   	        	    	                writer: {
	   	        	    	                    type: 'json'
	   	        	    	                      } 
	   	        	    	    }
	   	        	    	            }),
	        	    	          
        	    	    queryMode: 'local',
        	    	    displayField: 'clientName',
        	    	    valueField: 'clientId',
	        	        name: 'client_Project_Id',
	        	        margin : '5 0 5 35',
	        	        allowBlank: false
	        	    },{
	        	    	xtype : 'combo',
	        	    	fieldLabel: 'Project Manager',
	        	    	//width:300,
	        	    	labelStyle: 'width:108px',
	        	    	store:new Ext.data.Store({
   	        	    	    // destroy the store if the grid is destroyed
   	        	    	    //autoDestroy: true,
   	        	    		
   	        	    	    autoLoad : true,
   	        	    	    model: ProjectManagement.model.User,
   	        	    	    //fields: ['id', 'name'],
   	        	    	    proxy: {
   	        	    	        type: 'ajax',
   	        	    	        // load remote data using HTTP
   	        	    	        url: 'projects/userdropdown/',	
   	        	    	       // method: 'GET',
   	        	    	        format: 'json',
   	        	    	       // headers: { 'Content-Type': 'application/json' },
   	        	    	        reader: {
   	        	    	            type: 'json'
   	        	    	            //root: 'clients'
   	        	    	                },
   	        	    	                writer: {
   	        	    	                    type: 'json'
   	        	    	                      } 
   	        	    	    }
   	        	    	            }),
        	    	    queryMode: 'local',
        	    	    displayField: 'userName',
        	    	    valueField: 'userId',
	        	        name: 'user_Project_Id',
	        	 
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	    	labelStyle: 'width:110px',
	        	    	fieldLabel: 'SOW Ref',
	        	        name: 'sowRef',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },{
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	    	labelStyle: 'width:110px',
	        	        fieldLabel: 'Customer PoC',
	        	        name: 'customerPOC',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	       	fieldLabel: 'Project Details',
	        	       	//width:300,
	        	    	 xtype     : 'textareafield',
	        	    	 labelStyle: 'width:110px',
	        	    	//width:297,
	        	         grow      : true,
	        	         maxLength : 200,
	        	         name      : 'projectDetails',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
	        	    	xtype : 'textfield',
	        	    	//width:300,
	        	    	fieldLabel: 'Technologies',
	        	    	labelStyle: 'width:110px',
	        	        name: 'technologies',
	        	        margin : '5 5 5 35',
	        	        allowBlank: false
	        	    },
	        	    {
  	                     xtype: 'datefield',
  	                    //width:300,
  	                    labelStyle: 'width:110px',
  	                   //width:297,
  	                    margin : '5 5 5 35',
  	                     fieldLabel: 'Start Date',
  	                     name: 'startDate',
  	                   allowBlank: false,
  	                     maxValue: new Date()  // limited to the current date or prior
  	                 }, {
  	                     xtype: 'datefield',
  	                    // width:300,
  	                     margin : '5 5 5 35',
  	                     //width:297,
  	                     labelStyle: 'width:110px',
  	                     fieldLabel: 'End Date',
  	                     name: 'endDate',
  	                     allowBlank: false,
  	                     value: new Date()  // defaults to today
  	                 },{
	  	                   xtype: 'hidden',  //should use the more standard hiddenfield
	  	                   name: 'dummyWeakCount',
	  	                   value: Ext.Date.getWeekOfYear(new Date()),

	  	             },{
	  	                	 
  	                     xtype: 'text',
  	                     margin : '5 5 5 35',
  	                     text:'*Marked fields are mandatory',
  	                     styleSelector: '.redcolored',
  	                 }],

	        	 
	        	    // Reset and Submit buttons
	        	    buttons: [{
	        	        text: 'Reset',
	        	        handler: function() {
	        	            this.up('form').getForm().reset();
	        	        }
	        	    }, {
	        	        text: 'Submit Project Details',
	        	        formBind: true, //only enabled once the form is valid
	        	        disabled: true,
	        	        handler: function() {
	        	            var form = this.up('form').getForm();
	        	            if (form.isValid()) {
	        	            	
	        	            	Ext.Ajax.request({
	        	            		url: 'projects/create',
	        	                    method: 'POST',
	        	                    headers: { 'Content-Type': 'application/json' },
	        	                    jsonData : Ext.JSON.encode(form.getValues()),
	        	                    success: function(response) {
	    					            console.log('SUCCESS!'+response.statusText);
	    					            Ext.Msg.alert('Success', response.statusText);
	    					            Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	    					        },
	    				            failure: function(response) {
	        	                        Ext.Msg.alert('Failed', response.statusText);
	        	                        Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	        	                    }
	        	                });
	        	                /*form.submit({
	        	                    success: function(form, action) {
	        	                       Ext.Msg.alert('Success', action.response.statusText);
	        	                       Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	        	                      // window.location.reload();
	        	                      // Ext.getCmp('projectTaskDetailsId').layout.setActiveItem( form.getValues().projectName);
	        	                  
	        	                    },
	        	                    failure: function(form, action) {
	        	                        Ext.Msg.alert('Failed', action.response.statusText);
	        	                        Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
	        	                    }
	        	                });*/
	        	            	Ext.getCmp('tree-panel').getStore().load();
	        	            }
	        	        }
	        	    }]
       
});

