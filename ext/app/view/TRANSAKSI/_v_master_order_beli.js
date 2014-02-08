Ext.define('INVENT.view.TRANSAKSI.v_master_order_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_master_order_beli'],
	
	title		: 'master_order_beli',
	itemId		: 'v_master_order_beli',
	alias       : 'widget.v_master_order_beli',
	store 		: 's_master_order_beli',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'order_id',
				dataIndex: 'order_id',
				hidden: true
			},{
				header: 'No. OP',
				dataIndex: 'order_no'
			},{
				header: 'Supplier',
				dataIndex: 'order_supplier'
			},{
				header: 'Tanggal',
				dataIndex: 'order_tanggal',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'Cara Bayar',
				dataIndex: 'order_carabayar'
			}/*,{
				header: 'order_diskon',
				dataIndex: 'order_diskon'
			},{
				header: 'order_cashback',
				dataIndex: 'order_cashback'
			}*/,{
				header: 'Total',
				dataIndex: 'order_totalbiaya'
			}/*,{
				header: 'order_ttlbiaya_lain2',
				dataIndex: 'order_ttlbiaya_lain2'
			}*/,{
				header: 'Uang Muka',
				dataIndex: 'order_dp'
			},{
				header: 'Jumlah Hutang',
				dataIndex: 'order_sisa_bayar'
			},{
				header: 'Keterangan',
				dataIndex: 'order_keterangan'
			},{
				header: 'Status Acc',
				dataIndex: 'order_status_acc'
			},{
				header: 'Status',
				dataIndex: 'order_status'
			}/*,{
				header: 'order_creator',
				dataIndex: 'order_creator'
			},{
				header: 'order_date_create',
				dataIndex: 'order_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'order_update',
				dataIndex: 'order_update'
			},{
				header: 'order_date_update',
				dataIndex: 'order_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'order_revised',
				dataIndex: 'order_revised'
			}*/];
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
				store: 's_master_order_beli',
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