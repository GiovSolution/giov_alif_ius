Ext.define('INVENT.view.MASTER.v_supplier', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_supplier'],
	
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
				dataIndex: 'supplier_id',
				hidden: true
			},{
				header: 'Cabang',
				dataIndex: 'supplier_cabang',
				width: 160,
				renderer: function(value, metaData, record){
					var data = record.data;
					return '['+data.supplier_cabang+'] - '+data.supplier_cabang_nama;
				}
			},{
				header: 'Nama',
				dataIndex: 'supplier_nama'
			},{
				header: 'Alamat',
				dataIndex: 'supplier_alamat'
			},{
				header: 'Kota',
				dataIndex: 'supplier_kota'
			},{
				header: 'Kode Pos',
				dataIndex: 'supplier_kodepos'
			},{
				header: 'Propinsi',
				dataIndex: 'supplier_propinsi'
			},{
				header: 'Negara',
				dataIndex: 'supplier_negara'
			},{
				header: 'No. Telp',
				dataIndex: 'supplier_notelp'
			},{
				header: 'No. Telp 2',
				dataIndex: 'supplier_notelp2'
			},{
				header: 'No. Fax',
				dataIndex: 'supplier_nofax'
			},{
				header: 'Email',
				dataIndex: 'supplier_email'
			},{
				header: 'Website',
				dataIndex: 'supplier_website'
			},{
				header: 'CP',
				dataIndex: 'supplier_cp'
			},{
				header: 'No. Telp CP',
				dataIndex: 'supplier_contact_cp'
			},{
				header: 'Akun',
				dataIndex: 'supplier_akun'
			},{
				header: 'Keterangan',
				dataIndex: 'supplier_keterangan'
			},{
				xtype: 'checkcolumn',
				header: 'Aktif?',
				dataIndex: 'supplier_aktif',
				width: 100,
				processEvent: function(){return false;}
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