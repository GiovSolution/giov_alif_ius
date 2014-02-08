Ext.define('INVENT.view.TRANSAKSI.v_detail_order_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_detail_order_beli'],
	
	//title		: 'detail_order_beli',
	itemId		: 'v_detail_order_beli',
	alias       : 'widget.v_detail_order_beli',
	store 		: 's_detail_order_beli',
	columnLines : true,
	//frame		: true,
	forceFit	: true,
	
	margin		: 0,
	selectedIndex: -1,
	minHeight	: 170,
	
	rowediting_status: 'undefined',
	
	initComponent: function(){
		var me = this;
		
		var dorder_id_field = Ext.create('Ext.form.field.Number', {
			allowBlank : false,
			maxLength: 11 /* length of column name */
		});
		var produk_id_field = Ext.create('Ext.form.field.ComboBox', {
			itemId: 'produk_id_field',
			store: 'INVENT.store.s_produk',
			queryMode: 'remote',
			displayField:'produk_nama',
			valueField: 'produk_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
			allowBlank: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{produk_id}</b>] - {produk_nama}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{produk_id}] - {produk_nama}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'query',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'100%',
			forceSelection:true,
			listeners: {
				select: function(combo, records, e){
					satuan_id_field.focus(false, true);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						if (field.findRecordByValue(field.getValue())) {
							satuan_id_field.focus(false, true);
						}
					}
					
				}
			}
		});
		var satuan_id_field = Ext.create('Ext.form.field.ComboBox', {
			store: 'INVENT.store.s_satuan',
			queryMode: 'remote',
			displayField:'satuan_nama',
			valueField: 'satuan_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
			allowBlank: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{satuan_id}</b>] - {satuan_nama}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{satuan_id}] - {satuan_nama}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'query',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'100%',
			forceSelection:true,
			listeners: {
				select: function(combo, records, e){
					dorder_jumlah_field.focus(false, true);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						if (field.findRecordByValue(field.getValue())) {
							dorder_jumlah_field.focus(false, true);
						}
					}
					
				}
			}
		});
		var dorder_jumlah_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 0,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			minValue: 0,
			listeners: {
				blur: function(field, e){
					var jumlah = field.getValue();
					var harga = dorder_harga_field.getValue();
					var diskon = dorder_diskon_field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dorder_subtotal_field.setValue(total);
					
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dorder_jumlah_field.focus(false, true);
						
					}
					
				}
			}
		});
		var dorder_harga_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			readOnly: false,
			listeners: {
				blur: function(field, e){
					var jumlah = dorder_jumlah_field.getValue();
					var harga = field.getValue();
					var diskon = dorder_diskon_field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dorder_subtotal_field.setValue(total);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dorder_diskon_field.focus(false, true);
					}
					
				}
			}
		});
		var dorder_diskon_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 0,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			listeners: {
				blur: function(field, e){
					var jumlah = dorder_jumlah_field.getValue();
					var harga = dorder_harga_field.getValue();
					var diskon = field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dorder_subtotal_field.setValue(total);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dorder_subtotal_field.focus(false, true);
					}
					
				}
			}
		});
		var dorder_subtotal_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			readOnly: true
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
					me.rowediting_status = 'afterediting';
					e.store.removeAt(0);
					/*if (! produk_id_field.findRecordByValue(produk_id_field.getValue())) {
						editor.cancelEdit();
						console.log(e.rowIdx);
						e.store.removeAt(e.rowIdx);
					}*/
					
				},
				'validateedit': function(editor, e){
				},
				'afteredit': function(editor, e){
					me.rowediting_status = 'afterediting';
					me.down('#btncreate').fireEvent('click');
					return true;
				}
			}
		});
		
		this.columns = [
			{
				header: 'dorder_id',
				dataIndex: 'dorder_id',
				hidden: true,
				field: dorder_id_field
			}/*,{
				header: 'dorder_master',
				dataIndex: 'dorder_master',
				field: {xtype: 'numberfield'}
			}*/,{
				header: 'Produk',
				dataIndex: 'dorder_produk',
				width: 319,
				style: 'text-align:center',
				renderer: function(value, metaData, record, rowIndex, colIndex, store){
					var data = record.data;
					return '['+data.dorder_produk+'] - '+data.dorder_produk;
				},
				field: produk_id_field
			},{
				header: 'Satuan',
				dataIndex: 'dorder_satuan',
				width: 319,
				style: 'text-align:center',
				renderer: function(value, metaData, record, rowIndex, colIndex, store){
					var data = record.data;
					return '['+data.dorder_satuan+'] - '+data.dorder_satuan;
				},
				field: satuan_id_field
			},{
				header: 'Jumlah',
				dataIndex: 'dorder_jumlah',
				align: 'right',
				style: 'text-align:center',
				field: dorder_jumlah_field
			},{
				header: 'Harga(Rp)',
				dataIndex: 'dorder_harga',
				align: 'right',
				style: 'text-align:center',
				renderer: function(value){
					return Ext.util.Format.currency(value, ' ', 2);
				},
				field: dorder_harga_field
			},{
				header: 'Diskon(%)',
				dataIndex: 'dorder_diskon',
				align: 'right',
				style: 'text-align:center',
				field: dorder_diskon_field
			},{
				header: 'Sub Total(Rp)',
				dataIndex: 'dorder_subtotal',
				align: 'right',
				style: 'text-align:center',
				renderer: function(value){
					return Ext.util.Format.currency(value, ' ', 2);
				},
				field: dorder_subtotal_field
			}/*,{
				header: 'dorder_harga_log',
				dataIndex: 'dorder_harga_log',
				field: {xtype: 'textfield'}
			}*/];
		this.plugins = [this.rowEditing];
		this.dockedItems = [
			Ext.create('Ext.toolbar.Toolbar', {
				items: [{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						itemId	: 'btncreate',
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
				}/*, '-', {
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
				}*/]
			})/*,
			{
				xtype: 'pagingtoolbar',
				store: 's_detail_order_beli',
				dock: 'bottom',
				displayInfo: true
			}*/
		];
		this.callParent(arguments);
		
		//this.on('itemclick', this.gridSelection);
		//this.getView().on('refresh', this.refreshSelection, this);
		this.on('beforeselect', function(thisme, record, index, eOpts){
			if (me.rowediting_status == 'editing') {
				return false;
			}else{
				return true;
			}
		});
	},
	
	gridSelection: function(me, record, item, index, e, eOpts){
		this.selectedIndex = index;
		this.getView().saveScrollState();
	},
	
	refreshSelection: function() {
        this.getSelectionModel().select(this.selectedIndex);
    }

});