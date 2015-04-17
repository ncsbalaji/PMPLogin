Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../ux');

    Ext.define('ProjectManagement.view.CustomerDetailsModel', {
        extend: 'Ext.data.Model',
        fields: [
           { name :'customerId',
	         type : 'int'},
           { name :'customerName',
        	 type : 'string'},
           { name: 'customerPOC',
             type : 'string'},
           { name: 'customerAddr',
        	 type : 'string'},
           //{ name: 'customer1'},
           //{ name: 'customer2'},
           //{ name: 'startDate', type: 'date', dateFormat: 'n/j/Y' },
          // { name: 'endDate', type: 'date', dateFormat: 'n/j/Y' }//,           
          // { name: 'active', type: 'bool' }
        ]
    });


    // create the Data Store 
    
    var customerDetaialstore = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        autoLoad : true,
        model: 'ProjectManagement.view.CustomerDetailsModel',
        proxy: {
            type: 'rest',
            // load remote data using HTTP
            //pass to and from date as params here // Ext.getCmp('from_date').getValue()
            url: 'projects/customerDetails/',	
           // method: 'GET',
            format: 'json',
            headers: { 'Content-Type': 'application/json' },
            reader: {
                type: 'json',
                
                    },
             writer: {
                 type: 'json'
                   }      
                }
 	
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    
    Ext.define('ProjectManagement.view.CustomerDetails', {
    	extend : 'Ext.grid.Panel',
    	id : 'customerDetails',
    	itemId : 'customerDetails',
    	alias : 'widget.CustomerDetails', 
    	require :[
    	             'Ext.grid.*',
    	             'Ext.data.*',
    	             'Ext.util.*',
    	             'Ext.state.*',
    	             'Ext.form.*',
    	             'Ext.ux.CheckColumn'
    	         ],
        store: customerDetaialstore,
        columns: [{
            header: 'Customer Name',
            dataIndex: 'customerName',
            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
        }, {
            header: 'Customer POC ',
            dataIndex: 'customerPOC',
            flex: 1,
            editor: {
                allowBlank: false,
               // vtype: 'email'
            }
        },{
            header: 'Customer Addr',
            dataIndex: 'customerAddr',
            flex: 1,
            editor: {
                allowBlank: false,
               
            }
        } ],
        width: 600,
        height: 400,
        title: 'Customer Details',
        frame: true,
        tbar: [{
            text: 'Add Customer',
           // iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a record instance through the ModelManager
                var r = Ext.ModelManager.create({
                	customerName: 'New Customer',
                	customerPOC: 'newCustomer@Velankani.com',
                	customerAddr : 'Banglaore',
                    //startDate: new Date(),
                    //endDate: new Date(),
                   
                }, 'ProjectManagement.view.CustomerDetailsModel');

                customerDetaialstore.insert(0,r);
              //ajax request to update customer details
	           /*     Ext.Ajax.request({
			         	url : 'projects/addcustomerDetails/',
			            method:'POST',
			            headers: { 'Content-Type': 'application/json'},
			            jsonData: Ext.JSON.encode(r), 			           
					            
					            success: function(response) {
					            console.log('SUCCESS!');
					            },					            
			            success :function(response){
			                var text = response.responseText;
			                // process server response here
			            },
	
			            failure : function(response){
			                var text = response.responseText;
			                // process server response here
			            },
	                }); */
                
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeCustomer',
            text: 'Remove Customer',
            //iconCls: 'employee-remove',
            handler: function() {
                var sm = Ext.getCmp('customerDetails').getSelectionModel();
                rowEditing.cancelEdit();
                
                Ext.Msg.confirm("Confirmation", "All the associated projects will be deleted"+"\n"+"Are you sure you want to delete?", function(btnText){
                    if(btnText === "no"){
                        
                    }
                    else if(btnText === "yes"){
                    	
                    	var record =sm.getSelection();                 //gives an array of selected records
                    	console.log(record[0].data.customerName);
                    	//Ext.Msg.alert('record',record[0].data.customerId);
                    	customerDetaialstore.remove(sm.getSelection());
                    	sm.select(0);
               			var customerId = record[0].data.customerId;
               			Ext.Ajax.request({
        		         	url : 'projects/removeCustomer',// Ext.util.JSON.encode(
        		            method:'GET',
        		            params: {
                            	  "customerId":customerId
              		             },
               				success: function(response) {
    			            console.log('SUCCESS!');
    			            Ext.getCmp('tree-panel').getStore().load();
               				},
        		          }); 
               			//Ext.getCmp('customerDetails').getView().refresh();
               			console.log(Ext.getCmp('tree-panel'));
               	
                    }
                    //Ext.getCmp('tree-panel').getStore().load();
                }, this); 
                
              //ajax request to update customer details
               /* Ext.Ajax.request({
		         	url : 'addorupdateCustomer.htm',
		            method:'POST',
		            headers: { 'Content-Type': 'application/json'},
		            jsonData: Ext.JSON.encode(sm.getSelection()), 			           
				            
				            success: function(response) {
				            console.log('SUCCESS!');
				            },					            
		            success : function(response){
		                var text = response.responseText;
		                // process server response here
		            },

		            failure : function(response){
		                var text = response.responseText;
		                // process server response here
		            },
                }); */
                
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
            	Ext.getCmp('customerDetails').down('#removeCustomer').setDisabled(!records.length);
            	//Ext.getCmp('customerDetails').down('#removeCustomer').setDisabled(false)
            },
            'edit':function( editor, e ){
            	var r = e.record;
            	
            	 var record = Ext.ModelManager.create({
                 	//customerName: 'New Customer',
            		customerId:r.data.customerId,
            		customerName:r.data.customerName,
                 	customerPOC: r.data.customerPOC,
                 	customerAddr : r.data.customerAddr
                     //startDate: new Date(),
                     //endDate: new Date(),
                    
                 }, 'ProjectManagement.view.CustomerDetailsModel');
            	//Ext.Msg.alert('record',record.data.customerId);
            	console.log(record.data);
            	Ext.Ajax.request({
		         	url : 'projects/addcustomerDetails/',// Ext.util.JSON.encode(
		            method:'POST',
		            headers: { 'Content-Type': 'application/json'},
		            jsonData: Ext.JSON.encode(record.data), 
		            //data:r,
				            
				            success: function(response) {
				            console.log('SUCCESS!');
				            },					            
				            success : function(response){
				                var text = response.responseText;
				                //Ext.Msg.alert('success',text);
				                // process server response here
				                Ext.getCmp('tree-panel').getStore().load();
				                Ext.getCmp('customerDetails').getStore().load();
				            },

				            failure : function(response){
				                var text = response.responseText;
				                // process server response here
				               // Ext.Msg.alert('failure',text);
				            }
		    }); 
            	
            	 //Ext.getCmp('tree-panel').getStore().load();
            	 //Ext.getCmp('customerDetails').getStore().load();
            }
        }
    });
