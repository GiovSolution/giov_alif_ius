Ext.define('YMPI.view.MASTER.v_supplier', {
	extend: 'Ext.grid.Panel',
	requires: ['YMPI.store.s_supplier'],
	
	title		: 'supplier',
	itemId		: 'Listsupplier',
	alias       : 'widget.Listsupplier',
	store 		: 's_supplier',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'supplier_id',
				dataIndex: 'supplier_id'
			},{
				header: 'supplier_cabang',
				dataIndex: 'supplier_cabang'
			},{
				header: 'supplier_nama',
				dataIndex: 'supplier_nama'
			},{
				header: 'supplier_alamat',
				dataIndex: 'supplier_alamat'
			},{
				header: 'supplier_kota',
				dataIndex: 'supplier_kota'
			},{
				header: 'supplier_kodepos',
				dataIndex: 'supplier_kodepos'
			},{
				header: 'supplier_propinsi',
				dataIndex: 'supplier_propinsi'
			},{
				header: 'supplier_negara',
				dataIndex: 'supplier_negara'
			},{
				header: 'supplier_notelp',
				dataIndex: 'supplier_notelp'
			},{
				header: 'supplier_notelp2',
				dataIndex: 'supplier_notelp2'
			},{
				header: 'supplier_nofax',
				dataIndex: 'supplier_nofax'
			},{
				header: 'supplier_email',
				dataIndex: 'supplier_email'
			},{
				header: 'supplier_website',
				dataIndex: 'supplier_website'
			},{
				header: 'supplier_cp',
				dataIndex: 'supplier_cp'
			},{
				header: 'supplier_contact_cp',
				dataIndex: 'supplier_contact_cp'
			},{
				header: 'supplier_akun',
				dataIndex: 'supplier_akun'
			},{
				header: 'supplier_keterangan',
				dataIndex: 'supplier_keterangan'
			},{
				header: 'supplier_aktif',
				dataIndex: 'supplier_aktif'
			},{
				header: 'supplier_creator',
				dataIndex: 'supplier_creator'
			},{
				header: 'supplier_date_create',
				dataIndex: 'supplier_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'supplier_update',
				dataIndex: 'supplier_update'
			},{
				header: 'supplier_date_update',
				dataIndex: 'supplier_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'supplier_revised',
				dataIndex: 'supplier_revised'
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
				store: 's_supplier',
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