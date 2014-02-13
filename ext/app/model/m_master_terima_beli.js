Ext.define('INVENT.model.m_master_terima_beli', {
	extend: 'Ext.data.Model',
	alias		: 'widget.master_terima_beliModel',
	fields		: ['terima_id','terima_no','terima_order_id','terima_supplier'
				   ,'terima_surat_jalan','terima_pengirim','terima_tanggal'
				   ,'terima_keterangan','terima_gudang_id','terima_status'
				   ,'terima_creator','terima_date_create','terima_updater'
				   ,'terima_date_update','terima_revised'
				   ,'order_no','supplier_nama'],
	idProperty	: 'terima_id'	
});