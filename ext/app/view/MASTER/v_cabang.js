Ext.define('YMPI.view.MASTER.v_cabang', {
	extend: 'Ext.grid.Panel',
	requires: ['YMPI.store.s_cabang'],
	
	title		: 'cabang',
	itemId		: 'Listcabang',
	alias       : 'widget.Listcabang',
	store 		: 's_cabang',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'cabang_id',
				dataIndex: 'cabang_id'
			},{
				header: 'cabang_nama',
				dataIndex: 'cabang_nama'
			},{
				header: 'cabang_alamat',
				dataIndex: 'cabang_alamat'
			},{
				header: 'cabang_kota',
				dataIndex: 'cabang_kota'
			},{
				header: 'cabang_kodepos',
				dataIndex: 'cabang_kodepos'
			},{
				header: 'cabang_propinsi',
				dataIndex: 'cabang_propinsi'
			},{
				header: 'cabang_keterangan',
				dataIndex: 'cabang_keterangan'
			},{
				header: 'cabang_aktif',
				dataIndex: 'cabang_aktif'
			},{
				header: 'cabang_creator',
				dataIndex: 'cabang_creator'
			},{
				header: 'cabang_date_create',
				dataIndex: 'cabang_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'cabang_update',
				dataIndex: 'cabang_update'
			},{
				header: 'cabang_date_update',
				dataIndex: 'cabang_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'cabang_revised',
				dataIndex: 'cabang_revised'
			},{
				header: 'cabang_value',
				dataIndex: 'cabang_value'
			},{
				header: 'cabang_kode',
				dataIndex: 'cabang_kode'
			},{
				header: 'cabang_kode_akun',
				dataIndex: 'cabang_kode_akun'
			},{
				header: 'cabang_pajak',
				dataIndex: 'cabang_pajak'
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
				store: 's_cabang',
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