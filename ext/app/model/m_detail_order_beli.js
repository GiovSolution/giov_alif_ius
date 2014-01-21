Ext.define('YMPI.model.m_detail_order_beli', {
	extend: 'Ext.data.Model',
	alias		: 'widget.detail_order_beliModel',
	fields		: ['dorder_id','dorder_master','dorder_produk','dorder_satuan','dorder_jumlah','dorder_harga','dorder_diskon','dorder_harga_log'],
	idProperty	: 'dorder_id'	
});