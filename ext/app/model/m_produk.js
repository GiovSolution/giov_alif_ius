Ext.define('INVENT.model.m_produk', {
	extend: 'Ext.data.Model',
	alias		: 'widget.produkModel',
	fields		: ['produk_id','produk_kode','produk_group','produk_kategori','produk_nama','produk_satuan','produk_harga','produk_volume','produk_jenis','produk_keterangan','produk_bpom','produk_aktif','produk_saldo_awal','produk_nilai_saldo_awal','produk_tgl_nilai_saldo_awal','produk_creator','produk_date_create','produk_update','produk_aktif_cabang','produk_date_update','produk_revised'],
	idProperty	: 'produk_id'	
});