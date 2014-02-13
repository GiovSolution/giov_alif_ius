Ext.define('INVENT.view.TRANSAKSI.v_detail_terima_beli', {
	extend: 'Ext.grid.Panel',
	requires: ['INVENT.store.s_detail_terima_beli'],
	
	//title		: 'detail_terima_beli',
	itemId		: 'v_detail_terima_beli',
	alias       : 'widget.v_detail_terima_beli',
	store 		: 's_detail_terima_beli',
	columnLines : true,
	//frame		: true,
	forceFit	: true,
	
	margin		: 0,
	selectedIndex: -1,
	minHeight	: 170,
	
	terima_status_temp: 'terbuka',
	rowediting_status: 'undefined',
	
	initComponent: function(){
		var me = this;
		
		var dterima_id_field = Ext.create('Ext.form.field.Number', {
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
					dterima_produk_nama_field.setValue(records[0].data.produk_nama);
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
		var dterima_produk_nama_field = Ext.create('Ext.form.field.Text');
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
					dterima_satuan_nama_field.setValue(records[0].data.satuan_nama);
					dterima_jumlah_field.focus(false, true);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						if (field.findRecordByValue(field.getValue())) {
							dterima_jumlah_field.focus(false, true);
						}
					}
					
				}
			}
		});
		var dterima_satuan_nama_field = Ext.create('Ext.form.field.Text');
		var dterima_jumlah_field = Ext.create('Ext.ux.form.NumericField', {
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
					var harga = dterima_harga_field.getValue();
					var diskon = dterima_diskon_field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dterima_subtotal_field.setValue(total);
					
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dterima_harga_field.focus(false, true);
						
					}
					
				}
			}
		});
		var dterima_harga_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			readOnly: false,
			listeners: {
				blur: function(field, e){
					var jumlah = dterima_jumlah_field.getValue();
					var harga = field.getValue();
					var diskon = dterima_diskon_field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dterima_subtotal_field.setValue(total);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dterima_diskon_field.focus(false, true);
					}
					
				}
			}
		});
		var dterima_diskon_field = Ext.create('Ext.ux.form.NumericField', {
			useThousandSeparator: true,
			decimalPrecision: 0,
			alwaysDisplayDecimals: true,
			currencySymbol: '',
			thousandSeparator: '.',
			decimalSeparator: ',',
			listeners: {
				blur: function(field, e){
					var jumlah = dterima_jumlah_field.getValue();
					var harga = dterima_harga_field.getValue();
					var diskon = field.getValue();
					var total = jumlah * harga * ((100 - diskon)/100);
					dterima_subtotal_field.setValue(total);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						field.triggerBlur();
						field.blur();
						dterima_subtotal_field.focus(false, true);
					}
					
				}
			}
		});
		var dterima_no_batch_field = Ext.create('Ext.form.field.Text',{
			listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						e.stopEvent();
						dterima_expired_date_field.focus(false, true);
					}
					
				}
			}
		});
		var dterima_expired_date_field = Ext.create('Ext.form.field.Date',{
			format: 'd-M-Y',
			allowBlank: false,
			readOnly: false,
			listeners: {
				select: function(field, value, e){
					dterima_keterangan_field.focus(false, true);
				}
			}
		});
		var dterima_keterangan_field = Ext.create('Ext.form.field.Text');
		var dterima_subtotal_field = Ext.create('Ext.ux.form.NumericField', {
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
					if(! (/^\d+$/).test(e.record.data.dterima_id) ){
						dterima_id_field.setReadOnly(true);
					}else{
						dterima_id_field.setReadOnly(false);
					}
					
				},
				'canceledit': function(editor, e){
					//(/^\d+$/).test(value) <== is_number ?
					//(/^\s*$/).test(value) <== is_string ?
					me.rowediting_status = 'afterediting';
					
					if (! produk_id_field.findRecordByValue(produk_id_field.getValue())) {
						editor.cancelEdit();
						e.store.removeAt(e.rowIdx);
					}
					
				},
				'validateedit': function(editor, e){
				},
				'afteredit': function(editor, e){
					me.rowediting_status = 'afterediting';
					me.down('#btncreate').fireEvent('click');
					
					
					var task = new Ext.util.DelayedTask(function(){
						produk_id_field.reset();
						dterima_produk_nama_field.reset();
						satuan_id_field.reset();
						dterima_satuan_nama_field.reset();
					});
					task.delay(200);
					return true;
					
				}
			}
		});
		
		this.columns = [
			{
				header: 'dterima_id',
				dataIndex: 'dterima_id',
				hidden: true,
				field: dterima_id_field
			},{
				header: 'Produk',
				dataIndex: 'dterima_produk',
				width: 319,
				style: 'text-align:center',
				renderer: function(value, metaData, record, rowIndex, colIndex, store){
					var data = record.data;
					return '['+data.dterima_produk+'] - '+data.dterima_produk_nama;
				},
				field: produk_id_field
			},{
				header: 'produk_nama',
				dataIndex: 'dterima_produk_nama',
				hidden: true,
				field: dterima_produk_nama_field
			},{
				header: 'Satuan',
				dataIndex: 'dterima_satuan',
				width: 120,
				style: 'text-align:center',
				renderer: function(value, metaData, record, rowIndex, colIndex, store){
					var data = record.data;
					return '['+data.dterima_satuan+'] - '+data.dterima_satuan_nama;
				},
				field: satuan_id_field
			},{
				header: 'satuan_nama',
				dataIndex: 'dterima_satuan_nama',
				hidden: true,
				field: dterima_satuan_nama_field
			},{
				header: 'Jumlah',
				dataIndex: 'dterima_jumlah',
				align: 'right',
				style: 'text-align:center',
				field: dterima_jumlah_field
			},{
				header: 'Harga(Rp)',
				dataIndex: 'dterima_harga',
				align: 'right',
				style: 'text-align:center',
				renderer: function(value){
					return Ext.util.Format.currency(value, ' ', 2);
				},
				field: dterima_harga_field
			},{
				header: 'Diskon(%)',
				dataIndex: 'dterima_diskon',
				width: 80,
				align: 'right',
				style: 'text-align:center',
				field: dterima_diskon_field
			},{
				header: 'No. Batch',
				dataIndex: 'dterima_no_batch',
				field: dterima_no_batch_field
			},{
				header: 'Expired Date',
				dataIndex: 'dterima_expired_date',
				width: 120,
				renderer: Ext.util.Format.dateRenderer('d M, Y'),
				field: dterima_expired_date_field
			}/*,{
				header: 'dterima_keterangan',
				dataIndex: 'dterima_keterangan',
				field: dterima_keterangan_field
			}*/,{
				header: 'Total(Rp)',
				dataIndex: 'dterima_subtotal',
				flex: 1,
				align: 'right',
				style: 'text-align:center',
				renderer: function(value){
					return Ext.util.Format.currency(value, ' ', 2);
				},
				field: dterima_subtotal_field
			}];
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
						action	: 'create',
						disabled: true
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
				store: 's_detail_terima_beli',
				dock: 'bottom',
				displayInfo: true
			}*/
		];
		this.callParent(arguments);
		
		this.on('itemclick', this.gridSelection);
		this.getView().on('refresh', this.refreshSelection, this);
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