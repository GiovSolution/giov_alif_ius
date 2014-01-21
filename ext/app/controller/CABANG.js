Ext.define('YMPI.controller.CABANG',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_cabang','MASTER.v_cabang_form'],
	models: ['m_cabang'],
	stores: ['s_cabang'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listcabang',
		selector: 'Listcabang'
	}, {
		ref: 'v_cabang_form',
		selector: 'v_cabang_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_cabang_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_cabang_form #create'
	}, {
		ref: 'CABANG',
		selector: 'CABANG'
	}],


	init: function(){
		this.control({
			'CABANG': {
				'afterrender': this.cabangAfterRender
			},
			'Listcabang': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListcabang
			},
			'Listcabang button[action=create]': {
				click: this.createRecord
			},
			'Listcabang button[action=delete]': {
				click: this.deleteRecord
			},
			'Listcabang button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listcabang button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listcabang button[action=print]': {
				click: this.printRecords
			},
			'v_cabang_form button[action=save]': {
				click: this.saveV_cabang_form
			},
			'v_cabang_form button[action=create]': {
				click: this.saveV_cabang_form
			},
			'v_cabang_form button[action=cancel]': {
				click: this.cancelV_cabang_form
			}
		});
	},
	
	cabangAfterRender: function(){
		var cabangStore = this.getListcabang().getStore();
		cabangStore.load();
	},
	
	createRecord: function(){
		var getListcabang	= this.getListcabang();
		var getV_cabang_form= this.getV_cabang_form(),
			form			= getV_cabang_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getListcabang.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_cabang_form.down('#cabang_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_cabang_form.setDisabled(false);
		
		this.getCABANG().setActiveTab(getV_cabang_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getListcabang().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListcabang: function(me, record, item, index, e){
		var getCABANG		= this.getCABANG();
		var getListcabang	= this.getListcabang();
		var getV_cabang_form= this.getV_cabang_form(),
			form			= getV_cabang_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_cabang_form.down('#cabang_id_field').setReadOnly(true);		
		getV_cabang_form.loadRecord(record);
		
		getListcabang.setDisabled(true);
		getV_cabang_form.setDisabled(false);
		getCABANG.setActiveTab(getV_cabang_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListcabang().getStore();
		var selection = this.getListcabang().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "cabang_id" = "'+selection.data.cabang_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getListcabang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_cabang/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getListcabang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_cabang/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/cabang.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getListcabang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_cabang/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/cabang.html','cabang_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_cabang_form: function(){
		var getCABANG		= this.getCABANG();
		var getListcabang 	= this.getListcabang();
		var getV_cabang_form= this.getV_cabang_form(),
			form			= getV_cabang_form.getForm(),
			values			= getV_cabang_form.getValues();
		var store 			= this.getStore('s_cabang');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_cabang/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('cabang_id') === values.cabang_id) {
										return true;
									}
									return false;
								}
							);
							/* getListcabang.getView().select(recordIndex); */
							getListcabang.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_cabang_form.setDisabled(true);
					getListcabang.setDisabled(false);
					getCABANG.setActiveTab(getListcabang);
				}
			});
		}
	},
	
	createV_cabang_form: function(){
		var getCABANG		= this.getCABANG();
		var getListcabang 	= this.getListcabang();
		var getV_cabang_form= this.getV_cabang_form(),
			form			= getV_cabang_form.getForm(),
			values			= getV_cabang_form.getValues();
		var store 			= this.getStore('s_cabang');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_cabang/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_cabang_form.setDisabled(true);
					getListcabang.setDisabled(false);
					getCABANG.setActiveTab(getListcabang);
				}
			});
		}
	},
	
	cancelV_cabang_form: function(){
		var getCABANG		= this.getCABANG();
		var getListcabang	= this.getListcabang();
		var getV_cabang_form= this.getV_cabang_form(),
			form			= getV_cabang_form.getForm();
			
		form.reset();
		getV_cabang_form.setDisabled(true);
		getListcabang.setDisabled(false);
		getCABANG.setActiveTab(getListcabang);
	}
	
});