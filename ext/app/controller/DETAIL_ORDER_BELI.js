Ext.define('INVENT.controller.DETAIL_ORDER_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_detail_order_beli'],
	models: ['m_detail_order_beli'],
	stores: ['s_detail_order_beli','INVENT.store.s_produk','INVENT.store.s_satuan'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_detail_order_beli',
		selector: 'v_detail_order_beli'
	}],


	init: function(){
		this.control({
			'v_detail_order_beli': {
				'afterrender': this.detail_order_beliAfterRender,
				'selectionchange': this.enableDelete,
				'beforeselect': this.beforeselectGrid,
				'beforeedit': this.beforeeditGrid
			},
			'v_detail_order_beli button[action=create]': {
				click: this.createRecord
			},
			'v_detail_order_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'v_detail_order_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_detail_order_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_detail_order_beli button[action=print]': {
				click: this.printRecords
			}
		});
	},
	
	detail_order_beliAfterRender: function(){
		var me = this;
		
		var detail_order_beliStore = this.getV_detail_order_beli().getStore();
		//detail_order_beliStore.load();
		
		var getV_detail_order_beli	= this.getV_detail_order_beli();
		var myGridView = getV_detail_order_beli.getView();
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
					var getstore = me.getV_detail_order_beli().getStore();
					var selection = me.getV_detail_order_beli().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "dorder_id" = "'+selection.data.dorder_id+'"?', function(btn){
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
		var getV_detail_order_beli = this.getV_detail_order_beli();
		getV_detail_order_beli.columns[1].field.reset();
		var model		= Ext.ModelMgr.getModel('INVENT.model.m_detail_order_beli');
		var r = Ext.ModelManager.create({
			dorder_id: 0,
			dorder_master: '',
			dorder_produk: '',
			dorder_satuan: '',
			dorder_jumlah: 0,
			dorder_harga: 0,
			dorder_diskon: 0,
			dorder_harga_log: ''
		}, model);
		this.getV_detail_order_beli().getStore().insert(0, r);
		this.getV_detail_order_beli().rowEditing.startEdit(0,0);
	},
	
	enableDelete: function(dataview, selections){
		this.getV_detail_order_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	beforeselectGrid: function(thisme, record, index){
		var getV_detail_order_beli = this.getV_detail_order_beli(),
			order_status = getV_detail_order_beli.order_status_temp;
		
		if ((order_status == 'Tertutup') || (order_status == 'Batal')) {
			return false;
		}else{
			return true;
		}
	},
	
	beforeeditGrid: function(editor, e){
		var getV_detail_order_beli = this.getV_detail_order_beli(),
			rowediting_status = getV_detail_order_beli.rowediting_status,
			order_status = getV_detail_order_beli.order_status_temp;
		var produkStore = this.getStore('INVENT.store.s_produk');
		var satuanStore = this.getStore('INVENT.store.s_satuan');
		
		produkStore.getProxy().extraParams.query = e.record.data.dorder_produk;
		produkStore.load();
		
		satuanStore.getProxy().extraParams.masterid = e.record.data.dorder_produk;
		satuanStore.load();
		
		if ((rowediting_status == 'undefined') || (rowediting_status == 'afterediting')) {
			if ((order_status == 'Tertutup') || (order_status == 'Batal')) {
				return false;
			}else{
				rowediting_status = 'editing';
				return true;
			}
		}
		return false;
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_detail_order_beli().getStore();
		var selection = this.getV_detail_order_beli().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: dorder_id = "'+selection.data.dorder_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_detail_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_order_beli/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_detail_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_order_beli/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/detail_order_beli.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_detail_order_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_order_beli/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/detail_order_beli.html','detail_order_beli_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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