Ext.define('YMPI.model.m_master_order_beli', {
	extend: 'Ext.data.Model',
	alias		: 'widget.master_order_beliModel',
	fields		: ['order_id','order_no','order_supplier','order_tanggal','order_carabayar','order_diskon','order_cashback','order_totalbiaya','order_ttlbiaya_lain2','order_dp','order_sisa_bayar','order_keterangan','order_status_acc','order_status','order_creator','order_date_create','order_update','order_date_update','order_revised'],
	idProperty	: 'order_id'	
});