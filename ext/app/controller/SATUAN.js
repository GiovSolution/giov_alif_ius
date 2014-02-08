Ext.define('INVENT.controller.SATUAN',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_satuan'],
	models: ['m_satuan'],
	stores: ['s_satuan'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_satuan',
		selector: 'v_satuan'
	}],


	init: function(){
		this.control({
			'v_satuan': {
				'afterrender': this.satuanAfterRender,
				'selectionchange': this.enableDelete
			},
			'v_satuan button[action=create]': {
				click: this.createRecord
			},
			'v_satuan button[action=delete]': {
				click: this.deleteRecord
			},
			'v_satuan button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_satuan button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_satuan button[action=print]': {
				click: this.printRecords
			}
		});
	},
	
	satuanAfterRender: function(){
		var me = this;
		
		var satuanStore = this.getV_satuan().getStore();
		satuanStore.load();
		
		var getV_satuan	= this.getV_satuan();
		var myGridView = getV_satuan.getView();
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
			binding: {
				key: Ext.EventObject.DELETE,
				fn: function(keyCode, e) {
					var getstore = me.getV_satuan().getStore();
					var selection = me.getV_satuan().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "satuan_id" = "'+selection.data.satuan_id+'"?', function(btn){
							if (btn == 'yes'){
								getstore.remove(selection);
								getstore.sync();
							}
						});
						
					}
				}
			}
		});
	},
	
	createRecord: function(){
		var model		= Ext.ModelMgr.getModel('INVENT.model.m_satuan');
		var r = Ext.ModelManager.create({
		satuan_id		: '',satuan_kode		: '',satuan_nama		: '',satuan_aktif		: '',satuan_creator		: '',satuan_date_create		: '',satuan_update		: '',satuan_date_update		: '',satuan_revised		: ''}, model);
		this.getV_satuan().getStore().insert(0, r);
		this.getV_satuan().rowEditing.startEdit(0,0);
	},
	
	enableDelete: function(dataview, selections){
		this.getV_satuan().down('#btndelete').setDisabled(!selections.length);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_satuan().getStore();
		var selection = this.getV_satuan().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: satuan_id = "'+selection.data.satuan_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_satuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_satuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/satuan.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_satuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/satuan.html','satuan_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	}
	
});