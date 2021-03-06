Ext.define('INVENT.controller.MASTER_ORDER_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_master_order_beli','TRANSAKSI.v_master_order_beli_form'],
	models: ['m_master_order_beli'],
	stores: ['s_master_order_beli','s_detail_order_beli','INVENT.store.s_supplier'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_master_order_beli',
		selector: 'v_master_order_beli'
	}, {
		ref: 'V_master_order_beli_form',
		selector: 'v_master_order_beli_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_master_order_beli_form #saveall'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_master_order_beli_form #createall'
	}, {
		ref: 'SavePrintBtnForm',
		selector: 'v_master_order_beli_form #saveprintall'
	}, {
		ref: 'CreatePrintBtnForm',
		selector: 'v_master_order_beli_form #createprintall'
	}, {
		ref: 'PrintBtnForm',
		selector: 'v_master_order_beli_form #printall'
	}, {
		ref: 'MASTER_ORDER_BELI',
		selector: 'MASTER_ORDER_BELI'
	}, {
		ref: 'V_detail_order_beli',
		selector: 'v_detail_order_beli'
	}],


	init: function(){
		this.control({
			'MASTER_ORDER_BELI': {
				'afterrender': this.master_order_beliAfterRender
			},
			'v_master_order_beli': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListmaster_order_beli,
				'afterrender': this.v_master_order_beliAfterRender
			},
			'v_master_order_beli_form': {
				'afterrender': this.v_master_order_beli_formAfterRender
			},
			'v_master_order_beli button[action=create]': {
				click: this.createRecord
			},
			'v_master_order_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'v_master_order_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_master_order_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_master_order_beli button[action=print]': {
				click: this.printRecords
			},
			'v_master_order_beli_form button[action=saveall]': {
				click: this.saveV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=createall]': {
				click: this.saveV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=cancelall]': {
				click: this.cancelV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=saveprintall]': {
				click: this.saveprintV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=createprintall]': {
				click: this.saveprintV_master_order_beli_form
			},
			'v_master_order_beli_form button[action=printall]': {
				click: this.printV_master_order_beli_form
			},
			'v_master_order_beli_form #order_status_field': {
				change: this.order_status_fieldChange
			},
			'v_detail_order_beli': {
				'edit': this.aftereditV_detail_order_beli,
				'validateedit': function(){
					//console.log('valid');
				},
				'canceledit': this.canceleditV_detail_order_beli
			}
		});
	},
	
	v_master_order_beliAfterRender: function(window, options){
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
		
		var getV_master_order_beli	= this.getV_master_order_beli();
		var myGridView = getV_master_order_beli.getView();
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
					var getstore = me.getV_master_order_beli().getStore();
					var selection = me.getV_master_order_beli().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "order_id" = "'+selection.data.order_id+'"?', function(btn){
							if (btn == 'yes'){
								getstore.remove(selection);
								getstore.sync();
							}
						});
						
					}
				}
			}]
		});
		
		getV_master_order_beli.focus(false, true);
	},
	
	v_master_order_beli_formAfterRender: function(window, options){
		var me = this;
		
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el,
			binding: [{
				key: 13,
				ctrl: true,
				fn: function(){
					console.log('enter ekey');
					me.saveV_master_order_beli_form();
				},
				scope: this
			}, {
				key: 27,
				shift: true,
				fn: function(){
					console.log('escape ekey');
					me.cancelV_master_order_beli_form();
				},
				scope: this
			}]
		});
	},
	
	master_order_beliAfterRender: function(window, options){
		var me = this;
		
		var master_order_beliStore = this.getV_master_order_beli().getStore();
		master_order_beliStore.load();
		
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
		var getV_master_order_beli		= this.getV_master_order_beli();
		var getV_master_order_beli_form	= this.getV_master_order_beli_form(),
			form						= getV_master_order_beli_form.getForm();
		var getV_detail_order_beli		= this.getV_detail_order_beli();
		var getSaveBtnForm				= this.getSaveBtnForm();
		var getSavePrintBtnForm			= this.getSavePrintBtnForm();
		var getCreateBtnForm			= this.getCreateBtnForm();
		var getCreatePrintBtnForm		= this.getCreatePrintBtnForm();
		var getPrintBtnForm				= this.getPrintBtnForm();
		var order_status_field 			= getV_master_order_beli_form.down('#order_status_field').items.items;
		
		/* Create No. Faktur */
		var datenow = new Date();
		var getdate = datenow.getDate();
		var getmonth = datenow.getMonth() + 1;
		var getyear = datenow.getFullYear();
		var gethour = datenow.getHours();
		var getminute = datenow.getMinutes();
		var now = Ext.Date.format(new Date(), 'Ymd.Hi');
		var nofaktur = 'OD'+now;
		
		/* grid-panel */
		getV_master_order_beli.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_master_order_beli_form.down('#order_id_field').setReadOnly(false);
		getV_master_order_beli_form.down('#order_no_field').focus(false, true);
		getV_master_order_beli_form.down('#order_no_field').setValue(nofaktur);
		getV_master_order_beli_form.down('#order_tanggal_field').setValue(datenow);
		getSaveBtnForm.setDisabled(true);
		getSavePrintBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getCreatePrintBtnForm.setDisabled(false);
		getPrintBtnForm.setDisabled(true);
		getV_master_order_beli_form.setDisabled(false);
		//getV_master_order_beli_form.focus(false, true);
		order_status_field[0].setReadOnly(true); //radio "terbuka"
		order_status_field[1].setReadOnly(true); //radio "tertutup"
		order_status_field[2].setReadOnly(true); //radio "batal"
		
		//detail panel
		getV_detail_order_beli.down('#btncreate').setDisabled(true);
		
		this.getMASTER_ORDER_BELI().setActiveTab(getV_master_order_beli_form);
	},
	
	enableDelete: function(dataview, selections){
		this.getV_master_order_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListmaster_order_beli: function(me, record, item, index, e){
		var getMASTER_ORDER_BELI	= this.getMASTER_ORDER_BELI();
		var getV_master_order_beli	= this.getV_master_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form					= getV_master_order_beli_form.getForm();
		var getV_detail_order_beli	= this.getV_detail_order_beli();
		var getSaveBtnForm			= this.getSaveBtnForm();
		var getCreateBtnForm		= this.getCreateBtnForm();
		var getSavePrintBtnForm		= this.getSavePrintBtnForm();
		var getCreatePrintBtnForm	= this.getCreatePrintBtnForm();
		var getPrintBtnForm			= this.getPrintBtnForm();
		var order_status_field 		= getV_master_order_beli_form.down('#order_status_field').items.items;
		var supplierStore			= this.getStore('INVENT.store.s_supplier');
		
		if ((record.data.order_status == 'Tertutup') || (record.data.order_status == 'Batal')) {
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
		getV_master_order_beli_form.down('#order_id_field').setReadOnly(true);
		
		supplierStore.getProxy().extraParams.query = record.data.order_supplier;
		supplierStore.load({
			scope: this,
			callback: function(recordsSupplier, operation, success) {
				if (success) {
					var task = new Ext.util.DelayedTask(function(){
						getV_master_order_beli_form.loadRecord(record);
					});
					task.delay(10);
				}
			}
		});
		
		
		getV_master_order_beli.setDisabled(true);
		getV_master_order_beli_form.setDisabled(false);
		getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli_form);
		
		if ((record.data.order_status == 'Terbuka') || (record.data.order_status == 'Batal')) {
			order_status_field[0].setReadOnly(false);
			order_status_field[1].setReadOnly(true);
			order_status_field[2].setReadOnly(false);
		}else{
			order_status_field[0].setReadOnly(false);
			order_status_field[1].setReadOnly(false);
			order_status_field[2].setReadOnly(false);
		}
		
		/* GRID DETAIL start */
		// DETAIL Load Store
		var detailStore = getV_detail_order_beli.getStore();
		detailStore.getProxy().extraParams.masterid = record.data.order_id;
		detailStore.load();
		
		getV_detail_order_beli.down('#btncreate').setDisabled(false);
		/* GRID DETAIL end */
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_master_order_beli().getStore();
		var selection = this.getV_master_order_beli().getSelectionModel().getSelection()[0];
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
		var getstore = this.getV_master_order_beli().getStore();
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
		var getstore = this.getV_master_order_beli().getStore();
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
		var getstore = this.getV_master_order_beli().getStore();
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
		var getV_master_order_beli 	= this.getV_master_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm(),
			values			= getV_master_order_beli_form.getValues();
		var store 			= this.getStore('s_master_order_beli');
		var detailStore 	= this.getStore('s_detail_order_beli');
		
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
							/* getV_master_order_beli.getView().select(recordIndex); */
							getV_master_order_beli.getSelectionModel().select(newRecordIndex);
							
							detailStore.removeAll();
						}
					});
					
					getV_master_order_beli_form.setDisabled(true);
					getV_master_order_beli.setDisabled(false);
					getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli);
				}
			});
		}
	},
	
	createV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getV_master_order_beli 	= this.getV_master_order_beli();
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
					getV_master_order_beli.setDisabled(false);
					getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli);
				}
			});
		}
	},
	
	cancelV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getV_master_order_beli	= this.getV_master_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm();
		var getV_detail_order_beli = this.getV_detail_order_beli(),
			detailStore = getV_detail_order_beli.getStore();
		
		form.reset();
		getV_master_order_beli_form.setDisabled(true);
		getV_master_order_beli.setDisabled(false);
		getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli);
		getV_master_order_beli.focus(false, true);
		
		//remove record detail
		detailStore.removeAll();
	},
	
	aftereditV_detail_order_beli: function(editor, e){
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm();
		var getV_detail_order_beli	= this.getV_detail_order_beli(),
			detailStore 	= getV_detail_order_beli.getStore();
		
		var total = 0;
		e.grid.getStore().each(function(rec){
			var data = rec.data;
			total+=((data.dorder_harga * ((100 - data.dorder_diskon)/100)) * data.dorder_jumlah);
		});
		
		getV_master_order_beli_form.down('#order_totalbiaya_cffield').setValue(total);
		getV_master_order_beli_form.down('#order_dp_cffield').setValue(0);
		getV_master_order_beli_form.down('#order_sisa_bayar_cffield').setValue(total);
	},
	
	canceleditV_detail_order_beli: function(editor, e){
		var getV_master_order_beli_form= this.getV_master_order_beli_form();
		getV_master_order_beli_form.down('#order_dp_cffield').focus(false, true);
	},
	
	saveprintV_master_order_beli_form: function(){
		var getMASTER_ORDER_BELI		= this.getMASTER_ORDER_BELI();
		var getV_master_order_beli 	= this.getV_master_order_beli();
		var getV_master_order_beli_form= this.getV_master_order_beli_form(),
			form			= getV_master_order_beli_form.getForm(),
			values			= getV_master_order_beli_form.getValues();
		var store 			= this.getStore('s_master_order_beli');
		var detailStore 	= this.getStore('s_detail_order_beli');
		
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
				url: 'c_master_order_beli/save',
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
									if (record.get('order_id') === values.order_id) {
										return true;
									}
									return false;
								}
							);
							/* getV_master_order_beli.getView().select(recordIndex); */
							getV_master_order_beli.getSelectionModel().select(newRecordIndex);
							
							detailStore.removeAll();
						}
					});
					
					getV_master_order_beli_form.setDisabled(true);
					getV_master_order_beli.setDisabled(false);
					getMASTER_ORDER_BELI.setActiveTab(getV_master_order_beli);
					
					Ext.Ajax.request({
						method: 'POST',
						url: 'c_master_order_beli/printForm',
						params: {orderid: objResponse.data.order_id},
						success: function(response){
							var rs = Ext.decode(response.responseText);
							if (rs.success) {
								win = window.open('./temp/master_order_beli_form_'+rs.userid+'.html','master_order_beli_form','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	printV_master_order_beli_form: function(){
		var getV_master_order_beli_form	= this.getV_master_order_beli_form(),
			form				= getV_master_order_beli_form.getForm(),
			values				= getV_master_order_beli_form.getValues();
		
		var order_id = values.order_id;
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_master_order_beli/printForm',
			params: {orderid: order_id},
			success: function(response){
				var rs = Ext.decode(response.responseText);
				if (rs.success) {
					win = window.open('./temp/master_order_beli_form_'+rs.userid+'.html','master_order_beli_form','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	order_status_fieldChange: function(field, newValue, oldValue){
		console.log(newValue);
		var getSaveBtnForm		= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		var getSavePrintBtnForm		= this.getSavePrintBtnForm();
		var getCreatePrintBtnForm	= this.getCreatePrintBtnForm();
		var getPrintBtnForm			= this.getPrintBtnForm();
		var getV_detail_order_beli 	= this.getV_detail_order_beli();
		
		getV_detail_order_beli.order_status_temp = newValue.order_status;
		if (((oldValue.order_status == 'Terbuka') || (oldValue.order_status == 'Tertutup'))
			&& (newValue.order_status == 'Batal')) {
			getPrintBtnForm.setDisabled(true);
			getSaveBtnForm.setDisabled(false);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(true);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_order_beli.down('#btncreate').setDisabled(true);
			getV_detail_order_beli.down('#btndelete').setDisabled(true);
		}else if (((oldValue.order_status == 'Batal') || (oldValue.order_status == 'Tertutup'))
			&& (newValue.order_status == 'Terbuka')) {
			getPrintBtnForm.setDisabled(true);
			getSaveBtnForm.setDisabled(false);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(false);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_order_beli.down('#btncreate').setDisabled(false);
		}else if (((oldValue.order_status == 'Batal') || (oldValue.order_status == 'Terbuka'))
			&& (newValue.order_status == 'Tertutup')) {
			getPrintBtnForm.setDisabled(false);
			getSaveBtnForm.setDisabled(true);
			getCreateBtnForm.setDisabled(true);
			getSavePrintBtnForm.setDisabled(true);
			getCreatePrintBtnForm.setDisabled(true);
			
			getV_detail_order_beli.down('#btncreate').setDisabled(true);
			
			getV_detail_order_beli.getSelectionModel().clearSelections();
		}
	}
	
});