Ext.define('INVENT.model.m_gudang', {
	extend: 'Ext.data.Model',
	alias		: 'widget.gudangModel',
	fields		: ['gudang_id','gudang_nama','gudang_posisi','gudang_aktif','gudang_creator','gudang_date_create','gudang_update','gudang_date_update','gudang_revised'],
	idProperty	: 'gudang_id'	
});