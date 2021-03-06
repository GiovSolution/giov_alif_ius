Ext.define('INVENT.view.MASTER.v_gudang', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_gudang'],
	
	title		: 'Grid gudang',
	itemId		: 'v_gudang',
	alias       : 'widget.v_gudang',
	store 		: 's_gudang',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'gudang_id',
				dataIndex: 'gudang_id'
			},{
				header: 'gudang_nama',
				dataIndex: 'gudang_nama'
			},{
				header: 'gudang_posisi',
				dataIndex: 'gudang_posisi'
			},{
				header: 'gudang_aktif',
				dataIndex: 'gudang_aktif'
			},{
				header: 'gudang_creator',
				dataIndex: 'gudang_creator'
			},{
				header: 'gudang_date_create',
				dataIndex: 'gudang_date_create'
			},{
				header: 'gudang_update',
				dataIndex: 'gudang_update'
			},{
				header: 'gudang_date_update',
				dataIndex: 'gudang_date_update'
			},{
				header: 'gudang_revised',
				dataIndex: 'gudang_revised'
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
				store: 's_gudang',
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