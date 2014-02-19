Ext.define('INVENT.model.m_supplier', {
	extend: 'Ext.data.Model',
	alias		: 'widget.supplierModel',
	fields		: ['supplier_id','supplier_cabang','supplier_nama','supplier_alamat'
				   ,'supplier_kota','supplier_kodepos','supplier_propinsi'
				   ,'supplier_negara','supplier_notelp','supplier_notelp2'
				   ,'supplier_nofax','supplier_email','supplier_website'
				   ,'supplier_cp','supplier_contact_cp','supplier_akun'
				   ,'supplier_keterangan','supplier_aktif','supplier_creator'
				   ,'supplier_date_create','supplier_update','supplier_date_update'
				   ,'supplier_revised'
				   ,'supplier_cabang_nama'],
	idProperty	: 'supplier_id'	
});