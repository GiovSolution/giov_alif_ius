Ext.define('INVENT.controller.PRODUK',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_produk','MASTER.v_produk_form'],
	models: ['m_produk'],
	stores: ['s_produk'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_produk',
		selector: 'v_produk'
	}, {
		ref: 'V_produk_form',
		selector: 'v_produk_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_produk_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_produk_form #create'
	}, {
		ref: 'PRODUK',
		selector: 'PRODUK'
	}],


	init: function(){
		this.control({
			'PRODUK': {
				'afterrender': this.produkAfterRender
			},
			'v_produk': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updatev_produk,
				'afterrender': this.v_produkAfterRender
			},
			'v_produk_form': {
				'afterrender': this.v_produk_formAfterRender
			},
			'v_produk button[action=create]': {
				click: this.createRecord
			},
			'v_produk button[action=delete]': {
				click: this.deleteRecord
			},
			'v_produk button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_produk button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_produk button[action=print]': {
				click: this.printRecords
			},
			'v_produk_form button[action=save]': {
				click: this.saveV_produk_form
			},
			'v_produk_form button[action=create]': {
				click: this.saveV_produk_form
			},
			'v_produk_form button[action=cancel]': {
				click: this.cancelV_produk_form
			}
		});
	},
	
	produkAfterRender: function(){
		var me = this;
		
		var produkStore = this.getV_produk().getStore();
		produkStore.load();
		
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
	
	v_produkAfterRender: function(window, options){
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
		
		var getV_produk	= this.getV_produk();
		var myGridView = getV_produk.getView();
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
					var getstore = me.getV_produk().getStore();
					var selection = me.getV_produk().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "produk_id" = "'+selection.data.produk_id+'"?', function(btn){
							if (btn == 'yes'){
								getstore.remove(selection);
								getstore.sync();
							}
						});
						
					}
				}
			}]
		});
		
		getV_produk.focus(false, true);
	},
	
	v_produk_formAfterRender: function(window, options){
		var me = this;
		
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el,
			binding: [{
				key: 13,
				ctrl: true,
				fn: function(){
					console.log('enter ekey');
					me.saveV_produk_form();
				},
				scope: this
			}, {
				key: 27,
				shift: true,
				fn: function(){
					console.log('escape ekey');
					me.cancelV_produk_form();
				},
				scope: this
			}]
		});
	},
	
	createRecord: function(){
		var getV_produk	= this.getV_produk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getV_produk.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_produk_form.down('#produk_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_produk_form.setDisabled(false);
		
		this.getPRODUK().setActiveTab(getV_produk_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getV_produk().down('#btndelete').setDisabled(!selections.length);
	},
	
	updatev_produk: function(me, record, item, index, e){
		var getPRODUK		= this.getPRODUK();
		var getV_produk	= this.getV_produk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_produk_form.down('#produk_id_field').setReadOnly(true);		
		getV_produk_form.loadRecord(record);
		
		getV_produk.setDisabled(true);
		getV_produk_form.setDisabled(false);
		getPRODUK.setActiveTab(getV_produk_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_produk().getStore();
		var selection = this.getV_produk().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "produk_id" = "'+selection.data.produk_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_produk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_produk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/produk.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_produk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/produk.html','produk_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getV_produk 	= this.getV_produk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm(),
			values			= getV_produk_form.getValues();
		var store 			= this.getStore('s_produk');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_produk/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('produk_id') === values.produk_id) {
										return true;
									}
									return false;
								}
							);
							/* getV_produk.getView().select(recordIndex); */
							getV_produk.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_produk_form.setDisabled(true);
					getV_produk.setDisabled(false);
					getPRODUK.setActiveTab(getV_produk);
				}
			});
		}
	},
	
	createV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getV_produk 	= this.getV_produk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm(),
			values			= getV_produk_form.getValues();
		var store 			= this.getStore('s_produk');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_produk/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_produk_form.setDisabled(true);
					getV_produk.setDisabled(false);
					getPRODUK.setActiveTab(getV_produk);
				}
			});
		}
	},
	
	cancelV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getV_produk	= this.getV_produk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
			
		form.reset();
		getV_produk_form.setDisabled(true);
		getV_produk.setDisabled(false);
		getV_produk.focus(false, true);
		getPRODUK.setActiveTab(getV_produk);
	}
	
});