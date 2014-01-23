Ext.define('INVENT.controller.SUPPLIER',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_supplier','MASTER.v_supplier_form'],
	models: ['m_supplier'],
	stores: ['s_supplier','s_cabang'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listsupplier',
		selector: 'Listsupplier'
	}, {
		ref: 'v_supplier_form',
		selector: 'v_supplier_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_supplier_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_supplier_form #create'
	}, {
		ref: 'SUPPLIER',
		selector: 'SUPPLIER'
	}],


	init: function(){
		this.control({
			'SUPPLIER': {
				'afterrender': this.supplierAfterRender
			},
			'Listsupplier': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListsupplier
			},
			'Listsupplier button[action=create]': {
				click: this.createRecord
			},
			'Listsupplier button[action=delete]': {
				click: this.deleteRecord
			},
			'Listsupplier button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listsupplier button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listsupplier button[action=print]': {
				click: this.printRecords
			},
			'v_supplier_form button[action=save]': {
				click: this.saveV_supplier_form
			},
			'v_supplier_form button[action=create]': {
				click: this.saveV_supplier_form
			},
			'v_supplier_form button[action=cancel]': {
				click: this.cancelV_supplier_form
			}
		});
	},
	
	supplierAfterRender: function(){
		var supplierStore = this.getListsupplier().getStore();
		supplierStore.load();
	},
	
	createRecord: function(){
		var getListsupplier	= this.getListsupplier();
		var getV_supplier_form= this.getV_supplier_form(),
			form			= getV_supplier_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getListsupplier.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_supplier_form.down('#supplier_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_supplier_form.setDisabled(false);
		
		this.getSUPPLIER().setActiveTab(getV_supplier_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getListsupplier().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListsupplier: function(me, record, item, index, e){
		var getSUPPLIER		= this.getSUPPLIER();
		var getListsupplier	= this.getListsupplier();
		var getV_supplier_form= this.getV_supplier_form(),
			form			= getV_supplier_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		var cabangStore		= this.getStore('s_cabang');
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_supplier_form.down('#supplier_id_field').setReadOnly(true);
		
		cabangStore.getProxy().extraParams.query = record.data.supplier_cabang;
		cabangStore.load({
			scope: this,
			callback: function(recordsCabang, operation, success) {
				if (success) {
					var task = new Ext.util.DelayedTask(function(){
						getV_supplier_form.loadRecord(record);
					});
					task.delay(10);
				}
			}
		});
		
		getListsupplier.setDisabled(true);
		getV_supplier_form.setDisabled(false);
		getSUPPLIER.setActiveTab(getV_supplier_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListsupplier().getStore();
		var selection = this.getListsupplier().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "supplier_id" = "'+selection.data.supplier_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getListsupplier().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_supplier/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getListsupplier().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_supplier/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/supplier.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getListsupplier().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_supplier/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/supplier.html','supplier_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
					break;
				default:
					Ext.MessageBox.show({
						title: 'Warning',
						msg: 'Unable to print the grid!',
						buttons: Ext.MessageBox.OK,
						animEl: 'save',
						icon: Ext.MessageBox.WARNING
					});
					break;
				}  
			}
		});
	},
	
	saveV_supplier_form: function(){
		var getSUPPLIER		= this.getSUPPLIER();
		var getListsupplier 	= this.getListsupplier();
		var getV_supplier_form= this.getV_supplier_form(),
			form			= getV_supplier_form.getForm(),
			values			= getV_supplier_form.getValues();
		var store 			= this.getStore('s_supplier');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_supplier/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('supplier_id') === values.supplier_id) {
										return true;
									}
									return false;
								}
							);
							/* getListsupplier.getView().select(recordIndex); */
							getListsupplier.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_supplier_form.setDisabled(true);
					getListsupplier.setDisabled(false);
					getSUPPLIER.setActiveTab(getListsupplier);
				}
			});
		}
	},
	
	createV_supplier_form: function(){
		var getSUPPLIER		= this.getSUPPLIER();
		var getListsupplier 	= this.getListsupplier();
		var getV_supplier_form= this.getV_supplier_form(),
			form			= getV_supplier_form.getForm(),
			values			= getV_supplier_form.getValues();
		var store 			= this.getStore('s_supplier');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_supplier/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_supplier_form.setDisabled(true);
					getListsupplier.setDisabled(false);
					getSUPPLIER.setActiveTab(getListsupplier);
				}
			});
		}
	},
	
	cancelV_supplier_form: function(){
		var getSUPPLIER		= this.getSUPPLIER();
		var getListsupplier	= this.getListsupplier();
		var getV_supplier_form= this.getV_supplier_form(),
			form			= getV_supplier_form.getForm();
			
		form.reset();
		getV_supplier_form.setDisabled(true);
		getListsupplier.setDisabled(false);
		getSUPPLIER.setActiveTab(getListsupplier);
	}
	
});