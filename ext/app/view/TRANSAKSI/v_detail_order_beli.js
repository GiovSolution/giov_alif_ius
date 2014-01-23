Ext.define('INVENT.view.TRANSAKSI.v_detail_order_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_detail_order_beli'],
	
	title		: 'detail_order_beli',
	itemId		: 'v_detail_order_beli',
	alias       : 'widget.v_detail_order_beli',
	store 		: 's_detail_order_beli',
	columnLines : true,
	frame		: true,
	
	margin		: 0,
	selectedIndex: -1,
	
	initComponent: function(){
	
		var dorder_id_field = Ext.create('Ext.form.field.Number', {
			allowBlank : false,
			maxLength: 11 /* length of column name */
		});
		
		this.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			clicksToMoveEditor: 1,
			listeners: {
				'beforeedit': function(editor, e){
					if(! (/^\s*$/).test(e.record.data.dorder_id) ){
						
						dorder_id_field.setReadOnly(true);
					}else{
						
						dorder_id_field.setReadOnly(false);
					}
					
				},
				'canceledit': function(editor, e){
					if((/^\s*$/).test(e.record.data.dorder_id) ){
						editor.cancelEdit();
						var sm = e.grid.getSelectionModel();
						e.store.remove(sm.getSelection());
					}
				},
				'validateedit': function(editor, e){
				},
				'afteredit': function(editor, e){
					var me = this;
					if((/^\s*$/).test(e.record.data.dorder_id) ){
						Ext.Msg.alert('Peringatan', 'Kolom "dorder_id" tidak boleh kosong.');
						return false;
					}
					/* e.store.sync();
					return true; */
					var jsonData = Ext.encode(e.record.data);
					
					Ext.Ajax.request({
						method: 'POST',
						url: 'c_detail_order_beli/save',
						params: {data: jsonData},
						success: function(response){
							e.store.reload({
								callback: function(){
									var newRecordIndex = e.store.findBy(
										function(record, id) {
											if (parseFloat(record.get('dorder_id')) === e.record.data.dorder_id) {
												return true;
											}
											return false;
										}
									);
									/* me.grid.getView().select(recordIndex); */
									me.grid.getSelectionModel().select(newRecordIndex);
								}
							});
						}
					});
					return true;
				}
			}
		});
		
		this.columns = [
			{
				header: 'dorder_id',
				dataIndex: 'dorder_id',
				field: dorder_id_field
			},{
				header: 'dorder_master',
				dataIndex: 'dorder_master',
				field: {xtype: 'numberfield'}
			},{
				header: 'dorder_produk',
				dataIndex: 'dorder_produk',
				field: {xtype: 'numberfield'}
			},{
				header: 'dorder_satuan',
				dataIndex: 'dorder_satuan',
				field: {xtype: 'textarea'}
			},{
				header: 'dorder_jumlah',
				dataIndex: 'dorder_jumlah',
				field: {xtype: 'numberfield'}
			},{
				header: 'dorder_harga',
				dataIndex: 'dorder_harga',
				field: {xtype: 'textfield'}
			},{
				header: 'dorder_diskon',
				dataIndex: 'dorder_diskon',
				field: {xtype: 'textfield'}
			},{
				header: 'dorder_harga_log',
				dataIndex: 'dorder_harga_log',
				field: {xtype: 'textfield'}
			}];
		this.plugins = [this.rowEditing];
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
				store: 's_detail_order_beli',
				dock: 'bottom',
				displayInfo: true
			}
		];
		this.callParent(arguments);
		
		this.on('itemclick', this.gridSelection);
		this.getView().on('refresh', this.refreshSelection, this);
	},
	
	gridSelection: function(me, record, item, index, e, eOpts){
		this.selectedIndex = index;
		this.getView().saveScrollState();
	},
	
	refreshSelection: function() {
        this.getSelectionModel().select(this.selectedIndex);
    }

});