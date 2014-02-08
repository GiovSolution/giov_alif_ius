Ext.define('INVENT.model.m_detail_order_beli', {
	extend: 'Ext.data.Model',
	alias		: 'widget.detail_order_beliModel',
	fields		: ['dorder_id','dorder_master'
				   ,'dorder_produk','dorder_produk_nama'
				   ,'dorder_satuan','dorder_satuan_nama'
				   ,'dorder_jumlah','dorder_harga','dorder_diskon','dorder_harga_log'
				   ,'dorder_subtotal']	
});