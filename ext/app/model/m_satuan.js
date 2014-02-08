Ext.define('INVENT.model.m_satuan', {
	extend: 'Ext.data.Model',
	alias		: 'widget.satuanModel',
	fields		: ['satuan_id','satuan_kode','satuan_nama','satuan_aktif','satuan_creator','satuan_date_create','satuan_update','satuan_date_update','satuan_revised'],
	idProperty	: 'satuan_id'	
});