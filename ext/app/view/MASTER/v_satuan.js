Ext.define('INVENT.view.MASTER.v_satuan', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_satuan'],
	
	title		: 'satuan',
	itemId		: 'v_satuan',
	alias       : 'widget.v_satuan',
	store 		: 's_satuan',
	columnLines : true,
	frame		: true,
	
	margin		: 0,
	selectedIndex: -1,
	
	initComponent: function(){
	
		var satuan_id_field = Ext.create('Ext.form.field.Number', {
			allowBlank : false,
			maxLength: 11 /* length of column name */
		});
		
		this.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			clicksToMoveEditor: 1,
			listeners: {
				'beforeedit': function(editor, e){
					if(! (/^\s*$/).test(e.record.data.satuan_id) ){
						
						satuan_id_field.setReadOnly(true);
					}else{
						
						satuan_id_field.setReadOnly(false);
					}
					
				},
				'canceledit': function(editor, e){
					if((/^\s*$/).test(e.record.data.satuan_id) ){
						editor.cancelEdit();
						var sm = e.grid.getSelectionModel();
						e.store.remove(sm.getSelection());
					}
				},
				'validateedit': function(editor, e){
				},
				'afteredit': function(editor, e){
					var me = this;
					if((/^\s*$/).test(e.record.data.satuan_id) ){
						Ext.Msg.alert('Peringatan', 'Kolom "satuan_id" tidak boleh kosong.');
						return false;
					}
					/* e.store.sync();
					return true; */
					var jsonData = Ext.encode(e.record.data);
					
					Ext.Ajax.request({
						method: 'POST',
						url: 'c_satuan/save',
						params: {data: jsonData},
						success: function(response){
							e.store.reload({
								callback: function(){
									var newRecordIndex = e.store.findBy(
										function(record, id) {
											if (parseFloat(record.get('satuan_id')) === e.record.data.satuan_id) {
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
				header: 'satuan_id',
				dataIndex: 'satuan_id',
				field: satuan_id_field
			},{
				header: 'satuan_kode',
				dataIndex: 'satuan_kode',
				field: {xtype: 'textarea'}
			},{
				header: 'satuan_nama',
				dataIndex: 'satuan_nama',
				field: {xtype: 'textarea'}
			},{
				header: 'satuan_aktif',
				dataIndex: 'satuan_aktif',
				field: {xtype: 'textfield'}
			},{
				header: 'satuan_creator',
				dataIndex: 'satuan_creator',
				field: {xtype: 'textarea'}
			},{
				header: 'satuan_date_create',
				dataIndex: 'satuan_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y'),
				field: {xtype: 'datefield',format: 'm-d-Y'}
			},{
				header: 'satuan_update',
				dataIndex: 'satuan_update',
				field: {xtype: 'textarea'}
			},{
				header: 'satuan_date_update',
				dataIndex: 'satuan_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y'),
				field: {xtype: 'datefield',format: 'm-d-Y'}
			},{
				header: 'satuan_revised',
				dataIndex: 'satuan_revised',
				field: {xtype: 'numberfield'}
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
				store: 's_satuan',
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