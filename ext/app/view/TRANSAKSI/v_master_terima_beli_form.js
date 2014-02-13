Ext.define('INVENT.view.TRANSAKSI.v_master_terima_beli_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_master_terima_beli_form',
	
	title		: 'Create/Update master_terima_beli',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
		var me = this;
		
    	/*
		 * Deklarasi variable setiap field
		 */
		var terima_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'terima_id_field',
			name: 'terima_id', /* column name of table */
			fieldLabel: 'terima_id',
			allowBlank: true,
			maxLength: 11, /* length of column name */
			hidden: true,
			value: 0
		});
		var terima_no_field = Ext.create('Ext.form.field.Text', {
			itemId: 'terima_no_field',
			name: 'terima_no', /* column name of table */
			fieldLabel: 'No. PB',
			allowBlank: true,
			maxLength: 50 /* length of column name */
		});
		var terima_order_id_field = Ext.create('Ext.form.field.ComboBox', {
			itemId: 'terima_order_id_field',
			name: 'terima_order_id', /* column name of table */
			fieldLabel: 'No. OP <font color=red>*</font>',
			allowBlank: false,
			store: 's_master_order_beli',
			queryMode: 'remote',
			displayField:'order_no',
			valueField: 'order_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{order_id}</b>] - {order_no}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{order_id}] - {order_no}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'all',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'100%',
			forceSelection:true,
			listeners: {
				beforequery: function(queryEvent, e){
					queryEvent.combo.getStore().clearFilter(); //atau queryEvent.combo.getStore().clearFilter();
				},
				select: function(combo, records, e){
					terima_supplier_field.setValue(records[0].data.order_supplier);
					terima_supplier_nama_field.setValue(records[0].data.supplier_nama);
					terima_surat_jalan_field.focus(false, 10);
					
					var detail_order_beliStore = Ext.create('INVENT.store.s_detail_order_beli');
					detail_order_beliStore.getProxy().extraParams.masterid=combo.getValue();
					detail_order_beliStore.load({
						scope: this,
						callback: function(recordsOrder, operation, success) {
							//var getV_t_terima_form= this.getV_t_terima_form(),
							//	form			= getV_t_terima_form.getForm();
							/*var total = 0;
							detail_terima_beli_grid.getStore().each(function(rec){
								var data = rec.data;
								total+=((data.terimadet_harga * ((100 - data.terimadet_diskon)/100)) * data.terimadet_jumlah);
							});
							terima_total_cffield.setValue(total);*/
							
							var total = 0;
							detail_order_beliStore.each(function(rec){
								var data = rec.data;
								
								total+=((data.dorder_harga * ((100 - data.dorder_diskon)/100)) * data.dorder_jumlah);
								
								var model	= Ext.ModelMgr.getModel('INVENT.model.m_detail_terima_beli');
								var r 		= Ext.ModelManager.create({
									dterima_id: 0,
									dterima_produk: data.dorder_produk,
									dterima_produk_nama: data.dorder_produk_nama,
									dterima_satuan: data.dorder_satuan,
									dterima_satuan_nama: data.dorder_satuan_nama,
									dterima_jumlah: data.dorder_jumlah,
									dterima_harga: data.dorder_harga,
									dterima_diskon: data.dorder_diskon,
									dterima_no_batch: '',
									dterima_expired_date: '',
									dterima_keterangan: '',
									dterima_subtotal: ((data.dorder_harga * ((100 - data.dorder_diskon)/100)) * data.dorder_jumlah)
								}, model);
								detail_terima_beli_grid.getStore().insert(0, r);
								
								
							});
							
						}
					});
					
					if ( combo.findRecordByValue(combo.getValue()) && (combo.getRawValue() != '') ) {
						me.down(detail_tabs).down(detail_terima_beli_grid).down('#btncreate').setDisabled(false);
					}
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						if (field.findRecordByValue(field.getValue())) {
							terima_surat_jalan_field.focus(false, true);
						}else{
							me.updateErrorState();
						}
					}
					
				}
			}
		});
		var terima_supplier_field = Ext.create('Ext.form.field.Number', {
			name: 'terima_supplier', /* column name of table */
			fieldLabel: 'Supplier',
			allowBlank: false,
			maxLength: 11, /* length of column name */
			hidden: true
		});
		var terima_supplier_nama_field = Ext.create('Ext.form.field.Text', {
			itemId: 'terima_supplier_nama_field',
			name: 'supplier_nama', /* column name of table */
			fieldLabel: 'Supplier',
			allowBlank: true,
			maxLength: 50
		});
		var terima_surat_jalan_field = Ext.create('Ext.form.field.Text', {
			name: 'terima_surat_jalan', /* column name of table */
			fieldLabel: 'No. Surat Jln',
			allowBlank: true,
			maxLength: 50 /* length of column name */
		});
		var terima_pengirim_field = Ext.create('Ext.form.field.Text', {
			name: 'terima_pengirim', /* column name of table */
			fieldLabel: 'Nama Pengirim',
			allowBlank: true,
			maxLength: 50 /* length of column name */
		});
		var terima_tanggal_field = Ext.create('Ext.ux.form.DateTimeField', {
			itemId: 'terima_tanggal_field',
			name: 'terima_tanggal', /* column name of table */
			format: 'l, j F Y',
			submitFormat: 'Y-m-d H:i:s',
			fieldLabel: 'Tanggal',
			editable: false,
			//value: new Date(),
			listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						//jual_pendaftaran_id_field.focus(false, true);
					}
					
				}
			}
		});
		var terima_keterangan_field = Ext.create('Ext.form.field.Text', {
			name: 'terima_keterangan', /* column name of table */
			fieldLabel: 'Keterangan',
			allowBlank: true,
			maxLength: 250 /* length of column name */
		});
		var terima_gudang_id_field = Ext.create('Ext.form.field.ComboBox', {
			name: 'terima_gudang_id', /* column name of table */
			fieldLabel: 'Gudang',
			store: 'INVENT.store.s_gudang',
			queryMode: 'remote',
			displayField: 'gudang_nama',
			valueField: 'gudang_id',
			forceSelection: true,
			triggerAction: 'all'
		});
		var terima_status_field = Ext.create('Ext.form.RadioGroup', {
			itemId: 'terima_status_field',
			flex: 1,
			layout: {
				autoFlex: false
			},
			defaults: {
				name: 'terima_status',
				margin: '0 15 0 0'
			},
			items: [{
				inputValue: 'Terbuka',
				boxLabel: 'Terbuka',
				checked: true
			}, {
				inputValue: 'Tertutup',
				boxLabel: 'Tertutup'
			}, {
				inputValue: 'Batal',
				boxLabel: 'Batal'
			}]
		});
		var terima_creator_field = Ext.create('Ext.form.field.Text', {
			name: 'terima_creator', /* column name of table */
			fieldLabel: 'terima_creator',
			allowBlank: true,
			maxLength: 50 /* length of column name */
		});
		var terima_date_create_field = Ext.create('Ext.ux.form.DateTimeField', {
			name: 'terima_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'terima_date_create',
			allowBlank: true
		});
		var terima_updater_field = Ext.create('Ext.form.field.Text', {
			name: 'terima_updater', /* column name of table */
			fieldLabel: 'terima_updater',
			allowBlank: true,
			maxLength: 50 /* length of column name */
		});
		var terima_date_update_field = Ext.create('Ext.ux.form.DateTimeField', {
			name: 'terima_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'terima_date_update',
			allowBlank: true
		});
		var terima_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'terima_revised', /* column name of table */
			fieldLabel: 'terima_revised',
			allowBlank: true,
			maxLength: 11 /* length of column name */
		});
		
		/* GRID detail start */
		var detail_terima_beli_grid = Ext.create('INVENT.view.TRANSAKSI.v_detail_terima_beli');
		/* GRID detail end */
		
		var detail_tabs = Ext.create('Ext.tab.Panel', {
			plain: true,
			activeTab: 0,
			defaults :{
				bodyPadding: 0
			},
			items: [{
				itemId: 'beli_detail_terima_beli',
				title: 'Detail Terima Pembelian',
				items: [detail_terima_beli_grid],
				listeners: {
					deactivate: function(thisme, e){
						thisme.items.items[0].rowEditing.cancelEdit();
					}
				}
			}]
		});
		
		var statusbar_info = Ext.create('Ext.Component', {
			id: 'formErrorStateSTER_TERIMA_BELI',
			invalidCls: Ext.baseCSSPrefix + 'form-invalid-icon',
			validCls: Ext.baseCSSPrefix + 'dd-drop-icon',
			baseCls: 'form-error-state',
			flex: 1,
			validText: 'Form is valid',
			invalidText: 'Form has errors',
			style: {
				paddingLeft: '20px'
			},
			
			setErrors: function(errors) {
				var me = this;
				
				errors = Ext.Array.from(errors);
				
				// Update CSS class and tooltip content
				if (errors.length) {
					me.addCls(me.invalidCls);
					me.removeCls(me.validCls);
					me.update(me.invalidText);
				} else {
					me.addCls(me.validCls);
					me.removeCls(me.invalidCls);
					me.update(me.validText);
				}
			}
		});
		
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 120,
                msgTarget: 'qtip',
				anchor: '100%'
            },
			defaultType: 'textfield',
			listeners: {
				fieldvaliditychange: function() {
					this.updateErrorState();
				},
				fielderrorchange: function() {
					this.updateErrorState();
				}
			},
			
			updateErrorState: function() {
				var me = this,
					errorCmp, fields, errors;
				
				if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
					errorCmp = me.down('#formErrorStateSTER_TERIMA_BELI');
					fields = me.getForm().getFields();
					errors = [];
					fields.each(function(field) {
						Ext.Array.forEach(field.getErrors(), function(error) {
							errors.push({name: field.getFieldLabel(), error: error});
						});
					});
					errorCmp.setErrors(errors);
					me.hasBeenDirty = true;
				}
			},
            items: [{
				xtype: 'form',
				bodyStyle: 'border-width: 0px;',
				layout: 'column',
				items: [{
					//left column
					xtype: 'form',
					bodyStyle: 'border-width: 0px;',
					columnWidth:0.49,
					items: [
						terima_id_field,terima_no_field,terima_order_id_field,terima_supplier_field
						,terima_supplier_nama_field,terima_surat_jalan_field,terima_gudang_id_field
					]
				} ,{
					xtype: 'splitter',
					columnWidth:0.02
				} ,{
					//right column
					xtype: 'form',
					bodyStyle: 'border-width: 0px;',
					columnWidth:0.49,
					items: [
						terima_pengirim_field,terima_tanggal_field,terima_keterangan_field
						, {
							xtype: 'fieldcontainer',
							fieldLabel: 'Status?',
							layout: 'hbox',
							defaultType: 'textfield',
							defaults: {
								hideLabel: true
							},
							items: [terima_status_field]
						}
					]
				}]
			}, detail_tabs],
			
	        buttons: [statusbar_info, {
                iconCls: 'icon-print',
                itemId: 'printall',
                text: 'Print Only',
                disabled: true,
                action: 'printall'
            }, {
                iconCls: 'icon-save',
                itemId: 'saveprintall',
                text: 'Update and Print',
                disabled: true,
                action: 'saveprintall'
            }, {
                iconCls: 'icon-add',
                itemId: 'createprintall',
                text: 'Create and Print',
                disabled: true,
                action: 'createprintall'
            }, {
				xtype: 'splitter'
			}, '-', {
				xtype: 'splitter'
			}, {
                iconCls: 'icon-save',
                itemId: 'saveall',
                text: 'Update',
                disabled: true,
                action: 'saveall'
            }, {
                iconCls: 'icon-add',
				itemId: 'createall',
                text: 'Create',
                action: 'createall'
            }, {
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancelall'
            }]
        });
        
        this.callParent();
    }
});