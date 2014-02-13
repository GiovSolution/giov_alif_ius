Ext.define('INVENT.view.TRANSAKSI.v_master_terima_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_master_terima_beli'],
	
	title		: 'Grid master_terima_beli',
	itemId		: 'v_master_terima_beli',
	alias       : 'widget.v_master_terima_beli',
	store 		: 's_master_terima_beli',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'terima_id',
				dataIndex: 'terima_id',
				hidden: true
			},{
				header: 'Tanggal',
				dataIndex: 'terima_tanggal',
				width: 140,
				renderer: Ext.util.Format.dateRenderer('d-M-Y H:i:s')
			},{
				header: 'No. PB',
				dataIndex: 'terima_no'
			},{
				header: 'No. OP',
				dataIndex: 'terima_order_id',
				renderer: function(value, metaData, record){
					var data = record.data;
					return '['+data.terima_order_id+'] - '+data.order_no;
				}
			},{
				header: 'Supplier',
				dataIndex: 'terima_supplier',
				renderer: function(value, metaData, record){
					var data = record.data;
					return '['+data.terima_supplier+'] - '+data.supplier_nama;
				}
			},{
				header: 'No. Surat Jln',
				dataIndex: 'terima_surat_jalan'
			},{
				header: 'Gudang',
				dataIndex: 'terima_gudang_id'
			},{
				header: 'Nama Pengirim',
				dataIndex: 'terima_pengirim'
			},{
				header: 'Keterangan',
				dataIndex: 'terima_keterangan'
			},{
				header: 'Status Dok',
				dataIndex: 'terima_status'
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
				store: 's_master_terima_beli',
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