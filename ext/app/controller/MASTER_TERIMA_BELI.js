Ext.define('INVENT.controller.MASTER_TERIMA_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_master_terima_beli','TRANSAKSI.v_master_terima_beli_form'],
	models: ['m_master_terima_beli'],
	stores: ['s_master_terima_beli','s_master_order_beli','INVENT.store.s_gudang'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_master_terima_beli',
		selector: 'v_master_terima_beli'
	}, {
		ref: 'V_master_terima_beli_form',
		selector: 'v_master_terima_beli_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_master_terima_beli_form #saveall'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_master_terima_beli_form #createall'
	}, {
		ref: 'SavePrintBtnForm',
		selector: 'v_master_terima_beli_form #saveprintall'
	}, {
		ref: 'CreatePrintBtnForm',
		selector: 'v_master_terima_beli_form #createprintall'
	}, {
		ref: 'PrintBtnForm',
		selector: 'v_master_terima_beli_form #printall'
	}, {
		ref: 'MASTER_TERIMA_BELI',
		selector: 'MASTER_TERIMA_BELI'
	}, {
		ref: 'V_detail_terima_beli',
		selector: 'v_detail_terima_beli'
	}],


	init: function(){
		this.control({
			'MASTER_TERIMA_BELI': {
				'afterrender': this.master_terima_beliAfterRender
			},
			'v_master_terima_beli': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListmaster_terima_beli,
				'afterrender': this.v_master_terima_beliAfterRender
			},
			'v_master_terima_beli_form': {
				'afterrender': this.v_master_terima_beli_formAfterRender
			},
			'v_master_terima_beli button[action=create]': {
				click: this.createRecord
			},
			'v_master_terima_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'v_master_terima_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_master_terima_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_master_terima_beli button[action=print]': {
				click: this.printRecords
			},
			'v_master_terima_beli_form button[action=saveall]': {
				click: this.saveV_master_terima_beli_form
			},
			'v_master_terima_beli_form button[action=createall]': {
				click: this.saveV_master_terima_beli_form
			},
			'v_master_terima_beli_form button[action=cancelall]': {
				click: this.cancelV_master_terima_beli_form
			},
			'v_master_terima_beli_form button[action=saveprintall]': {
				click: this.saveprintV_master_terima_beli_form
			},
			'v_master_terima_beli_form button[action=createprintall]': {
				click: this.saveprintV_master_terima_beli_form
			},
			'v_master_terima_beli_form button[action=printall]': {
				click: this.printV_master_terima_beli_form
			},
			'v_master_terima_beli_form #terima_status_field': {
				change: this.terima_status_fieldChange
			}
		});
	},
	
	v_master_terima_beliAfterRender: function(window, options){
		var me = this;
		
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el,
			binding: [{
				key: "a",
				alt: true,
				fn: function(){
					console.log('alt a');
					me.createRecord();
				},
				scope: this
			}]
		});
		
		var getV_master_terima_beli	= this.getV_master_terima_beli();
		var myGridView = getV_master_terima_beli.getView();
		var mapgrid = Ext.create('Ext.util.KeyMap', {
			target: myGridView,
			eventName: 'itemkeydown',
			processEvent: function(view, record, node, index, event) {
				// Load the event with the extra information needed by the mappings
				event.view = view;
				event.store = view.getStore();
				event.record = record;
				event.index = index;
				return event;
			},
			binding: [{
				key: Ext.EventObject.DELETE,
				fn: function(keyCode, e) {
					var getstore = me.getV_master_terima_beli().getStore();
					var selection = me.getV_master_terima_beli().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "terima_id" = "'+selection.data.terima_id+'"?', function(btn){
							if (btn == 'yes'){
								getstore.remove(selection);
								getstore.sync();
							}
						});
						
					}
				}
			}]
		});
		
		getV_master_terima_beli.focus(false, true);
	},
	
	v_master_terima_beli_formAfterRender: function(window, options){
		var me = this;
		
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el,
			binding: [{
				key: 13,
				ctrl: true,
				fn: function(){
					console.log('enter ekey');
					me.saveV_master_terima_beli_form();
				},
				scope: this
			}, {
				key: 27,
				shift: true,
				fn: function(){
					console.log('escape ekey');
					me.cancelV_master_terima_beli_form();
				},
				scope: this
			}]
		});
	},
	
	master_terima_beliAfterRender: function(window, options){
		var me = this;
		
		var master_terima_beliStore = this.getV_master_terima_beli().getStore();
		master_terima_beliStore.load();
		
		/**
		 * START var navKeys <== Jika menekan huruf 'f' itu artinya 'first'
		 */
		/*var navKeys = {
			'f': 'first',
			's': 'second',
			't': 'third'
		};
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el
		});
		Ext.iterate(navKeys, function(key, tabId) {
			map.addBinding({
				key  : key,
				scope: this,
				fn   : function() {
					console.log(tabId);
				}
			});
		}, this);*/
		/* END var navKeys */
	},
	
	createRecord: function(){
		var getV_master_terima_beli	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm();
		var getV_detail_terima_beli		= this.getV_detail_terima_beli();
		var getSaveBtnForm				= this.getSaveBtnForm();
		var getSavePrintBtnForm			= this.getSavePrintBtnForm();
		var getCreateBtnForm			= this.getCreateBtnForm();
		var getCreatePrintBtnForm		= this.getCreatePrintBtnForm();
		var getPrintBtnForm				= this.getPrintBtnForm();
		var terima_status_field 		= getV_master_terima_beli_form.down('#terima_status_field').items.items;
		
		/* Create No. Faktur */
		var datenow = new Date();
		var getdate = datenow.getDate();
		var getmonth = datenow.getMonth() + 1;
		var getyear = datenow.getFullYear();
		var gethour = datenow.getHours();
		var getminute = datenow.getMinutes();
		var now = Ext.Date.format(new Date(), 'Ymd.Hi');
		var nofaktur = 'PB'+now;
		
		/* grid-panel */
		getV_master_terima_beli.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_master_terima_beli_form.down('#terima_id_field').setReadOnly(false);
		getV_master_terima_beli_form.down('#terima_no_field').focus(false, true);
		getV_master_terima_beli_form.down('#terima_no_field').setValue(nofaktur);
		getV_master_terima_beli_form.down('#terima_tanggal_field').setValue(datenow);
		getSaveBtnForm.setDisabled(true);
		getSavePrintBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getCreatePrintBtnForm.setDisabled(false);
		getPrintBtnForm.setDisabled(true);
		getV_master_terima_beli_form.setDisabled(false);
		
		terima_status_field[0].setReadOnly(true); //radio "terbuka"
		terima_status_field[1].setReadOnly(true); //radio "tertutup"
		terima_status_field[2].setReadOnly(true); //radio "batal"
		
		/*detail panel*/
		getV_detail_terima_beli.down('#btncreate').setDisabled(true);
		getV_detail_terima_beli.getStore().removeAll();
		
		this.getMASTER_TERIMA_BELI().setActiveTab(getV_master_terima_beli_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getV_master_terima_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListmaster_terima_beli: function(me, record, item, index, e){
		var getMASTER_TERIMA_BELI		= this.getMASTER_TERIMA_BELI();
		var getV_master_terima_beli	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm();
		var getV_detail_terima_beli	= this.getV_detail_terima_beli();
		var getSaveBtnForm			= this.getSaveBtnForm();
		var getCreateBtnForm		= this.getCreateBtnForm();
		var getSavePrintBtnForm		= this.getSavePrintBtnForm();
		var getCreatePrintBtnForm	= this.getCreatePrintBtnForm();
		var getPrintBtnForm			= this.getPrintBtnForm();
		var terima_status_field 		= getV_master_terima_beli_form.down('#terima_status_field').items.items;
		var master_order_beliStore	= this.getStore('s_master_order_beli');
		var gudangStore	= this.getStore('s_gudang');
		
		if ((record.data.terima_status == 'Tertutup') || (record.data.terima_status == 'Batal')) {
			console.log('satu');
			getPrintBtnForm.setDisabled(false);
			getSaveBtnForm.setDisabled(true);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(true);
			getCreatePrintBtnForm.setDisabled(true);
		}else{
			console.log('dua');
			getPrintBtnForm.setDisabled(true);
			getSaveBtnForm.setDisabled(false);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(false);
			getCreatePrintBtnForm.setDisabled(true);
		}
		getV_master_terima_beli_form.down('#terima_id_field').setReadOnly(true);
		
		master_order_beliStore.getProxy().extraParams.query = record.data.terima_order_id;
		master_order_beliStore.load({
			scope: this,
			callback: function(recordsOrder, operation, success) {
				if (success) {
					getV_master_terima_beli_form.down('#terima_supplier_nama_field').setValue(recordsOrder[0].data.supplier_nama);
					
					var task = new Ext.util.DelayedTask(function(){
						getV_master_terima_beli_form.loadRecord(record);
					});
					task.delay(10);
				}
			}
		});
		
		
		getV_master_terima_beli.setDisabled(true);
		getV_master_terima_beli_form.setDisabled(false);
		getMASTER_TERIMA_BELI.setActiveTab(getV_master_terima_beli_form);
		
		if ((record.data.terima_status == 'Terbuka') || (record.data.terima_status == 'Batal')) {
			terima_status_field[0].setReadOnly(false);
			terima_status_field[1].setReadOnly(true);
			terima_status_field[2].setReadOnly(false);
		}else{
			terima_status_field[0].setReadOnly(false);
			terima_status_field[1].setReadOnly(false);
			terima_status_field[2].setReadOnly(false);
		}
		
		/* GRID DETAIL start */
		// DETAIL Load Store
		var detailStore = getV_detail_terima_beli.getStore();
		detailStore.getProxy().extraParams.masterid = record.data.terima_id;
		detailStore.load();
		
		getV_detail_terima_beli.down('#btncreate').setDisabled(false);
		/* GRID DETAIL end */
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_master_terima_beli().getStore();
		var selection = this.getV_master_terima_beli().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "terima_id" = "'+selection.data.terima_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_master_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_terima_beli/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_master_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_terima_beli/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/master_terima_beli.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_master_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_terima_beli/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/master_terima_beli.html','master_terima_beli_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_master_terima_beli_form: function(){
		var getMASTER_TERIMA_BELI		= this.getMASTER_TERIMA_BELI();
		var getV_master_terima_beli 	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm(),
			values			= getV_master_terima_beli_form.getValues();
		var store 			= this.getStore('s_master_terima_beli');
		var detailStore 	= this.getStore('s_detail_terima_beli');
		
		var arrDetail = [];
		detailStore.each(function(record){
			arrDetail.push(record.data);
		}, this);
		
		values.detail = arrDetail;
		values.printvalue = 0;
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_master_terima_beli/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('terima_id') === values.terima_id) {
										return true;
									}
									return false;
								}
							);
							/* getV_master_terima_beli.getView().select(recordIndex); */
							getV_master_terima_beli.getSelectionModel().select(newRecordIndex);
							
							detailStore.removeAll();
						}
					});
					
					getV_master_terima_beli_form.setDisabled(true);
					getV_master_terima_beli.setDisabled(false);
					getMASTER_TERIMA_BELI.setActiveTab(getV_master_terima_beli);
				}
			});
		}
	},
	
	createV_master_terima_beli_form: function(){
		var getMASTER_TERIMA_BELI		= this.getMASTER_TERIMA_BELI();
		var getV_master_terima_beli 	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm(),
			values			= getV_master_terima_beli_form.getValues();
		var store 			= this.getStore('s_master_terima_beli');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_master_terima_beli/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_master_terima_beli_form.setDisabled(true);
					getV_master_terima_beli.setDisabled(false);
					getMASTER_TERIMA_BELI.setActiveTab(getV_master_terima_beli);
				}
			});
		}
	},
	
	cancelV_master_terima_beli_form: function(){
		var getMASTER_TERIMA_BELI		= this.getMASTER_TERIMA_BELI();
		var getV_master_terima_beli	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm();
		var getV_detail_terima_beli = this.getV_detail_terima_beli(),
			detailStore = getV_detail_terima_beli.getStore();
		
		form.reset();
		getV_master_terima_beli_form.setDisabled(true);
		getV_master_terima_beli.setDisabled(false);
		getMASTER_TERIMA_BELI.setActiveTab(getV_master_terima_beli);
		
		//remove record detail
		detailStore.removeAll();
	},
	
	saveprintV_master_terima_beli_form: function(){
		var getMASTER_TERIMA_BELI		= this.getMASTER_TERIMA_BELI();
		var getV_master_terima_beli 	= this.getV_master_terima_beli();
		var getV_master_terima_beli_form= this.getV_master_terima_beli_form(),
			form			= getV_master_terima_beli_form.getForm(),
			values			= getV_master_terima_beli_form.getValues();
		var store 			= this.getStore('s_master_terima_beli');
		var detailStore 	= this.getStore('s_detail_terima_beli');
		
		var arrDetail = [];
		detailStore.each(function(record){
			arrDetail.push(record.data);
		}, this);
		
		values.detail = arrDetail;
		values.printvalue = 1;
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_master_terima_beli/save',
				params: {data: jsonData},
				success: function(response){
					var objResponse = Ext.JSON.decode(response.responseText);
					Ext.MessageBox.show({
						title: 'Info',
						msg: objResponse.message,
						buttons: Ext.MessageBox.OK,
						icon: Ext.Msg.INFO
					});
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('terima_id') === values.terima_id) {
										return true;
									}
									return false;
								}
							);
							/* getV_master_terima_beli.getView().select(recordIndex); */
							getV_master_terima_beli.getSelectionModel().select(newRecordIndex);
							
							detailStore.removeAll();
						}
					});
					
					getV_master_terima_beli_form.setDisabled(true);
					getV_master_terima_beli.setDisabled(false);
					getMASTER_TERIMA_BELI.setActiveTab(getV_master_terima_beli);
					
					Ext.Ajax.request({
						method: 'POST',
						url: 'c_master_terima_beli/printForm',
						params: {terimaid: objResponse.data.terima_id},
						success: function(response){
							var rs = Ext.decode(response.responseText);
							if (rs.success) {
								win = window.open('./temp/master_terima_beli_form_'+rs.userid+'.html','master_terima_beli_form','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
							}else{
								Ext.MessageBox.show({
									title: 'Warning',
									msg: 'Unable to print the grid!',
									buttons: Ext.MessageBox.OK,
									animEl: 'save',
									icon: Ext.MessageBox.WARNING
								});
							}
						}
					});
				}
			});
		}
	},
	
	printV_master_terima_beli_form: function(){
		var getV_master_terima_beli_form	= this.getV_master_terima_beli_form(),
			form				= getV_master_terima_beli_form.getForm(),
			values				= getV_master_terima_beli_form.getValues();
		
		var terima_id = values.terima_id;
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_terima_beli/printForm',
			params: {terimaid: terima_id},
			success: function(response){
				var rs = Ext.decode(response.responseText);
				if (rs.success) {
					win = window.open('./temp/master_terima_beli_form_'+rs.userid+'.html','master_terima_beli_form','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
				}else{
					Ext.MessageBox.show({
						title: 'Warning',
						msg: 'Unable to print the grid!',
						buttons: Ext.MessageBox.OK,
						animEl: 'save',
						icon: Ext.MessageBox.WARNING
					});
				}
			}
		});
	},
	
	terima_status_fieldChange: function(field, newValue, oldValue){
		console.log(newValue);
		var getSaveBtnForm		= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		var getSavePrintBtnForm		= this.getSavePrintBtnForm();
		var getCreatePrintBtnForm	= this.getCreatePrintBtnForm();
		var getPrintBtnForm			= this.getPrintBtnForm();
		var getV_detail_terima_beli 	= this.getV_detail_terima_beli();
		
		getV_detail_terima_beli.terima_status_temp = newValue.terima_status;
		if (((oldValue.terima_status == 'Terbuka') || (oldValue.terima_status == 'Tertutup'))
			&& (newValue.terima_status == 'Batal')) {
			getPrintBtnForm.setDisabled(true);
			getSaveBtnForm.setDisabled(false);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(true);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_terima_beli.down('#btncreate').setDisabled(true);
			getV_detail_terima_beli.down('#btndelete').setDisabled(true);
		}else if (((oldValue.terima_status == 'Batal') || (oldValue.terima_status == 'Tertutup'))
			&& (newValue.terima_status == 'Terbuka')) {
			getPrintBtnForm.setDisabled(true);
			getSaveBtnForm.setDisabled(false);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(false);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_terima_beli.down('#btncreate').setDisabled(false);
		}else if (((oldValue.terima_status == 'Batal') || (oldValue.terima_status == 'Terbuka'))
			&& (newValue.terima_status == 'Tertutup')) {
			getPrintBtnForm.setDisabled(false);
			getSaveBtnForm.setDisabled(true);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(true);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_terima_beli.down('#btncreate').setDisabled(true);
			
			getV_detail_terima_beli.getSelectionModel().clearSelections();
		}
	}
	
});