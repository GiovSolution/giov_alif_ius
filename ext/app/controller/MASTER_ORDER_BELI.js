Ext.define('YMPI.controller.MASTER_ORDER_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_master_order_beli','TRANSAKSI.v_master_order_beli_form'],
	models: ['m_master_order_beli'],
	stores: ['s_master_order_beli'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listmaster_order_beli',
		selector: 'Listmaster_order_beli'
	}, {
		ref: 'v_master_order_beli_form',
		selector: 'v_master_order_beli_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_master_order_beli_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_master_order_beli_form #create'
	}, {
		ref: 'MASTER_ORDER_BELI',
		selector: 'MASTER_ORDER_BELI'
	}],


	init: function(){
		this.control({
			'MASTER_ORDER_BELI': {
				'afterrender': this.master_order_beliAfterRender
			},
			'Listmaster_order_beli': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListmaster_order_beli
			},
			'Listmaster_order_beli button[action=create]': {
				click: this.createRecord
			},
			'Listmaster_order_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'Listmaster_order_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listmaster_order_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listmaster_order_beli button[action=print]': {
				click: this.printRecords
			},
			'v_master_order_beli_form button[action=save]': {
				click: this.saveV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=create]': {
				click: this.saveV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=cancel]': {
				click: this.cancelV_master_order_beli_form
			}
		});
	},
	
	master_order_beliAfterRender: function(){
		var master_order_beliStore = this.getListmaster_order_beli().getStore();
		master_order_beliStore.load();
	},
	
	createRecord: function(){
		var getListmaster_order_beli	= this.getListmaster_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getListmaster_order_beli.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_master_order_beli_form.down('#order_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_master_order_beli_form.setDisabled(false);
		
		this.getMASTER_ORDER_BELI().setActiveTab(getV_master_order_beli_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getListmaster_order_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListmaster_order_beli: function(me, record, item, index, e){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getListmaster_order_beli	= this.getListmaster_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_master_order_beli_form.down('#order_id_field').setReadOnly(true);		
		getV_master_order_beli_form.loadRecord(record);
		
		getListmaster_order_beli.setDisabled(true);
		getV_master_order_beli_form.setDisabled(false);
		getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListmaster_order_beli().getStore();
		var selection = this.getListmaster_order_beli().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "order_id" = "'+selection.data.order_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getListmaster_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_order_beli/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getListmaster_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_order_beli/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/master_order_beli.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getListmaster_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_order_beli/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/master_order_beli.html','master_order_beli_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getListmaster_order_beli 	= this.getListmaster_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm(),
			values			= getV_master_order_beli_form.getValues();
		var store 			= this.getStore('s_master_order_beli');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_master_order_beli/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('order_id') === values.order_id) {
										return true;
									}
									return false;
								}
							);
							/* getListmaster_order_beli.getView().select(recordIndex); */
							getListmaster_order_beli.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_master_order_beli_form.setDisabled(true);
					getListmaster_order_beli.setDisabled(false);
					getMASTER_ORDER_BELI.setActiveTab(getListmaster_order_beli);
				}
			});
		}
	},
	
	createV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getListmaster_order_beli 	= this.getListmaster_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm(),
			values			= getV_master_order_beli_form.getValues();
		var store 			= this.getStore('s_master_order_beli');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_master_order_beli/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_master_order_beli_form.setDisabled(true);
					getListmaster_order_beli.setDisabled(false);
					getMASTER_ORDER_BELI.setActiveTab(getListmaster_order_beli);
				}
			});
		}
	},
	
	cancelV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getListmaster_order_beli	= this.getListmaster_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm();
			
		form.reset();
		getV_master_order_beli_form.setDisabled(true);
		getListmaster_order_beli.setDisabled(false);
		getMASTER_ORDER_BELI.setActiveTab(getListmaster_order_beli);
	}
	
});