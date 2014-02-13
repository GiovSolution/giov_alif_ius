Ext.define('INVENT.model.m_detail_terima_beli', {
	extend: 'Ext.data.Model',
	alias		: 'widget.detail_terima_beliModel',
	fields		: ['dterima_id','dterima_master'
				   ,'dterima_produk','dterima_produk_nama'
				   ,'dterima_satuan','dterima_satuan_nama'
				   ,'dterima_jumlah','dterima_harga','dterima_diskon','dterima_no_batch'
				   ,'dterima_expired_date'
				   ,'dterima_keterangan'
				   ,'dterima_subtotal']	
});