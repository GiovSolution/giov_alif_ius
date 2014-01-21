Ext.define('YMPI.model.m_cabang', {
	extend: 'Ext.data.Model',
	alias		: 'widget.cabangModel',
	fields		: ['cabang_id','cabang_nama','cabang_alamat','cabang_kota','cabang_kodepos','cabang_propinsi','cabang_keterangan','cabang_aktif','cabang_creator','cabang_date_create','cabang_update','cabang_date_update','cabang_revised','cabang_value','cabang_kode','cabang_kode_akun','cabang_pajak'],
	idProperty	: 'cabang_id'	
});