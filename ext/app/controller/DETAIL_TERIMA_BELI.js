Ext.define('INVENT.controller.DETAIL_TERIMA_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_detail_terima_beli'],
	models: ['m_detail_terima_beli'],
	stores: ['s_detail_terima_beli'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'V_detail_terima_beli',
		selector: 'v_detail_terima_beli'
	}],


	init: function(){
		this.control({
			'v_detail_terima_beli': {
				'afterrender': this.detail_terima_beliAfterRender,
				'selectionchange': this.enableDelete,
				'beforeselect': this.beforeselectGrid,
				'beforeedit': this.beforeeditGrid
			},
			'v_detail_terima_beli button[action=create]': {
				click: this.createRecord
			},
			'v_detail_terima_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'v_detail_terima_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'v_detail_terima_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'v_detail_terima_beli button[action=print]': {
				click: this.printRecords
			}
		});
	},
	
	detail_terima_beliAfterRender: function(){
		var me = this;
		
		var detail_terima_beliStore = this.getV_detail_terima_beli().getStore();
		//detail_terima_beliStore.load();
		
		var getV_detail_terima_beli	= this.getV_detail_terima_beli();
		var myGridView = getV_detail_terima_beli.getView();
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
					var getstore = me.getV_detail_terima_beli().getStore();
					var selection = me.getV_detail_terima_beli().getSelectionModel().getSelection()[0];
					
					if(selection){
						Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "dterima_id" = "'+selection.data.dterima_id+'"?', function(btn){
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
		var model		= Ext.ModelMgr.getModel('INVENT.model.m_detail_terima_beli');
		var r = Ext.ModelManager.create({
			dterima_id: 0,
			dterima_produk: '',
			dterima_produk_nama: '',
			dterima_satuan: '',
			dterima_satuan_nama: '',
			dterima_jumlah: 0,
			dterima_harga: 0,
			dterima_diskon: 0,
			dterima_no_batch: '',
			dterima_expired_date: '',
			dterima_keterangan: ''
		}, model);
		this.getV_detail_terima_beli().getStore().insert(0, r);
		this.getV_detail_terima_beli().rowEditing.startEdit(0,0);
	},
	
	enableDelete: function(dataview, selections){
		this.getV_detail_terima_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	beforeselectGrid: function(thisme, record, index){
		var getV_detail_terima_beli = this.getV_detail_terima_beli(),
			terima_status = getV_detail_terima_beli.terima_status_temp;
		
		if ((terima_status == 'Tertutup') || (terima_status == 'Batal')) {
			return false;
		}else{
			return true;
		}
	},
	
	beforeeditGrid: function(editor, e){
		var getV_detail_terima_beli = this.getV_detail_terima_beli(),
			rowediting_status = getV_detail_terima_beli.rowediting_status,
			terima_status = getV_detail_terima_beli.terima_status_temp;
		var produkStore = this.getStore('INVENT.store.s_produk');
		var satuanStore = this.getStore('INVENT.store.s_satuan');
		
		produkStore.getProxy().extraParams.query = e.record.data.dterima_produk;
		produkStore.load();
		
		satuanStore.getProxy().extraParams.masterid = e.record.data.dterima_produk;
		satuanStore.load();
		
		if ((rowediting_status == 'undefined') || (rowediting_status == 'afterediting')) {
			if ((terima_status == 'Tertutup') || (terima_status == 'Batal')) {
				return false;
			}else{
				rowediting_status = 'editing';
				return true;
			}
		}
		return false;
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getV_detail_terima_beli().getStore();
		var selection = this.getV_detail_terima_beli().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: dterima_id = "'+selection.data.dterima_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getV_detail_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_terima_beli/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getV_detail_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_terima_beli/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/detail_terima_beli.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getV_detail_terima_beli().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_detail_terima_beli/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/detail_terima_beli.html','detail_terima_beli_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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