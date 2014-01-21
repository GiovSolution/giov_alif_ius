Ext.define('YMPI.view.TRANSAKSI.v_master_order_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['YMPI.store.s_master_order_beli'],
	
	title		: 'master_order_beli',
	itemId		: 'Listmaster_order_beli',
	alias       : 'widget.Listmaster_order_beli',
	store 		: 's_master_order_beli',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'order_id',
				dataIndex: 'order_id'
			},{
				header: 'order_no',
				dataIndex: 'order_no'
			},{
				header: 'order_supplier',
				dataIndex: 'order_supplier'
			},{
				header: 'order_tanggal',
				dataIndex: 'order_tanggal',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'order_carabayar',
				dataIndex: 'order_carabayar'
			},{
				header: 'order_diskon',
				dataIndex: 'order_diskon'
			},{
				header: 'order_cashback',
				dataIndex: 'order_cashback'
			},{
				header: 'order_totalbiaya',
				dataIndex: 'order_totalbiaya'
			},{
				header: 'order_ttlbiaya_lain2',
				dataIndex: 'order_ttlbiaya_lain2'
			},{
				header: 'order_dp',
				dataIndex: 'order_dp'
			},{
				header: 'order_sisa_bayar',
				dataIndex: 'order_sisa_bayar'
			},{
				header: 'order_keterangan',
				dataIndex: 'order_keterangan'
			},{
				header: 'order_status_acc',
				dataIndex: 'order_status_acc'
			},{
				header: 'order_status',
				dataIndex: 'order_status'
			},{
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