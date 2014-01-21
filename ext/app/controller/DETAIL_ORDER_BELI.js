Ext.define('YMPI.controller.DETAIL_ORDER_BELI',{
	extend: 'Ext.app.Controller',
	views: ['TRANSAKSI.v_detail_order_beli'],
	models: ['m_detail_order_beli'],
	stores: ['s_detail_order_beli'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listdetail_order_beli',
		selector: 'Listdetail_order_beli'
	}],


	init: function(){
		this.control({
			'Listdetail_order_beli': {
				'afterrender': this.detail_order_beliAfterRender,
				'selectionchange': this.enableDelete
			},
			'Listdetail_order_beli button[action=create]': {
				click: this.createRecord
			},
			'Listdetail_order_beli button[action=delete]': {
				click: this.deleteRecord
			},
			'Listdetail_order_beli button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listdetail_order_beli button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listdetail_order_beli button[action=print]': {
				click: this.printRecords
			}
		});
	},
	
	detail_order_beliAfterRender: function(){
		var detail_order_beliStore = this.getListdetail_order_beli().getStore();
		detail_order_beliStore.load();
	},
	
	createRecord: function(){
		var model		= Ext.ModelMgr.getModel('YMPI.model.m_detail_order_beli');
		var r = Ext.ModelManager.create({
		dorder_id		: '',dorder_master		: '',dorder_produk		: '',dorder_satuan		: '',dorder_jumlah		: '',dorder_harga		: '',dorder_diskon		: '',dorder_harga_log		: ''}, model);
		this.getListdetail_order_beli().getStore().insert(0, r);
		this.getListdetail_order_beli().rowEditing.startEdit(0,0);
	},
	
	enableDelete: function(dataview, selections){
		this.getListdetail_order_beli().down('#btndelete').setDisabled(!selections.length);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListdetail_order_beli().getStore();
		var selection = this.getListdetail_order_beli().getSelectionModel().getSelection()[0];
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
		var getstore = this.getListdetail_order_beli().getStore();
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
		var getstore = this.getListdetail_order_beli().getStore();
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
		var getstore = this.getListdetail_order_beli().getStore();
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