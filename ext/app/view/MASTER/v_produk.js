Ext.define('INVENT.view.MASTER.v_produk', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_produk'],
	
	title		: 'produk',
	itemId		: 'v_produk',
	alias       : 'widget.v_produk',
	store 		: 's_produk',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'produk_id',
				dataIndex: 'produk_id'
			},{
				header: 'produk_kode',
				dataIndex: 'produk_kode'
			},{
				header: 'produk_group',
				dataIndex: 'produk_group'
			},{
				header: 'produk_kategori',
				dataIndex: 'produk_kategori'
			},{
				header: 'produk_nama',
				dataIndex: 'produk_nama'
			},{
				header: 'produk_satuan',
				dataIndex: 'produk_satuan'
			},{
				header: 'produk_harga',
				dataIndex: 'produk_harga'
			},{
				header: 'produk_volume',
				dataIndex: 'produk_volume'
			},{
				header: 'produk_jenis',
				dataIndex: 'produk_jenis'
			},{
				header: 'produk_keterangan',
				dataIndex: 'produk_keterangan'
			},{
				header: 'produk_bpom',
				dataIndex: 'produk_bpom'
			},{
				header: 'produk_aktif',
				dataIndex: 'produk_aktif'
			},{
				header: 'produk_saldo_awal',
				dataIndex: 'produk_saldo_awal'
			},{
				header: 'produk_nilai_saldo_awal',
				dataIndex: 'produk_nilai_saldo_awal'
			},{
				header: 'produk_tgl_nilai_saldo_awal',
				dataIndex: 'produk_tgl_nilai_saldo_awal',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'produk_creator',
				dataIndex: 'produk_creator'
			},{
				header: 'produk_date_create',
				dataIndex: 'produk_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'produk_update',
				dataIndex: 'produk_update'
			},{
				header: 'produk_aktif_cabang',
				dataIndex: 'produk_aktif_cabang'
			},{
				header: 'produk_date_update',
				dataIndex: 'produk_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'produk_revised',
				dataIndex: 'produk_revised'
			}];
		this.dockedItems = [
			Ext.create('Ext.toolbar.Toolbar', {
				items: [{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Add',
						iconCls	: 'icon-add',
						action	: 'create'
					}, {
						xtype: 'splitter'
					}, {
						itemId	: 'btndelete',
						text	: 'Delete',
						iconCls	: 'icon-remove',
						action	: 'delete',
						disabled: true
					}]
				}, '-', {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Export Excel',
						iconCls	: 'icon-excel',
						action	: 'xexcel'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Export PDF',
						iconCls	: 'icon-pdf',
						action	: 'xpdf'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Cetak',
						iconCls	: 'icon-print',
						action	: 'print'
					}]
				}]
			}),
			{
				xtype: 'pagingtoolbar',
				store: 's_produk',
				dock: 'bottom',
				displayInfo: true
			}
		];
		this.callParent(arguments);
		
		this.on('itemclick', this.gridSelection);
		this.getView().on('refresh', this.refreshSelection, this);
	},	
	
	gridSelection: function(me, record, item, index, e, eOpts){
		//me.getSelectionModel().select(index);
		this.selectedIndex = index;
		this.getView().saveScrollState();
	},
	
	refreshSelection: function() {
        this.getSelectionModel().select(this.selectedIndex);   /*Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);*/
    }

});