Ext.define('INVENT.controller.GUDANG',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_gudang','MASTER.v_gudang_form'],
	models: ['m_gudang'],
	stores: ['s_gudang'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_gudang',
		selector: 'v_gudang'
	}, {
		ref: 'V_gudang_form',
		selector: 'v_gudang_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_gudang_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_gudang_form #create'
	}, {
		ref: 'GUDANG',
		selector: 'GUDANG'
	}],


	init: function(){
		this.control({
			'GUDANG': {
				'afterrender': this.gudangAfterRender
			},
			'v_gudang': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListgudang,
				'afterrender': this.v_gudangAfterRender
			},
			'v_gudang_form': {
				'afterrender': this.v_gudang_formAfterRender
			},
			'v_gudang button[action=create]': {
				click: this.createRecord
			},
			'v_gudang button[action=delete]': {
				click: this.deleteRecord
			},
			'v_gudang button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_gudang button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_gudang button[action=print]': {
				click: this.printRecords
			},
			'v_gudang_form button[action=save]': {
				click: this.saveV_gudang_form
			},
			'v_gudang_form button[action=create]': {
				click: this.saveV_gudang_form
			},
			'v_gudang_form button[action=cancel]': {
				click: this.cancelV_gudang_form
			}
		});
	},
	
	v_gudangAfterRender: function(window, options){
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
		
		var getV_gudang	= this.getV_gudang();
		var myGridView = getV_gudang.getView();
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
					var getstore = me.getV_gudang().getStore();
					var selection = me.getV_gudang().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "gudang_id" = "'+selection.data.gudang_id+'"?', function(btn){
							if (btn == 'yes'){
								getstore.remove(selection);
								getstore.sync();
							}
						});
						
					}
				}
			}]
		});
		
		getV_gudang.focus(false, true);
	},
	
	v_gudang_formAfterRender: function(window, options){
		var me = this;
		
		var map = Ext.create('Ext.util.KeyMap', {
			target: window.el,
			binding: [{
				key: 13,
				ctrl: true,
				fn: function(){
					console.log('enter ekey');
					me.saveV_gudang_form();
				},
				scope: this
			}, {
				key: 27,
				shift: true,
				fn: function(){
					console.log('escape ekey');
					me.cancelV_gudang_form();
				},
				scope: this
			}]
		});
	},
	
	gudangAfterRender: function(window, options){
		var me = this;
		
		var gudangStore = this.getV_gudang().getStore();
		gudangStore.load();
		
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
		var getV_gudang	= this.getV_gudang();
		var getV_gudang_form= this.getV_gudang_form(),
			form			= getV_gudang_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getV_gudang.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_gudang_form.down('#gudang_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_gudang_form.setDisabled(false);
		
		this.getGUDANG().setActiveTab(getV_gudang_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getV_gudang().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListgudang: function(me, record, item, index, e){
		var getGUDANG		= this.getGUDANG();
		var getV_gudang	= this.getV_gudang();
		var getV_gudang_form= this.getV_gudang_form(),
			form			= getV_gudang_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_gudang_form.down('#gudang_id_field').setReadOnly(true);		
		getV_gudang_form.loadRecord(record);
		
		getV_gudang.setDisabled(true);
		getV_gudang_form.setDisabled(false);
		getGUDANG.setActiveTab(getV_gudang_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_gudang().getStore();
		var selection = this.getV_gudang().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "gudang_id" = "'+selection.data.gudang_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_gudang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_gudang/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_gudang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_gudang/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/gudang.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_gudang().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_gudang/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/gudang.html','gudang_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_gudang_form: function(){
		var getGUDANG		= this.getGUDANG();
		var getV_gudang 	= this.getV_gudang();
		var getV_gudang_form= this.getV_gudang_form(),
			form			= getV_gudang_form.getForm(),
			values			= getV_gudang_form.getValues();
		var store 			= this.getStore('s_gudang');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_gudang/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('gudang_id') === values.gudang_id) {
										return true;
									}
									return false;
								}
							);
							/* getV_gudang.getView().select(recordIndex); */
							getV_gudang.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_gudang_form.setDisabled(true);
					getV_gudang.setDisabled(false);
					getGUDANG.setActiveTab(getV_gudang);
				}
			});
		}
	},
	
	createV_gudang_form: function(){
		var getGUDANG		= this.getGUDANG();
		var getV_gudang 	= this.getV_gudang();
		var getV_gudang_form= this.getV_gudang_form(),
			form			= getV_gudang_form.getForm(),
			values			= getV_gudang_form.getValues();
		var store 			= this.getStore('s_gudang');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_gudang/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_gudang_form.setDisabled(true);
					getV_gudang.setDisabled(false);
					getGUDANG.setActiveTab(getV_gudang);
				}
			});
		}
	},
	
	cancelV_gudang_form: function(){
		var getGUDANG		= this.getGUDANG();
		var getV_gudang	= this.getV_gudang();
		var getV_gudang_form= this.getV_gudang_form(),
			form			= getV_gudang_form.getForm();
			
		form.reset();
		getV_gudang_form.setDisabled(true);
		getV_gudang.setDisabled(false);
		getGUDANG.setActiveTab(getV_gudang);
	}
	
});