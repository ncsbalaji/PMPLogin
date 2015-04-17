Ext.define('ProjectManagement.controller.loginController', {
    extend: 'Ext.app.Controller',
    views : ['ProjectManagement.view.login',
             'ProjectManagement.view.MainPage',
           //  'ProjectManagement.view.UserRegistraionForm',
             'ProjectManagement.view.CustomerDetails'],
   // stores: ['UserStore','EmployeeStore'],
   // models:['UserModel'],
    init: function() {   	
    	 
    	 this.control({
                              
	             'ProjectTree button[text=Create Project]' : {
	                 click : this.createProject   
	             },
	             'ProjectTree button[text=Create User]' : {
	                 click : this.createUser   
	             },
	             'ProjectTree' : {
	                 itemclick : this.treeItemClick   
	             },
	             'ContentPanel button[text=Submit Status]' : {
	            	 click : this.submitStatus     
	             },
	             'ContentPanel button[text=Export Excel]' : {
	            	 click : this.downloadExcelXmlBtn   
	             },
	             'ContentPanel button[text=Copy Last Status]' : {
	            	 click : this.copyLastStatus   
	             },
	             'ContentPanel button[text=View selected week Status]' : {
	            	 click : this.viewSelectedWeekStatus   
	             },
	             'ContentPanel > #from_date' : {
	            	 change : this.dateSelect   
	             },
	             'ContentPanel datefield[itemId=from_date]' : {
	            	 change : this.viewSelectedWeekStatus   
	             },
	             'OverallStatus button[text=Export Excel]' : {
	            	 click : this.downloadOverallExcelXmlBtn   
	             }
               
             
         });
    },
    dateSelect : function(){
    	console.log("date selected");
    },
    viewSelectedWeekStatus : function(view, record){

    	Ext.Msg.confirm("Confirmation", "View Selected Weak Status?", function(btnText){
            if(btnText === "no"){
                
            }
            else if(btnText === "yes"){
            	 
            	 console.log(" project name "+Ext.getCmp("hiddenProjectId").getValue());
            	 var selectedDateWeekCount = Ext.Date.getWeekOfYear(new Date(Ext.Date.format(Ext.getCmp('from_date').getValue(), 'Y,m,d')));
            	 
            	 this.loadStatusStore(  Ext.getCmp("hiddenProjectId").getValue(), selectedDateWeekCount);
       		  
            }
        }, this);
    	
    	
    
    	
    },
    copyLastStatus : function ()
    {
    	Ext.Msg.confirm("Confirmation", "Do you want to Copy Recent week Status?", function(btnText){
            if(btnText === "no"){
                
            }
            else if(btnText === "yes"){
            	
            	if(Ext.getCmp('projectcurrentStatus').store.getCount()>0){
            		
            		Ext.Msg.alert('Alert','Last week status has already copied');
            		
            	}else{
            		Ext.Ajax.request({
                		url: 'projects/copyRecentWeekStatus',
                        method: 'POST',
                        //headers: { 'Content-Type': 'application/json' },
                        params: {
                        		"projectId": Ext.getCmp("hiddenProjectId").getValue(),
                        		"status": 'current',
                        		"weekCount":  Ext.Date.getWeekOfYear(new Date()),
                        },
                        //jsonData : Ext.JSON.encode(form.getValues()),
                        success: function(response) {
    			            console.log('SUCCESS!');
    			        },
    			        success : this.submittedSucessfully,
    			    	
    		            failure : this.submitionfailed,
                    });
            		
            		window.location.reload();
            	}
            }
        }, this);
    	
    	
    },
	submitStatus : function(view, record){    	
	    	
	    	var grid = Ext.getCmp('projectcurrentStatus');     	
	        
	      var  items=[];
	        for(i=0;i < grid.store.getCount();i++){	
	        	
	        	   items.push({
	                	'id'   : grid.getStore().getAt(i).data.id,
	                	'area': grid.getStore().getAt(i).data.area,
	                	'rag': grid.getStore().getAt(i).data.rag,
	                	'comment': grid.getStore().getAt(i).data.comment,
	                	}) ;
	             	//console.log("======"+i	+"---->"+grid.getStore().getAt(i).data.index);
	        	
	        			}
	    	

	        
			     Ext.Ajax.request({
			         	url : 'projects/submit.htm',// Ext.util.JSON.encode(
			            method:'POST',
			            headers: { 'Content-Type': 'application/json'},
			            jsonData: Ext.JSON.encode(items), 			           
					            
					            success: function(response) {
					            	Ext.Msg.alert('SUCCESS!',response.statusText);
					            },					            
	
			            failure : this.submitionfailed,
			    }); 
	    	
	    } ,
	   
	   submittedSucessfully: function(response){
    	
    	
    },
    submitionfailed: function(response){},
    
    treeItemClick : function(view, record) {
    	
    	  console.log(" project name "+record.parentNode.getId());
    	  //console.log(" Client name "+record.parentNode.parentNode.getId());
    	  Ext.getCmp("hiddenProjectId").setValue(record.parentNode.getId());
    	  
    	  if(record.getData().text=='Current Status'){ 
    		  
    		  this.title = record.parentNode.getData().text;
    		  this.loadStatusStore(record.parentNode.getId(), Ext.Date.getWeekOfYear(new Date(Ext.Date.format(Ext.getCmp('from_date').getValue(), 'Y,m,d'))));
    		  Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectcurrentStatus');
    		  Ext.getCmp('projectTaskDetailsId').layout.getActiveItem().setTitle(record.parentNode.getData().text+' Current Status');
    		  
    		  } else if(record.getData().text=='Logistics'){
    			  
    			  Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectLogisticsStatus');
    			  //Ext.getCmp('projectLogisticsStatus').getForm()
    			  Ext.getCmp('projectLogisticsStatus').getForm().load({
    				    url: 'projects/getLogisticsFormData',
    				    method: 'GET',
    				    params: {
    				        projectId: record.parentNode.getId(),
    				    },
    				    failure: function(form, action) {
    				        Ext.Msg.alert("Load failed", action.result.errorMessage);
    				    }
    				});
    			  
    		  }
    	  
    	  if(record.parentNode.getId()=='root'){
    			  
    			  Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('overallProjectStatus');
    			  Ext.getCmp('projectTaskDetailsId').layout.getActiveItem().setTitle(record.getData().text+' Overall Projects Status');
    			  console.log("customer "+record.getData().text);
    			  
    			  var overallStatusStore = new Ext.data.Store({
    		           // destroy the store if the grid is destroyed
    		           autoDestroy: true,
    		           autoLoad : true,
    		           model: ProjectManagement.view.OverallStatusModel,
    		           proxy: {
    		               type: 'ajax',
    		               // load remote data using HTTP
    		               url: 'projects/getOverallStatus',	
    		               extraParams: {
    		               	  "customerName": record.getData().text,
    		 		              "status": 'current',
    		                 },
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
    			  
    			  Ext.getCmp('overallProjectStatus').reconfigure(overallStatusStore);
    		  }
        	
        },
        
   loadStatusStore: function (projectId, weekCount){
    
	   var statusStore = new Ext.data.Store({
           // destroy the store if the grid is destroyed
           autoDestroy: true,
           autoLoad : true,
           model: ProjectManagement.view.MainPageModel,
           proxy: {
               type: 'ajax',
               // load remote data using HTTP
               url: 'projects/getStatus',	
               extraParams: {
               	  "projectId": projectId,
 		              "status": 'current',
 		              "weekCount": weekCount,
                 },
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
	   
	   Ext.getCmp('projectcurrentStatus').reconfigure(statusStore);
	   
    },
    createProject : function() {
      
    	 Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('projectRegistration');
        
    },
    createUser : function(view, record) {    	
    	
   	 Ext.getCmp('projectTaskDetailsId').layout.setActiveItem('userRegisteration');
    
    },
    
    userLogin: function(button) {  
    	var userName = (button.up('form').items.items[0].value);    		
    	var passWord = (button.up('form').items.items[1].value); 
        	 
    	// location.href = 'abc.htm';
    	 window.location.href = 'mainpage.jsp';
    	/* Ext.Ajax.request({
    		    url: '/userlogin.do',
    		    params: {
    		        username: userName,
    		        password:passWord
    		    },
    		    success: function(response){
    		        var text = response.responseText;

    		         Ext.Msg.alert('Message', text);

    		    }
    		});*/
    	 

	

},


downloadExcelXmlBtn: function() {

  //Ext.getCmp('projectTaskDetailsId').layout.setActiveItem(record.getId());
    	  grid = Ext.getCmp('projectcurrentStatus'); 	
    	  grid.downloadExcelXml();      
},

downloadOverallExcelXmlBtn: function() {

	    	  grid = Ext.getCmp('overallProjectStatus'); 	
	    	  grid.downloadExcelXml();      
}

});

//export functionality

var Base64 = (function() {
    // Private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // Private method for UTF-8 encoding

    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    // Public method for encoding
    return {
        encode: (typeof btoa == 'function') ? function(input) {
            return btoa(utf8Encode(input));
        } : function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }
    };
})();

Ext.define('MyApp.view.override.Grid', {
    override: 'Ext.grid.GridPanel',
    requires: 'Ext.form.action.StandardSubmit',

    /*
        Kick off process
    */

    downloadExcelXml: function(includeHidden, title) {

        if (!title) title = this.title;
        
        var vExportContent = this.getExcelXml(includeHidden, title);

        var location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);

        /* 
          dynamically create and anchor tag to force download with suggested filename 
          note: download attribute is Google Chrome specific
        */
		
        if (Ext.isChrome) {
            var gridEl = this.getEl();

            var el = Ext.DomHelper.append(gridEl, {
                tag: "a",
                download: title + "-" + Ext.Date.format(new Date(), 'Y-m-d Hi') + '.xls',
                href: location
            });

            el.click();

            Ext.fly(el).destroy();

        } else {

            var form = this.down('form#uploadForm');
            if (form) {
                form.destroy();
            }
            form = this.add({
                xtype: 'form',
                itemId: 'uploadForm',
                hidden: true,
                standardSubmit: true,
                url: 'http://webapps.figleaf.com/dataservices/Excel.cfc?method=echo&mimetype=application/vnd.ms-excel&filename=' + escape(title + ".xls"),
                items: [{
                    xtype: 'hiddenfield',
                    name: 'data',
                    value: vExportContent
                }]
            });

            form.getForm().submit();

        }
    },

    /*

        Welcome to XML Hell
        See: http://msdn.microsoft.com/en-us/library/office/aa140066(v=office.10).aspx
        for more details

    */
    getExcelXml: function(includeHidden, title) {

        var theTitle = title || this.title;

        var worksheet = this.createWorksheet(includeHidden, theTitle);
        var totalWidth = this.columnManager.columns.length;

        return ''.concat(
            '<?xml version="1.0"?>',
            '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
            '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Title>' + theTitle + '</Title></DocumentProperties>',
            '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><AllowPNG/></OfficeDocumentSettings>',
            '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">',
            '<WindowHeight>' + worksheet.height + '</WindowHeight>',
            '<WindowWidth>' + worksheet.width + '</WindowWidth>',
            '<ProtectStructure>False</ProtectStructure>',
            '<ProtectWindows>False</ProtectWindows>',
            '</ExcelWorkbook>',

            '<Styles>',

            '<Style ss:ID="Default" ss:Name="Normal">',
            '<Alignment ss:Vertical="Bottom"/>',
            '<Borders/>',
            '<Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/>',
            '<Interior/>',
            '<NumberFormat/>',
            '<Protection/>',
            '</Style>',

            '<Style ss:ID="title">',
            '<Borders />',
            '<Font ss:Bold="1" ss:Size="18" />',
            '<Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1" />',
            '<NumberFormat ss:Format="@" />',
            '</Style>',

            '<Style ss:ID="headercell">',
            '<Font ss:Bold="1" ss:Size="10" />',
            '<Alignment ss:Horizontal="Center" ss:WrapText="1" />',
            '<Interior ss:Color="#A3C9F1" ss:Pattern="Solid" />',
            '</Style>',


            '<Style ss:ID="even">',
            '<Interior ss:Color="#CCFFFF" ss:Pattern="Solid" />',
            '</Style>',
//added
            '<Style ss:ID="red">',
            '<Interior ss:Color="#FA5882" ss:Pattern="Solid" />',
            '</Style>',
            
            '<Style ss:ID="green">',
            '<Interior ss:Color="#BCF5A9" ss:Pattern="Solid" />',
            '</Style>',
            
            '<Style ss:ID="yellow">',
            '<Interior ss:Color="#F3F781" ss:Pattern="Solid" />',
            '</Style>',
            
            '<Style ss:ID="gray">',
            '<Interior ss:Color="#C0C0C0" ss:Pattern="Solid" />',
            '</Style>',
//added
            '<Style ss:ID="evendate" ss:Parent="even">',
            '<NumberFormat ss:Format="yyyy-mm-dd" />',
            '</Style>',


            '<Style ss:ID="evenint" ss:Parent="even">',
            '<Numberformat ss:Format="0" />',
            '</Style>',

            '<Style ss:ID="evenfloat" ss:Parent="even">',
            '<Numberformat ss:Format="0.00" />',
            '</Style>',

            '<Style ss:ID="odd">',
            '<Interior ss:Color="#CCCCFF" ss:Pattern="Solid" />',
            '</Style>',

            '<Style ss:ID="groupSeparator">',
            '<Interior ss:Color="#D3D3D3" ss:Pattern="Solid" />',
            '</Style>',

            '<Style ss:ID="odddate" ss:Parent="odd">',
            '<NumberFormat ss:Format="yyyy-mm-dd" />',
            '</Style>',

            '<Style ss:ID="oddint" ss:Parent="odd">',
            '<NumberFormat Format="0" />',
            '</Style>',

            '<Style ss:ID="oddfloat" ss:Parent="odd">',
            '<NumberFormat Format="0.00" />',
            '</Style>',


            '</Styles>',
            worksheet.xml,
            '</Workbook>'
        );
    },

     getModelField: function(fieldName) {

        var fields = this.store.model.getFields();
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].name === fieldName) {
                return fields[i];
            }
        }
    },

    
    generateEmptyGroupRow: function(dataIndex, value, cellTypes, includeHidden) {


        var cm = this.columnManager.columns;
        var colCount = cm.length;
        var rowTpl = '<Row ss:AutoFitHeight="0"><Cell ss:StyleID="groupSeparator" ss:MergeAcross="{0}"><Data ss:Type="String"><html:b>{1}</html:b></Data></Cell></Row>';
        var visibleCols = 0;

        // rowXml += '<Cell ss:StyleID="groupSeparator">'

        for (var j = 0; j < colCount; j++) {
            if (cm[j].xtype != 'actioncolumn' && (cm[j].dataIndex != '') && (includeHidden || !cm[j].hidden)) {
                // rowXml += '<Cell ss:StyleID="groupSeparator"/>';
                visibleCols++;
            }
        }

        // rowXml += "</Row>";

        return Ext.String.format(rowTpl, visibleCols - 1, value);
    },


    createWorksheet: function(includeHidden, theTitle) {
        // Calculate cell data types and extra class names which affect formatting
        var cellType = [];
        var cellTypeClass = [];
        var cm = this.columnManager.columns;

        var totalWidthInPixels = 0;
        var colXml = '';
        var headerXml = '';
        var visibleColumnCountReduction = 0;
        var colCount = cm.length;
        for (var i = 0; i < colCount; i++) {
            if (cm[i].xtype != 'actioncolumn' && (cm[i].dataIndex != '') && (includeHidden || !cm[i].hidden)) {
                var w = cm[i].getEl().getWidth();
                totalWidthInPixels += w;

                if (cm[i].text === "") {
                    cellType.push("None");
                    cellTypeClass.push("");
                    ++visibleColumnCountReduction;
                } else {
                    colXml += '<Column ss:AutoFitWidth="1" ss:Width="' + w + '" />';
                    headerXml += '<Cell ss:StyleID="headercell">' +
                        '<Data ss:Type="String">' + cm[i].text + '</Data>' +
                        '<NamedCell ss:Name="Print_Titles"></NamedCell></Cell>';


                    var fld = this.getModelField(cm[i].dataIndex);
                    switch (fld.type.type) {
                        case "int":
                            cellType.push("Number");
                            cellTypeClass.push("int");
                            break;
                        case "float":
                            cellType.push("Number");
                            cellTypeClass.push("float");
                            break;

                        case "bool":

                        case "boolean":
                            cellType.push("String");
                            cellTypeClass.push("");
                            break;
                        case "date":
                            cellType.push("DateTime");
                            cellTypeClass.push("date");
                            break;
                        default:
                            cellType.push("String");
                            cellTypeClass.push("");
                            break;
                    }
                }
            }
        }
        var visibleColumnCount = cellType.length - visibleColumnCountReduction;

        var result = {
            height: 9000,
            width: Math.floor(totalWidthInPixels * 30) + 50
        };

        // Generate worksheet header details.

        // determine number of rows
        var numGridRows = this.store.getCount() + 2;
        if (!Ext.isEmpty(this.store.groupField) || this.store.groupers.items.length > 0) {
            numGridRows = numGridRows + this.store.getGroups().length;
        }

        // create header for worksheet
        var t = ''.concat(
            '<Worksheet ss:Name="' + theTitle + '">',

            '<Names>',
            '<NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'' + theTitle + '\'!R1:R2">',
            '</NamedRange></Names>',

            '<Table ss:ExpandedColumnCount="' + (visibleColumnCount + 2),
            '" ss:ExpandedRowCount="' + numGridRows + '" x:FullColumns="1" x:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">',
            colXml,
            '<Row ss:Height="38">',
            '<Cell ss:MergeAcross="' + (visibleColumnCount - 1) + '" ss:StyleID="title">',
            '<Data ss:Type="String" xmlns:html="http://www.w3.org/TR/REC-html40">',
            '<html:b>' + theTitle + '</html:b></Data><NamedCell ss:Name="Print_Titles">',
            '</NamedCell></Cell>',
            '</Row>',
            '<Row ss:AutoFitHeight="1">',
            headerXml +
            '</Row>'
        );

        // Generate the data rows from the data in the Store
        var groupVal = "";
        var groupField = "";
        if (this.store.groupers.keys.length > 0) {
            groupField = this.store.groupers.keys[0];
        }
        for (var i = 0, it = this.store.data.items, l = it.length; i < l; i++) {

            if (!Ext.isEmpty(groupField)) {
                if (groupVal != this.store.getAt(i).get(groupField)) {
                    groupVal = this.store.getAt(i).get(groupField);
                    t += this.generateEmptyGroupRow(groupField, groupVal, cellType, includeHidden);
                }
            }
            t += '<Row>';
            var cellClass = (i & 1) ? 'odd' : 'even';
            r = it[i].data;
            var k = 0;
            for (var j = 0; j < colCount; j++) {
            	
                if (cm[j].xtype != 'actioncolumn' && (cm[j].dataIndex != '') && (includeHidden || !cm[j].hidden)) {
                    var v = r[cm[j].dataIndex];
                  //added
                    //console.log("theTitle"+theTitle);
                    //console.log("theTitle"+(theTitle.indexOf("Projects Status")>-1));
                    if(theTitle.indexOf("Projects Status")>-1){
                    	if(j>=1){
                    		cellClass = v;
                    		//console.log(v);
                    	}else{
                    		cellClass = (i & 1) ? 'odd' : 'even';
                    	}
                    } else{
                    	if(j==1){
                    		cellClass = v;
                    		//console.log(v);
                    		//console.log(r[j].data);
                    	} else{
                    		cellClass = (i & 1) ? 'odd' : 'even';
                    	}
                    }
                	
                	//added
                    
                    if (cellType[k] !== "None") {
                        t += '<Cell ss:StyleID="' + cellClass + cellTypeClass[k] + '"><Data ss:Type="' + cellType[k] + '">';
                        if (cellType[k] == 'DateTime') {
                            t += Ext.Date.format(v, 'Y-m-d');
                        } else {
                            t += v;
                        }
                        t += '</Data></Cell>';
                    }
                    k++;
                }
            }
            t += '</Row>';
        }

        result.xml = t.concat(
            '</Table>',
            '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">',
            '<PageLayoutZoom>0</PageLayoutZoom>',
            '<Selected/>',
            '<Panes>',
            '<Pane>',
            '<Number>3</Number>',
            '<ActiveRow>2</ActiveRow>',
            '</Pane>',
            '</Panes>',
            '<ProtectObjects>False</ProtectObjects>',
            '<ProtectScenarios>False</ProtectScenarios>',
            '</WorksheetOptions>',
            '</Worksheet>'
        );
        return result;
    }
});